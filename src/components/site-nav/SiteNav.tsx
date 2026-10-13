"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import styles from "./SiteNav.module.css";

const SECTIONS = [
  { id: "profile", label: "Profile" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function SiteNav() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sectionEls = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sectionEls.forEach((el) => observer.observe(el));

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`} aria-label="Primary">
      <a href="#" className={styles.brand}>
        SK
      </a>
      <ul className={styles.links}>
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={active === s.id ? styles.active : ""}
              aria-current={active === s.id ? "true" : undefined}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      <a href={site.links.linkedin.href} className={styles.cta} target="_blank" rel="noopener noreferrer">
        Get in Touch
      </a>
    </nav>
  );
}
