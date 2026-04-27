/* ============================================
   Step3Contact
   Final step of the multi-step lead form. Collects
   name, mobile, optional email, and consent. Shows
   a summary chip of previous answers and a trust
   strip beneath the consent checkbox. A lightweight
   privacy modal lives inline so Step3 does not need
   to touch UnifiedLeadForm.
   ============================================ */

import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  TextField,
  InputAdornment,
  Checkbox,
  IconButton,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import styles from "./Step3Contact.module.css";

const PrivacyModal = ({ open, onClose }) => {
  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.privacyBackdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.privacyCard}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.privacyHeader}>
              <h3>Privacy Policy</h3>
              <IconButton
                onClick={onClose}
                size="small"
                aria-label="Close privacy policy"
              >
                <Icon icon="mdi:close" />
              </IconButton>
            </div>
            <div className={styles.privacyBody}>
              <p>
                Anvil Energy respects your privacy. We collect your name,
                mobile number, and (optional) email address only to prepare
                your rooftop solar savings plan and to schedule a free site
                visit.
              </p>
              <p>
                Your information is never sold. It is shared only with the
                Anvil Saathi assigned to your enquiry and with our secure
                tools that store rooftop designs, subsidy forms, and quotes.
              </p>
              <p>
                You can ask us to delete your data at any time by writing to{" "}
                <strong>privacy@anvilenergy.in</strong>. By ticking the
                consent box you agree to be contacted by Anvil on WhatsApp,
                phone, or email regarding this enquiry only.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const formatBillLabel = (bill) => {
  switch (bill) {
    case "<2000":
      return "Under ₹2,000";
    case "2000-5000":
      return "₹2,000–5,000";
    case "5000-10000":
      return "₹5,000–10,000";
    case "10000+":
      return "Over ₹10,000";
    default:
      return bill;
  }
};

const Step3Contact = ({ data, errors, context, onChange }) => {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const snapshot = context?.calculatorSnapshot;

  const snapshotParts = snapshot
    ? [
        snapshot.state,
        snapshot.systemKw != null && `${snapshot.systemKw} kW`,
        snapshot.monthlySavings != null &&
          `save ₹${Number(snapshot.monthlySavings).toLocaleString("en-IN")}/mo`,
      ].filter(Boolean)
    : [];

  const dataParts = [
    data.monthlyBill && `${formatBillLabel(data.monthlyBill)} bill`,
    data.state,
    data.propertyType,
    data.systemPreference,
  ].filter(Boolean);

  const contextParts = snapshotParts.length > 0 ? snapshotParts : dataParts;

  return (
    <div>
      {contextParts.length > 0 && (
        <div className={styles.contextChip} aria-label="Your plan summary">
          <Icon
            icon="mdi:sparkles"
            aria-hidden="true"
            className={styles.contextIcon}
          />
          <span>
            <strong>Your plan:</strong> {contextParts.join(" · ")}
          </span>
        </div>
      )}

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="lead-full-name">
          Full name <span className={styles.required} aria-hidden="true">*</span>
        </label>
        <TextField
          fullWidth
          id="lead-full-name"
          placeholder="e.g. Ankit Deka"
          value={data.name}
          onChange={(event) => onChange("name", event.target.value)}
          error={Boolean(errors?.name)}
          helperText={errors?.name || " "}
          inputProps={{ maxLength: 50, autoComplete: "name" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="mdi:account-outline" className={styles.fieldIcon} />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="lead-mobile">
          Mobile number <span className={styles.required} aria-hidden="true">*</span>
        </label>
        <TextField
          fullWidth
          id="lead-mobile"
          placeholder="10-digit mobile"
          value={data.mobile}
          onChange={(event) => onChange("mobile", event.target.value)}
          error={Boolean(errors?.mobile)}
          helperText={errors?.mobile || " "}
          inputProps={{
            inputMode: "numeric",
            maxLength: 10,
            autoComplete: "tel-national",
            pattern: "[0-9]*",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <span className={styles.phonePrefix}>+91</span>
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="lead-email">
          Email <span className={styles.optional}>(optional — we'll send your savings plan)</span>
        </label>
        <TextField
          fullWidth
          id="lead-email"
          placeholder="your@email.com"
          value={data.email}
          onChange={(event) => onChange("email", event.target.value)}
          error={Boolean(errors?.email)}
          helperText={errors?.email || " "}
          inputProps={{ autoComplete: "email" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="mdi:email-outline" className={styles.fieldIcon} />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <label className={styles.consentRow}>
        <Checkbox
          checked={Boolean(data.consent)}
          onChange={(event) => onChange("consent", event.target.checked)}
          size="small"
          inputProps={{ "aria-describedby": "lead-consent-help" }}
        />
        <span id="lead-consent-help">
          I agree to be contacted by Anvil on WhatsApp / call / email about my
          rooftop solar enquiry. See{" "}
          <a
            role="button"
            tabIndex={0}
            onClick={(event) => {
              event.preventDefault();
              setPrivacyOpen(true);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setPrivacyOpen(true);
              }
            }}
          >
            Privacy Policy
          </a>
          .
        </span>
      </label>
      {errors?.consent && (
        <p className={styles.errorText} role="alert">
          {errors.consent}
        </p>
      )}

      <div className={styles.trustRow} aria-hidden="true">
        <span>🔒 100% confidential</span>
        <span>·</span>
        <span>⭐ 4.9 Google rating</span>
        <span>·</span>
        <span>⚡ Reply within 24 hrs</span>
      </div>

      <PrivacyModal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />
    </div>
  );
};

export default Step3Contact;
