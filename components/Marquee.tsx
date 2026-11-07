/** Slow, quiet ticker of vehicle categories. Pure CSS, paused for reduced motion. */
export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="mq" aria-hidden="true">
      <div className="mq-track">
        {row.map((t, i) => (
          <span key={i}>{t}<i className="dot" /></span>
        ))}
      </div>
    </div>
  );
}
