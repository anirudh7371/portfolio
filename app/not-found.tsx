import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-wrap section-space">
      <section className="section-card">
        <p className="eyebrow">404</p>
        <h1 className="section-title">Page not found</h1>
        <p className="section-lead">
          The requested page does not exist or may have been moved.
        </p>
        <div className="cta-row">
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
