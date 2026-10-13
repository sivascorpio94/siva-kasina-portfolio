"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/section-heading/SectionHeading";
import { FloatingParticles } from "@/components/floating-particles/FloatingParticles";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import styles from "./ExperienceSectionFade.module.css";

const PANEL_ACCENTS = [
  "#ff9d4d", // ember
  "#60a0ff", // blue
  "#9d7cff", // violet
  "#3ecfae", // teal
  "#ff7eb3", // rose
  "#ffd166", // amber
  "#7ee787", // green
];

export function ExperienceSectionFade() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const mq = window.matchMedia("(min-width: 900px)");
    if (!mq.matches) return;

    const wrapper = wrapperRef.current;
    const panels = panelRefs.current.filter((p): p is HTMLDivElement => Boolean(p));
    if (!wrapper || panels.length < 2) return;

    gsap.registerPlugin(ScrollTrigger);
    wrapper.classList.add(styles.stageMode);

    const ctx = gsap.context(() => {
      gsap.set(panels[0], { opacity: 1, scale: 1, y: 0 });
      gsap.set(panels.slice(1), { opacity: 0, scale: 0.92, y: 36 });

      const segments = panels.length - 1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => "+=" + segments * window.innerHeight,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressFillRef.current) {
              progressFillRef.current.style.transform = `scaleX(${self.progress})`;
            }
            if (counterRef.current) {
              const active = Math.min(panels.length, Math.max(1, Math.round(self.progress * segments) + 1));
              counterRef.current.textContent = String(active).padStart(2, "0");
            }
          },
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        const pos = i - 1;
        tl.to(
          panels[i - 1],
          { opacity: 0, scale: 1.05, y: -36, duration: 1, ease: "power1.inOut" },
          pos
        ).to(
          panel,
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power1.inOut" },
          pos
        );
      });
    }, wrapper);

    return () => {
      wrapper.classList.remove(styles.stageMode);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-heading">
      <div className={styles.particleLayerWrap}>
        <div className={styles.particleLayer}>
          <FloatingParticles />
        </div>
      </div>

      <div className={`section ${styles.inner}`}>
        <div className={styles.ambient} aria-hidden="true" />
        <div className={styles.ambientBlue} aria-hidden="true" />
        <SectionHeading eyebrow="Experience" number="02" title="Where I've worked" id="experience-heading" />
      </div>

      <div ref={wrapperRef} className={styles.wrapper}>
        <div ref={stageRef} className={styles.stage}>
          {experience.map((item, i) => {
            const accent = PANEL_ACCENTS[i % PANEL_ACCENTS.length];
            return (
              <div
                key={item.id}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className={styles.panel}
                style={{ "--panel-accent": accent } as CSSProperties}
              >
                <div className={styles.panelGlow} aria-hidden="true" />
                <span className={styles.panelIndex} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className={styles.panelCard}>
                  <div className={styles.panelGrid}>
                    <div className={styles.panelLeft}>
                      <span className={styles.badge} aria-hidden="true">
                        {item.initials}
                      </span>
                      {item.companySub && <p className={styles.companySub}>{item.companySub}</p>}
                      <h3 className={styles.companyName}>{item.company}</h3>
                      <p className={styles.role}>
                        {item.title}
                        {item.dates && <span className={styles.dates}> · {item.dates}</span>}
                      </p>
                    </div>

                    <div className={styles.panelRight}>
                      <ul className={styles.bullets}>
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>

                      {item.stack.length > 0 && (
                        <ul className={styles.stackTags}>
                          {item.stack.map((tech) => (
                            <li key={tech}>{tech}</li>
                          ))}
                        </ul>
                      )}

                      {item.note && <p className={styles.note}>{item.note}</p>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.progressBar} aria-hidden="true">
          <span className={styles.progressCounter}>
            <span ref={counterRef}>01</span> / {String(experience.length).padStart(2, "0")}
          </span>
          <div className={styles.progressTrack}>
            <div ref={progressFillRef} className={styles.progressFill} />
          </div>
        </div>
      </div>
    </section>
  );
}
