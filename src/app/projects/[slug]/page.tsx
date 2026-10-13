import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import styles from "./page.module.css";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main id="main-content" className={styles.main}>
      <div className={`section ${styles.section}`}>
        <Link href="/#projects" className={styles.back}>
          ← Back to projects
        </Link>

        <div className={styles.headerRow}>
          <span
            className={`${styles.typeBadge} ${
              project.type === "production" ? styles.typeProduction : styles.typePersonal
            }`}
          >
            {project.typeLabel}
          </span>
          {project.org && <span className={styles.org}>{project.org}</span>}
        </div>

        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.designSummary}>{project.designSummary}</p>

        {project.repoUrl && (
          <a
            href={project.repoUrl}
            className={styles.repoLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub <span aria-hidden="true">↗</span>
          </a>
        )}

        <div className={styles.stackRow}>
          {project.stack.map((tech) => (
            <span key={tech} className={styles.stackItem}>
              {tech}
            </span>
          ))}
        </div>

        {project.facts.length > 0 && (
          <div className={styles.factsGrid}>
            {project.facts.map((fact) => (
              <div key={fact.label} className={styles.factCard}>
                <p className={styles.factLabel}>{fact.label}</p>
                <p className={styles.factValue}>{fact.value}</p>
              </div>
            ))}
          </div>
        )}

        {project.caseStudy.map((block) => (
          <section key={block.heading} className={styles.caseBlock}>
            <h2 className={styles.caseHeading}>{block.heading}</h2>
            {block.body.map((paragraph, i) => (
              <p key={i} className={styles.caseParagraph}>
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        {project.implemented && project.implemented.length > 0 && (
          <section className={styles.caseBlock}>
            <h2 className={styles.caseHeading}>Implemented</h2>
            <ul className={styles.list}>
              {project.implemented.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {project.roadmap && project.roadmap.length > 0 && (
          <section className={`${styles.caseBlock} ${styles.roadmapBlock}`}>
            <h2 className={styles.caseHeading}>Roadmap (planned, not implemented)</h2>
            <ul className={styles.list}>
              {project.roadmap.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {project.selectedWork && project.selectedWork.length > 0 && (
          <section className={styles.caseBlock}>
            <h2 className={styles.caseHeading}>Selected work</h2>
            <ul className={styles.list}>
              {project.selectedWork.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {project.outcomeNote && (
          <section className={styles.caseBlock}>
            <h2 className={styles.caseHeading}>Outcomes</h2>
            <p className={styles.caseParagraph}>{project.outcomeNote}</p>
          </section>
        )}

        {project.diagramPending && (
          <div className={styles.diagramPlaceholder}>
            Architecture diagram coming soon — add screenshots/diagram assets when supplied.
          </div>
        )}
      </div>
    </main>
  );
}
