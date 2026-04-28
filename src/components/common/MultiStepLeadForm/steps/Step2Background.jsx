/* ============================================
   Step2Background
   Step 2 of the multi-step lead form. Captures the
   prospective student's home state, HS passing year,
   and city/town so admissions counsellors can route
   the right scholarship and travel guidance.
   ============================================ */

import React from "react";
import {
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Icon } from "@iconify/react";
import styles from "./Step2Background.module.css";

const STATE_OPTIONS = [
  "Assam",
  "Arunachal Pradesh",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Sikkim",
  "Tripura",
  "Other",
];

const PASSING_YEAR_OPTIONS = [
  { value: "2026", label: "2026 (current)" },
  { value: "2025", label: "2025" },
  { value: "Earlier", label: "Earlier" },
];

const Step2Background = ({ data, errors, onChange }) => {
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
        aria-labelledby="step2-state-label"
      >
        <h4 id="step2-state-label">Which state are you from?</h4>
        <FormControl fullWidth error={Boolean(errors?.state)}>
          <Select
            id="step2-state"
            displayEmpty
            value={data.state || ""}
            onChange={(event) => handleSelect("state", event.target.value)}
            renderValue={(selected) =>
              selected ? selected : (
                <span style={{ color: "var(--text-gray)" }}>
                  Select your state
                </span>
              )
            }
            startAdornment={
              <InputAdornment position="start">
                <Icon icon="mdi:map-marker-outline" />
              </InputAdornment>
            }
            inputProps={{ "aria-label": "Your home state" }}
          >
            {STATE_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {errors?.state && (
          <p className={styles.errorText} role="alert">
            {errors.state}
          </p>
        )}
      </section>

      <section
        className={styles.question}
        role="radiogroup"
        aria-labelledby="step2-year-label"
      >
        <h4 id="step2-year-label">When did (or will) you finish HS?</h4>
        <div className={`${styles.chipGrid} ${styles.three}`}>
          {PASSING_YEAR_OPTIONS.map((option) => {
            const isSelected = data.passingYear === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`${styles.chip} ${isSelected ? styles.selected : ""}`}
                onClick={() => handleSelect("passingYear", option.value)}
                onKeyDown={(event) =>
                  handleKeyDown(event, "passingYear", option.value)
                }
              >
                <Icon
                  icon="mdi:calendar-month-outline"
                  className={styles.chipIcon}
                  aria-hidden="true"
                />
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
        {errors?.passingYear && (
          <p className={styles.errorText} role="alert">
            {errors.passingYear}
          </p>
        )}
      </section>

      <section
        className={styles.question}
        aria-labelledby="step2-city-label"
      >
        <h4 id="step2-city-label">Which city or town do you live in?</h4>
        <TextField
          fullWidth
          id="step2-city"
          placeholder="e.g. Guwahati"
          value={data.cityOrTown || ""}
          onChange={(event) => onChange("cityOrTown", event.target.value)}
          error={Boolean(errors?.cityOrTown)}
          helperText={errors?.cityOrTown || " "}
          inputProps={{ maxLength: 50, autoComplete: "address-level2" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="mdi:home-city-outline" />
              </InputAdornment>
            ),
          }}
        />
      </section>
    </div>
  );
};

export default Step2Background;
