import { VideoIntro } from "@/components/video-intro/VideoIntro";
import { SiteNav } from "@/components/site-nav/SiteNav";
import { TechStrip } from "@/components/tech-strip/TechStrip";
import { ProfileSection } from "@/components/profile-section/ProfileSection";
import { ProjectsSection } from "@/components/projects-section/ProjectsSection";
import { ExperienceCompare } from "@/components/experience-section/ExperienceCompare";
import { ClosingSection } from "@/components/closing-section/ClosingSection";
import { site } from "@/data/site";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <SiteNav />
      <VideoIntro
        firstName={site.firstName}
        lastName={site.lastName}
        tagline={site.heroGreeting}
        subtitle={site.positioningTitle}
      />
      <TechStrip />
      <main id="main-content">
        <ProfileSection />
        <ProjectsSection />
        <ExperienceCompare />
        <ClosingSection />
      </main>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} {site.name}. Built with Next.js.</p>
      </footer>
    </>
  );
}
