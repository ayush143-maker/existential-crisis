import Link from "next/link";

export default function NotFound() {
  return (
    <main className="utility-page">
      <p className="utility-label">Form 404 / Missing Significance</p>
      <h1 className="utility-title">This page drifted into the void.</h1>
      <p className="utility-copy">
        It may have existed once, but the universe has since declined to renew
        its contract.
      </p>
      <Link href="/" className="button utility-link">
        Return to intake
      </Link>
    </main>
  );
}
