"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="section-wrap section-space">
      <section className="section-card">
        <p className="eyebrow">Unexpected Error</p>
        <h1 className="section-title">Something went wrong</h1>
        <p className="section-lead">
          Please retry the request. If this keeps happening, use the contact form.
        </p>
        <div className="cta-row">
          <button type="button" className="btn btn-primary" onClick={reset}>
            Try Again
          </button>
        </div>
      </section>
    </main>
  );
}
