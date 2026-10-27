'use client';

import { useEffect, type ElementType, type ReactNode, type RefObject } from 'react';
import { gsap, ScrollTrigger, prefersReduced } from '@/lib/gsap';

/** Heading with a masked line reveal. */
export function Mask({
  as: Tag = 'h2',
  className = '',
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`mask ${className}`}>
      <span className="mask-in" data-reveal="mask">
        {children}
      </span>
    </Tag>
  );
}

/**
 * Scroll-triggered reveals for everything marked data-reveal inside `scope`:
 *   mask  – line rise            img   – clip + scale
 *   rule  – divider draw         up    – staggered rise (batched)
 *   data-parallax="n" – subtle scroll-linked drift (n = percent)
 * Hidden start states come from CSS (html.js) so there is no flash; they are skipped for reduced motion.
 */
export function useReveals(scope: RefObject<HTMLElement | null>, ready = true) {
  useEffect(() => {
    const root = scope.current;
    if (!ready || !root || prefersReduced()) return;
    (window as unknown as { __dcReveal?: boolean }).__dcReveal = true;

    const q = <T extends HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel, root);

    const ctx = gsap.context(() => {
      q('[data-reveal="mask"]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el.parentElement ?? el,
          start: 'top 92%',
          once: true,
          onEnter: () =>
            gsap.fromTo(el, { yPercent: 112, visibility: 'visible' }, { yPercent: 0, duration: 1.05, ease: 'power4.out' }),
        });
      });

      q('[data-reveal="img"]').forEach((el) => {
        const inner = el.querySelector('.photo-in');
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el,
              { clipPath: 'inset(0% 0% 100% 0%)', visibility: 'visible' },
              { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut' },
            );
            if (inner) gsap.fromTo(inner, { scale: 1.22 }, { scale: 1, duration: 1.8, ease: 'power3.out' });
          },
        });
      });

      q('[data-reveal="rule"]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 95%',
          once: true,
          onEnter: () =>
            gsap.fromTo(el, { scaleX: 0, visibility: 'visible' }, { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }),
        });
      });

      ScrollTrigger.batch(q('[data-reveal="up"]'), {
        start: 'top 92%',
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 28, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true },
          ),
      });

      q('[data-parallax]').forEach((el) => {
        const amt = parseFloat(el.dataset.parallax ?? '0');
        if (!amt) return;
        gsap.fromTo(
          el,
          { yPercent: -amt },
          {
            yPercent: amt,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const t = setTimeout(refresh, 700);
    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(t);
      ctx.revert();
    };
  }, [scope, ready]);
}
