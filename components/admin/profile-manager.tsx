"use client";

import { FormEvent, useEffect, useState } from "react";

type Profile = {
  headline: string;
  subtitle: string;
  heroDescription: string;
  aboutSummary: string;
  aboutDetails: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
};

const initialState: Profile = {
  headline: "",
  subtitle: "",
  heroDescription: "",
  aboutSummary: "",
  aboutDetails: "",
  location: "",
  email: "",
  phone: "",
  resumeUrl: "",
  ctaPrimaryLabel: "",
  ctaPrimaryHref: "",
  ctaSecondaryLabel: "",
  ctaSecondaryHref: "",
};

export function ProfileManager() {
  const [form, setForm] = useState<Profile>(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const response = await fetch("/api/admin/profile");

      if (!response.ok) {
        setError("Failed to load profile.");
        setIsLoading(false);
        return;
      }

      const json = await response.json();
      setForm((json.data as Profile) ?? initialState);
      setIsLoading(false);
    }

    void load();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSaving(true);

    const response = await fetch("/api/admin/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setIsSaving(false);

    if (!response.ok) {
      setError("Failed to update profile.");
      return;
    }

    setSuccess("Profile updated successfully.");
  }

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  return (
    <section className="admin-section">
      <h2>Profile Content</h2>

      <form className="admin-form-grid" onSubmit={onSubmit}>
        <label>
          Headline
          <input
            value={form.headline}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, headline: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Subtitle
          <input
            value={form.subtitle}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, subtitle: event.target.value }))
            }
            required
          />
        </label>

        <label className="admin-col-span-2">
          Hero Description
          <textarea
            value={form.heroDescription}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, heroDescription: event.target.value }))
            }
            rows={4}
            required
          />
        </label>

        <label className="admin-col-span-2">
          About Summary
          <textarea
            value={form.aboutSummary}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, aboutSummary: event.target.value }))
            }
            rows={3}
            required
          />
        </label>

        <label className="admin-col-span-2">
          About Details
          <textarea
            value={form.aboutDetails}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, aboutDetails: event.target.value }))
            }
            rows={4}
            required
          />
        </label>

        <label>
          Location
          <input
            value={form.location}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, location: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Phone
          <input
            value={form.phone}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, phone: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Resume URL
          <input
            value={form.resumeUrl}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, resumeUrl: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Primary CTA Label
          <input
            value={form.ctaPrimaryLabel}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, ctaPrimaryLabel: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Primary CTA Link
          <input
            value={form.ctaPrimaryHref}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, ctaPrimaryHref: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Secondary CTA Label
          <input
            value={form.ctaSecondaryLabel}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, ctaSecondaryLabel: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Secondary CTA Link
          <input
            value={form.ctaSecondaryHref}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, ctaSecondaryHref: event.target.value }))
            }
            required
          />
        </label>

        <button className="admin-button" type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Profile"}
        </button>
      </form>

      {error ? <p className="admin-error">{error}</p> : null}
      {success ? <p className="admin-success">{success}</p> : null}
    </section>
  );
}
