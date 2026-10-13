export interface TechGroup {
  label: string;
  items: string[];
}

export const techGroups: TechGroup[] = [
  {
    label: "Backend & Platforms",
    items: ["Java", "Spring Boot", "Spring Security", "Camunda", "REST APIs", "Microservices"],
  },
  {
    label: "Data & Messaging",
    items: ["PostgreSQL", "Oracle", "Redis", "Kafka", "Elasticsearch", "MongoDB / Couchbase"],
  },
  {
    label: "Cloud & Delivery",
    items: ["AWS", "GCP", "Kubernetes", "Docker", "Jenkins", "Argo CD", "Maven"],
  },
  {
    label: "Frontend",
    items: ["Angular", "Vue.js", "React"],
  },
  {
    label: "AI",
    items: [
      "RAG",
      "Embeddings",
      "Vector Search",
      "Amazon Bedrock",
      "Titan Text Embeddings v2",
      "Llama 3.3",
      "MCP",
    ],
  },
];
