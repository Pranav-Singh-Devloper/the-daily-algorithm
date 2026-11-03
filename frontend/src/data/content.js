export const PERSON = {
  name: "Pranav Singh",
  shortName: "P. Singh",
  role: "Student · Aspiring AI/ML Engineer",
  school: "Newton School of Technology, Rishihood University — B.Tech CS & AI, Class of 2028",
  email: "pranav.singh2024@nst.rishihood.edu.in",
  phone: "+91 7063992027",
  github: "#",
  linkedin: "#",
  portrait:
    "https://images.unsplash.com/photo-1684607776189-24a70a10a804?crop=entropy&cs=srgb&fm=jpg&q=80&w=1200",
};

export const TICKER_ITEMS = [
  "EXTRA! EXTRA! READ ALL ABOUT IT",
  "AI/ML STUDENT ENGINEER SEEKS INTERNSHIP IN ML, GENAI & DEEP LEARNING",
  "ARCHITECTED A 19-AGENT MEDICAL AI SYSTEM IN LANGGRAPH",
  "WINNER — DECODE 2025 HACKATHON",
  "PRODUCTION RAG ON GROQ, AWS BEDROCK & GEMINI",
  "250+ PROBLEMS SOLVED — NO TENSOR TOO LARGE",
];

export const NAV_LINKS = [
  { id: "front-page", label: "Front Page" },
  { id: "dispatches", label: "Dispatches" },
  { id: "features", label: "Features" },
  { id: "honours", label: "Honours" },
  { id: "almanac", label: "Almanac" },
  { id: "letters", label: "Letters" },
];

export const AT_A_GLANCE = [
  ["FIELD", "LLM Engineering · Multi-Agent Systems · RAG"],
  ["DEGREE", "B.Tech CS & AI, Newton School of Technology, 2024–2028"],
  ["PROOF OF WORK", "19-agent medical AI system · production RAG · 250+ problems solved"],
  ["STATUS", "OPEN TO AI/ML & GENAI INTERNSHIPS"],
];

export const EXPERIENCES = [
  {
    role: "LLM Engineering Intern",
    org: "Slay Health, Delhi",
    period: "MAY 2026 — PRESENT",
    location: "DELHI",
    summary:
      "Architected a hierarchical 19-agent medical AI system in LangGraph with fan-out/fan-in orchestration and CoT/ToT reasoning. Built production RAG pipelines with hybrid BGE + BM25 retrieval fused via Reciprocal Rank Fusion; integrated Groq, OpenRouter, AWS Bedrock and Gemini via FastAPI; ran MedGemma VLM locally via 4-bit quantization; and shipped a WhatsApp RAG chatbot on Supabase + pgvector at ~300ms time-to-first-token.",
  },
  {
    role: "AI/ML Development Intern",
    org: "The MA Studio",
    period: "MAY 2025 — JULY 2025",
    location: "REMOTE",
    summary:
      "Architected a hybrid retrieval system using MongoDB Atlas Search and BM25 to significantly improve context retrieval across LLM-powered workflows. Built asynchronous FastAPI REST APIs on OpenRouter and Together AI, restructured database schemas and migrations, secured endpoints with Supabase Auth and JWT, and supported deployment on Railway and Vercel.",
  },
];

export const PROJECTS = [
  {
    title: "Engram: Persistent Memory Engine for AI Agents",
    category: "FEATURE ARTICLE · AGENTIC MEMORY",
    summary:
      "A long-term memory engine for AI agents in TypeScript on Postgres plus pgvector, storing facts as immutable bitemporal versions with rule-first conflict resolution and an LLM-based adjudication layer, exposed through 6 MCP tools over stdio and HTTP. Hybrid recall combines fact and episode vectors, full-text search and entity-graph hops, fused via Reciprocal Rank Fusion, with reversible decay and nightly consolidation.",
    image:
      "https://images.unsplash.com/photo-1664854953181-b12e6dda8b7c?crop=entropy&cs=srgb&fm=jpg&q=80&w=1600",
    tags: ["TypeScript", "PostgreSQL", "pgvector", "MCP", "RRF"],
    metrics: "45% LongMemEval-S · 640 Tests · 6 MCP Tools",
    featured: true,
  },
  {
    title: "Nexus: Autonomous Market Intelligence",
    category: "INVESTIGATIVE DISPATCH · AGENTIC SAAS",
    summary:
      "An agentic market intelligence platform implementing a Plan-Search-Critique workflow that combines hybrid vector search with self-correcting research logic, built as microservices with dual Google/JWT authentication for a production-style AI SaaS product.",
    image:
      "https://images.unsplash.com/photo-1573528839587-71883908b252?crop=entropy&cs=srgb&fm=jpg&q=80&w=1200",
    tags: ["LangGraph", "Llama 3.3", "Groq", "Tavily", "Neon pgvector"],
    metrics: "React · Node.js · FastAPI · Dual Auth",
  },
  {
    title: "Movie Sentiment Analyser",
    category: "SPECIAL REPORT · DEEP LEARNING",
    summary:
      "An end-to-end IMDb sentiment analysis app in TensorFlow 2.15 and Keras, using Text Vectorization, Embedding and GlobalAveragePooling1D layers over TensorFlow Datasets, with live confidence charts in Streamlit.",
    image:
      "https://images.unsplash.com/photo-1647003439039-d90d730f2773?crop=entropy&cs=srgb&fm=jpg&q=80&w=1200",
    tags: ["TensorFlow", "Keras", "Streamlit", "TF Datasets"],
    metrics: "~88% Test Accuracy · Live Confidence Charts",
  },
];

export const ACHIEVEMENTS = [
  ["WINNER — DECODE 2025 HACKATHON", "Built an optimised search algorithm for querying open-source GitHub repositories."],
  ["REPRESENTED HARYANA — NATIONAL YOUTH FESTIVAL", "Top 3,000 of 30 lakh; pitched a data-analytics solution for agri-climate resilience."],
  ["RUNNER-UP — VISUAL VORTEX HACKATHON (GDG)", "High-fidelity Figma pet-adoption prototype; Secretary, GDG, Rishihood University."],
  ["UC SAN DIEGO — DATA STRUCTURES CERTIFIED", "Plus SCALER C++ Essentials certification, 2024."],
];

export const SKILLS = [
  {
    category: "AI/ML & LLM Stack",
    skills: ["LangGraph", "LangChain", "RAG · MCP", "Multi-Agent Systems", "Hugging Face", "TensorFlow / Keras", "PyTorch", "Generative AI"],
  },
  {
    category: "Languages & Frameworks",
    skills: ["Python", "C++", "TypeScript / JavaScript", "SQL", "FastAPI", "React / Next.js", "Node.js", "Tailwind CSS"],
  },
  {
    category: "Platforms, Data & Cloud",
    skills: ["Gemini / OpenAI APIs", "Groq / OpenRouter", "AWS Bedrock", "PostgreSQL / pgvector", "Supabase / MongoDB", "n8n", "Railway / Vercel", "Git & GitHub"],
  },
];

export const ABOUT_BODY = [
  "There is a moment, somewhere between the loss curve finally flattening and the eval set finally breaking, when an engineer knows the model is going to ship. This correspondent has been chasing that moment across startup war-rooms, hackathon floors and late-night terminal sessions.",
  "A Computer Science & Artificial Intelligence undergraduate at Newton School of Technology, Rishihood University (Class of 2028), this paper's subject specialises in LLM engineering, multi-agent systems and Retrieval-Augmented Generation — architecting a 19-agent medical AI system in LangGraph, shipping production RAG pipelines across Groq, AWS Bedrock and Gemini, and holding a competitive-programming foundation of 250+ solved problems.",
  "The stated ambition, printed here for the record: to join an AI firm where the agents are ambitious, the benchmarks are honest, and the interns ship to production. Readers with positions to fill are invited to turn to the Letters column.",
];
