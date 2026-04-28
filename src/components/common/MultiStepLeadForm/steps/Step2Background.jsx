/* ============================================
   Step2Background
   Step 2 of the multi-step lead form. Captures the
   prospective student's home state, HS passing year,
   and city/town.
   ============================================ */

import React, { useEffect, useRef } from "react";
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
  const stateRef = useRef(null);

  useEffect(() => {
    stateRef.current?.focus({ preventScroll: true });
  }, []);

  const handleSelect = (field, value) => onChange(field, value);

  const handleKeyDown = (event, field, value) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      handleSelect(field, value);
    }
  };

  return (
    <div className={styles.stepWrap}>
      <section className={styles.field} aria-labelledby="step2-state-label">
        <label id="step2-state-label" className={styles.fieldLabel}>
          State
        </label>
        <FormControl
          fullWidth
          error={Boolean(errors?.state)}
          className={styles.selectField}
        >
          <Select
            id="step2-state"
            inputRef={stateRef}
            displayEmpty
            value={data.state || ""}
            onChange={(event) => handleSelect("state", event.target.value)}
            renderValue={(selected) =>
              selected ? (
                selected
              ) : (
                <span className={styles.placeholder}>Select your state</span>
              )
            }
            startAdornment={
              <InputAdornment position="start" className={styles.startAdornment}>
                <Icon
                  icon="mdi:map-marker-outline"
                  className={styles.fieldIcon}
                  aria-hidden="true"
                />
              </InputAdornment>
            }
            inputProps={{ "aria-label": "Your home state" }}
            classes={{ icon: styles.selectChevron }}
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
            <Icon icon="mdi:alert-circle-outline" aria-hidden="true" />
            <span>{errors.state}</span>
          </p>
        )}
      </section>

      <section
        className={styles.field}
        role="radiogroup"
        aria-labelledby="step2-year-label"
      >
        <label id="step2-year-label" className={styles.fieldLabel}>
          When do (or did) you finish HS?
        </label>
        <div className={styles.segmented}>
          {PASSING_YEAR_OPTIONS.map((option) => {
            const isSelected = data.passingYear === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`${styles.segment} ${
                  isSelected ? styles.segmentSelected : ""
                }`}
                onClick={() => handleSelect("passingYear", option.value)}
                onKeyDown={(event) =>
                  handleKeyDown(event, "passingYear", option.value)
                }
              >
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
        {errors?.passingYear && (
          <p className={styles.errorText} role="alert">
            <Icon icon="mdi:alert-circle-outline" aria-hidden="true" />
            <span>{errors.passingYear}</span>
          </p>
        )}
      </section>

      <section className={styles.field} aria-labelledby="step2-city-label">
        <label id="step2-city-label" className={styles.fieldLabel} htmlFor="step2-city">
          City or town
        </label>
        <TextField
          fullWidth
          id="step2-city"
          placeholder="e.g. Guwahati, Tezpur, Dimapur"
          value={data.cityOrTown || ""}
          onChange={(event) => onChange("cityOrTown", event.target.value)}
          error={Boolean(errors?.cityOrTown)}
          helperText=" "
          aria-describedby={
            errors?.cityOrTown ? "step2-city-error" : undefined
          }
          inputProps={{
            maxLength: 50,
            autoComplete: "address-level2",
            autoCapitalize: "words",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className={styles.startAdornment}>
                <Icon
                  icon="mdi:map-marker"
                  className={styles.fieldIcon}
                  aria-hidden="true"
                />
              </InputAdornment>
            ),
          }}
        />
        {errors?.cityOrTown && (
          <p id="step2-city-error" className={styles.errorText} role="alert">
            <Icon icon="mdi:alert-circle-outline" aria-hidden="true" />
            <span>{errors.cityOrTown}</span>
          </p>
        )}
      </section>
    </div>
  );
};

export default Step2Background;
