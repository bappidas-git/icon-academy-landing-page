/* ============================================
   ThankYou Page
   Post lead-submission confirmation. Renders the
   shared SuccessState component (which handles
   confetti, masked mobile, and the follow-up CTAs)
   inside a centred page shell.
   ============================================ */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import SuccessState from "../../components/common/MultiStepLeadForm/steps/SuccessState";
import { updatePageSEO } from "../../utils/seo";
import { seoConfig } from "../../config/seo";
import styles from "./ThankYou.module.css";

const ThankYou = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadMobile, setLeadMobile] = useState("");

  useEffect(() => {
    const leadSubmitted = sessionStorage.getItem("lead_submitted");
    const name = sessionStorage.getItem("lead_name");
    const mobile = sessionStorage.getItem("lead_mobile");

    if (!leadSubmitted) {
      navigate("/", { replace: true });
      return undefined;
    }

    setIsAuthorized(true);
    setLeadName(name || "");
    setLeadMobile(mobile || "");

    updatePageSEO({
      title: seoConfig.pages.thankYou.title,
      description: seoConfig.pages.thankYou.description,
      url: seoConfig.site.url + "/thank-you",
      robots: "noindex, nofollow",
    });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "virtualPageview",
      pagePath: "/thank-you",
      pageTitle: "Thank You",
    });
    window.dataLayer.push({
      event: "lead_form_submission_complete",
      pagePath: "/thank-you",
    });

    const cleanup = setTimeout(() => {
      sessionStorage.removeItem("lead_submitted");
      sessionStorage.removeItem("lead_name");
      sessionStorage.removeItem("lead_mobile");
    }, 300000);

    return () => clearTimeout(cleanup);
  }, [navigate]);

  if (!isAuthorized) return null;

  return (
    <div className={styles.thankYouPage}>
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />

      <Container maxWidth="sm" className={styles.container}>
        <div className={styles.card}>
          <SuccessState name={leadName} mobile={leadMobile} />
        </div>
      </Container>
    </div>
  );
};

export default ThankYou;
