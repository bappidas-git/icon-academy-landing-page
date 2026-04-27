/* ============================================
   leadEvents
   Thin wrapper that standardises the "lead_*"
   funnel event names pushed to the GTM dataLayer.
   Builds on existing utilities (gtm.js, eventDedup.js);
   it does not replace them.
   ============================================ */

import { trackCTAClick, trackFormSubmission } from './gtm';
import { generateEventId } from './eventDedup';

/**
 * Emit a structured "lead_*" event to the GTM dataLayer.
 * Supported steps:
 *   view_hero | cta_click | form_open | form_step_viewed |
 *   form_step_completed | form_submitted | calc_interaction |
 *   solution_click | whatsapp_click | phone_click
 *
 * @param {string} step - Funnel step identifier
 * @param {Object} [meta] - Additional event metadata
 */
export function trackFunnelStep(step, meta = {}) {
  if (typeof window === 'undefined' || !window.dataLayer) return;
  window.dataLayer.push({
    event: `lead_${step}`,
    lead_step: step,
    ...meta,
    timestamp: Date.now(),
  });
}

/**
 * Emit both the legacy `cta_click` event (via trackCTAClick)
 * and the new `lead_cta_click` funnel event, keeping existing
 * GTM tags working while adding the canonical funnel stream.
 */
export function trackCtaClickEvent(ctaId, location, label) {
  trackCTAClick(ctaId, location, label);
  trackFunnelStep('cta_click', { ctaId, location, label });
}

export { trackFormSubmission, generateEventId };
