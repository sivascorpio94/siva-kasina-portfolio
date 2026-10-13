export interface TechItem {
  name: string;
  icon?: string;
  symbol?: string;
  color: string;
}

export interface TechGroup {
  title: string;
  subtitle: string;
  items: TechItem[];
}

export const techStack: TechGroup[] = [
  {
    title: "Backend & Platforms",
    subtitle: "core languages & frameworks",
    items: [
      { name: "Java", icon: "java", color: "#F8981D" },
      { name: "Spring Boot", icon: "springboot", color: "#6DB33F" },
      { name: "Spring Security", icon: "springsecurity", color: "#6DB33F" },
      { name: "Camunda", icon: "camunda", color: "#FC5D0D" },
      { name: "REST APIs", symbol: "Re", color: "#ff9d4d" },
      { name: "Microservices", symbol: "Mi", color: "#ff9d4d" },
    ],
  },
  {
    title: "Data & Messaging",
    subtitle: "storage, cache & streaming",
    items: [
      { name: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
      { name: "Oracle", symbol: "Or", color: "#3ecfae" },
      { name: "Redis", icon: "redis", color: "#DC382D" },
      { name: "Kafka", icon: "kafka", color: "#F2F2F2" },
      { name: "Elasticsearch", icon: "elasticsearch", color: "#00BFB3" },
      { name: "MongoDB", icon: "mongodb", color: "#47A248" },
      { name: "Couchbase", icon: "couchbase", color: "#EA2328" },
    ],
  },
  {
    title: "Cloud & Delivery",
    subtitle: "where it runs & ships",
    items: [
      { name: "AWS", icon: "aws", color: "#FF9900" },
      { name: "GCP", icon: "gcp", color: "#4285F4" },
      { name: "Kubernetes", icon: "kubernetes", color: "#326CE5" },
      { name: "Docker", icon: "docker", color: "#2496ED" },
      { name: "Jenkins", icon: "jenkins", color: "#D33833" },
      { name: "Argo CD", icon: "argo", color: "#EF7B4D" },
      { name: "Maven", icon: "maven", color: "#C71A36" },
    ],
  },
  {
    title: "Frontend",
    subtitle: "client-side frameworks",
    items: [
      { name: "Angular", icon: "angular", color: "#DD0031" },
      { name: "Vue.js", icon: "vue", color: "#4FC08D" },
      { name: "React", icon: "react", color: "#61DAFB" },
    ],
  },
  {
    title: "AI",
    subtitle: "GenAI & retrieval stack",
    items: [
      { name: "RAG", symbol: "RAG", color: "#9d7cff" },
      { name: "Embeddings", symbol: "Em", color: "#9d7cff" },
      { name: "Vector Search", symbol: "Vc", color: "#9d7cff" },
      { name: "Amazon Bedrock", icon: "aws", color: "#FF9900" },
      { name: "Titan Text Embeddings v2", symbol: "Ti", color: "#9d7cff" },
      { name: "Llama 3.3", symbol: "Ll", color: "#9d7cff" },
      { name: "MCP", icon: "anthropic", color: "#CC785C" },
    ],
  },
];
