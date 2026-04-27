/* ============================================
   Step2Property
   Step 2 of the multi-step lead form. Three
   one-tap qualifying questions. Field copy is
   placeholder pending the rebrand content prompts.
   ============================================ */

import React from "react";
import { Icon } from "@iconify/react";
import styles from "./Step2Property.module.css";

const PROPERTY_OPTIONS = [];

const ROOF_OPTIONS = [];

const SYSTEM_OPTIONS = [];

const Step2Property = ({ data, errors, onChange }) => {
  const handleSelect = (field, value) => onChange(field, value);

  const handleKeyDown = (event, field, value) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      handleSelect(field, value);
    }
  };

  return (
    <div>
      <section
        className={styles.question}
        role="radiogroup"
        aria-labelledby="step2-property-label"
      >
        <h4 id="step2-property-label">__TBD_ICON_CONTENT__</h4>
        <div className={`${styles.chipGrid} ${styles.four}`}>
          {PROPERTY_OPTIONS.map((option) => {
            const isSelected = data.propertyType === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`${styles.chip} ${isSelected ? styles.selected : ""}`}
                onClick={() => handleSelect("propertyType", option.value)}
                onKeyDown={(event) =>
                  handleKeyDown(event, "propertyType", option.value)
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
        {errors?.propertyType && (
          <p className={styles.errorText} role="alert">
            __TBD_ICON_CONTENT__
          </p>
        )}
      </section>

      <section
        className={styles.question}
        role="radiogroup"
        aria-labelledby="step2-roof-label"
        aria-describedby="step2-roof-hint"
      >
        <h4 id="step2-roof-label">__TBD_ICON_CONTENT__</h4>
        <p id="step2-roof-hint" className={styles.hint}>
          __TBD_ICON_CONTENT__
        </p>
        <div className={`${styles.chipGrid} ${styles.four}`}>
          {ROOF_OPTIONS.map((option) => {
            const isSelected = data.roofType === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`${styles.chip} ${isSelected ? styles.selected : ""}`}
                onClick={() => handleSelect("roofType", option.value)}
                onKeyDown={(event) =>
                  handleKeyDown(event, "roofType", option.value)
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
        {errors?.roofType && (
          <p className={styles.errorText} role="alert">
            __TBD_ICON_CONTENT__
          </p>
        )}
      </section>

      <section
        className={styles.question}
        role="radiogroup"
        aria-labelledby="step2-system-label"
        aria-describedby="step2-system-hint"
      >
        <h4 id="step2-system-label">__TBD_ICON_CONTENT__</h4>
        <p id="step2-system-hint" className={styles.hint}>
          __TBD_ICON_CONTENT__
        </p>
        <div className={`${styles.chipGrid} ${styles.three}`}>
          {SYSTEM_OPTIONS.map((option) => {
            const isSelected = data.systemPreference === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`${styles.chipBig} ${isSelected ? styles.selected : ""}`}
                onClick={() => handleSelect("systemPreference", option.value)}
                onKeyDown={(event) =>
                  handleKeyDown(event, "systemPreference", option.value)
                }
              >
                <Icon icon={option.icon} className={styles.chipBigIcon} aria-hidden="true" />
                <span className={styles.chipBigContent}>
                  <span className={styles.chipBigLabel}>{option.label}</span>
                  <span className={styles.benefit}>{option.benefit}</span>
                </span>
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
        {errors?.systemPreference && (
          <p className={styles.errorText} role="alert">
            __TBD_ICON_CONTENT__
          </p>
        )}
      </section>
    </div>
  );
};

export default Step2Property;
