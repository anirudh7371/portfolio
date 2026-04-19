import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Brain, CheckCircle2, Code2, Workflow } from "lucide-react";
import { PublicSiteShell } from "@/components/public/site-shell";

type ServicePanel = {
  title: string;
  text: string;
  chips: string[];
  cta: string;
  href: string;
  Icon: LucideIcon;
};

const services: ServicePanel[] = [
  {
    title: "Software Engineering Delivery",
    text: "Accelerating production-grade enhancements for enterprise platforms with tighter release reliability, stronger quality loops, and practical stakeholder alignment.",
    chips: [
      "Enterprise Web Platforms",
      "UAT/Production Reliability",
      "Release Stabilization",
      "Jest Coverage Expansion",
    ],
    cta: "Discuss Engineering Scope",
    href: "/contact",
    Icon: Brain,
  },
  {
    title: "AI Pipeline Engineering",
    text: "Designing RAG and NLP workflows that convert raw technical inputs into prioritized optimization actions for faster team execution.",
    chips: ["RAG + NLP", "Google Gemini", "Flask REST APIs", "Azure Deployments"],
    cta: "Design AI Workflow",
    href: "/contact",
    Icon: Workflow,
  },
  {
    title: "Full-Stack AI Product Build",
    text: "Building full-stack products that connect modern interfaces, robust APIs, and intelligent recommendation engines into production-ready experiences.",
    chips: ["Next.js + React.js", "Python", "PostgreSQL", "OCR + AI Insights"],
    cta: "Build Product",
    href: "/contact",
    Icon: Code2,
  },
];

const stacks = [
  {
    label: "Languages",
    items: ["Python", "SQL", "JavaScript", "HTML/CSS"],
  },
  {
    label: "Backend and Web",
    items: ["Node.js", "React.js", "Flask", "REST APIs"],
  },
  {
    label: "Testing",
    items: ["Jest", "Unit Testing", "Integration Testing"],
  },
  {
    label: "AI/ML",
    items: [
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
    ],
  },
  {
    label: "Databases and Tools",
    items: [
      "MySQL",
      "MongoDB",
      "Docker",
      "Git",
      "Postman",
      "Liquibase",
      "Bitbucket/Confluence",
    ],
  },
  {
    label: "Core Computer Science",
    items: [
      "Data Structures and Algorithms",
      "OOP",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
    ],
  },
];

export default function ServicesPage() {
  const [aiService, automationService, webService] = services;

  return (
    <PublicSiteShell activePath="/services">
      <section className="section-wrap section-space page-hero srvv2-hero">
        <div className="srvv2-kicker-row">
          <span className="srvv2-kicker-dot" aria-hidden="true" />
          <p className="eyebrow">Available for Collaboration</p>
        </div>
        <h1 className="display-title srvv2-title">
          Clinical Precision.
          <br />
          <span>Fluid Innovation.</span>
        </h1>
        <p className="section-lead srvv2-lead">
          I build reliable software and AI systems from Bengaluru, combining practical
          engineering discipline with measurable product outcomes.
        </p>
      </section>

      <section className="section-wrap section-space srvv2-bento">
        <article className="srvv2-card srvv2-main">
          <div className="srvv2-card-head">
            <aiService.Icon size={30} strokeWidth={2} />
            <h2>{aiService.title}</h2>
          </div>
          <p>{aiService.text}</p>
          <div className="srvv2-chip-row">
            {aiService.chips.map((chip) => (
              <span key={chip} className="srvv2-chip">
                {chip}
              </span>
            ))}
          </div>
          <Link href={aiService.href} className="srvv2-inline-cta">
            {aiService.cta}
            <ArrowUpRight size={16} strokeWidth={2.2} />
          </Link>
          <div className="srvv2-main-overlay" aria-hidden="true" />
        </article>

        <article className="srvv2-card srvv2-accent">
          <div className="srvv2-card-head">
            <automationService.Icon size={28} strokeWidth={2} />
            <h2>{automationService.title}</h2>
          </div>
          <p>{automationService.text}</p>
          <div className="srvv2-chip-row">
            {automationService.chips.map((chip) => (
              <span key={chip} className="srvv2-chip srvv2-chip-ghost">
                {chip}
              </span>
            ))}
          </div>
          <Link href={automationService.href} className="btn btn-secondary srvv2-accent-cta">
            {automationService.cta}
          </Link>
        </article>

        <article className="srvv2-card srvv2-wide">
          <div>
            <div className="srvv2-card-head">
              <webService.Icon size={30} strokeWidth={2} />
              <h2>{webService.title}</h2>
            </div>
            <p>{webService.text}</p>

            <div className="srvv2-check-grid">
              {webService.chips.map((chip) => (
                <p key={chip}>
                  <CheckCircle2 size={17} strokeWidth={2.2} />
                  {chip}
                </p>
              ))}
            </div>

            <Link href={webService.href} className="btn btn-primary srvv2-wide-cta">
              {webService.cta}
            </Link>
          </div>
          <div className="srvv2-wide-media" aria-hidden="true" />
        </article>
      </section>

      <section className="section-wrap section-space srvv2-stack-shell">
        <h2 className="srvv2-stack-kicker">
          Technical Stack
          <span aria-hidden="true" />
        </h2>

        <div className="srvv2-stack-grid">
          {stacks.map((stack) => (
            <article key={stack.label} className="srvv2-stack-card">
              <h3>{stack.label}</h3>
              <ul>
                {stack.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap section-space srvv2-cta">
        <div className="srvv2-cta-bubble srvv2-cta-bubble-a" aria-hidden="true" />
        <div className="srvv2-cta-bubble srvv2-cta-bubble-b" aria-hidden="true" />

        <h2 className="section-title">Open to high-impact engineering roles and builds.</h2>
        <p>
          Available for internships, full-time opportunities, and focused collaboration
          engagements in software and AI engineering.
        </p>
        <div className="cta-row cta-center">
          <Link href="/contact" className="btn btn-primary">
            Inquire Now
          </Link>
          <Link href="/projects" className="btn btn-secondary">
            View Past Work
          </Link>
        </div>
      </section>
    </PublicSiteShell>
  );
}
