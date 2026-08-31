"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { generateDread, type DreadReport } from "@/lib/dread";
import DreadReportView from "@/components/DreadReport";

function getAgeFromUrl(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("age") ?? "";
}

export default function ExistentialMachine() {
  const [age, setAge] = useState("");
  const [report, setReport] = useState<DreadReport | null>(null);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const timeoutRef = useRef<number | null>(null);
  const stageRef = useRef<HTMLElement | null>(null);

  const runAudit = useCallback((rawAge: string) => {
    const parsed = Number(rawAge);

    if (!rawAge.trim() || Number.isNaN(parsed) || parsed < 1 || parsed > 120) {
      setError("Enter an age between 1 and 120. The void cannot audit a placeholder.");
      setReport(null);
      setIsPending(false);
      return false;
    }

    setError("");
    setIsPending(true);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      const result = generateDread(parsed);
      setReport(result);
      setIsPending(false);

      const url = new URL(window.location.href);
      url.searchParams.set("age", String(parsed));
      window.history.replaceState({}, "", url.toString());

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (window.innerWidth < 960) {
        stageRef.current?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    }, 620);

    return true;
  }, []);

  useEffect(() => {
    const initialAge = getAgeFromUrl();

    if (initialAge) {
      setAge(initialAge);
      runAudit(initialAge);
    }
  }, [runAudit]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runAudit(age);
  }

  function handleReset() {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setAge("");
    setReport(null);
    setError("");
    setIsPending(false);

    const url = new URL(window.location.href);
    url.searchParams.delete("age");
    window.history.replaceState({}, "", url.toString());
  }

  return (
    <div className="page">
      <a href="#stage" className="skip-link">
        Skip to report
      </a>

      <header className="site-header">
        <span className="site-header-brand">Bureau of Cosmic Insignificance</span>
        <span className="site-header-note">Department of Unnecessary Audits</span>
      </header>

      <main className="shell">
        <section className="intake paper-noise" aria-label="Application intake form">
          <div className="form-top">
            <span className="label">Form 7B / Cosmic Significance Audit</span>
            <span className="label">Deadline: irrelevant</span>
          </div>

          <h1 className="title">
            Bureau of
            <br />
            Cosmic
            <br />
            Insignificance
          </h1>

          <p className="subhead">
            Enter your age. We will calculate how hard the universe is pretending not
            to notice you.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="age" className="label">
                Age of applicant
              </label>
              <input
                id="age"
                name="age"
                value={age}
                onChange={(event) => setAge(event.target.value)}
                inputMode="numeric"
                autoComplete="off"
                placeholder="27"
                disabled={isPending}
              />
            </div>

            {error ? (
              <p className="error" role="alert">
                {error}
              </p>
            ) : null}

            <div className="form-actions">
              <button className="button" type="submit" disabled={isPending}>
                {isPending ? "Auditing..." : "Generate dread"}
              </button>

              {report ? (
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={handleReset}
                  disabled={isPending}
                >
                  New applicant
                </button>
              ) : null}
            </div>
          </form>

          <p className="fine-print">
            Results are legally binding in zero jurisdictions.
          </p>
        </section>

        <section id="stage" ref={stageRef} className="stage" aria-live="polite">
          {report ? (
            <DreadReportView data={report} onReset={handleReset} />
          ) : (
            <div className={`empty ${isPending ? "empty-loading" : ""}`}>
              <div className="empty-stamp">
                {isPending ? "Auditing cosmic indifference" : "Awaiting existential input"}
              </div>
              <p className="empty-note">
                The department is open 24/7 because time is a construct and also we
                have no staff.
              </p>
              <div className="empty-orbit" aria-hidden="true">
                <span />
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <span>No rights reserved. The void permits all.</span>
        <span>Form 7B / Rev. ∞</span>
      </footer>
    </div>
  );
}
