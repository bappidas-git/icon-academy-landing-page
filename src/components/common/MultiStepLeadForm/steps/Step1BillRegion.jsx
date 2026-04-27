/* ============================================
   Step1BillRegion
   Step 1 of the multi-step lead form. Asks for the
   monthly electricity bill range and install state
   via visual chip/pill selections.
   ============================================ */

import React from "react";
import { Icon } from "@iconify/react";
import styles from "./Step1BillRegion.module.css";

const BILL_OPTIONS = [
  { value: "<2000", label: "Under ₹2,000", icon: "mdi:flash-outline" },
  { value: "2000-5000", label: "₹2,000 – ₹5,000", icon: "mdi:flash" },
  { value: "5000-10000", label: "₹5,000 – ₹10,000", icon: "mdi:flash-triangle" },
  { value: "10000+", label: "Over ₹10,000", icon: "mdi:flash-alert" },
];

const STATE_OPTIONS = [
  { value: "Assam", label: "Assam", accent: "var(--region-assam)" },
  { value: "Nagaland", label: "Nagaland", accent: "var(--region-nagaland)" },
  { value: "Odisha", label: "Bhubaneswar / Odisha", accent: "var(--region-odisha)" },
  { value: "Other", label: "Other (all India)", accent: "var(--text-gray)" },
];

const Step1BillRegion = ({ data, errors, onChange }) => {
  const handleBillSelect = (value) => onChange("monthlyBill", value);
  const handleStateSelect = (value) => onChange("state", value);

  const handleKeyDown = (event, handler, value) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      handler(value);
    }
  };

  return (
    <div>
      <section
        className={styles.question}
        role="radiogroup"
        aria-labelledby="step1-bill-label"
        aria-describedby="step1-bill-hint"
      >
        <h4 id="step1-bill-label">Your current monthly electricity bill</h4>
        <p id="step1-bill-hint" className={styles.hint}>
          An honest number helps us size your system right. No judgement.
        </p>
        <div className={styles.grid}>
          {BILL_OPTIONS.map((option) => {
            const isSelected = data.monthlyBill === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`${styles.chip} ${isSelected ? styles.selected : ""}`}
                onClick={() => handleBillSelect(option.value)}
                onKeyDown={(event) =>
                  handleKeyDown(event, handleBillSelect, option.value)
                }
              >
                <Icon icon={option.icon} className={styles.chipIcon} aria-hidden="true" />
                <span>{option.label}</span>
                {isSelected && (
                  <Icon
                    icon="mdi:check-circle"
                    className={styles.chipCheck}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
        {errors?.monthlyBill && (
          <p className={styles.errorText} role="alert">
            Please select an option
          </p>
        )}
      </section>

      <section
        className={styles.question}
        role="radiogroup"
        aria-labelledby="step1-state-label"
        aria-describedby="step1-state-hint"
      >
        <h4 id="step1-state-label">Where will we install?</h4>
        <p id="step1-state-hint" className={styles.hint}>
          We're serving homeowners across Northeast India and Bhubaneswar right now.
        </p>
        <div className={styles.pillRow}>
          {STATE_OPTIONS.map((option) => {
            const isSelected = data.state === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`${styles.pill} ${isSelected ? styles.selected : ""}`}
                style={{
                  borderLeftColor: option.accent,
                  ...(isSelected
                    ? { background: `color-mix(in srgb, ${option.accent} 10%, var(--white))` }
                    : {}),
                }}
                onClick={() => handleStateSelect(option.value)}
                onKeyDown={(event) =>
                  handleKeyDown(event, handleStateSelect, option.value)
                }
              >
                <span
                  className={styles.pillDot}
                  style={{ background: option.accent }}
                  aria-hidden="true"
                />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
        {errors?.state && (
          <p className={styles.errorText} role="alert">
            Please select an option
          </p>
        )}
      </section>
    </div>
  );
};

export default Step1BillRegion;
