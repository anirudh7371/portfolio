import Link from "next/link";
import { ArrowRight, Brain, Cloud, Network, Terminal } from "lucide-react";
import { PublicSiteShell } from "@/components/public/site-shell";

const aboutCards = [
  {
    title: "Enterprise Software Delivery",
    text: "Delivered production-grade enhancements for a global enterprise platform with faster iteration cycles and sharper stakeholder alignment.",
    Icon: Brain,
  },
  {
    title: "Applied AI Engineering",
    text: "Built RAG and NLP-driven systems that transform complex reports and documents into prioritized, actionable technical insights.",
    Icon: Terminal,
  },
];

const backendLevels = [
  { label: "Python", level: 95 },
  { label: "Node.js", level: 84 },
];

const featured = [
  {
    title: "AI Interviewer (Software Interview Assistant)",
    summary:
      "Generated and evaluated technical plus behavioral interviews from Excel inputs using LangChain, LLMs, and RAG, reducing manual screening effort by 60%.",
    chips: ["LangChain", "RAG", "Docker", "Cloud Run"],
  },
  {
    title: "FinWise (AI Personal Finance Assistant)",
    summary:
      "Built an AI-driven finance platform for 500+ users and improved engagement by 85% through personalized recommendations powered by LangChain and Gemini.",
    chips: ["Next.js", "Python", "PostgreSQL", "Gemini API"],
  },
];

const milestones = [
  {
    period: "Dec 2025 - Present",
    role: "Software Engineer Intern",
    company: "Kulicke & Soffa Industries (via ASM Technologies Ltd)",
    summary:
      "Accelerated delivery of production-grade enhancements for a global enterprise web platform by driving requirements alignment, fast iteration cycles, and stakeholder demos—improving usability and decision-making workflows.",
  },
  {
    period: "May 2025 - Jul 2025",
    role: "AI Engineer Intern",
    company: "CodeBiceps",
    summary:
      "Built RAG + NLP pipelines and Flask APIs with Gemini on Azure, resolving 30+ issues across 5+ platforms and improving frontend load efficiency by 25%.",
  },
  
];

export default function HomePage() {
  return (
    <PublicSiteShell activePath="/">
      <section className="section-wrap section-space page-hero hmv2-hero-shell">
        <div className="hmv2-hero-slice" aria-hidden="true" />

        <div className="hmv2-hero-grid">
          <div>
            <p className="hmv2-kicker">
              <span className="hmv2-kicker-dot" aria-hidden="true" />
              Available for high-impact innovation
            </p>

            <h1 className="display-title hmv2-title">
              Precision Engineering.
              <br />
              <span>Fluid Intelligence.</span>
            </h1>

            <p className="section-lead hmv2-lead">
              Software developer and AI/ML engineer specializing in high-performance
              backend systems and practical system architectures.
            </p>

            <div className="cta-row">
              <Link href="/projects" className="btn btn-primary">
                View Projects
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Hire Me
              </Link>
            </div>
          </div>

          <div className="hmv2-hero-visual" aria-hidden="true" />
        </div>
      </section>

      <section className="hmv2-about-band">
        <div className="section-wrap hmv2-about-grid">
          <article>
            <h2 className="section-title">Impact Focused Engineering</h2>
            <p className="section-lead">
              I prioritize measurable outcomes: faster releases, stronger reliability,
              and practical AI implementations that reduce manual effort and improve
              user experience at scale.
            </p>

            <div className="hmv2-metric-grid">
              <div>
                <strong>1+</strong>
                <span>Years experience</span>
              </div>
              <div>
                <strong>12+</strong>
                <span>AI/ML models</span>
              </div>
              <div>
                <strong>5+</strong>
                <span>Production Ready Systems Delivered</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Commitment to Precision</span>
              </div>
            </div>
          </article>

          <div className="hmv2-about-cards">
            {aboutCards.map((card) => (
              <article key={card.title} className="hmv2-about-card">
                <card.Icon size={30} strokeWidth={2} />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap section-space hmv2-arsenal-shell">
        <h2 className="section-title section-center">Technical Arsenal</h2>

        <div className="hmv2-arsenal-grid">
          <article className="hmv2-panel hmv2-panel-wide">
            <div className="hmv2-panel-head">
              <h3>AI/ML Engineering</h3>
              <span>Specialized</span>
            </div>

            <div className="chip-list">
              {[
                "NLP",
                "Deep Learning",
                "Generative AI",
                "Transformers",
                "RAG",
                "LLM Fine-Tuning",
                "TensorFlow",
                "Scikit-learn",
                "OpenCV",
                "Hugging Face",
                "LangChain",
              ].map((chip) => (
                <span key={chip} className="chip chip-soft">
                  {chip}
                </span>
              ))}
            </div>
          </article>

          <article className="hmv2-panel hmv2-panel-progress">
            <h3>Backend</h3>
            <div className="hmv2-progress-stack">
              {backendLevels.map((item) => (
                <div key={item.label}>
                  <div className="hmv2-progress-label">
                    <span>{item.label}</span>
                    <span>{item.level}%</span>
                  </div>
                  <div className="hmv2-progress-track">
                    <span style={{ width: `${item.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="hmv2-panel hmv2-panel-blue">
            <Cloud size={32} strokeWidth={2.2} />
            <div>
              <h3>Tools and Delivery</h3>
              <p>Docker, Kubernetes, Git, Postman, Liquibase, Bitbucket.</p>
            </div>
          </article>

          <article className="hmv2-panel hmv2-panel-interfaces">
            <h3>Interfaces</h3>
            <ul>
              {["React.js", "Next.js", "JavaScript", "HTML/CSS"].map((stack) => (
                <li key={stack}>{stack}</li>
              ))}
            </ul>
          </article>

          <article className="hmv2-panel hmv2-panel-inline">
            <div>
              <h3>Full Stack Orchestration</h3>
              <p>
                End-to-end integration of intelligence layers into high-traffic web
                ecosystems.
              </p>
            </div>
            <Network size={48} strokeWidth={1.8} />
          </article>
        </div>
      </section>

      <section className="hmv2-projects-band" id="projects">
        <div className="section-wrap">
          <div className="section-heading-inline hmv2-heading-inline">
            <div>
              <h2 className="section-title">Innovation Portfolios</h2>
              <p className="section-lead">Selected builds with clear metrics and deployment impact.</p>
            </div>

            <Link href="/projects" className="hmv2-archive-link">
              Explore Full Archive
              <ArrowRight size={16} strokeWidth={2.2} />
            </Link>
          </div>

          <div className="hmv2-feature-grid">
            {featured.map((item, index) => (
              <article key={item.title} className="hmv2-feature-card">
                <div
                  className={`hmv2-feature-visual ${index === 0 ? "hmv2-feature-ai" : "hmv2-feature-data"}`}
                  aria-hidden="true"
                />
                <h3>{item.title}</h3>
                <p>{item.summary}</p>

                <div className="chip-list">
                  {item.chips.map((chip) => (
                    <span key={chip} className="chip chip-soft">
                      {chip}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap section-space hmv2-timeline-shell" id="experience">
        <h2 className="section-title section-center">Professional Trajectory</h2>

        <div className="hmv2-timeline">
          {milestones.map((item, index) => (
            <article
              key={`${item.company}-${item.role}`}
              className={`hmv2-timeline-item ${index % 2 === 1 ? "hmv2-timeline-item-reverse" : ""}`}
            >
              <div>
                <p className="hmv2-timeline-period">{item.period}</p>
                <h3>{item.role}</h3>
                <p className="hmv2-timeline-company">{item.company}</p>
                <p>{item.summary}</p>
              </div>

              <span className="hmv2-timeline-dot" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="hmv2-contact-band" id="contact">
        <div className="section-wrap hmv2-contact-card">
          <div className="hmv2-contact-glow" aria-hidden="true" />

          <h2 className="section-title">Initiate Collaboration.</h2>
          <p>
            Have a vision that needs clinical precision and deep engineering execution?
            Let&apos;s build it together.
          </p>

          <div className="cta-row cta-center">
            <Link href="/contact" className="btn btn-secondary">
              Start a Project
            </Link>
            <a href="mailto:anirudh7371@gmail.com" className="btn btn-primary">
              Book a Call
            </a>
          </div>
        </div>
      </section>
    </PublicSiteShell>
  );
}
