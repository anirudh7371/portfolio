import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  ChevronRight,
  Code2,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
} from "lucide-react";
import { ContactForm } from "@/components/public/contact-form";
import { PublicSiteShell } from "@/components/public/site-shell";

const contactCards = [
  {
    title: "Direct Email",
    text: "anirudh7371@gmail.com",
    href: "mailto:anirudh7371@gmail.com",
    Icon: Mail,
  },
  {
    title: "Phone",
    text: "+91 82952 50473",
    href: "tel:+918295250473",
    Icon: Phone,
  },
  {
    title: "LinkedIn",
    text: "linkedin.com/in/anirudh2511",
    href: "https://www.linkedin.com/in/anirudh2511/",
    Icon: ArrowUpRight,
  },
  {
    title: "GitHub",
    text: "github.com/anirudh7371",
    href: "https://github.com/anirudh7371",
    Icon: Code2,
  },
];

type Principle = {
  title: string;
  text: string;
  Icon: LucideIcon;
  wide?: boolean;
};

const principles: Principle[] = [
  {
    title: "Education",
    text: "B.Tech in Computer Science and Engineering, VIT Vellore (Sept 2022 - May 2026), CGPA 8.81.",
    Icon: GraduationCap,
    wide: true,
  },
  {
    title: "Location",
    text: "Bengaluru, Karnataka, India",
    Icon: MapPin,
  },
  {
    title: "Citizenship",
    text: "Indian Citizen",
    Icon: ShieldCheck,
  },
];

const resumeHref =
  "https://drive.google.com/file/d/1T4KQkkQTMPycl9Mj286_JbF44ar6qhZN/view?usp=share_link";

export default function ContactPage() {
  return (
    <PublicSiteShell activePath="/contact">
      <section className="section-wrap section-space ctcv2-shell" id="inquiry">
        <div className="ctcv2-left">
          <div>
            <p className="ctcv2-kicker">
              <span className="ctcv2-kicker-dot" aria-hidden="true" />
              Open to high-impact opportunities
            </p>

            <h1 className="display-title ctcv2-title">
              Let&apos;s Build Impactful
              <br />
              <span>Software and AI Systems.</span>
            </h1>

            <p className="section-lead ctcv2-lead">
              I am Anirudh Sharma, a software and AI engineer based in Bengaluru. I build
              production-ready platforms, intelligent workflows, and practical solutions
              that translate directly into product and business outcomes.
            </p>
          </div>

          <div className="ctcv2-strength-grid">
            {principles.map((item) => (
              <article
                key={item.title}
                className={`ctcv2-strength-card ${item.wide ? "ctcv2-strength-card-wide" : ""}`}
              >
                <item.Icon size={30} strokeWidth={2} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <article className="ctcv2-resume-card">
            <p>Looking for the technical details?</p>
            <a href={resumeHref} target="_blank" rel="noreferrer">
              Download Technical Resume
              <Download size={18} strokeWidth={2.2} />
            </a>
          </article>
        </div>

        <div className="ctcv2-right">
          <article className="ctcv2-form-wrap">
            <div className="ctcv2-form-glow" aria-hidden="true" />
            <h2>Initiate Inquiry</h2>
            <ContactForm />
          </article>

          <div className="ctcv2-quick-grid">
            {contactCards.map((card) => {
              const cardBody = (
                <>
                  <span className="ctcv2-quick-icon" aria-hidden="true">
                    <card.Icon size={20} strokeWidth={2.2} />
                  </span>

                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>

                  <ChevronRight size={18} strokeWidth={2.2} />
                </>
              );

              const isInternal = card.href.startsWith("/");
              const isWebLink = card.href.startsWith("http");

              if (!isInternal) {
                return (
                  <a
                    key={card.title}
                    href={card.href}
                    className="ctcv2-quick-card"
                    target={isWebLink ? "_blank" : undefined}
                    rel={isWebLink ? "noreferrer" : undefined}
                  >
                    {cardBody}
                  </a>
                );
              }

              return (
                <Link key={card.title} href={card.href} className="ctcv2-quick-card">
                  {cardBody}
                </Link>
              );
            })}
          </div>

          <article className="ctcv2-quote">
            <Quote size={18} strokeWidth={2.2} />
            <p>
              Open to internships and full-time software engineering or AI engineering
              roles with teams that value ownership, quality, and measurable delivery.
            </p>
            <span>Preferred Location: Bengaluru, Karnataka</span>
          </article>
        </div>
      </section>
    </PublicSiteShell>
  );
}
