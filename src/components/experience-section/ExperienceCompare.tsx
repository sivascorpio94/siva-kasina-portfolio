"use client";

import { useState } from "react";
import { ExperienceSectionSlide } from "./ExperienceSectionSlide";
import { ExperienceSectionFade } from "./ExperienceSectionFade";
import styles from "./ExperienceCompare.module.css";

export function ExperienceCompare() {
  const [variant, setVariant] = useState<"slide" | "fade">("slide");

  return (
    <div className={styles.wrap}>
      <div className={styles.switcher}>
        <button
          type="button"
          className={variant === "slide" ? styles.active : ""}
          onClick={() => setVariant("slide")}
        >
          A — Slide
        </button>
        <button
          type="button"
          className={variant === "fade" ? styles.active : ""}
          onClick={() => setVariant("fade")}
        >
          B — Fade
        </button>
      </div>

      {variant === "slide" ? <ExperienceSectionSlide /> : <ExperienceSectionFade />}
    </div>
  );
}
