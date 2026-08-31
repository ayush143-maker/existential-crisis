"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="utility-page">
      <p className="utility-label">Form 500 / Structural Regret</p>
      <h1 className="utility-title">Something collapsed under its own meaning.</h1>
      <p className="utility-copy">
        The Bureau apologizes for the inconvenience and for existence in
        general.
      </p>
      {error.digest ? <p className="utility-meta">Incident: {error.digest}</p> : null}
      <button type="button" className="button" onClick={reset}>
        Attempt recovery
      </button>
    </main>
  );
}
