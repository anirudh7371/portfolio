import { getDashboardMetrics } from "@/services/admin-content-service";
import { RagReindexButton } from "@/components/admin/rag-reindex-button";

const cards: Array<{ label: string; key: keyof Awaited<ReturnType<typeof getDashboardMetrics>> }> = [
  { label: "Projects", key: "projects" },
  { label: "Skills", key: "skills" },
  { label: "Experience Entries", key: "experiences" },
  { label: "Services", key: "services" },
  { label: "Unread Messages", key: "unreadMessages" },
];

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics();

  return (
    <section className="admin-section">
      <h2>System Overview</h2>
      <p>
        Use the modules below to manage public portfolio content, process inbound
        leads, and refresh chatbot grounding documents.
      </p>

      <div className="admin-metric-grid">
        {cards.map((card) => (
          <article key={card.key} className="admin-metric-card">
            <h3>{card.label}</h3>
            <p>{metrics[card.key]}</p>
          </article>
        ))}
      </div>

      <RagReindexButton />
    </section>
  );
}
