export default function CareScope({ indifference }: { indifference: number }) {
  const care = Math.max(0, 100 - indifference);
  const markerX = 24 + Math.min(552, care * 5.5);

  return (
    <div className="chart">
      <svg viewBox="0 0 600 110" aria-label="Universe concern seismograph">
        <path
          pathLength={1}
          className="scope-line"
          d="M0 68 L84 68 L98 30 L116 88 L134 24 L153 72 L172 68 L600 68"
        />
        <circle className="scope-dot" cx={markerX} cy="68" r="5" />
      </svg>

      <div className="small-note">
        Observed cosmic concern: {care.toExponential(3)}%
      </div>
    </div>
  );
}
