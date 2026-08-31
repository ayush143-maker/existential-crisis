"use client";

import { useEffect, useState } from "react";

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;

  return {
    x: cx + r * Math.sin(rad),
    y: cy - r * Math.cos(rad),
  };
}

export default function CosmicDial({ value }: { value: number }) {
  const targetAngle = (value / 100) * 180 - 90;
  const [angle, setAngle] = useState(-90);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setAngle(targetAngle);
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [targetAngle]);

  const start = polar(110, 110, 86, -90);
  const end = polar(110, 110, 86, 90);
  const ticks = Array.from({ length: 11 }, (_, index) => -90 + index * 18);

  return (
    <div className="chart">
      <svg viewBox="0 0 220 150" aria-label="Main character probability dial">
        <path
          className="dial-arc"
          d={`M ${start.x} ${start.y} A 86 86 0 0 1 ${end.x} ${end.y}`}
        />

        {ticks.map((tick) => {
          const outer = polar(110, 110, 86, tick);
          const inner = polar(110, 110, 74, tick);

          return (
            <line
              key={tick}
              className="dial-tick"
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
            />
          );
        })}

        <g
          className="dial-needle-group"
          style={{
            transform: `rotate(${angle}deg)`,
            transformOrigin: "110px 110px",
          }}
        >
          <line className="dial-needle" x1="110" y1="110" x2="110" y2="34" />
        </g>

        <circle className="dial-center" cx="110" cy="110" r="6" />

        <text className="dial-value" x="110" y="140" textAnchor="middle">
          {value.toFixed(1)}%
        </text>
      </svg>
    </div>
  );
}
