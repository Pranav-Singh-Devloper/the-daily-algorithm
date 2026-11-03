export const PERSON = {
  name: "Alexander Sterling",
  shortName: "A. Sterling",
  role: "Student · Aspiring AI/ML Engineer",
  school: "Department of Computer Science & AI, Stanford University",
  email: "alexander.sterling@stanford.edu",
  github: "https://github.com/asterling-ai",
  linkedin: "https://linkedin.com/in/alexander-sterling-ai",
  scholar: "https://scholar.google.com/citations?user=asterling",
  portrait:
    "https://images.unsplash.com/photo-1684607776189-24a70a10a804?crop=entropy&cs=srgb&fm=jpg&q=80&w=1200",
};

export const TICKER_ITEMS = [
  "EXTRA! EXTRA! READ ALL ABOUT IT",
  "AI/ML STUDENT ENGINEER SEEKS SUMMER 2026 INTERNSHIP",
  "EXCEL IN PYTORCH, RAG & DEEP LEARNING",
  "LATE EDITION — HOT OFF THE GRADIENT DESCENT PRESS",
  "TOP OF THE BENCHMARK LEADERBOARD",
  "NO STORY TOO SMALL, NO TENSOR TOO LARGE",
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
  ["FIELD", "Machine Learning · Generative AI · Deep Learning"],
  ["DEGREE", "B.S. Computer Science & AI, Class of 2026"],
  ["FOCUS", "LLM systems, retrieval, efficient inference"],
  ["STATUS", "OPEN TO SUMMER 2026 INTERNSHIPS"],
];

export const EXPERIENCES = [
  {
    role: "AI Research Assistant",
    org: "Stanford AI Lab (SAIL)",
    period: "SEPT 2025 — PRESENT",
    location: "PALO ALTO, CA",
    summary:
      "Pioneered context-window optimisation for long-form transformer inference. Co-authored a paper accepted at a NeurIPS workshop; reduced KV-cache memory overhead by 34% using custom CUDA kernels.",
  },
  {
    role: "Machine Learning Intern",
    org: "Vector Research Labs",
    period: "JUNE 2025 — AUG 2025",
    location: "SAN FRANCISCO, CA",
    summary:
      "Engineered a multi-modal retrieval pipeline serving 500k daily queries. Implemented hybrid dense–sparse vector search with Qdrant and SentenceTransformers, lifting MRR@10 by 18.5%.",
  },
  {
    role: "Lead Computer Vision Fellow",
    org: "Open Source AI Collective",
    period: "JAN 2025 — MAY 2025",
    location: "REMOTE",
    summary:
      "Built real-time edge-detection and segmentation models optimised for TensorRT deployment on embedded micro-controllers, shipping inference at under 20ms per frame.",
  },
];

export const PROJECTS = [
  {
    title: "Project NeuroStream: Real-Time Speculative Decoding Engine",
    category: "FEATURE ARTICLE · LLM INFERENCE",
    summary:
      "A high-throughput speculative decoding framework built with PyTorch and C++ CUDA extensions, achieving a 2.8x speedup on Llama-3 70B inference while preserving output fidelity. Drafter and verifier models run in a pipelined KV-cache regime designed for production serving stacks.",
    image:
      "https://images.unsplash.com/photo-1664854953181-b12e6dda8b7c?crop=entropy&cs=srgb&fm=jpg&q=80&w=1600",
    tags: ["PyTorch", "CUDA", "LLMs", "Speculative Decoding", "C++"],
    metrics: "2.8x Latency Reduction · 99.4% Output Fidelity",
    featured: true,
  },
  {
    title: "GraphRAG-Enterprise: Knowledge-Graph Augmented Generation",
    category: "INVESTIGATIVE DISPATCH · RAG SYSTEMS",
    summary:
      "A hybrid entity-extraction and graph-embedding pipeline connecting Neo4j with LangChain for complex multi-hop reasoning over technical documents.",
    image:
      "https://images.unsplash.com/photo-1573528839587-71883908b252?crop=entropy&cs=srgb&fm=jpg&q=80&w=1200",
    tags: ["Python", "Neo4j", "LangChain", "Qdrant", "FastAPI"],
    metrics: "89.2% Retrieval Accuracy · Multi-Hop Q&A",
  },
  {
    title: "Whisper-SubEdge: Lightweight On-Device Speech Recognition",
    category: "SPECIAL REPORT · EDGE ML",
    summary:
      "A quantised 8-bit Whisper transformer running seamlessly on WebAssembly and Apple Silicon via CoreML — speech-to-text where the cloud cannot follow.",
    image:
      "https://images.unsplash.com/photo-1647003439039-d90d730f2773?crop=entropy&cs=srgb&fm=jpg&q=80&w=1200",
    tags: ["CoreML", "ONNX", "WebAssembly", "C++", "Whisper"],
    metrics: "14MB Binary · <45ms Real-Time Latency",
  },
];

export const ACHIEVEMENTS = [
  ["1ST PLACE — STANFORD AI HACKATHON 2025", "Out of 120 teams; built a live multi-agent research assistant in 36 hours."],
  ["NEURIPS WORKSHOP CO-AUTHOR", "\u201CEfficient Context Distillation in LLMs\u201D — accepted, 2025."],
  ["DEAN'S HONOUR LIST", "Stanford School of Engineering, 2023–2026, every quarter to date."],
  ["NSF UNDERGRADUATE RESEARCH SCHOLAR", "National Science Foundation funded research stipend."],
];

export const SKILLS = [
  {
    category: "Core Frameworks & Architectures",
    skills: ["PyTorch", "TensorFlow", "Transformers (HuggingFace)", "vLLM", "DeepSpeed", "LangChain", "LlamaIndex"],
  },
  {
    category: "Languages & Systems",
    skills: ["Python (Advanced)", "C++ / CUDA", "SQL", "TypeScript / React", "Linux / Bash", "Git / Docker"],
  },
  {
    category: "Vector & Data Infrastructure",
    skills: ["Qdrant", "Pinecone", "Neo4j", "PostgreSQL (pgvector)", "Redis", "Ray Distributed"],
  },
];

export const ABOUT_BODY = [
  "There is a moment, somewhere between the loss curve finally flattening and the eval set finally breaking, when an engineer knows the model is going to ship. This correspondent has been chasing that moment across classrooms, laboratories and hackathon floors for the better part of three years.",
  "A student of Computer Science and Artificial Intelligence, this paper's subject specialises in Large Language Models, Generative AI and distributed model training — combining deep theoretical foundations in optimisation and probability with hands-on proficiency in PyTorch, CUDA and modern RAG architectures. The work ranges from squeezing KV-caches into submission to building retrieval pipelines that answer before you finish asking.",
  "The stated ambition, printed here for the record: to join an AI firm where the models are ambitious, the benchmarks are honest, and the interns are trusted with real GPUs. Readers with positions to fill are invited to turn to the Letters column.",
];
