/* ============================================
   useLeadFormMachine
   State machine for the 3-step Anvil lead form.
   Owns per-step validation, context (injected from
   the calling section), and the webhook/analytics
   submission pipeline. Consumed by MultiStepLeadForm.
   ============================================ */

import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import {
  submitLeadToWebhook,
  isDuplicateLead,
  markLeadAsSubmitted,
} from "../../../utils/webhookSubmit";
import { trackFormSubmission } from "../../../utils/gtm";
import { trackLead as trackMetaLead } from "../../../utils/metaPixel";
import { sendLeadEvent } from "../../../utils/metaCAPI";
import { generateEventId } from "../../../utils/eventDedup";
import { trackFormSubmission as trackGoogleAdsFormSubmission } from "../../../utils/googleAds";
import { sendEnhancedConversionData } from "../../../utils/enhancedConversions";
import { trackFunnelStep } from "../../../utils/leadEvents";
import {
  getNameErrorMessage,
  getMobileErrorMessage,
  getEmailErrorMessage,
} from "../../../utils/validators";
import { showError, showInfo } from "../../../utils/swalHelper";

const INITIAL_DATA = {
  monthlyBill: "",
  state: "",
  propertyType: "",
  roofType: "",
  systemPreference: "",
  name: "",
  mobile: "",
  email: "",
  consent: false,
};

const INITIAL_CONTEXT = {
  source: "hero",
  solution: null,
  calculatorSnapshot: null,
};

// Keep in sync with Step1BillRegion STATE_OPTIONS.
const STEP1_STATE_VALUES = ["Assam", "Nagaland", "Odisha", "Other"];

function bucketBill(n) {
  const num = Number(n);
  if (!Number.isFinite(num) || num <= 0) return "";
  if (num < 2000) return "<2000";
  if (num < 5000) return "2000-5000";
  if (num < 10000) return "5000-10000";
  return "10000+";
}

const mapSnapshotState = (rawState) => {
  if (!rawState) return "";
  return STEP1_STATE_VALUES.includes(rawState) ? rawState : "Other";
};

const buildInitialState = (initialContext = {}) => {
  const context = { ...INITIAL_CONTEXT, ...initialContext };
  const data = { ...INITIAL_DATA };
  let step = 1;
  let initialStepSkipped = false;

  const snap = context.calculatorSnapshot;
  if (snap) {
    const bill = bucketBill(snap.monthlyBill);
    const state = mapSnapshotState(snap.state);
    if (bill) data.monthlyBill = bill;
    if (state) data.state = state;
    if (bill && state) {
      step = 2;
      initialStepSkipped = true;
    }
  }

  return {
    step,
    data,
    errors: {},
    isSubmitting: false,
    context,
    initialStepSkipped,
  };
};

// ----- reducer -----

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD": {
      const { field, value } = action;
      const nextErrors = { ...state.errors };
      if (nextErrors[field]) delete nextErrors[field];
      return {
        ...state,
        data: { ...state.data, [field]: value },
        errors: nextErrors,
      };
    }
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "GO_NEXT":
      return { ...state, step: state.step === 3 ? 3 : state.step + 1, errors: {} };
    case "GO_BACK": {
      if (state.step === 1 || state.step === "success") return state;
      const minStep = state.initialStepSkipped ? 2 : 1;
      if (state.step <= minStep) return state;
      return { ...state, step: state.step - 1, errors: {} };
    }
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.value };
    case "SET_STEP":
      return { ...state, step: action.step, errors: {} };
    default:
      return state;
  }
};

// ----- validators per step -----

const validateStep1 = (data) => {
  const errors = {};
  if (!data.monthlyBill) errors.monthlyBill = "Select your average bill range";
  if (!data.state) errors.state = "Select your state";
  return errors;
};

const validateStep2 = (data) => {
  const errors = {};
  if (!data.propertyType) errors.propertyType = "Select your property type";
  if (!data.roofType) errors.roofType = "Select your roof type";
  if (!data.systemPreference)
    errors.systemPreference = "Select a system preference";
  return errors;
};

const validateStep3 = (data) => {
  const errors = {};
  const nameErr = getNameErrorMessage(data.name);
  if (nameErr) errors.name = nameErr;

  const mobileErr = getMobileErrorMessage(data.mobile);
  if (mobileErr) errors.mobile = mobileErr;

  if (data.email) {
    const emailErr = getEmailErrorMessage(data.email);
    if (emailErr) errors.email = emailErr;
  }

  if (!data.consent) {
    errors.consent = "Please accept the terms to continue";
  }
  return errors;
};

const validateStep = (step, data) => {
  if (step === 1) return validateStep1(data);
  if (step === 2) return validateStep2(data);
  if (step === 3) return validateStep3(data);
  return {};
};

// ----- message serialization -----

const buildEnrichedMessage = (data, context) => {
  const parts = [];

  const snap = context?.calculatorSnapshot;
  if (snap) {
    const calcBits = [
      snap.systemKw != null && `${snap.systemKw}kW`,
      snap.monthlySavings != null &&
        `save ₹${Number(snap.monthlySavings).toLocaleString("en-IN")}/mo`,
      snap.paybackYears != null && `payback ${snap.paybackYears}yr`,
      snap.state && `${snap.state}`,
      snap.monthlyBill != null && `bill ₹${snap.monthlyBill}`,
    ].filter(Boolean);
    if (calcBits.length) parts.push(`Calc: ${calcBits.join(", ")}`);
  } else {
    if (data.monthlyBill) parts.push(`Bill: ₹${data.monthlyBill}`);
    if (data.state) parts.push(`State: ${data.state}`);
  }

  if (data.propertyType) parts.push(`Property: ${data.propertyType}`);
  if (data.roofType) parts.push(`Roof: ${data.roofType}`);
  if (data.systemPreference) parts.push(`Pref: ${data.systemPreference}`);
  if (context?.solution) parts.push(`Solution: ${context.solution}`);

  return parts.filter(Boolean).join(" | ");
};

// ----- hook -----

const useLeadFormMachine = (initialContext = {}) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialContext,
    buildInitialState
  );

  // Emit form_open + initial form_step_viewed once per machine instance.
  const openEmittedRef = useRef(false);
  useEffect(() => {
    if (openEmittedRef.current) return;
    openEmittedRef.current = true;
    trackFunnelStep("form_open", {
      source: state.context.source,
      solution: state.context.solution,
    });
    if (typeof state.step === "number") {
      trackFunnelStep("form_step_viewed", { step: state.step });
    }
  }, [state.context.source, state.context.solution, state.step]);

  const setField = useCallback((field, value) => {
    let coerced = value;
    if (field === "mobile" && typeof value === "string") {
      coerced = value.replace(/\D/g, "").slice(0, 10);
    }
    dispatch({ type: "SET_FIELD", field, value: coerced });
  }, []);

  const next = useCallback(() => {
    const currentStep = state.step;
    if (currentStep === "success") return;
    const errors = validateStep(currentStep, state.data);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      return false;
    }
    trackFunnelStep("form_step_completed", {
      step: currentStep,
      source: state.context.source,
    });
    const nextStep = currentStep === 3 ? 3 : currentStep + 1;
    if (nextStep !== currentStep) {
      trackFunnelStep("form_step_viewed", { step: nextStep });
    }
    dispatch({ type: "GO_NEXT" });
    return true;
  }, [state.step, state.data, state.context.source]);

  const back = useCallback(() => {
    const currentStep = state.step;
    if (currentStep === 1 || currentStep === "success") return;
    const minStep = state.initialStepSkipped ? 2 : 1;
    if (typeof currentStep === "number" && currentStep > minStep) {
      trackFunnelStep("form_step_viewed", { step: currentStep - 1 });
    }
    dispatch({ type: "GO_BACK" });
  }, [state.step, state.initialStepSkipped]);

  const submit = useCallback(
    async ({ onSuccess, onClose } = {}) => {
      if (state.isSubmitting) return { success: false };
      if (state.step !== 3) return { success: false };

      const errors = validateStep3(state.data);
      if (Object.keys(errors).length > 0) {
        dispatch({ type: "SET_ERRORS", errors });
        return { success: false, errors };
      }

      const { data, context } = state;

      if (isDuplicateLead(data.mobile, data.email)) {
        await showInfo(
          "Already Registered!",
          "An enquiry with this mobile number or email has already been submitted. Our team will contact you soon."
        );
        return { success: false, duplicate: true };
      }

      dispatch({ type: "SET_SUBMITTING", value: true });

      const enrichedMessage = buildEnrichedMessage(data, context);
      const source = context.source || "general";

      const leadData = {
        name: data.name.trim(),
        mobile: data.mobile.trim(),
        email: data.email.trim(),
        service_interest: context.solution || data.systemPreference || "",
        message: enrichedMessage || "",
        source,
      };

      try {
        const result = await submitLeadToWebhook(leadData);

        if (!result.success) {
          await showError("Oops!", result.message);
          dispatch({ type: "SET_SUBMITTING", value: false });
          return { success: false };
        }

        trackFunnelStep("form_submitted", {
          source,
          solution: context.solution,
          hasSnapshot: !!context.calculatorSnapshot,
        });

        trackFormSubmission(source, {
          serviceInterest: leadData.service_interest,
        });

        const metaEventId = generateEventId();
        trackMetaLead({
          event_id: metaEventId,
          content_name: source,
          content_category: "lead_generation",
        });
        sendLeadEvent({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          event_id: metaEventId,
          source,
        }).catch((err) => {
          console.error("[MetaCAPI] Lead event failed:", err);
        });

        trackGoogleAdsFormSubmission(source);
        sendEnhancedConversionData(data.email, data.mobile, data.name).catch(
          (err) => {
            console.error("[EnhancedConversions] Failed:", err);
          }
        );

        markLeadAsSubmitted(data.mobile);
        sessionStorage.setItem("lead_submitted", "true");
        sessionStorage.setItem("lead_name", data.name);

        dispatch({ type: "SET_STEP", step: "success" });
        dispatch({ type: "SET_SUBMITTING", value: false });

        if (onSuccess) onSuccess({ ...data });
        if (onClose) onClose();

        return { success: true };
      } catch (error) {
        console.error("Lead submission error:", error);
        await showError(
          "Something went wrong",
          "Please try again or call us directly at 1800 2020 001."
        );
        dispatch({ type: "SET_SUBMITTING", value: false });
        return { success: false };
      }
    },
    [state]
  );

  const actions = useMemo(
    () => ({ setField, next, back, submit }),
    [setField, next, back, submit]
  );

  return { state, dispatch, actions };
};

export default useLeadFormMachine;
