'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReduced } from '@/lib/gsap';

/** Top-down business jet, drawn as a clean silhouette facing right. */
function Jet({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 80" aria-hidden="true" focusable="false">
      <g fill="currentColor">
        <path d="M6 40 C6 36 30 34 110 33.5 L168 35.5 C188 37.5 197 40 197 40 C197 40 188 42.5 168 44.5 L110 46.5 C30 46 6 44 6 40 Z" />
        <path d="M96 34 L66 4 L80 4 L132 34 Z" />
        <path d="M96 46 L66 76 L80 76 L132 46 Z" />
        <path d="M22 36 L8 20 L17 20 L38 35 Z" />
        <path d="M22 44 L8 60 L17 60 L38 45 Z" />
        <ellipse cx="82" cy="19" rx="9" ry="3.2" />
        <ellipse cx="82" cy="61" rx="9" ry="3.2" />
      </g>
    </svg>
  );
}

/** Jets crossing the hero sky with fading contrails. Decorative, loops quietly, honours reduced motion. */
export function HeroFlight() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-fly]').forEach((f, i) => {
        const dur = Number(f.dataset.dur) || 24;
        const dir = f.dataset.dir === 'rtl' ? -1 : 1;
        gsap.set(f, { xPercent: dir === 1 ? -130 : 130, opacity: 0 });
        gsap
          .timeline({ repeat: -1, delay: i * 7 + 1.5, repeatDelay: 3 })
          .to(f, { opacity: 1, duration: 1.4, ease: 'none' }, 0)
          .to(f, { xPercent: dir === 1 ? 130 : -130, duration: dur, ease: 'none' }, 0)
          .to(f, { y: dir === 1 ? -26 : 20, duration: dur, ease: 'sine.inOut' }, 0)
          .to(f, { opacity: 0, duration: 1.6, ease: 'none' }, dur - 1.6);
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="fo" aria-hidden="true">
      <div className="fo-lane fo-lane-a">
        <div className="fo-craft" data-fly data-dur="26" data-dir="ltr">
          <i className="fo-trail" />
          <Jet className="fo-jet" />
        </div>
      </div>
      <div className="fo-lane fo-lane-b">
        <div className="fo-craft fo-small" data-fly data-dur="18" data-dir="rtl">
          <Jet className="fo-jet fo-flip" />
          <i className="fo-trail fo-trail-r" />
        </div>
      </div>
    </div>
  );
}

/** A scroll-linked flight across a dotted route: the jet follows the page as it is scrolled. */
export function FlightPath() {
  const sec = useRef<HTMLElement>(null);
  const jet = useRef<HTMLDivElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const route = useRef<SVGPathElement>(null);

  useEffect(() => {
    const s = sec.current;
    const j = jet.current;
    const r = route.current;
    const t = trail.current;
    if (!s || !j || !r || !t) return;
    const len = r.getTotalLength();
    t.style.strokeDasharray = `${len}`;
    const place = (p: number) => {
      const pt = r.getPointAtLength(len * p);
      const a = r.getPointAtLength(Math.min(len, len * p + 2));
      const b = r.getPointAtLength(Math.max(0, len * p - 2));
      const ang = (Math.atan2(a.y - b.y, a.x - b.x) * 180) / Math.PI;
      j.style.left = `${(pt.x / 1000) * 100}%`;
      j.style.top = `${(pt.y / 200) * 100}%`;
      j.style.transform = `translate(-50%, -50%) rotate(${ang}deg)`;
      t.style.strokeDashoffset = `${len * (1 - p)}`;
    };
    place(prefersReduced() ? 0.5 : 0);
    if (prefersReduced()) return;
    const st = ScrollTrigger.create({
      trigger: s,
      start: 'top 92%',
      end: 'bottom 18%',
      scrub: 0.6,
      onUpdate: (self) => place(self.progress),
    });
    return () => st.kill();
  }, []);

  return (
    <section ref={sec} className="fp" aria-label="From the Chennai ramp to yours">
      <div className="fp-stage">
        <svg className="fp-svg" viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path ref={route} className="fp-route" d="M40 150 C 280 150, 360 40, 560 70 S 840 150, 960 60" />
          <path ref={trail} className="fp-trail" d="M40 150 C 280 150, 360 40, 560 70 S 840 150, 960 60" />
        </svg>
        <div ref={jet} className="fp-jet" aria-hidden="true">
          <Jet />
        </div>
        <span className="fp-code fp-code-a">
          <b>VOMM</b>
          <i>Chennai</i>
        </span>
        <span className="fp-code fp-code-b">
          <b>Your ramp</b>
          <i>Wherever you land</i>
        </span>
      </div>
      <p className="fp-line">From our base at Chennai Airport to the ramp where your aircraft is waiting.</p>
    </section>
  );
}
