import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminSignOutButton } from "@/components/admin/admin-signout-button";
import { getAdminSession } from "@/lib/admin-auth";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/messages", label: "Messages" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="eyebrow">Admin Workspace</p>
          <h1>Anirudh AI/ML Portfolio Suite</h1>
        </div>
        <AdminSignOutButton />
      </header>

      <nav className="admin-nav" aria-label="Admin">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="admin-nav-link">
            {link.label}
          </Link>
        ))}
      </nav>

      <main className="admin-main">{children}</main>
    </div>
  );
}
