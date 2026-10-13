"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { CinematicLayer } from "./CinematicLayer";
import styles from "./VideoIntro.module.css";

export function VideoIntro({
  firstName,
  lastName,
  tagline,
  subtitle,
}: {
  firstName: string;
  lastName: string;
  tagline: string;
  subtitle: string;
}) {
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const fgVideoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLAnchorElement>(null);

  const reducedMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(false);

  const playVideo = () => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg) return;
    fg.play();
    bg?.play();
    setIsPlaying(true);
  };

  const pauseVideo = () => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg) return;
    fg.pause();
    bg?.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.to(heroRef.current, {
        opacity: 0.22,
        scale: 0.975,
        ease: "none",
        scrollTrigger: {
          trigger: heroWrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          onLeave: () => pauseVideo(),
          onEnterBack: () => playVideo(),
        },
      });
    }, heroWrapperRef);

    return () => context.revert();
  }, [reducedMotion]);

  useEffect(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg) return;

    if (reducedMotion) {
      fg.pause();
      bg?.pause();
      setIsPlaying(false);
      return;
    }

    bg?.play().catch(() => {});
    fg.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [reducedMotion]);

  useEffect(() => {
    if (!isMuted || reducedMotion) return;
    const timer = setTimeout(() => setShowSoundHint(true), 1200);
    return () => clearTimeout(timer);
  }, [isMuted, reducedMotion]);

  useEffect(() => {
    if (!showSoundHint) return;
    const timer = setTimeout(() => setShowSoundHint(false), 5000);
    return () => clearTimeout(timer);
  }, [showSoundHint]);

  useEffect(() => {
    const targets = [
      taglineRef.current,
      nameRef.current,
      subtitleRef.current,
      controlsRef.current,
      scrollCueRef.current,
    ].filter(Boolean);

    if (reducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(targets, { opacity: 0, y: 28 });

    const tl = gsap.timeline({ delay: 0.2, defaults: { ease: "power3.out" } });
    tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.8 })
      .to(nameRef.current, { opacity: 1, y: 0, duration: 1.1 }, "-=0.5")
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .to(controlsRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .to(scrollCueRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  const togglePlay = () => {
    const fg = fgVideoRef.current;
    if (!fg) return;
    if (fg.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  };

  const toggleMute = () => {
    const fg = fgVideoRef.current;
    if (!fg) return;
    fg.muted = !fg.muted;
    setIsMuted(fg.muted);
    setShowSoundHint(false);
  };

  return (
    <div ref={heroWrapperRef} className={styles.heroWrapper}>
    <section
      ref={heroRef}
      className={styles.hero}
      aria-label="Introduction"
      onClick={() => {
        if (fgVideoRef.current?.paused) playVideo();
      }}
    >
      <div className={styles.videoLayer}>
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src="/video/intro.mp4"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        />
        <video
          ref={fgVideoRef}
          className={styles.fgVideo}
          src="/video/intro.mp4"
          poster="/video/poster-placeholder.svg"
          muted
          playsInline
          loop
          preload="metadata"
        >
          <track
            kind="captions"
            src="/video/captions-placeholder.vtt"
            srcLang="en"
            label="English (placeholder — captions pending)"
          />
        </video>
      </div>

      <div className={styles.cinematicLayer}>
        <CinematicLayer reducedMotion={reducedMotion} />
      </div>

      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.gradientOverlay} aria-hidden="true" />
      <div className={styles.glowOverlay} aria-hidden="true" />
      <div className={styles.textShade} aria-hidden="true" />

      <div className={styles.content}>
        <p ref={taglineRef} className={styles.tagline}>
          {tagline}
        </p>
        <h1 ref={nameRef} className={styles.name}>
          <span className={styles.nameLine}>{firstName}</span>{" "}
          <span className={styles.nameLine}>{lastName}</span>
        </h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          {subtitle}
        </p>
      </div>

      <div ref={controlsRef} className={styles.controls}>
        {showSoundHint && (
          <span className={styles.soundHint} role="status">
            Tap for sound
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className={styles.glassButton}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? "Pause introduction" : "Play introduction"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className={styles.glassButton}
          aria-pressed={!isMuted}
          aria-label={isMuted ? "Unmute introduction" : "Mute introduction"}
        >
          {isMuted ? <MutedIcon /> : <UnmutedIcon />}
        </button>
      </div>

      <a ref={scrollCueRef} href="#profile" className={styles.scrollCue} aria-label="Scroll to profile section">
        <span className={styles.scrollCueLine} aria-hidden="true" />
        Scroll
      </a>
    </section>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4 2.5v11l9-5.5-9-5.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="3.5" y="2.5" width="3" height="11" />
      <rect x="9.5" y="2.5" width="3" height="11" />
    </svg>
  );
}

function UnmutedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M2 6v4h2.5L8 12.5v-9L4.5 6H2z" fill="currentColor" stroke="none" />
      <path d="M10.5 5.5a3.5 3.5 0 010 5" strokeLinecap="round" />
      <path d="M12.3 3.7a6 6 0 010 8.6" strokeLinecap="round" />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M2 6v4h2.5L8 12.5v-9L4.5 6H2z" fill="currentColor" stroke="none" />
      <path d="M10.5 6.2l3 3.6M13.5 6.2l-3 3.6" strokeLinecap="round" />
    </svg>
  );
}
