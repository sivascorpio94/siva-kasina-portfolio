"use client";

import { site } from "@/data/site";
import { CinematicLayer } from "@/components/video-intro/CinematicLayer";
import { SectionHeading } from "@/components/section-heading/SectionHeading";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import styles from "./ClosingSection.module.css";

export function ClosingSection() {
  const reducedMotion = useReducedMotion();
  const linkEntries = Object.values(site.links);

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.particleLayer}>
        <CinematicLayer reducedMotion={reducedMotion} density="echo" />
      </div>
      <div className={styles.glowWarm} aria-hidden="true" />
      <div className={styles.glowBlue} aria-hidden="true" />

      <div className={styles.inner}>
        <RevealOnScroll className={styles.content}>
          <SectionHeading eyebrow="Contact" number="03" title="Let's talk" id="contact-heading" align="center" />
          <p className={styles.about}>{site.about}</p>

          <div className={styles.links}>
            {linkEntries.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label} <span aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
