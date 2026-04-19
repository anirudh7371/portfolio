export default function RootLoading() {
  return (
    <main className="section-wrap section-space" aria-busy="true" aria-live="polite">
      <section className="section-card">
        <p className="eyebrow">Loading</p>
        <h1 className="section-title">Preparing portfolio experience...</h1>
        <p className="section-lead">
          Fetching profile data, projects, skills, and timeline content.
        </p>
      </section>
    </main>
  );
}
