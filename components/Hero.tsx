import type { ReactNode } from 'react';
import Vid from './Vid';

/** Full-bleed hero: looping video (or photo) behind a quiet, left-aligned heading. */
export default function Hero({
  id, kicker, title, lead, actions, video, poster, alt,
}: {
  id: string; kicker: string; title: ReactNode; lead: string; actions: ReactNode; video?: string; poster: string; alt: string;
}) {
  return (
    <section className="hx" aria-labelledby={id}>
      <div className="hx-media">
        {video ? (
          <Vid src={video} poster={poster} label={alt} className="hx-vid" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt={alt} className="hx-vid" />
        )}
      </div>
      <div className="hx-in">
        <p className="ch-kicker" data-reveal="up">{kicker}</p>
        <h1 id={id} className="hx-title" data-reveal="up">{title}</h1>
        <p className="hx-lead" data-reveal="up">{lead}</p>
        <div className="ch-cta hx-cta" data-reveal="up">{actions}</div>
      </div>
    </section>
  );
}
