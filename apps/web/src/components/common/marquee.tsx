import type { CSSProperties, ReactNode } from "react";

export function Marquee({
  items,
  durationSeconds = 32,
}: {
  items: ReactNode[];
  durationSeconds?: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden mask-[linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div
        className="aura-marquee-track hover:paused flex w-max gap-3"
        style={{ animationDuration: `${durationSeconds}s` } as CSSProperties}
      >
        {doubled.map((item, i) => (
          <div key={i} className="shrink-0">
            {item}
          </div>
        ))}
      </div>

      <style>{`
        .aura-marquee-track {
          animation: aura-marquee linear infinite;
        }

        @keyframes aura-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .aura-marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
