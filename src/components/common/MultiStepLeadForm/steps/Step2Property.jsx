/* ============================================
   Step2Property
   Step 2 of the multi-step lead form. Three
   one-tap questions — property type, roof type,
   and battery / system preference — used to
   size the solution for the Saathi's first call.
   ============================================ */

import React from "react";
import { Icon } from "@iconify/react";
import styles from "./Step2Property.module.css";

const PROPERTY_OPTIONS = [
  { value: "Independent Home", label: "Independent Home", icon: "mdi:home-outline" },
  { value: "Villa", label: "Villa / Large Home", icon: "mdi:home-variant-outline" },
  { value: "Housing Society", label: "Housing Society", icon: "mdi:office-building-outline" },
  { value: "Commercial", label: "Shop / Commercial", icon: "mdi:store-outline" },
];

const ROOF_OPTIONS = [
  { value: "Concrete", label: "Concrete / RCC", icon: "mdi:wall" },
  { value: "Tin-shed", label: "Tin / Metal Sheet", icon: "mdi:home-roof" },
  { value: "Mixed", label: "Mixed", icon: "mdi:layers-outline" },
  { value: "Not sure", label: "Not sure", icon: "mdi:help-circle-outline" },
];

const SYSTEM_OPTIONS = [
  {
    value: "On-Grid",
    label: "On-Grid",
    benefit: "Lowest cost. Export power, earn credits.",
    icon: "mdi:transmission-tower",
  },
  {
    value: "Hybrid (battery backup)",
    label: "Hybrid with Battery",
    benefit: "Power-cut proof. Runs essentials during outages.",
    icon: "mdi:battery-charging-high",
  },
  {
    value: "Not sure",
    label: "Help me decide",
    benefit: "Saathi will recommend based on your area.",
    icon: "mdi:lightbulb-on-outline",
  },
];

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
        <h4 id="step2-property-label">What kind of home is it?</h4>
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
            Please select an option
          </p>
        )}
      </section>

      <section
        className={styles.question}
        role="radiogroup"
        aria-labelledby="step2-roof-label"
        aria-describedby="step2-roof-hint"
      >
        <h4 id="step2-roof-label">What's your roof like?</h4>
        <p id="step2-roof-hint" className={styles.hint}>
          Not sure? Just pick the closest — an Anvil Saathi will confirm during the free site visit.
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
            Please select an option
          </p>
        )}
      </section>

      <section
        className={styles.question}
        role="radiogroup"
        aria-labelledby="step2-system-label"
        aria-describedby="step2-system-hint"
      >
        <h4 id="step2-system-label">Do you want battery backup?</h4>
        <p id="step2-system-hint" className={styles.hint}>
          Power cuts in your area? Hybrid keeps your lights on. On-grid is cheaper if supply is steady.
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
            Please select an option
          </p>
        )}
      </section>
    </div>
  );
};

export default Step2Property;
