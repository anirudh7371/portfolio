"use client";

import { useEffect, useState } from "react";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "UNREAD" | "READ" | "REPLIED" | "ARCHIVED";
  createdAt: string;
};

const statuses: ContactMessage["status"][] = [
  "UNREAD",
  "READ",
  "REPLIED",
  "ARCHIVED",
];

export function MessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setIsLoading(true);

    const response = await fetch("/api/admin/contact-messages");

    if (!response.ok) {
      setError("Failed to load messages.");
      setIsLoading(false);
      return;
    }

    const json = await response.json();
    setMessages(json.data ?? []);
    setIsLoading(false);
  }

  useEffect(() => {
    // Initial data bootstrap for admin table.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);

  async function updateStatus(id: string, status: ContactMessage["status"]) {
    const response = await fetch("/api/admin/contact-messages", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    if (!response.ok) {
      setError("Failed to update message status.");
      return;
    }

    await load();
  }

  return (
    <section className="admin-section">
      <h2>Contact Messages</h2>
      <p>Review inbound leads and track response workflow state.</p>

      {error ? <p className="admin-error">{error}</p> : null}
      {isLoading ? <p>Loading messages...</p> : null}

      {!isLoading ? (
        <div className="admin-message-list">
          {messages.map((item) => (
            <article key={item.id} className="admin-message-card">
              <div className="admin-message-head">
                <div>
                  <h3>{item.subject}</h3>
                  <p>
                    {item.name} | {item.email}
                  </p>
                </div>
                <span>{new Date(item.createdAt).toLocaleString()}</span>
              </div>

              <p>{item.message}</p>

              <div className="admin-message-actions">
                {statuses.map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`admin-button ${
                      status === item.status ? "" : "admin-button-ghost"
                    }`}
                    onClick={() => updateStatus(item.id, status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
