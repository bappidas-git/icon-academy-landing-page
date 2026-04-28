/* ============================================
   Step1ProgramStream
   Step 1 of the multi-step lead form. Captures
   the prospective student's preferred undergraduate
   programme and current Higher-Secondary stream.
   ============================================ */

import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import styles from "./Step1ProgramStream.module.css";

const PROGRAM_OPTIONS = [
  {
    value: "B.Com.",
    label: "B.Com.",
    tagline: "Finance, accounting, taxation",
    icon: "mdi:chart-line",
  },
  {
    value: "BBA",
    label: "BBA",
    tagline: "Management & strategy",
    icon: "mdi:briefcase-variant",
  },
  {
    value: "BCA",
    label: "BCA",
    tagline: "Coding & software",
    icon: "mdi:laptop",
  },
  {
    value: "B.A.",
    label: "B.A.",
    tagline: "Humanities & social sciences",
    icon: "mdi:book-open-page-variant",
  },
  {
    value: "Not sure yet",
    label: "Not sure yet",
    tagline: "Counsel me — we'll guide you",
    icon: "mdi:help-circle-outline",
  },
];

const STREAM_OPTIONS = [
  { value: "Science", label: "Science" },
  { value: "Commerce", label: "Commerce" },
  { value: "Arts", label: "Arts" },
  { value: "Vocational", label: "Vocational" },
];

const PROGRAM_HELP =
  "We line you up with the right counsellor and admissions docs for your programme.";
const STREAM_HELP =
  "Stream tells us your eligibility and which scholarship schemes apply to you.";

const InlineHelp = ({ id, label, body }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handle = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    document.addEventListener("focusin", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("focusin", handle);
    };
  }, [open]);

  return (
    <span className={styles.helpWrap} ref={ref}>
      <button
        type="button"
        className={styles.helpTrigger}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((prev) => !prev)}
      >
        {label}
        <Icon icon="mdi:arrow-right" aria-hidden="true" />
      </button>
      {open && (
        <span id={id} role="tooltip" className={styles.helpTooltip}>
          {body}
        </span>
      )}
    </span>
  );
};

const Step1ProgramStream = ({ data, errors, onChange }) => {
  const firstCardRef = useRef(null);

  useEffect(() => {
    firstCardRef.current?.focus({ preventScroll: true });
  }, []);

  const handleProgramSelect = (value) => onChange("program", value);
  const handleStreamSelect = (value) => onChange("hsStream", value);

  const handleKeyDown = (event, handler, value) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      handler(value);
    }
  };

  return (
    <div className={styles.stepWrap}>
      <section
        className={styles.question}
        role="radiogroup"
        aria-labelledby="step1-program-label"
      >
        <div className={styles.questionHead}>
          <h4 id="step1-program-label" className={styles.questionLabel}>
            Which programme?
          </h4>
          <InlineHelp
            id="step1-program-help"
            label="Why we ask"
            body={PROGRAM_HELP}
          />
        </div>

        <div className={styles.programGrid}>
          {PROGRAM_OPTIONS.map((option, index) => {
            const isSelected = data.program === option.value;
            return (
              <button
                key={option.value}
                ref={index === 0 ? firstCardRef : undefined}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`${styles.programCard} ${
                  isSelected ? styles.programCardSelected : ""
                }`}
                onClick={() => handleProgramSelect(option.value)}
                onKeyDown={(event) =>
                  handleKeyDown(event, handleProgramSelect, option.value)
                }
              >
                <span className={styles.programIcon}>
                  <Icon icon={option.icon} aria-hidden="true" />
                </span>
                <span className={styles.programText}>
                  <span className={styles.programLabel}>{option.label}</span>
                  <span className={styles.programTagline}>
                    {option.tagline}
                  </span>
                </span>
                {isSelected && (
                  <Icon
                    icon="mdi:check-circle"
                    className={styles.programCheck}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
        {errors?.program && (
          <p className={styles.errorText} role="alert">
            <Icon icon="mdi:alert-circle-outline" aria-hidden="true" />
            <span>{errors.program}</span>
          </p>
        )}
      </section>

      <section
        className={styles.question}
        role="radiogroup"
        aria-labelledby="step1-stream-label"
      >
        <div className={styles.questionHead}>
          <h4 id="step1-stream-label" className={styles.questionLabel}>
            Your HS stream
          </h4>
          <InlineHelp
            id="step1-stream-help"
            label="Why we ask"
            body={STREAM_HELP}
          />
        </div>

        <div className={styles.streamGrid}>
          {STREAM_OPTIONS.map((option) => {
            const isSelected = data.hsStream === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`${styles.streamPill} ${
                  isSelected ? styles.streamPillSelected : ""
                }`}
                onClick={() => handleStreamSelect(option.value)}
                onKeyDown={(event) =>
                  handleKeyDown(event, handleStreamSelect, option.value)
                }
              >
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
        {errors?.hsStream && (
          <p className={styles.errorText} role="alert">
            <Icon icon="mdi:alert-circle-outline" aria-hidden="true" />
            <span>{errors.hsStream}</span>
          </p>
        )}
      </section>
    </div>
  );
};

export default Step1ProgramStream;
