export type ProjectType = "personal" | "production";

export interface ProjectFact {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  org?: string;
  type: ProjectType;
  typeLabel: string;
  cardSummary: string;
  resultStat: string;
  designSummary: string;
  stack: string[];
  facts: ProjectFact[];
  implemented?: string[];
  roadmap?: string[];
  selectedWork?: string[];
  outcomeNote?: string;
  caseStudy: {
    heading: string;
    body: string[];
  }[];
  diagramPending?: boolean;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "meridian",
    title: "Meridian Knowledge & Access Agent",
    type: "personal",
    typeLabel: "Personal portfolio project",
    cardSummary:
      "A grounded knowledge assistant prototype for a fictional financial organization. It retrieves evidence from internal-style platform and support documents, flags conflicting guidance, and falls back when the corpus does not support an answer.",
    resultStat: "152 chunks indexed across 4 conflict-evaluation case types",
    designSummary:
      "A controlled document corpus is ingested and split into section-aware chunks. Amazon Titan Text Embeddings v2 on Bedrock generates 1,024-dimensional embeddings; vectors and metadata are stored in PostgreSQL with pgvector. At query time, the system retrieves relevant passages using semantic similarity plus metadata signals, then generates an evidence-grounded response with conflict handling and an unsupported-answer fallback.",
    stack: [
      "FastAPI",
      "Python",
      "PostgreSQL",
      "pgvector",
      "Amazon Bedrock",
      "Titan Text Embeddings v2",
      "Llama 3.3",
      "React",
      "Docker",
      "MCP",
    ],
    facts: [
      { label: "Corpus size", value: "25 pages, 152 chunks" },
      {
        label: "Evaluation cases",
        value: "Clean/control, hard-conflict, near-conflict, and noise cases",
      },
      { label: "Bedrock region", value: "us-east-2" },
      { label: "Automated tests", value: "Test suite passing (count pending final verification)" },
      { label: "Demo setup", value: "Local Docker + Bedrock (preferred demo environment)" },
      {
        label: "Possible production target",
        value: "ECS Fargate / RDS — not continuously deployed",
      },
    ],
    implemented: [
      "Section-aware document chunking over a controlled document corpus",
      "1,024-dimensional embeddings via Amazon Titan Text Embeddings v2 on Bedrock",
      "Vector + metadata storage and retrieval in PostgreSQL with pgvector",
      "Evidence-grounded response generation with conflict detection",
      "Fallback behavior when the corpus does not support an answer",
    ],
    roadmap: [
      "Live Confluence integration",
      "Custom MCP server",
      "Spring AI migration",
      "Workflow-automation agent",
    ],
    caseStudy: [
      {
        heading: "Retrieval",
        body: [
          "The corpus (25 pages, 152 chunks) is split into section-aware chunks so retrieved passages preserve their original document context rather than arbitrary fixed-length windows.",
          "Amazon Titan Text Embeddings v2 (via Amazon Bedrock, us-east-2) generates 1,024-dimensional embeddings for each chunk. Vectors and their metadata are stored in PostgreSQL using pgvector, and queries are answered with semantic similarity search combined with metadata signals rather than similarity alone.",
        ],
      },
      {
        heading: "Conflict & freshness evaluation",
        body: [
          "The evaluation corpus was deliberately built to include clean/control cases, hard-conflict cases, near-conflict cases, and noise cases, so retrieval and response quality can be tested against ambiguous and contradictory source material — not only straightforward lookups.",
          "When retrieved passages disagree, the system is designed to surface that conflict rather than silently picking one source.",
        ],
      },
      {
        heading: "Evidence grounding & fallback",
        body: [
          "Responses are generated from retrieved evidence rather than open-ended generation, with Llama 3.3 used for generation on top of the retrieved context.",
          "When the corpus does not contain sufficient support for a question, the system is designed to fall back rather than produce an unsupported answer.",
        ],
      },
      {
        heading: "Limitations & roadmap",
        body: [
          "This is a personal portfolio project built against a fictional Meridian Financial Group document corpus — it is not Fidelity production work and should not be read as such.",
          "Live Confluence integration, a custom MCP server, a Spring AI migration, and a workflow-automation agent are roadmap items only; they are not part of the current implementation.",
          "A possible production target is ECS Fargate with RDS, but the project is not continuously deployed — local Docker plus Bedrock is the current demo environment.",
        ],
      },
    ],
    diagramPending: true,
    repoUrl: "https://github.com/sivascorpio94/meridian-confluence-agent",
  },
  {
    slug: "flightdeck",
    title: "FLIGHTDECK",
    org: "Lumen Technologies (formerly CenturyLink)",
    type: "production",
    typeLabel: "Production application",
    cardSummary:
      "Designed, built, and led the development of FLIGHTDECK, a production task-management portal that routes and assigns orders using business rules and gives associates a secure interface to manage work.",
    resultStat: "Reported: 80% increase in digital-channel revenue, 70% faster task completion",
    designSummary:
      "FLIGHTDECK brings together Status Manager, Task Actions, Dashboard, Advanced Search, Application Configuration, and Routing microservices. It is the primary GUI for the underlying WORKMATE task store. Incoming orders are evaluated against assignment rules and can be routed automatically or handled manually; associates use authorized portal workflows to find, process, and track tasks.",
    stack: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Angular",
      "Vue.js",
      "Kafka",
      "OpenFeign",
      "Hystrix",
      "Zipkin",
      "Elasticsearch",
      "Oracle",
      "Couchbase",
      "Kubernetes",
    ],
    facts: [
      {
        label: "Role",
        value: "Lead Backend Developer · Sep 2022 – Dec 2023",
      },
      {
        label: "Platform context",
        value: "Flagship application within a broader platform that also includes ACT and Rubicon",
      },
      { label: "Frontend", value: "Angular and Vue.js (module-level framework mapping unconfirmed)" },
    ],
    selectedWork: [
      "Built Spring Boot microservices for Status Manager, Task Actions, Dashboard, Advanced Search, Application Configuration, and Routing",
      "Used Kafka for messaging, OpenFeign for service communication, Hystrix for fault tolerance, and Zipkin for distributed tracing",
      "Used Elasticsearch for search; worked with Oracle and Couchbase for data needs",
      "Implemented the frontend using Angular and Vue.js",
      "Secured access with Spring Security; deployed and operated services on Kubernetes",
      "Served as Agile Leader, coordinating PI/Sprint planning, grooming, and cross-team work planning",
    ],
    outcomeNote:
      "Program outcomes reported in supplied notes: an 80% increase in digital-channel revenue and a 70% reduction in task completion time. Measurement period, source, and individual-vs-team attribution are pending confirmation — shown here as reported program outcomes, not a sole individual result.",
    caseStudy: [
      {
        heading: "System design",
        body: [
          "FLIGHTDECK is composed of Spring Boot microservices — Status Manager, Task Actions, Dashboard, Advanced Search, Application Configuration, and Routing — that together form the primary GUI for the underlying WORKMATE task store.",
          "Incoming orders are evaluated against business rules and can be routed automatically or handled manually, giving associates a secure interface to find, process, and track authorized work.",
        ],
      },
      {
        heading: "Reliability & observability",
        body: [
          "Service-to-service communication used OpenFeign, with Hystrix providing fault tolerance and Zipkin providing distributed tracing across the microservice set.",
          "Kafka handled messaging between services, and Elasticsearch powered search across task data, with Oracle and Couchbase used for data storage needs.",
        ],
      },
      {
        heading: "Delivery & leadership",
        body: [
          "Spring Security secured access, and services were deployed and operated on Kubernetes.",
          "Beyond the engineering contribution, I served as Agile Leader for the team — coordinating PI/Sprint planning, grooming, and cross-team work planning.",
        ],
      },
      {
        heading: "Outcomes (reported)",
        body: [
          "Supplied program notes report an 80% increase in digital-channel revenue and a 70% reduction in task completion time. These are shown as reported program outcomes rather than a verified, solely-individual result — measurement period and attribution are pending confirmation before being stated more definitively.",
        ],
      },
    ],
  },
  {
    slug: "workflow-incident-investigator",
    title: "Workflow Incident Investigator",
    type: "personal",
    typeLabel: "Personal portfolio project",
    cardSummary:
      "An AI assistant that reads the evidence from a fictional workflow-engine incident (alerts, metrics, logs, deployments, a runbook) and returns an evidence-cited diagnosis with ranked competing hypotheses, stated unknowns, and read-only next steps. It never performs remediation. Built twice — once in Java and once in Python — to compare the two frameworks, with a shared demo UI and a rule-based evaluation.",
    resultStat: "12 of 12 scenario runs correct across both the Java and Python implementations",
    designSummary:
      "Incident evidence is scattered, and the deployment that happens to land nearby is easy to blame. This project uses a bounded workflow of narrow roles rather than free-form agents: validate → triage → runtime analyst ‖ change analyst (parallel) → verifier → deterministic checks. Each role is a single model call with a typed JSON output and no tools. Model output is treated as untrusted — code rejects unknown evidence IDs, uncited facts, out-of-range confidence, non-read-only recommendations, and any claim that an action was taken.",
    stack: [
      "Java 21",
      "Spring Boot 4",
      "Spring AI",
      "Python",
      "LangGraph",
      "LangSmith",
      "Amazon Bedrock",
      "Claude",
    ],
    facts: [
      {
        label: "Implementations",
        value: "Java (Spring Boot 4, Spring AI) and Python (LangGraph, LangSmith) — same prompts, scenarios, and scoring",
      },
      { label: "Evaluation", value: "6 fictional scenarios scored on 9 rule-based dimensions" },
      { label: "Testing", value: "43 Java + 26 Python tests against a stubbed model — runs fully offline, no AWS required" },
      { label: "Model", value: "Claude Haiku 4.5 via Amazon Bedrock" },
      { label: "Speed", value: "~30–40s per investigation; all 6 scenarios in about 3 minutes" },
      { label: "Cost", value: "A few cents per full evaluation run" },
    ],
    implemented: [
      "Two implementations, one contract — Java (Spring Boot 4, Spring AI) and Python (LangGraph, LangSmith) sharing the same prompts, scenarios, and scoring",
      "Parallel agents — the runtime and change analysts run concurrently (virtual threads in Java; a fan-out/fan-in graph in Python), with tests proving they overlap",
      "Guardrails enforced in code, not prompts — citation checks, a read-only invariant, and no leaking of provider errors",
      "Evaluation harness — six scenarios (surge, config regression, DB saturation, retry storm, an under-determined case where the correct answer is \"I can't tell,\" and a trigger-plus-amplifier case) scored on nine rule-based dimensions",
      "Observability — per-step timing, token counts, and correlation IDs in Java; LangSmith traces and experiments in Python",
      "Shared demo UI — one page served by both backends, with clickable evidence chips, a timing view, a reveal-expected-answer button, and a side-by-side compare mode",
      "Tested offline — 43 Java and 26 Python tests against a stubbed model, so no AWS access is needed to run the test suite",
    ],
    outcomeNote:
      "Both implementations picked the correct cause in 12 of 12 runs (6 scenarios × 2), using Claude Haiku 4.5. Mean scores on the nine-dimension rubric: Java 0.98, Python 0.93 — the gap is most likely model variance rather than a framework effect, since the prompts were identical and it was one run each. Speed was about 30–40 seconds per investigation (analysts 7–12s in parallel, verifier 18–25s); all six scenarios took about 3 minutes. Cost was a few cents per full evaluation.",
    caseStudy: [
      {
        heading: "Design",
        body: [
          "Incident evidence is scattered, and the deployment that happens to land nearby in time is easy to blame. Rather than a free-form agent, the system runs a bounded workflow of narrow roles: validate → triage → runtime analyst ‖ change analyst (in parallel) → verifier → deterministic checks.",
          "Each role is a single model call with a typed JSON output and no tools of its own. Model output is treated as untrusted: application code rejects unknown evidence IDs, uncited facts, out-of-range confidence scores, any recommendation that isn't read-only, and any claim that an action was already taken.",
        ],
      },
      {
        heading: "Evaluation & observability",
        body: [
          "Six fictional scenarios — a load surge, a configuration regression, database saturation, a retry storm, a deliberately under-determined case where the correct answer is \"I can't tell,\" and a trigger-plus-amplifier case — are scored against hidden expected answers on nine rule-based dimensions, so the project measures whether the system identifies the right cause rather than just rewording one diagnosis.",
          "The Java build logs per-step timing, token counts, and correlation IDs; the Python build uses LangSmith traces and experiments. A shared demo UI serves both backends with clickable evidence chips, a timing view, a reveal-expected-answer button, and a side-by-side compare mode.",
          "The whole test suite — 43 Java tests and 26 Python tests — runs against a stubbed model, so it can be verified fully offline without any AWS access.",
        ],
      },
      {
        heading: "Challenges & what I learned",
        body: [
          "A perfect score hid real flaws. The first version of the rubric scored 1.00, but reading the actual generated answers surfaced a wrong claim — a deployment described as happening \"3 minutes after onset\" when it was actually 3 minutes after the alert fired and 25 minutes after onset. The fix was an application-computed sorted timeline, explicit rules distinguishing alert time from onset time from change time, and a new check that a runner-up hypothesis isn't scored suspiciously close to the winner.",
          "Test data can be the bug. The model correctly flagged that the fictional evidence itself had a one-minute contradiction and a missing \"jobs per start\" figure — so the evidence got fixed, not the model.",
          "Most of the friction was infrastructure, not AI: Bedrock access-request forms, expired login sessions, API keys, and a shell `NAME= value` trap that silently loaded a key as empty.",
          "Treating evidence as data — never as instructions — and treating model output as untrusted until verified shaped the whole design, not just the guardrail checks.",
        ],
      },
    ],
    repoUrl: "https://github.com/sivascorpio94/Workflow-Incident-Investigator",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
