"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import { Menu, X } from "lucide-react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="public-site">
      <div className="public-frame">
        <header className="top-nav section-wrap" data-nav-state={isMenuOpen ? "open" : "closed"}>
          <div className="top-nav-left">
            <Link href="/" className="brand-mark" onClick={closeMenu}>
              &lt;/ANIRUDH.DEV&gt;
            </Link>

            <button
              type="button"
              className="nav-toggle"
              aria-expanded={isMenuOpen}
              aria-controls="primary-navigation"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              <span className="nav-toggle-text">{isMenuOpen ? "Close" : "Menu"}</span>
            </button>
          </div>

          <div className="top-nav-right" data-state={isMenuOpen ? "open" : "closed"}>
            <nav
              id="primary-navigation"
              aria-label="Main navigation"
              className="top-nav-menu"
            >
              <ul className="nav-list">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={activePath === item.href ? "page" : undefined}
                      className={activePath === item.href ? "nav-link-active" : undefined}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Link href="/contact" className="btn btn-primary nav-cta" onClick={closeMenu}>
              Let&apos;s Connect
            </Link>
          </div>
        </header>

        <main className="public-main">{children}</main>

        <footer className="section-wrap public-footer">
          <div className="public-footer-branding">
            <p className="public-footer-brand">&lt;/ANIRUDH.DEV&gt;</p>
            <p className="public-footer-meta">Bengaluru, India</p>
          </div>

          <div className="public-footer-columns">
            <div className="public-footer-group">
              <p className="public-footer-heading">Explore</p>
              <ul className="public-footer-list">
                <li>
                  <Link href="/projects">Projects</Link>
                </li>
                <li>
                  <Link href="/experience">Experience</Link>
                </li>
                <li>
                  <Link href="/services">Services</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div className="public-footer-group">
              <p className="public-footer-heading">Connect</p>
              <ul className="public-footer-list">
                <li>
                  <a href="https://github.com/anirudh7371" target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/anirudh2511/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="mailto:anirudh7371@gmail.com">Email</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="public-footer-bottom">
            <p>© 2026 Anirudh Sharma</p>
          </div>
        </footer>
      </div>

      <ChatWidget />
    </div>
  );
}
