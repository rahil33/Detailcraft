'use client';
import { useEffect } from 'react';

/** Lightweight inertial smooth scroll + scroll-progress bar + parallax. Skipped for reduced motion / touch. */
export default function Smooth() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>('.au-bar');
    const par = [...document.querySelectorAll<HTMLElement>('[data-par]')];
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let target = scrollY, cur = scrollY, raf = 0, wheel = false;
    const max = () => document.documentElement.scrollHeight - innerHeight;
    const paint = () => {
      if (bar) bar.style.transform = `scaleX(${max() > 0 ? scrollY / max() : 0})`;
      par.forEach((el) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate3d(0,${(r.top + r.height / 2 - innerHeight / 2) * -Number(el.dataset.par) / 100}px,0) scale(1.12)`;
      });
    };
    const tick = () => {
      cur += (target - cur) * 0.085;
      if (Math.abs(target - cur) < 0.4) { cur = target; wheel = false; } else raf = requestAnimationFrame(tick);
      scrollTo(0, cur);
    };
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      e.preventDefault();
      if (!wheel) { cur = scrollY; wheel = true; }
      target = Math.max(0, Math.min(max(), target + e.deltaY));
      cancelAnimationFrame(raf); raf = requestAnimationFrame(tick);
    };
    const sync = () => { if (!wheel) target = cur = scrollY; paint(); };
    addEventListener('scroll', sync, { passive: true });
    if (!reduce && matchMedia('(hover: hover)').matches) addEventListener('wheel', onWheel, { passive: false });
    paint();
    return () => { cancelAnimationFrame(raf); removeEventListener('scroll', sync); removeEventListener('wheel', onWheel); };
  }, []);
  return <div className="au-bar" aria-hidden="true" />;
}
