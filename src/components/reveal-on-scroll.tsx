"use client";

import { ReactNode } from "react";
import { useInView } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import styles from "./reveal-on-scroll.module.css";

export function RevealOnScroll({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reducedMotion = useReducedMotion();

  const revealed = inView || reducedMotion;

  return (
    <div
      ref={ref}
      className={[styles.reveal, revealed ? styles.revealed : "", className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
