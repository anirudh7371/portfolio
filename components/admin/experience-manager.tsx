"use client";

import { FormEvent, useEffect, useState } from "react";

type Experience = {
  id: string;
  title: string;
  organization: string;
  startDate: string;
  endDate: string | null;
  summary: string;
  achievements: string[];
};

type ExperienceForm = {
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  summary: string;
  achievements: string;
  displayOrder: number;
};

const initialForm: ExperienceForm = {
  title: "",
  organization: "",
  startDate: "",
  endDate: "",
  summary: "",
  achievements: "",
  displayOrder: 0,
};

export function ExperienceManager() {
  const [items, setItems] = useState<Experience[]>([]);
  const [form, setForm] = useState<ExperienceForm>(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setIsLoading(true);
    const response = await fetch("/api/admin/experience");

    if (!response.ok) {
      setError("Failed to load experience entries.");
      setIsLoading(false);
      return;
    }

    const json = await response.json();
    setItems(json.data ?? []);
    setIsLoading(false);
  }

  useEffect(() => {
    // Initial data bootstrap for admin table.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const response = await fetch("/api/admin/experience", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: form.title,
        organization: form.organization,
        startDate: new Date(form.startDate).toISOString(),
        endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
        summary: form.summary,
        achievements: form.achievements
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        displayOrder: form.displayOrder,
      }),
    });

    if (!response.ok) {
      setError("Failed to create experience entry.");
      return;
    }

    setForm(initialForm);
    await load();
  }

  async function onDelete(id: string) {
    const response = await fetch(`/api/admin/experience/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setError("Failed to delete experience entry.");
      return;
    }

    await load();
  }

  return (
    <section className="admin-section">
      <h2>Experience</h2>

      <form className="admin-form-grid" onSubmit={onSubmit}>
        <label>
          Role / Title
          <input
            value={form.title}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, title: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Organization
          <input
            value={form.organization}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, organization: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Start Date
          <input
            type="date"
            value={form.startDate}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, startDate: event.target.value }))
            }
            required
          />
        </label>

        <label>
          End Date (optional)
          <input
            type="date"
            value={form.endDate}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, endDate: event.target.value }))
            }
          />
        </label>

        <label>
          Display Order
          <input
            type="number"
            min={0}
            value={form.displayOrder}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                displayOrder: Number(event.target.value) || 0,
              }))
            }
          />
        </label>

        <label className="admin-col-span-2">
          Summary
          <textarea
            rows={3}
            value={form.summary}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, summary: event.target.value }))
            }
            required
          />
        </label>

        <label className="admin-col-span-2">
          Highlights (one per line)
          <textarea
            rows={4}
            value={form.achievements}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, achievements: event.target.value }))
            }
            required
          />
        </label>

        <button type="submit" className="admin-button">
          Add Experience
        </button>
      </form>

      {error ? <p className="admin-error">{error}</p> : null}

      {isLoading ? <p>Loading experience...</p> : null}

      {!isLoading ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Organization</th>
                <th>Start</th>
                <th>End</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.organization}</td>
                  <td>{new Date(item.startDate).toLocaleDateString()}</td>
                  <td>
                    {item.endDate ? new Date(item.endDate).toLocaleDateString() : "Present"}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="admin-button admin-button-danger"
                      onClick={() => onDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}
