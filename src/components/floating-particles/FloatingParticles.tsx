import styles from "./FloatingParticles.module.css";

const DOT_COUNT = 28;

export function FloatingParticles() {
  const dots = Array.from({ length: DOT_COUNT }, (_, i) => {
    const left = (i * 37) % 100;
    const top = (i * 53) % 100;
    const size = 2 + (i % 4);
    const delay = (i % 7) * -0.9;
    const duration = 9 + (i % 5) * 2.2;
    const warm = i % 3 !== 0;

    return (
      <span
        key={i}
        className={`${styles.dot} ${warm ? styles.ember : styles.white}`}
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      />
    );
  });

  return (
    <div className={styles.field} aria-hidden="true">
      {dots}
    </div>
  );
}
