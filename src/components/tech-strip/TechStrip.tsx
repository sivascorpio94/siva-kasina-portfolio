import styles from "./TechStrip.module.css";

const HIGHLIGHTS = [
  "Java",
  "Spring Boot",
  "Camunda",
  "Kubernetes",
  "AWS",
  "RAG",
  "Amazon Bedrock",
  "MCP",
];

export function TechStrip() {
  return (
    <div className={styles.strip} aria-label="Core technologies at a glance">
      <div className={styles.track}>
        {HIGHLIGHTS.map((item) => (
          <span key={item} className={styles.item}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
