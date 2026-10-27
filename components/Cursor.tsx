'use client';

import { useEffect, useRef } from 'react';
import { gsap, prefersReduced } from '@/lib/gsap';

/** A single red dot that trails the pointer; grows and carries a label over [data-cursor] targets. */
export default function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine || prefersReduced()) return;

    gsap.set(node, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(node, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(node, 'y', { duration: 0.4, ease: 'power3' });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (!shown) {
        shown = true;
        gsap.set(node, { x: e.clientX, y: e.clientY });
        node.classList.add('on');
      }
      xTo(e.clientX);
      yTo(e.clientY);
      const t = e.target as HTMLElement | null;
      const withLabel = t?.closest<HTMLElement>('[data-cursor]');
      const interactive = t?.closest('a,button,input,select,textarea,label,summary,[role="tab"]');
      node.classList.toggle('big', !!withLabel);
      node.classList.toggle('link', !!interactive && !withLabel);
      if (text.current) text.current.textContent = withLabel?.dataset.cursor ?? '';
    };
    const leave = () => {
      node.classList.remove('on');
      shown = false;
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div ref={el} className="cursor" aria-hidden="true">
      <span ref={text} />
    </div>
  );
}
