"use client";

import { useState } from "react";
import type { DreadReport } from "@/lib/dread";
import CosmicDial from "@/components/CosmicDial";
import CareScope from "@/components/CareScope";

export default function DreadReportView({
  data,
  onReset,
}: {
  data: DreadReport;
  onReset: () => void;
}) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="report">
      <div className="report-head panel">
        <div>
          <div className="stamp">Dread report issued</div>
          <h2 className="report-title">Official Audit of Your Significance</h2>
        </div>

        <div className="meta">
          CASE {data.caseId}
          <br />
          APPLICANT AGE: {data.age}
          <br />
          GENERATED: {data.generatedAt}
        </div>
      </div>

      <div className="grid">
        <section className="panel span-5">
          <h3 className="panel-title">Probability of being a main character</h3>
          <CosmicDial value={data.mainCharacter} />
        </section>

        <section className="panel span-7">
          <h3 className="panel-title">
            How much the universe cares about your coffee order
          </h3>
          <CareScope indifference={data.coffeeIndifference} />
        </section>

        <section className="panel span-12">
          <h3 className="panel-title">Itemized insignificance</h3>
          <div className="receipt">
            {data.receipt.map((row) => (
              <div className="receipt-row" key={row.label}>
                <span>{row.label}</span>
                <strong
                  className={
                    row.tone === "demean" ? "receipt-value-demean" : undefined
                  }
                >
                  {row.value}
                </strong>
              </div>
            ))}
          </div>
        </section>

        <section className="panel span-12">
          <h3 className="panel-title">Final determination</h3>
          <p className="verdict">{data.verdict}</p>

          <ul className="omens">
            {data.omens.map((omen) => (
              <li key={omen}>{omen}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="panel report-actions">
        <button type="button" className="ghost-button" onClick={copyLink}>
          {copied ? "Copied" : "Copy link"}
        </button>

        <button
          type="button"
          className="ghost-button"
          onClick={() => window.print()}
        >
          Print report
        </button>

        <button type="button" className="ghost-button" onClick={onReset}>
          File another applicant
        </button>
      </section>
    </div>
  );
}
