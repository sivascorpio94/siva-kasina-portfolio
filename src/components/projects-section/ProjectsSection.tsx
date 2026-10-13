"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/section-heading/SectionHeading";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import styles from "./ProjectsSection.module.css";

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    cardRef.current!.style.setProperty("--x", `${e.clientX - rect.left}px`);
    cardRef.current!.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <article ref={cardRef} className={styles.card} onMouseMove={handleMouseMove}>
      <div className={styles.spotlight} aria-hidden="true" />
      <div className={styles.cardTop}>
        <span
          className={`${styles.typeBadge} ${
            project.type === "production" ? styles.typeProduction : styles.typePersonal
          }`}
        >
          {project.typeLabel}
        </span>
        {project.org && <span className={styles.org}>{project.org}</span>}
      </div>
      <h3 className={styles.cardTitle}>{project.title}</h3>
      <p className={styles.cardSummary}>{project.cardSummary}</p>
      <p className={styles.resultStat}>{project.resultStat}</p>
      <ul className={styles.stack}>
        {project.stack.slice(0, 5).map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <div className={styles.cardLinks}>
        <Link href={`/projects/${project.slug}`} className={styles.caseStudyLink}>
          View case study <span aria-hidden="true">→</span>
        </Link>
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            className={styles.repoLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const cards = grid.querySelectorAll(`.${styles.card}`);

    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 40 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
        },
      });
    }, grid);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
      <div className={`section ${styles.inner}`}>
        <div className={styles.ambient} aria-hidden="true" />
        <div className={styles.ambientBlue} aria-hidden="true" />
        <SectionHeading eyebrow="Featured Projects" number="01" title="Selected work" id="projects-heading" />

        <div ref={gridRef} className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
