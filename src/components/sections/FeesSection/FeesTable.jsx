/* ============================================
   FeesTable — Icon Commerce College
   Renders the four-row fee schedule as a semantic
   <table> on desktop (indigo header, cream zebra
   stripes, tabular numerics) and as stacked cards
   with visible labels on mobile (no horizontal
   scroll). Each row has a coral Apply button that
   opens the lead drawer with a programme-specific
   source. Disclaimers render below as a numbered
   list in caption type.
   ============================================ */

import React from 'react';
import { Button } from '@mui/material';
import { useModal } from '../../../context/ModalContext';
import { FEE_ROWS, FEE_DISCLAIMERS } from '../../../data/feesData';
import styles from './FeesTable.module.css';

const inr = (amount) =>
  `₹${Number(amount).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

const FeesTable = () => {
  const { openLeadDrawer } = useModal();

  const handleApply = (row) => {
    openLeadDrawer({ source: row.apply.source });
  };

  return (
    <div className={styles.wrapper}>
      {/* ===== Desktop / tablet table ===== */}
      <div className={styles.tableScroll}>
        <table
          className={styles.table}
          aria-label="Fee structure for UG programmes (2026)"
        >
          <thead className={styles.thead}>
            <tr>
              <th scope="col" className={styles.thProgram}>
                Programme
              </th>
              <th scope="col" className={styles.thNumeric}>
                Admission Fees
                <span className={styles.thSub}>(1st Sem)</span>
              </th>
              <th scope="col" className={styles.thNumeric}>
                Tuition / Month
              </th>
              <th scope="col" className={styles.thNumeric}>
                Application Fee
              </th>
              <th scope="col" className={styles.thAction}>
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {FEE_ROWS.map((row) => (
              <tr key={row.id} className={styles.row}>
                <th scope="row" className={styles.cellProgram}>
                  <span className={styles.programCode}>{row.program}</span>
                  <span className={styles.programName}>{row.fullName}</span>
                  <span className={styles.programNotes}>{row.notes}</span>
                </th>
                <td className={`${styles.cellNumeric} numeric`}>
                  {inr(row.admission)}
                </td>
                <td className={`${styles.cellNumeric} numeric`}>
                  {inr(row.tuitionPerMonth)}
                  <span className={styles.cellNumericSub}>/ month</span>
                </td>
                <td className={`${styles.cellNumeric} numeric`}>
                  {inr(row.application)}
                </td>
                <td className={styles.cellAction}>
                  <Button
                    color="cta"
                    variant="contained"
                    size="small"
                    className={styles.applyButton}
                    onClick={() => handleApply(row)}
                  >
                    {row.apply.label}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile stacked cards (visible labels, no horizontal scroll) ===== */}
      <ul className={styles.cards} role="list" aria-label="Fee structure cards">
        {FEE_ROWS.map((row) => (
          <li key={row.id} className={styles.card}>
            <div className={styles.cardHead}>
              <span className={styles.cardCode}>{row.program}</span>
              <span className={styles.cardName}>{row.fullName}</span>
            </div>
            <dl className={styles.cardGrid}>
              <div className={styles.cardItem}>
                <dt className={styles.cardLabel}>Admission (1st Sem)</dt>
                <dd className={`${styles.cardValue} numeric`}>
                  {inr(row.admission)}
                </dd>
              </div>
              <div className={styles.cardItem}>
                <dt className={styles.cardLabel}>Tuition / Month</dt>
                <dd className={`${styles.cardValue} numeric`}>
                  {inr(row.tuitionPerMonth)}
                </dd>
              </div>
              <div className={styles.cardItem}>
                <dt className={styles.cardLabel}>Application Fee</dt>
                <dd className={`${styles.cardValue} numeric`}>
                  {inr(row.application)}
                </dd>
              </div>
            </dl>
            <p className={styles.cardNotes}>{row.notes}</p>
            <Button
              color="cta"
              variant="contained"
              fullWidth
              className={styles.cardApply}
              onClick={() => handleApply(row)}
            >
              {row.apply.label}
            </Button>
          </li>
        ))}
      </ul>

      {/* ===== Disclaimers (verbatim from prospectus) ===== */}
      <ol className={styles.disclaimers} aria-label="Fee disclaimers">
        {FEE_DISCLAIMERS.map((line, index) => (
          <li key={index} className={styles.disclaimerItem}>
            {line}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default FeesTable;
