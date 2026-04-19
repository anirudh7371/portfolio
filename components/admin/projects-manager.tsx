"use client";

import { FormEvent, useEffect, useState } from "react";

type Skill = {
  id: string;
  name: string;
};

type AdminProject = {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  featured: boolean;
  skills: Array<{ skill: Skill }>;
};

type ProjectFormState = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  displayOrder: number;
  skillIds: string[];
};

const initialState: ProjectFormState = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  githubUrl: "",
  liveUrl: "",
  featured: false,
  status: "DRAFT",
  displayOrder: 0,
  skillIds: [],
};

export function ProjectsManager() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [form, setForm] = useState<ProjectFormState>(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setIsLoading(true);
    setError(null);

    const [projectsResponse, skillsResponse] = await Promise.all([
      fetch("/api/admin/projects"),
      fetch("/api/admin/skills"),
    ]);

    if (!projectsResponse.ok || !skillsResponse.ok) {
      setError("Failed to load projects or skills.");
      setIsLoading(false);
      return;
    }

    const projectsJson = await projectsResponse.json();
    const skillsJson = await skillsResponse.json();

    setProjects(projectsJson.data ?? []);
    setSkills(skillsJson.data ?? []);
    setIsLoading(false);
  }

  useEffect(() => {
    // Initial data bootstrap for admin table.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const response = await fetch("/api/admin/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        liveUrl: form.liveUrl || null,
      }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      setError("Failed to create project.");
      return;
    }

    setForm(initialState);
    await load();
  }

  async function onDelete(id: string) {
    const response = await fetch(`/api/admin/projects/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setError("Failed to delete project.");
      return;
    }

    await load();
  }

  async function updateStatus(
    id: string,
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED",
  ) {
    const response = await fetch(`/api/admin/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      setError("Failed to update project status.");
      return;
    }

    await load();
  }

  return (
    <section className="admin-section">
      <h2>Projects</h2>
      <p>Create, publish, and retire project entries shown on the public site.</p>

      <form className="admin-form-grid" onSubmit={onSubmit}>
        <label>
          Title
          <input
            value={form.title}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, title: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Slug
          <input
            value={form.slug}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, slug: event.target.value }))
            }
            required
          />
        </label>

        <label>
          GitHub URL
          <input
            value={form.githubUrl}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, githubUrl: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Live URL (optional)
          <input
            value={form.liveUrl}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, liveUrl: event.target.value }))
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

        <label>
          Status
          <select
            value={form.status}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                status: event.target.value as ProjectFormState["status"],
              }))
            }
          >
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLISHED">PUBLISHED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </label>

        <label className="admin-checkbox-field">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, featured: event.target.checked }))
            }
          />
          Featured
        </label>

        <label className="admin-col-span-2">
          Summary
          <textarea
            value={form.summary}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, summary: event.target.value }))
            }
            rows={3}
            required
          />
        </label>

        <label className="admin-col-span-2">
          Description
          <textarea
            value={form.description}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, description: event.target.value }))
            }
            rows={4}
            required
          />
        </label>

        <fieldset className="admin-col-span-2 admin-fieldset">
          <legend>Associated Skills</legend>
          <div className="admin-checkbox-grid">
            {skills.map((skill) => (
              <label key={skill.id}>
                <input
                  type="checkbox"
                  checked={form.skillIds.includes(skill.id)}
                  onChange={(event) => {
                    setForm((prev) => ({
                      ...prev,
                      skillIds: event.target.checked
                        ? [...prev.skillIds, skill.id]
                        : prev.skillIds.filter((item) => item !== skill.id),
                    }));
                  }}
                />
                {skill.name}
              </label>
            ))}
          </div>
        </fieldset>

        <button className="admin-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Create Project"}
        </button>
      </form>

      {error ? <p className="admin-error">{error}</p> : null}

      {isLoading ? <p>Loading projects...</p> : null}

      {!isLoading ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Tech</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.status}</td>
                  <td>{project.featured ? "Yes" : "No"}</td>
                  <td>
                    {project.skills.map((entry) => entry.skill.name).join(", ")}
                  </td>
                  <td className="admin-action-cell">
                    <button
                      type="button"
                      className="admin-button admin-button-ghost"
                      onClick={() => updateStatus(project.id, "PUBLISHED")}
                    >
                      Publish
                    </button>
                    <button
                      type="button"
                      className="admin-button admin-button-ghost"
                      onClick={() => updateStatus(project.id, "ARCHIVED")}
                    >
                      Archive
                    </button>
                    <button
                      type="button"
                      className="admin-button admin-button-danger"
                      onClick={() => onDelete(project.id)}
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
