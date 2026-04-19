"use client";

import { FormEvent, useEffect, useState } from "react";

type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
};

export function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "AI/ML",
    level: 80,
    displayOrder: 0,
  });

  async function load() {
    setIsLoading(true);
    const response = await fetch("/api/admin/skills");

    if (!response.ok) {
      setError("Failed to load skills.");
      setIsLoading(false);
      return;
    }

    const json = await response.json();
    setSkills(json.data ?? []);
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

    const response = await fetch("/api/admin/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      setError("Failed to create skill.");
      return;
    }

    setForm({
      name: "",
      category: form.category,
      level: 80,
      displayOrder: 0,
    });
    await load();
  }

  async function onDelete(id: string) {
    const response = await fetch(`/api/admin/skills/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setError("Failed to delete skill.");
      return;
    }

    await load();
  }

  return (
    <section className="admin-section">
      <h2>Skills</h2>

      <form className="admin-form-grid" onSubmit={onSubmit}>
        <label>
          Name
          <input
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Category
          <input
            value={form.category}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, category: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Level (0-100)
          <input
            type="number"
            min={0}
            max={100}
            value={form.level}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                level: Number(event.target.value) || 0,
              }))
            }
            required
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

        <button type="submit" className="admin-button">
          Add Skill
        </button>
      </form>

      {error ? <p className="admin-error">{error}</p> : null}

      {isLoading ? <p>Loading skills...</p> : null}

      {!isLoading ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Level</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id}>
                  <td>{skill.name}</td>
                  <td>{skill.category}</td>
                  <td>{skill.level}</td>
                  <td>
                    <button
                      type="button"
                      className="admin-button admin-button-danger"
                      onClick={() => onDelete(skill.id)}
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
