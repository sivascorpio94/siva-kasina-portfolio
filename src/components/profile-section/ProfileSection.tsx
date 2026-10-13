import { site } from "@/data/site";
import { TechShowcase } from "@/components/tech-showcase/TechShowcase";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import styles from "./ProfileSection.module.css";

export function ProfileSection() {
  const linkEntries = Object.values(site.links);

  return (
    <section id="profile" className={styles.section} aria-labelledby="profile-heading">
      <div className={`section ${styles.inner}`}>
        <div className={styles.ambient} aria-hidden="true" />
        <div className={styles.ambientBlue} aria-hidden="true" />
        <RevealOnScroll className={styles.intro}>
          <p className="eyebrow">Profile</p>
          <h2 id="profile-heading" className={styles.title}>
            {site.positioningTitle}
          </h2>
          <p className={styles.support}>{site.positioningSupport}</p>

          <nav aria-label="Social links" className={styles.links}>
            {linkEntries.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </RevealOnScroll>

        <RevealOnScroll className={styles.techReveal}>
          <TechShowcase />
        </RevealOnScroll>
      </div>
    </section>
  );
}
