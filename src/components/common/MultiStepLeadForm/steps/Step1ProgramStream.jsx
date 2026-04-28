/* ============================================
   Step1ProgramStream
   Step 1 of the multi-step lead form. Captures
   the prospective student's preferred undergraduate
   programme and current Higher-Secondary stream.
   ============================================ */

import React from "react";
import { Icon } from "@iconify/react";
import styles from "./Step1ProgramStream.module.css";

const PROGRAM_OPTIONS = [
  {
    value: "B.Com.",
    label: "B.Com.",
    tagline: "Bachelor of Commerce — finance, accounting, taxation",
    fee: "₹10,900 (1st sem)",
    icon: "mdi:chart-line",
  },
  {
    value: "BBA",
    label: "BBA",
    tagline: "Bachelor of Business Administration — management & strategy",
    fee: "₹10,900 (1st sem)",
    icon: "mdi:briefcase-variant",
  },
  {
    value: "BCA",
    label: "BCA",
    tagline: "Bachelor of Computer Applications — coding & software",
    fee: "₹10,900 (1st sem)",
    icon: "mdi:laptop",
  },
  {
    value: "B.A.",
    label: "B.A.",
    tagline: "Bachelor of Arts — humanities & social sciences",
    fee: "₹10,900 (1st sem)",
    icon: "mdi:book-open-variant",
  },
  {
    value: "Not sure yet",
    label: "Not sure yet",
    tagline: "Counsel me — I'll choose after talking to your team",
    fee: "Free counselling",
    icon: "mdi:help-circle-outline",
  },
];

const STREAM_OPTIONS = [
  { value: "Science", label: "Science", accent: "var(--ic-primary)" },
  { value: "Commerce", label: "Commerce", accent: "var(--accent-gold)" },
  { value: "Arts", label: "Arts", accent: "var(--cta-primary)" },
  { value: "Vocational", label: "Vocational", accent: "var(--accent-green)" },
];

const Step1ProgramStream = ({ data, errors, onChange }) => {
  const handleProgramSelect = (value) => onChange("program", value);
  const handleStreamSelect = (value) => onChange("hsStream", value);

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
        aria-labelledby="step1-program-label"
        aria-describedby="step1-program-hint"
      >
        <h4 id="step1-program-label">What programme do you want to study?</h4>
        <p id="step1-program-hint" className={styles.hint}>
          Pick your preferred undergraduate programme — you can change your
          mind during counselling.
        </p>
        <div className={styles.grid}>
          {PROGRAM_OPTIONS.map((option) => {
            const isSelected = data.program === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`${styles.chip} ${isSelected ? styles.selected : ""}`}
                onClick={() => handleProgramSelect(option.value)}
                onKeyDown={(event) =>
                  handleKeyDown(event, handleProgramSelect, option.value)
                }
              >
                <Icon
                  icon={option.icon}
                  className={styles.chipIcon}
                  aria-hidden="true"
                />
                <span>
                  <span style={{ display: "block", fontWeight: 700 }}>
                    {option.label}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      fontWeight: 400,
                      color: "var(--text-gray)",
                      marginTop: 2,
                    }}
                  >
                    {option.tagline}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--primary-dark)",
                      marginTop: 2,
                    }}
                  >
                    {option.fee}
                  </span>
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
        {errors?.program && (
          <p className={styles.errorText} role="alert">
            {errors.program}
          </p>
        )}
      </section>

      <section
        className={styles.question}
        role="radiogroup"
        aria-labelledby="step1-stream-label"
        aria-describedby="step1-stream-hint"
      >
        <h4 id="step1-stream-label">Your Higher-Secondary stream</h4>
        <p id="step1-stream-hint" className={styles.hint}>
          Helps us check eligibility and recommend the right programme.
        </p>
        <div className={styles.pillRow}>
          {STREAM_OPTIONS.map((option) => {
            const isSelected = data.hsStream === option.value;
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
                    ? {
                        background: `color-mix(in srgb, ${option.accent} 10%, var(--white))`,
                      }
                    : {}),
                }}
                onClick={() => handleStreamSelect(option.value)}
                onKeyDown={(event) =>
                  handleKeyDown(event, handleStreamSelect, option.value)
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
        {errors?.hsStream && (
          <p className={styles.errorText} role="alert">
            {errors.hsStream}
          </p>
        )}
      </section>
    </div>
  );
};

export default Step1ProgramStream;
