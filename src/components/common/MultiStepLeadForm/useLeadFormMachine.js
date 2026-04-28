/* ============================================
   useLeadFormMachine
   State machine for the 3-step lead form. Owns
   per-step validation, context (injected from the
   calling section), and the webhook/analytics
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
  getProgramErrorMessage,
  getHsStreamErrorMessage,
  PROGRAM_OPTIONS_LIST,
} from "../../../utils/validators";
import { showError, showInfo } from "../../../utils/swalHelper";

export const INITIAL_DATA = {
  // Step 1
  program: "",
  hsStream: "",
  // Step 2
  state: "",
  passingYear: "",
  cityOrTown: "",
  // Step 3
  name: "",
  mobile: "",
  email: "",
  consent: false,
};

const INITIAL_CONTEXT = {
  source: "hero",
  solution: null,
};

// Drawer sources whose key implies a specific programme. Opening the
// drawer with one of these sources preselects that programme in Step 1.
const SOURCE_TO_PROGRAM = {
  program_bcom_apply: "B.Com.",
  program_bba_apply: "BBA",
  program_bca_apply: "BCA",
  program_ba_apply: "B.A.",
  fees_bcom_apply: "B.Com.",
  fees_bba_apply: "BBA",
  fees_bca_apply: "BCA",
  fees_ba_apply: "B.A.",
};

const buildInitialState = (initialContext = {}) => {
  const context = { ...INITIAL_CONTEXT, ...initialContext };
  const data = { ...INITIAL_DATA };

  // If a programme override was passed via `solution`, preselect Step 1's
  // `program` field (e.g. opening the drawer from a programme card).
  if (context.solution && PROGRAM_OPTIONS_LIST.includes(context.solution)) {
    data.program = context.solution;
  } else if (SOURCE_TO_PROGRAM[context.source]) {
    data.program = SOURCE_TO_PROGRAM[context.source];
  }

  return {
    step: 1,
    data,
    errors: {},
    isSubmitting: false,
    context,
    initialStepSkipped: false,
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
      if (state.step <= 1) return state;
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
  const programErr = getProgramErrorMessage(data.program);
  if (programErr) errors.program = programErr;
  const streamErr = getHsStreamErrorMessage(data.hsStream);
  if (streamErr) errors.hsStream = streamErr;
  return errors;
};

const validateStep2 = (data) => {
  const errors = {};
  if (!data.state) errors.state = "Please select your state";
  if (!data.passingYear) errors.passingYear = "Please select your HS passing year";
  if (!data.cityOrTown || data.cityOrTown.trim().length < 2) {
    errors.cityOrTown = "Please enter your city or town";
  }
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
    errors.consent = "Please agree to be contacted before submitting";
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

  if (data.program) parts.push(`Programme: ${data.program}`);
  if (data.hsStream) parts.push(`HS Stream: ${data.hsStream}`);
  if (data.state) parts.push(`State: ${data.state}`);
  if (data.passingYear) parts.push(`HS Passing Year: ${data.passingYear}`);
  if (data.cityOrTown) parts.push(`City: ${data.cityOrTown}`);
  if (context?.solution && context.solution !== data.program) {
    parts.push(`Source Solution: ${context.solution}`);
  }
  if (context?.source) parts.push(`Source: ${context.source}`);

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
    if (typeof currentStep === "number" && currentStep > 1) {
      trackFunnelStep("form_step_viewed", { step: currentStep - 1 });
    }
    dispatch({ type: "GO_BACK" });
  }, [state.step]);

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
          "Already submitted",
          "We've already received your details — our admissions team will call you within 24 hours."
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
        service_interest: data.program || context.solution || "",
        message: enrichedMessage || "",
        source,
        // Pass new fields at top level so admin panel can show them as columns.
        program: data.program,
        hs_stream: data.hsStream,
        state: data.state,
        passing_year: data.passingYear,
        city_or_town: data.cityOrTown,
      };

      try {
        const result = await submitLeadToWebhook(leadData);

        if (!result.success) {
          await showError("Submission failed", result.message);
          dispatch({ type: "SET_SUBMITTING", value: false });
          return { success: false };
        }

        trackFunnelStep("form_submitted", {
          source,
          solution: context.solution,
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
        sessionStorage.setItem("lead_mobile", data.mobile);

        dispatch({ type: "SET_STEP", step: "success" });
        dispatch({ type: "SET_SUBMITTING", value: false });

        if (onSuccess) onSuccess({ ...data });
        if (onClose) onClose();

        return { success: true };
      } catch (error) {
        console.error("Lead submission error:", error);
        await showError(
          "Something went wrong",
          "Please try again or call us directly."
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
