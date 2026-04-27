/* ============================================
   Step1BillRegion
   Step 1 of the multi-step lead form. Asks for
   the first two qualifying questions via visual
   chip/pill selections. Field copy is placeholder
   pending the rebrand content prompts.
   ============================================ */

import React from "react";
import { Icon } from "@iconify/react";
import styles from "./Step1BillRegion.module.css";

const BILL_OPTIONS = [];

const STATE_OPTIONS = [];

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
        <h4 id="step1-bill-label">__TBD_ICON_CONTENT__</h4>
        <p id="step1-bill-hint" className={styles.hint}>
          __TBD_ICON_CONTENT__
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
            __TBD_ICON_CONTENT__
          </p>
        )}
      </section>

      <section
        className={styles.question}
        role="radiogroup"
        aria-labelledby="step1-state-label"
        aria-describedby="step1-state-hint"
      >
        <h4 id="step1-state-label">__TBD_ICON_CONTENT__</h4>
        <p id="step1-state-hint" className={styles.hint}>
          __TBD_ICON_CONTENT__
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
            __TBD_ICON_CONTENT__
          </p>
        )}
      </section>
    </div>
  );
};

export default Step1BillRegion;
