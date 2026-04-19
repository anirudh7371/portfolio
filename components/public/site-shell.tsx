import Link from "next/link";
import type { ReactNode } from "react";
import { ChatWidget } from "@/components/public/chat-widget";

type PublicSiteShellProps = {
  children: ReactNode;
  activePath: "/" | "/projects" | "/experience" | "/services" | "/contact";
};

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export function PublicSiteShell({ children, activePath }: PublicSiteShellProps) {
  return (
    <div className="public-site">
      <div className="public-frame">
        <header className="top-nav section-wrap">
          <Link href="/" className="brand-mark">
            &lt;/ANIRUDH.DEV&gt;
          </Link>

          <div className="top-nav-right">
            <nav aria-label="Main navigation" className="top-nav-menu">
              <ul className="nav-list">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={activePath === item.href ? "page" : undefined}
                      className={activePath === item.href ? "nav-link-active" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Link href="/contact" className="btn btn-primary nav-cta">
              Let&apos;s Connect
            </Link>
          </div>
        </header>

        <main className="public-main">{children}</main>

        <footer className="section-wrap public-footer">
          <div>
            <p className="public-footer-brand">&lt;/ANIRUDH.DEV&gt;</p>
            <p>© 2026 Anirudh Sharma • Bengaluru, India</p>
          </div>
          <div className="public-footer-links">
            <a href="https://github.com/anirudh7371" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/anirudh2511/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="mailto:anirudh7371@gmail.com">Email</a>
          </div>
        </footer>
      </div>

      <ChatWidget />
    </div>
  );
}
