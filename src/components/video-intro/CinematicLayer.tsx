"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./CinematicLayer.module.css";

// A stable field prevents particles from jumping to new places after resizing.
function random(seed: number) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function createSpriteTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,0.8)");
  gradient.addColorStop(0.25, "rgba(255,255,255,0.3)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

export function CinematicLayer({ reducedMotion, density = "full" }: {
  reducedMotion: boolean;
  density?: "full" | "echo";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check synchronously too: the shared preference hook updates after mount.
    if (reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    const section = container?.closest("section");
    if (!canvas || !container || !section) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
    } catch {
      return;
    }
    const compact = window.matchMedia("(max-width: 1024px), (pointer: coarse)");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
    camera.position.z = 60;
    const sprite = createSpriteTexture();
    const layers = [
      { count: 42, z: -22, size: 0.9, opacity: 0.22, speed: 0.023 },
      { count: 26, z: 0, size: 1.3, opacity: 0.3, speed: 0.034 },
      { count: 10, z: 18, size: 2.3, opacity: 0.18, speed: 0.045 },
    ].map((config, depth) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(config.count * 3);
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        size: config.size, map: sprite, color: depth === 0 ? "#c0ccdf" : "#ffd4a1",
        transparent: true, opacity: 0, depthWrite: false, sizeAttenuation: true,
      });
      const points = new THREE.Points(geometry, material);
      scene.add(points);
      return { ...config, geometry, material, points, positions, depth };
    });

    let width = 1;
    let height = 1;
    let layoutDirty = true;
    let visible = false;
    let disposed = false;
    let rafId = 0;
    let lastTime = 0;
    let elapsed = 0;
    let scrollTarget = 0;
    let scrollCurrent = 0;
    let fadeTarget = 0;
    let fadeCurrent = 0;
    const pointer = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const clamp = THREE.MathUtils.clamp;

    function resize() {
      width = Math.max(1, container!.clientWidth);
      height = Math.max(1, container!.clientHeight);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact.matches ? 1 : 1.5));
      renderer.setSize(width, height, false);
      layers.forEach(layer => layer.geometry.setDrawRange(0,
        Math.round(layer.count * (density === "echo" ? 0.65 : 1) * (compact.matches ? 0.35 : 1))));
      resetPointer();
      layoutDirty = true;
    }

    function resetPointer() { pointer.x = pointer.y = 0; }
    function handlePointer(event: PointerEvent) {
      if (compact.matches || event.pointerType !== "mouse") return;
      pointer.x = clamp(event.clientX / window.innerWidth * 2 - 1, -1, 1);
      pointer.y = clamp(event.clientY / window.innerHeight * 2 - 1, -1, 1);
    }
    function handleScroll() { layoutDirty = true; }

    function animate(now: number) {
      rafId = 0;
      if (disposed || !visible || document.hidden) return;
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
      lastTime = now;
      elapsed += dt;
      if (layoutDirty) {
        const rect = section!.getBoundingClientRect();
        const viewport = window.innerHeight;
        scrollTarget = clamp((viewport / 2 - (rect.top + rect.height / 2)) / viewport, -1, 1);
        // Fade over the boundary before the layer is clipped or unobserved.
        fadeTarget = clamp(Math.min(viewport - rect.top, rect.bottom) / (viewport * 0.4), 0, 1);
        layoutDirty = false;
      }
      const ease = 1 - Math.exp(-dt * 2);
      current.x += (pointer.x - current.x) * ease;
      current.y += (pointer.y - current.y) * ease;
      scrollCurrent += (scrollTarget - scrollCurrent) * ease;
      fadeCurrent += (fadeTarget - fadeCurrent) * ease;
      const intensity = compact.matches ? 0.35 : 1;
      layers.forEach(layer => {
        const spanY = 2 * Math.tan(THREE.MathUtils.degToRad(25)) * (60 - layer.z);
        const spanX = spanY * camera.aspect;
        for (let i = 0; i < layer.count; i++) {
          const seed = i + layer.depth * 100 + (density === "echo" ? 500 : 0);
          const phase = random(seed + 9) * Math.PI * 2;
          const t = elapsed * layer.speed;
          // Unequal long periods create restrained drift, without a shared bobbing cycle.
          layer.positions[i * 3] = (random(seed + 1) - 0.5) * spanX +
            (Math.sin(t + phase) + Math.cos(t * 0.61 + phase)) * 0.28 * intensity;
          layer.positions[i * 3 + 1] = (random(seed + 2) - 0.5) * spanY +
            Math.sin(t * 0.73 + phase) * 0.32 * intensity;
          layer.positions[i * 3 + 2] = layer.z;
        }
        layer.geometry.attributes.position.needsUpdate = true;
        layer.points.position.x = current.x * (layer.depth + 1) * 0.18 * intensity;
        layer.points.position.y = (current.y * 0.12 + scrollCurrent * 0.6) * (layer.depth + 1) * intensity;
        layer.material.opacity = layer.opacity * fadeCurrent * (compact.matches ? 0.7 : 1);
      });
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }
    function syncRunning() {
      cancelAnimationFrame(rafId);
      rafId = 0;
      lastTime = 0;
      layoutDirty = true;
      if (visible && !document.hidden && !disposed) rafId = requestAnimationFrame(animate);
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) resetPointer();
      syncRunning();
    });
    const resizeObserver = new ResizeObserver(resize);
    resize();
    observer.observe(container);
    resizeObserver.observe(container);
    compact.addEventListener("change", resize);
    section.addEventListener("pointermove", handlePointer, { passive: true });
    section.addEventListener("pointerleave", resetPointer);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", syncRunning);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      observer.disconnect();
      resizeObserver.disconnect();
      compact.removeEventListener("change", resize);
      section.removeEventListener("pointermove", handlePointer);
      section.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", syncRunning);
      layers.forEach(({ geometry, material }) => { geometry.dispose(); material.dispose(); });
      sprite.dispose();
      renderer.dispose();
    };
  }, [reducedMotion, density]);

  if (reducedMotion) return null;
  return <canvas ref={canvasRef} className={styles.field} data-density={density} aria-hidden="true" />;
}
