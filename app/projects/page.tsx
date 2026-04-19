import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Bot, ChartLine, Shield } from "lucide-react";
import { PublicSiteShell } from "@/components/public/site-shell";

const categories = [
  "All Projects",
  "AI/ML",
  "Full Stack",
  "Automation",
  "Data Engineering",
];

const leadProjects = [
  {
    title: "AI Interviewer (Software Interview Assistant)",
    tag: "AI/ML",
    summary:
      "Built an AI interviewer that generates and evaluates technical and behavioral questions from Excel inputs using LangChain, LLMs, and RAG, reducing manual screening effort by 60%.",
    links: ["Impact Overview", "Architecture Walkthrough"],
    tech: ["LangChain", "LLMs", "RAG", "Docker", "Cloud Run", "CloudSQL"],
  },
  {
    title: "FinWise (AI Personal Finance Assistant)",
    tag: "Full Stack",
    summary:
      "Developed an AI-driven finance platform using Next.js, Python, and PostgreSQL with OCR receipt capture and budgeting insights for 500+ users.",
    links: ["GitHub", "Outcome Summary"],
    tech: ["Next.js", "Python", "PostgreSQL", "OCR", "LangChain", "Gemini API"],
  },
];

type CompactProject = {
  title: string;
  tag: string;
  summary: string;
  points: string[];
  Icon: LucideIcon;
};

const compactProjects: CompactProject[] = [
  {
    title: "Legal Document Demystifier",
    tag: "AI/ML",
    summary:
      "Built an AI system to simplify legal documents using FastAPI, RAG, and Google Gemini, generating structured summaries with 92% accuracy.",
    points: ["92% summary accuracy", "Secure Dockerized backend", "Real-time document Q&A"],
    Icon: Bot,
  },
  {
    title: "Automatic Parking System using Reinforcement Learning",
    tag: "Automation",
    summary:
      "Simulation project in Unity with C# using reinforcement learning to automate parking behavior across dynamic scenarios.",
    points: ["Reinforcement learning policy", "Unity simulation workflows", "Autonomous decision loop"],
    Icon: ChartLine,
  },
];

export default function ProjectsPage() {
  return (
    <PublicSiteShell activePath="/projects">
      <section className="section-wrap section-space page-hero pjv2-hero">
        <p className="eyebrow">Selected Works</p>
        <h1 className="display-title pjv2-title">
          Selected Works
          <span>.</span>
        </h1>
        <p className="section-lead">
          A curation of AI and software projects focused on measurable business impact,
          scalable deployment, and production-ready execution.
        </p>
      </section>

      <section className="section-wrap section-space pjv2-shell">
        <div className="pjv2-filters" role="tablist" aria-label="Project categories">
          {categories.map((item, index) => (
            <button
              key={item}
              className={index === 0 ? "pjv2-filter-active" : "pjv2-filter"}
              type="button"
              role="tab"
              aria-selected={index === 0}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="pjv2-grid">
          <article className="pjv2-card pjv2-card-main">
            <div className="pjv2-visual pjv2-visual-neural" aria-hidden="true" />

            <div className="pjv2-card-body">
              <div className="pjv2-chip-row">
                <span className="pjv2-tag">{leadProjects[0]?.tag}</span>
                <span className="pjv2-stable">
                  <span aria-hidden="true" /> Stable Release
                </span>
              </div>

              <h2>{leadProjects[0]?.title}</h2>
              <p>{leadProjects[0]?.summary}</p>

              <div className="pjv2-tech-row">
                {leadProjects[0]?.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              <div className="pjv2-link-row">
                {leadProjects[0]?.links.map((link) => (
                  <a key={link} href="/contact#inquiry">
                    {link}
                    <ArrowRight size={16} strokeWidth={2.2} />
                  </a>
                ))}
              </div>
            </div>
          </article>

          <article className="pjv2-card pjv2-card-side">
            <div className="pjv2-visual pjv2-visual-auto" aria-hidden="true" />

            <div className="pjv2-card-body">
              <span className="pjv2-tag">{leadProjects[1]?.tag}</span>
              <h3>{leadProjects[1]?.title}</h3>
              <p>{leadProjects[1]?.summary}</p>

              <div className="pjv2-tech-row">
                {leadProjects[1]?.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              <a
                href="https://github.com/anirudh7371/FinWise-AI-Powered-Personal-Finance-Assistant-Tip-Generator"
                className="pjv2-inline-link"
                target="_blank"
                rel="noreferrer"
              >
                View GitHub
                <ArrowRight size={15} strokeWidth={2.2} />
              </a>
            </div>
          </article>

          {compactProjects.map((project, index) => (
            <article key={project.title} className="pjv2-card pjv2-card-wide">
              <div>
                <span className="pjv2-tag">{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>

                <div className="pjv2-check-grid">
                  {project.points.map((point) => (
                    <p key={point}>
                      <Shield size={15} strokeWidth={2.1} />
                      {point}
                    </p>
                  ))}
                </div>

                <div className="pjv2-link-row">
                  {(index === 0 ? ["Case Study", "Live Preview"] : ["Case Study", "GitHub"]).map(
                    (link) => (
                      <a key={link} href="/contact#inquiry">
                        {link}
                      </a>
                    ),
                  )}
                </div>
              </div>

              <div
                className={`pjv2-side-art ${index === 0 ? "pjv2-side-art-fin" : "pjv2-side-art-lex"}`}
                aria-hidden="true"
              >
                <project.Icon size={44} strokeWidth={1.8} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap section-space pjv2-callout">
        <div>
          <h2 className="section-title">Additional Repository Highlights</h2>
          <p className="section-lead">
            Also worked on Paper-Reviewer, Customer-DataManagement, and LegalMind AI,
            with focused repository tracks for AI-assisted review, backend data
            operations, and legal-domain intelligence.
          </p>
        </div>

        <Link href="/contact" className="btn btn-primary pjv2-callout-btn">
          Request Full Project Deck
        </Link>
      </section>
    </PublicSiteShell>
  );
}
