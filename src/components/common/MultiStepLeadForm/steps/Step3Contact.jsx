/* ============================================
   Step3Contact
   Final step of the multi-step lead form. Collects
   name, mobile, optional email, and consent. Shows
   a summary chip of previous answers and a trust
   strip beneath the consent checkbox.
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
              <p>__TBD_ICON_CONTENT__</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const Step3Contact = ({ data, errors, context, onChange }) => {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const dataParts = [
    data.monthlyBill,
    data.state,
    data.propertyType,
    data.systemPreference,
  ].filter(Boolean);

  return (
    <div>
      {dataParts.length > 0 && (
        <div className={styles.contextChip} aria-label="Your plan summary">
          <Icon
            icon="mdi:sparkles"
            aria-hidden="true"
            className={styles.contextIcon}
          />
          <span>
            <strong>__TBD_ICON_CONTENT__</strong> {dataParts.join(" · ")}
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
          placeholder=""
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
          Email <span className={styles.optional}>(optional)</span>
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
          __TBD_ICON_CONTENT__{" "}
          <a
            href="#"
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
        <span>__TBD_ICON_CONTENT__</span>
      </div>

      <PrivacyModal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />
    </div>
  );
};

export default Step3Contact;
