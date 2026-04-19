import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Activity, ArrowUpRight, Code2, Cpu, Terminal } from "lucide-react";
import { PublicSiteShell } from "@/components/public/site-shell";

type Milestone = {
  period: string;
  role: string;
  company: string;
  chips: string[];
  Icon: LucideIcon;
  bullets: string[];
};

const milestones: Milestone[] = [
  {
    period: "Dec 2025 - Present",
    role: "Software Engineer Intern",
    company: "Kulicke & Soffa Industries (via ASM Technologies Ltd) - Bengaluru",
    chips: ["Jest", "UAT/Production", "Multi-Region"],
    Icon: Cpu,
    bullets: [
      "Accelerated production-grade enhancements for a global enterprise web platform through strong requirements alignment, rapid iteration, and stakeholder demos.",
      "Resolved a critical production defect across UAT/Production and multi-region environments, improving release reliability and system stability.",
      "Strengthened quality with Jest test suites, reaching approximately 72% UI statement coverage.",
      "Currently reporting to US-based senior manager Ronny Abraham.",
    ],
  },
  {
    period: "May 2025 - Jul 2025",
    role: "AI Engineer Intern",
    company: "CodeBiceps - Chandigarh",
    chips: ["RAG", "NLP", "Flask APIs", "Azure"],
    Icon: Activity,
    bullets: [
      "Designed an AI pipeline using RAG and NLP to convert Lighthouse reports into prioritized optimization insights.",
      "Resolved over 30 issues across 5+ platforms within Agile sprints.",
      "Built and deployed Flask REST APIs integrating Google Gemini with retrieval workflows on Azure.",
      "Improved frontend load efficiency by 25% through targeted optimization delivery.",
    ],
  },
  {
    period: "May 2024 - Jun 2024",
    role: "Machine Learning and AI Developer Intern",
    company: "KuppiSmart Solutions Pvt Ltd",
    chips: ["ML Prototyping", "AI Workflows", "Rapid Iteration"],
    Icon: Code2,
    bullets: [
      "Contributed to machine learning and AI development workflows for practical product applications.",
      "Assisted in translating business use cases into executable model and data tasks.",
      "Supported delivery cycles with experimentation, debugging, and iterative model improvements.",
    ],
  },
  {
    period: "Aug 2023 - Jan 2024",
    role: "Research and Development Intern",
    company: "MyPerro",
    chips: ["Hardware R&D", "Sensor Integration", "Activity Tracking"],
    Icon: Activity, 
    bullets: [
      "Contributed to the research and development of a cutting-edge smart dog collar for comprehensive pet health monitoring.",
      "Integrated advanced sensors to enable real-time tracking of pet activity, behavior, and vital metrics.",
      "Processed and analyzed sensor data to generate actionable health insights and preventative care alerts for pet owners.",
    ],
  }
];

const architectureFocus = [
  "Data Structures and Algorithms",
  "Object-Oriented Programming",
  "DBMS",
  "Operating Systems",
  "Computer Networks",
];

const coreEngineeringChips = [
  "Python",
  "SQL",
  "JavaScript",
  "Node.js",
  "React.js",
  "Flask",
  "REST APIs",
  "Jest",
];

export default function ExperiencePage() {
  return (
    <PublicSiteShell activePath="/experience">
      <section className="section-wrap section-space page-hero expv2-hero">
        <div className="expv2-kicker-row">
          <span className="expv2-kicker-line" aria-hidden="true" />
          <p className="eyebrow">Career Path</p>
        </div>
        <h1 className="display-title expv2-title">
          Applied Engineering Across
          <br />
          <span>AI and Software Delivery.</span>
        </h1>
        <p className="section-lead expv2-lead">
          A focused timeline of internships where I delivered measurable outcomes in
          release reliability, AI automation, and production engineering quality.
        </p>
      </section>

      <section className="section-wrap section-space expv2-timeline-shell">
        <div className="expv2-timeline">
          {milestones.map((item, index) => (
            <article
              key={item.role}
              className={`expv2-entry ${index % 2 === 1 ? "expv2-entry-reverse" : ""}`}
            >
              <div className="expv2-meta">
                <span className="expv2-period">{item.period}</span>
                <h2>{item.role}</h2>
                <p className="expv2-company">{item.company}</p>
                <div className="expv2-tech">
                  {item.chips.map((chip) => (
                    <span key={chip} className="expv2-chip">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className="expv2-detail">
                <ul>
                  {item.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>

              <div className="expv2-node" aria-hidden="true">
                <item.Icon size={18} strokeWidth={2.2} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap section-space expv2-dna-shell">
        <div className="section-heading-inline expv2-heading-inline">
          <h2 className="section-title">Technical DNA</h2>
          <Link href="/services" className="expv2-inline-link">
            Explore Services
            <ArrowUpRight size={16} strokeWidth={2.2} />
          </Link>
        </div>

        <div className="expv2-dna-grid">
          <article className="expv2-dna-card expv2-dna-primary">
            <h3>Engineering Core</h3>
            <p>
              End-to-end implementation across backend systems, AI integrations, and
              modern web interfaces with clean, testable architecture.
            </p>
            <div className="chip-list expv2-primary-chips">
              {coreEngineeringChips.map((chip) => (
                <span key={chip} className="chip">
                  {chip}
                </span>
              ))}
            </div>
          </article>

          <article className="expv2-dna-card expv2-dna-architecture">
            <h3>Core Computer Science</h3>
            <ul>
              {architectureFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="expv2-dna-card expv2-dna-metric">
            <h3>Quality Signal</h3>
            <p>Built disciplined test coverage practices in enterprise UI delivery cycles.</p>
            <p className="expv2-metric-value">72%</p>
            <p className="expv2-metric-label">UI Statement Coverage (Jest)</p>
          </article>

          <article className="expv2-dna-card expv2-dna-precision">
            <div>
              <h3>AI Delivery Focus</h3>
              <p>
                NLP, Deep Learning, Generative AI, Transformers, RAG, and LLM
                fine-tuning applied to practical software outcomes.
              </p>
            </div>
            <div className="expv2-dna-orb" aria-hidden="true" />
          </article>
        </div>
      </section>
    </PublicSiteShell>
  );
}
