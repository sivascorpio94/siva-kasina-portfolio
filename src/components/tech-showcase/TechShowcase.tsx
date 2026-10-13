"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IconType } from "react-icons";
import { DiJava, DiAws } from "react-icons/di";
import {
  SiSpringboot,
  SiSpringsecurity,
  SiCamunda,
  SiPostgresql,
  SiRedis,
  SiApachekafka,
  SiElasticsearch,
  SiMongodb,
  SiCouchbase,
  SiGooglecloud,
  SiKubernetes,
  SiDocker,
  SiJenkins,
  SiArgo,
  SiApachemaven,
  SiAngular,
  SiVuedotjs,
  SiReact,
  SiAnthropic,
} from "react-icons/si";
import { techStack } from "@/data/tech-stack";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import styles from "./TechShowcase.module.css";

const ICONS: Record<string, IconType> = {
  java: DiJava,
  aws: DiAws,
  springboot: SiSpringboot,
  springsecurity: SiSpringsecurity,
  camunda: SiCamunda,
  postgresql: SiPostgresql,
  redis: SiRedis,
  kafka: SiApachekafka,
  elasticsearch: SiElasticsearch,
  mongodb: SiMongodb,
  couchbase: SiCouchbase,
  gcp: SiGooglecloud,
  kubernetes: SiKubernetes,
  docker: SiDocker,
  jenkins: SiJenkins,
  argo: SiArgo,
  maven: SiApachemaven,
  angular: SiAngular,
  vue: SiVuedotjs,
  react: SiReact,
  anthropic: SiAnthropic,
};

export function TechShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const tiles = wrap.querySelectorAll(`.${styles.tile}`);

    const ctx = gsap.context(() => {
      gsap.set(tiles, { opacity: 0, scale: 0.85, y: 10 });
      gsap.to(tiles, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.6)",
        stagger: { each: 0.02, from: "start" },
        scrollTrigger: {
          trigger: wrap,
          start: "top 85%",
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      {techStack.map((group) => (
        <div key={group.title} className={styles.row}>
          <div className={styles.label}>
            <h3 className={styles.labelTitle}>{group.title}</h3>
            <p className={styles.labelSubtitle}>{group.subtitle}</p>
          </div>

          <div className={styles.tiles}>
            {group.items.map((item) => {
              const Icon = item.icon ? ICONS[item.icon] : undefined;
              return (
                <div key={item.name} className={styles.tile}>
                  <div
                    className={styles.iconCircle}
                    style={{ "--tile-color": item.color } as CSSProperties}
                  >
                    {Icon ? (
                      <Icon className={styles.iconGlyph} aria-hidden="true" />
                    ) : (
                      <span className={styles.symbolGlyph} aria-hidden="true">
                        {item.symbol}
                      </span>
                    )}
                  </div>
                  <span className={styles.tileLabel}>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
