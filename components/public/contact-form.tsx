"use client";

import { FormEvent, useState } from "react";

type ContactState = {
  name: string;
  email: string;
  projectCategory: string;
  message: string;
};

const initialForm: ContactState = {
  name: "",
  email: "",
  projectCategory: "Software Engineering",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactState>(initialForm);
  const [website, setWebsite] = useState("");
  const [formStartedAt] = useState(() => Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    const response = await fetch("/api/public/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        subject: `Inquiry: ${form.projectCategory}`,
        message: form.message,
        website,
        formStartedAt,
      }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      setError("Unable to submit your message right now. Please try again.");
      return;
    }

    setSuccess("Message sent successfully. I will get back to you soon.");
    setForm(initialForm);
  }

  return (
    <form className="ctcv2-form" onSubmit={onSubmit}>
      <div className="ctcv2-form-grid">
        <label className="ctcv2-field">
          <span>Full Name</span>
          <input
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            placeholder="Your name"
            required
          />
        </label>

        <label className="ctcv2-field">
          <span>Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder="name@company.com"
            required
          />
        </label>
      </div>

      {/* Honeypot field to trap basic bots without affecting real users. */}
      <label className="hp-field" aria-hidden="true">
        Website
        <input
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </label>

      <label className="ctcv2-field ctcv2-field-full">
        <span>Engagement Type</span>
        <select
          value={form.projectCategory}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, projectCategory: event.target.value }))
          }
        >
          <option>Software Engineering</option>
          <option>AI/ML Product Build</option>
          <option>RAG and LLM Integration</option>
          <option>Backend and API Engineering</option>
          <option>Technical Consultation</option>
        </select>
      </label>

      <label className="ctcv2-field ctcv2-field-full">
        <span>Inquiry Details</span>
        <textarea
          value={form.message}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, message: event.target.value }))
          }
          placeholder="Share goals, scope, timeline, and any technical constraints..."
          rows={5}
          required
        />
      </label>

      <button type="submit" className="ctcv2-submit" disabled={isSubmitting}>
        {isSubmitting ? "Transmitting..." : "Transmit Message"}
      </button>

      {error ? <p className="admin-error">{error}</p> : null}
      {success ? <p className="admin-success">{success}</p> : null}
    </form>
  );
}
