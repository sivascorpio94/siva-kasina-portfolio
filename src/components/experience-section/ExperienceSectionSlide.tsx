"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/section-heading/SectionHeading";
import { FloatingParticles } from "@/components/floating-particles/FloatingParticles";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import styles from "./ExperienceSectionSlide.module.css";

export function ExperienceSectionSlide() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const mq = window.matchMedia("(min-width: 900px)");
    if (!mq.matches) return;

    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    gsap.registerPlugin(ScrollTrigger);
    wrapper.classList.add(styles.horizontalMode);

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => "+=" + getDistance(),
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressFillRef.current) {
              progressFillRef.current.style.transform = `scaleX(${self.progress})`;
            }
            if (counterRef.current) {
              const active = Math.min(
                experience.length,
                Math.max(1, Math.round(self.progress * (experience.length - 1)) + 1)
              );
              counterRef.current.textContent = String(active).padStart(2, "0");
            }
          },
        },
      });
    }, wrapper);

    return () => {
      wrapper.classList.remove(styles.horizontalMode);
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
        <div ref={trackRef} className={styles.track}>
          {experience.map((item, i) => (
            <article key={item.id} className={styles.panel}>
              <span className={styles.panelIndex} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>

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
            </article>
          ))}
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
