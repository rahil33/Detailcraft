import type { ReactNode } from 'react';

/** Minimal centered hero: small kicker, restrained heading, short line, actions, then one clear, fully visible image. */
export default function CenterHero({
  id, kicker, title, lead, actions, src, alt, fade = false,
}: {
  id: string; kicker: string; title: ReactNode; lead: string; actions: ReactNode; src: string; alt: string; fade?: boolean;
}) {
  return (
    <section className="ch" aria-labelledby={id}>
      <p className="ch-kicker" data-reveal="up">{kicker}</p>
      <h1 id={id} className="ch-title" data-reveal="up">{title}</h1>
      <p className="ch-lead" data-reveal="up">{lead}</p>
      <div className="ch-cta" data-reveal="up">{actions}</div>
      <figure className={`ch-fig ${fade ? 'ch-fade' : ''}`} data-reveal="img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
      </figure>
    </section>
  );
}
