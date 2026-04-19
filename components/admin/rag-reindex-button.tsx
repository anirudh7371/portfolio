"use client";

import { useState } from "react";

export function RagReindexButton() {
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function run() {
    setMessage(null);
    setIsSubmitting(true);

    const response = await fetch("/api/admin/rag/reindex", {
      method: "POST",
    });

    setIsSubmitting(false);

    if (!response.ok) {
      setMessage("Failed to reindex chatbot context.");
      return;
    }

    const json = await response.json();
    setMessage(`Reindexed ${json.data.documents ?? 0} documents.`);
  }

  return (
    <div className="admin-inline-row">
      <button type="button" className="admin-button" onClick={run}>
        {isSubmitting ? "Reindexing..." : "Reindex Chatbot Context"}
      </button>
      {message ? <p>{message}</p> : null}
    </div>
  );
}
