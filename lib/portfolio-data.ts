import {
  type AchievementSeed,
  type ExperienceSeed,
  type ProfileSeed,
  type ProjectSeed,
  type ServiceSeed,
  type SkillSeed,
} from "@/types/domain";

export const profileSeed: ProfileSeed = {
  headline: "Anirudh",
  subtitle: "Software Developer and AI/ML Engineer",
  heroDescription:
    "A software developer with a strong focus on AI/ML and full-stack development. I build intelligent, scalable applications using Python, Flask, LangChain, and Next.js with hands-on experience in LLMs, OCR, and data-driven systems.",
  aboutSummary:
    "I am a passionate AI/ML Engineer and Full-Stack Developer currently pursuing B.Tech in Computer Science at VIT Vellore.",
  aboutDetails:
    "I build practical intelligent systems that solve real-world problems, from AI interview assistants and personal finance copilots to legal-document intelligence platforms.",
  location: "Bengaluru, Karnataka, India",
  email: "anirudh7371@gmail.com",
  phone: "+91 82952 50473",
  resumeUrl:
    "https://drive.google.com/file/d/1T4KQkkQTMPycl9Mj286_JbF44ar6qhZN/view?usp=share_link",
  ctaPrimaryLabel: "View Projects",
  ctaPrimaryHref: "#projects",
  ctaSecondaryLabel: "Connect on LinkedIn",
  ctaSecondaryHref: "https://www.linkedin.com/in/anirudh2511/",
};

export const skillsSeed: SkillSeed[] = [
  {
    name: "Python",
    category: "Languages",
    level: 95,
    displayOrder: 1,
  },
  { name: "SQL", category: "Languages", level: 90, displayOrder: 2 },
  {
    name: "JavaScript",
    category: "Languages",
    level: 88,
    displayOrder: 3,
  },
  { name: "HTML/CSS", category: "Languages", level: 87, displayOrder: 4 },
  {
    name: "Node.js",
    category: "Backend and Web",
    level: 84,
    displayOrder: 5,
  },
  { name: "React.js", category: "Backend and Web", level: 86, displayOrder: 6 },
  { name: "Flask", category: "Backend and Web", level: 89, displayOrder: 7 },
  {
    name: "REST APIs",
    category: "Backend and Web",
    level: 90,
    displayOrder: 8,
  },
  { name: "Jest", category: "Testing", level: 82, displayOrder: 9 },
  { name: "Unit Testing", category: "Testing", level: 84, displayOrder: 10 },
  {
    name: "Integration Testing",
    category: "Testing",
    level: 82,
    displayOrder: 11,
  },
  { name: "NLP", category: "AI/ML", level: 91, displayOrder: 12 },
  { name: "Deep Learning", category: "AI/ML", level: 89, displayOrder: 13 },
  { name: "Generative AI", category: "AI/ML", level: 90, displayOrder: 14 },
  { name: "Transformers", category: "AI/ML", level: 88, displayOrder: 15 },
  { name: "RAG", category: "AI/ML", level: 92, displayOrder: 16 },
  { name: "LLM Fine-Tuning", category: "AI/ML", level: 85, displayOrder: 17 },
  { name: "TensorFlow", category: "AI/ML", level: 86, displayOrder: 18 },
  { name: "Scikit-learn", category: "AI/ML", level: 88, displayOrder: 19 },
  { name: "OpenCV", category: "AI/ML", level: 84, displayOrder: 20 },
  { name: "Hugging Face", category: "AI/ML", level: 87, displayOrder: 21 },
  { name: "LangChain", category: "AI/ML", level: 91, displayOrder: 22 },
  { name: "MySQL", category: "Databases and Tools", level: 86, displayOrder: 23 },
  { name: "MongoDB", category: "Databases and Tools", level: 83, displayOrder: 24 },
  { name: "Docker", category: "Databases and Tools", level: 84, displayOrder: 25 },
  { name: "Git", category: "Databases and Tools", level: 90, displayOrder: 26 },
  { name: "Postman", category: "Databases and Tools", level: 88, displayOrder: 27 },
  { name: "Liquibase", category: "Databases and Tools", level: 76, displayOrder: 28 },
  {
    name: "Bitbucket/Confluence",
    category: "Databases and Tools",
    level: 80,
    displayOrder: 29,
  },
  {
    name: "Data Structures and Algorithms",
    category: "Core Computer Science",
    level: 89,
    displayOrder: 30,
  },
  { name: "OOP", category: "Core Computer Science", level: 90, displayOrder: 31 },
  { name: "DBMS", category: "Core Computer Science", level: 88, displayOrder: 32 },
  {
    name: "Operating Systems",
    category: "Core Computer Science",
    level: 84,
    displayOrder: 33,
  },
  {
    name: "Computer Networks",
    category: "Core Computer Science",
    level: 83,
    displayOrder: 34,
  },
];

export const experiencesSeed: ExperienceSeed[] = [
  {
    title: "Software Engineer Intern",
    organization: "Kulicke & Soffa Industries (via ASM Technologies Ltd)",
    startDate: "2025-12-01",
    endDate: null,
    summary:
      "Accelerating delivery of production-grade enhancements for a global enterprise web platform with rapid iteration and stakeholder alignment.",
    achievements: [
      "Improved release reliability and system stability across UAT/Production and multi-region environments by resolving a critical production defect.",
      "Strengthened quality with Jest tests to reach approximately 72% UI statement coverage.",
      "Collaborate directly with US-based senior manager Ronny Abraham for execution and reporting.",
    ],
    displayOrder: 1,
  },
  {
    title: "AI Engineer Intern",
    organization: "CodeBiceps",
    startDate: "2025-05-01",
    endDate: "2025-07-31",
    summary:
      "Designed AI pipeline workflows using RAG and NLP to convert Lighthouse reports into prioritized optimization insights.",
    achievements: [
      "Resolved over 30 issues across 5+ platforms within Agile sprints.",
      "Built and deployed Flask REST APIs integrating Google Gemini with retrieval workflows on Azure.",
      "Improved frontend load efficiency by 25% through AI-guided optimization recommendations.",
    ],
    displayOrder: 2,
  },
  {
    title: "Machine Learning and AI Developer Intern",
    organization: "KuppiSmart Solutions Pvt Ltd",
    startDate: "2024-05-01",
    endDate: "2024-06-30",
    summary:
      "Contributed to machine learning and AI development workflows for practical product applications.",
    achievements: [
      "Constructed deep learning pipelines for livestock condition classification.",
      "Raised prediction accuracy by 25 percent while reducing training time by 35 percent.",
      "Designed Tableau dashboards for real-time agricultural market insights.",
      "Enabled data-driven decisions for more than 200 users on the platform.",
    ],
    displayOrder: 2,
  },
  {
    title: "AI/ML Mentor and Speaker",
    organization: "VIT Vellore",
    startDate: "2024-01-01",
    endDate: null,
    summary:
      "Mentored students and led AI/ML workshops and hackathon activities.",
    achievements: [
      "Led the Data Alchemy workshop during Gravitas Tech Week.",
      "Taught machine learning concepts and advanced techniques to over 150 students.",
      "Spearheaded execution of VIT University's Algo Arena hackathon.",
      "Mentored participants through architecture and debugging sessions.",
    ],
    displayOrder: 3,
  },
];

export const projectsSeed: ProjectSeed[] = [
  {
    title: "AI Interviewer (Software Interview Assistant)",
    slug: "ai-interviewer-software-interview-assistant",
    summary:
      "AI interviewer that reduced manual screening effort by 60% through automated interview generation and evaluation.",
    description:
      "Built a software interview assistant that generates and evaluates technical and behavioral questions from Excel inputs using LangChain, LLMs, and RAG. Containerized with Docker and deployed on Google Cloud Run with CloudSQL for concurrent usage across 100+ sessions.",
    githubUrl: "https://github.com/anirudh7371",
    liveUrl: null,
    featured: true,
    status: "PUBLISHED",
    displayOrder: 1,
    tech: ["LangChain", "LLMs", "RAG", "Docker", "Google Cloud Run", "CloudSQL"],
  },
  {
    title: "FinWise (AI Personal Finance Assistant)",
    slug: "finwise-ai-personal-finance-assistant",
    summary:
      "AI-powered finance platform with personalized recommendations that improved user engagement by 85%.",
    description:
      "Developed an AI-driven finance platform using Next.js, Python, and PostgreSQL with expense tracking, OCR receipt capture, and automated budgeting insights that supported 500+ users.",
    githubUrl:
      "https://github.com/anirudh7371/FinWise-AI-Powered-Personal-Finance-Assistant-Tip-Generator",
    liveUrl: null,
    featured: true,
    status: "PUBLISHED",
    displayOrder: 2,
    tech: ["Next.js", "Python", "PostgreSQL", "LangChain", "Gemini API", "OCR"],
  },
  {
    title: "Legal Document Demystifier",
    slug: "legal-document-demystifier",
    summary:
      "AI legal simplification system generating structured summaries with 92% accuracy.",
    description:
      "Built an AI system using FastAPI, RAG, and Google Gemini to simplify legal documents and provide structured outputs. Deployed a secure Dockerized backend with Firebase Auth and Firestore for real-time document Q&A.",
    githubUrl: "https://github.com/anirudh7371",
    liveUrl: null,
    featured: true,
    status: "PUBLISHED",
    displayOrder: 3,
    tech: ["FastAPI", "RAG", "Google Gemini", "Docker", "Firebase Auth", "Firestore"],
  },
  {
    title: "Paper-Reviewer",
    slug: "paper-reviewer",
    summary:
      "Repository focused on AI-assisted or automated review workflows for academic and technical papers.",
    description:
      "Built as a dedicated codebase for structured paper review automation and AI-assisted evaluation support, emphasizing reproducible review workflows.",
    githubUrl: "https://github.com/anirudh7371/Paper-Reviewer",
    liveUrl: null,
    featured: false,
    status: "PUBLISHED",
    displayOrder: 4,
    tech: ["Python", "AI Evaluation", "NLP", "Automation"],
  },
  {
    title: "Customer-DataManagement",
    slug: "customer-data-management",
    summary:
      "Backend and data engineering project for organizing, managing, and querying customer datasets.",
    description:
      "Focused on scalable data handling patterns for customer records with maintainable query workflows and reliable backend abstractions.",
    githubUrl: "https://github.com/anirudh7371/Customer-DataManagement",
    liveUrl: null,
    featured: false,
    status: "PUBLISHED",
    displayOrder: 5,
    tech: ["Backend", "Data Engineering", "APIs", "Database Querying"],
  },
  {
    title: "LegalMind AI",
    slug: "legalmind-ai",
    summary:
      "AI-driven legal analytics and summarization platform for legal professionals.",
    description:
      "Built as a legal intelligence codebase focused on analytics, summarization, and strategy support using retrieval-augmented AI workflows.",
    githubUrl: "https://github.com/anirudh7371/LegalMind-AI",
    liveUrl: null,
    featured: false,
    status: "PUBLISHED",
    displayOrder: 6,
    tech: ["AI", "Summarization", "RAG", "Legal Analytics"],
  },
  {
    title: "Automatic Parking System with Reinforcement Learning",
    slug: "automatic-parking-reinforcement-learning-unity",
    summary:
      "Simulation project in Unity using reinforcement learning for automated parking scenarios.",
    description:
      "Developed a C# simulation in Unity to train automated parking behavior through reinforcement learning across varied parking environments.",
    githubUrl:
      "https://github.com/anirudh7371/Automatic_Parking_System_using_ReinforcementLearning_with_Simulation_in_Unity",
    liveUrl: "https://drive.google.com/file/d/1KNuZn0s__RQFRLmdPLM1ncwvkyvCmBa8/view?pli=1",
    featured: true,
    status: "PUBLISHED",
    displayOrder: 7,
    tech: ["Reinforcement Learning", "ML-Agents", "PyTorch", "Unity", "C#"],
  },
];

export const servicesSeed: ServiceSeed[] = [
  {
    title: "Production Software Engineering",
    description:
      "Building and stabilizing enterprise-grade software workflows with dependable release quality and measurable engineering outcomes.",
    pricingModel: "Project-based or role-based",
    availability: "Open",
    displayOrder: 1,
  },
  {
    title: "AI and RAG Integration",
    description:
      "Designing practical NLP, RAG, and LLM-powered systems that convert complex inputs into high-value actions.",
    pricingModel: "Project-based",
    availability: "Open",
    displayOrder: 2,
  },
  {
    title: "Full-Stack Product Development",
    description:
      "Shipping complete products that combine Next.js interfaces, backend APIs, and AI components into production-ready user experiences.",
    pricingModel: "Retainer or milestone",
    availability: "Open",
    displayOrder: 3,
  },
];

export const achievementsSeed: AchievementSeed[] = [
  {
    title: "Winner - AI-ML Marvels Hackathon",
    detail: "First position among more than 500 participants at graVITas'23.",
  },
  {
    title: "Runner-up - DevJams Hackathon",
    detail: "Selected from over 200 teams at Google Developer Student Club.",
  },
  {
    title: "Top 10 Finalist - Code-a-thon",
    detail: "Top finalist among over 400 teams in Caterpillar Inc. competition.",
  },
  {
    title: "Competitive Programming",
    detail: "Solved 500+ problems with a 1500+ LeetCode contest rating.",
  },
  {
    title: "IBM Generative AI Certified",
    detail: "Completed IBM certification in Generative AI.",
  },
  {
    title: "Advanced Learning Algorithms Certified",
    detail: "Completed advanced coursework in modern machine learning algorithms.",
  },
];

export const contactSeed = {
  linkedin: "https://www.linkedin.com/in/anirudh2511/",
  github: "https://github.com/anirudh7371",
  leetcode: "https://leetcode.com/u/Anirudh7371/",
};
