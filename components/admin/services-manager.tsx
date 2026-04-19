"use client";

import { FormEvent, useEffect, useState } from "react";

type Service = {
  id: string;
  title: string;
  description: string;
  pricingModel: string;
  availability: "OPEN" | "LIMITED" | "CLOSED";
};

type FormState = {
  title: string;
  description: string;
  pricingModel: string;
  availability: "OPEN" | "LIMITED" | "CLOSED";
  displayOrder: number;
};

const initialState: FormState = {
  title: "",
  description: "",
  pricingModel: "Project-based",
  availability: "OPEN",
  displayOrder: 0,
};

export function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState<FormState>(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setIsLoading(true);
    const response = await fetch("/api/admin/services");

    if (!response.ok) {
      setError("Failed to load services.");
      setIsLoading(false);
      return;
    }

    const json = await response.json();
    setServices(json.data ?? []);
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

    const response = await fetch("/api/admin/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      setError("Failed to create service.");
      return;
    }

    setForm(initialState);
    await load();
  }

  async function onDelete(id: string) {
    const response = await fetch(`/api/admin/services/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setError("Failed to delete service.");
      return;
    }

    await load();
  }

  return (
    <section className="admin-section">
      <h2>Services</h2>

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
          Pricing Model
          <input
            value={form.pricingModel}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, pricingModel: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Availability
          <select
            value={form.availability}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                availability: event.target.value as FormState["availability"],
              }))
            }
          >
            <option value="OPEN">OPEN</option>
            <option value="LIMITED">LIMITED</option>
            <option value="CLOSED">CLOSED</option>
          </select>
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

        <button type="submit" className="admin-button">
          Add Service
        </button>
      </form>

      {error ? <p className="admin-error">{error}</p> : null}

      {isLoading ? <p>Loading services...</p> : null}

      {!isLoading ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Pricing</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>{service.title}</td>
                  <td>{service.pricingModel}</td>
                  <td>{service.availability}</td>
                  <td>
                    <button
                      type="button"
                      className="admin-button admin-button-danger"
                      onClick={() => onDelete(service.id)}
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
