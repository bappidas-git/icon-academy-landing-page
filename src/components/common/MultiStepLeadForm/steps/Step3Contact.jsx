/* ============================================
   Step3Contact
   Final step of the multi-step lead form. Collects
   name, mobile (+91 chip prefix), optional email,
   and consent. Privacy Policy opens an inline
   modal. A soft trust strip sits below the consent.
   ============================================ */

import React, { useEffect, useRef, useState } from "react";
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
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-privacy-title"
          >
            <div className={styles.privacyHeader}>
              <h3 id="lead-privacy-title">Privacy Policy</h3>
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
                Icon Commerce College respects your privacy. The information
                you share is used only to contact you about admission to our
                undergraduate programmes — typically a phone or WhatsApp call
                from our counsellor within 24 hours.
              </p>
              <p>
                We never sell or share your details with third parties. You
                can ask us to remove your record at any time by writing to{" "}
                <a href="mailto:privacy@iconcommercecollege.in">
                  privacy@iconcommercecollege.in
                </a>
                .
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const Step3Contact = ({ data, errors, onChange }) => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className={styles.stepWrap}>
      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="lead-full-name">
          Full name <span className={styles.required} aria-hidden="true">*</span>
        </label>
        <TextField
          fullWidth
          id="lead-full-name"
          inputRef={nameRef}
          placeholder="As it appears on your HS marksheet"
          value={data.name}
          onChange={(event) => onChange("name", event.target.value)}
          error={Boolean(errors?.name)}
          helperText=" "
          aria-describedby={errors?.name ? "lead-name-error" : undefined}
          inputProps={{
            maxLength: 50,
            autoComplete: "name",
            autoCapitalize: "words",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className={styles.startAdornment}>
                <Icon
                  icon="mdi:account"
                  className={styles.fieldIcon}
                  aria-hidden="true"
                />
              </InputAdornment>
            ),
          }}
        />
        {errors?.name && (
          <p id="lead-name-error" className={styles.errorText} role="alert">
            <Icon icon="mdi:alert-circle-outline" aria-hidden="true" />
            <span>{errors.name}</span>
          </p>
        )}
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
          helperText=" "
          aria-describedby={errors?.mobile ? "lead-mobile-error" : undefined}
          inputProps={{
            inputMode: "numeric",
            type: "tel",
            maxLength: 10,
            autoComplete: "tel-national",
            pattern: "[6-9][0-9]{9}",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                className={styles.phonePrefixAdornment}
              >
                <span className={styles.phonePrefixChip} aria-hidden="true">
                  +91
                </span>
              </InputAdornment>
            ),
          }}
        />
        {errors?.mobile && (
          <p id="lead-mobile-error" className={styles.errorText} role="alert">
            <Icon icon="mdi:alert-circle-outline" aria-hidden="true" />
            <span>{errors.mobile}</span>
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="lead-email">
          Email <span className={styles.optional}>(optional)</span>
        </label>
        <TextField
          fullWidth
          id="lead-email"
          placeholder="your@email.com"
          type="email"
          value={data.email}
          onChange={(event) => onChange("email", event.target.value)}
          error={Boolean(errors?.email)}
          helperText=" "
          aria-describedby={errors?.email ? "lead-email-error" : undefined}
          inputProps={{ autoComplete: "email" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className={styles.startAdornment}>
                <Icon
                  icon="mdi:email-outline"
                  className={styles.fieldIcon}
                  aria-hidden="true"
                />
              </InputAdornment>
            ),
          }}
        />
        {errors?.email && (
          <p id="lead-email-error" className={styles.errorText} role="alert">
            <Icon icon="mdi:alert-circle-outline" aria-hidden="true" />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      <label className={styles.consentRow}>
        <Checkbox
          checked={Boolean(data.consent)}
          onChange={(event) => onChange("consent", event.target.checked)}
          size="small"
          inputProps={{ "aria-describedby": "lead-consent-help" }}
        />
        <span id="lead-consent-help" className={styles.consentText}>
          I agree to be contacted by Icon Commerce College about my admission
          enquiry and accept the{" "}
          <button
            type="button"
            className={styles.privacyLink}
            onClick={() => setPrivacyOpen(true)}
          >
            Privacy Policy
          </button>
          .
        </span>
      </label>
      {errors?.consent && (
        <p className={styles.consentError} role="alert">
          <Icon icon="mdi:alert-circle-outline" aria-hidden="true" />
          <span>{errors.consent}</span>
        </p>
      )}

      <div className={styles.softTrust} aria-hidden="true">
        <span className={styles.softTrustChip}>
          <Icon icon="mdi:timer-outline" aria-hidden="true" />2 minutes
        </span>
        <span className={styles.softTrustChip}>
          <Icon icon="mdi:shield-lock-outline" aria-hidden="true" />
          No spam
        </span>
        <span className={styles.softTrustChip}>
          <Icon icon="mdi:phone-outline" aria-hidden="true" />
          Counsellor calls within 24 hrs
        </span>
      </div>

      <PrivacyModal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />
    </div>
  );
};

export default Step3Contact;
