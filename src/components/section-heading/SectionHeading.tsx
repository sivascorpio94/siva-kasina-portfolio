"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import styles from "./SectionHeading.module.css";

export function SectionHeading({
  eyebrow,
  number,
  title,
  id,
  align = "left",
}: {
  eyebrow: string;
  number: string;
  title: string;
  id?: string;
  align?: "left" | "center";
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const words = title.split(" ");

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const wordEls = wrap.querySelectorAll(`.${styles.word}`);

    if (reducedMotion) {
      gsap.set(wordEls, { yPercent: 0, opacity: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(wordEls, { yPercent: 110, opacity: 0 });
      gsap.to(wordEls, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: wrap,
          start: "top 85%",
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, [reducedMotion, title]);

  return (
    <div
      ref={wrapRef}
      className={`${styles.wrap} ${align === "center" ? styles.center : ""}`}
    >
      <span className={styles.number} aria-hidden="true">
        {number}
      </span>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className={styles.heading}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            {i > 0 ? " " : ""}
            <span className={styles.wordMask}>
              <span className={styles.word}>{word}</span>
            </span>
          </span>
        ))}
      </h2>
    </div>
  );
}
