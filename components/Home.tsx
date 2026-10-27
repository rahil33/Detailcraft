'use client';

import { useCallback, useEffect, useRef, useState, type FocusEvent, type KeyboardEvent, type PointerEvent } from 'react';
import { gsap, prefersReduced, useIsoLayoutEffect } from '@/lib/gsap';
import { TLink, useTransition } from './TransitionProvider';
import Photo from './Photo';
import Nav from './Nav';
import Footer from './Footer';
import { Mask, useReveals } from './Reveal';
import type { Images } from '@/lib/images';
import { MISSION, TAGLINE, VISION } from '@/lib/content';

type World = 'auto' | 'air';
type Active = 'rest' | World;

const SKEW = 4; // diagonal lean of the dividing edge, in % of width
const WORD = 'DETAILCRAFT'.split('');
const FINE_WIDE = '(min-width: 900px) and (hover: hover) and (pointer: fine)';

export default function Home({ images }: { images: Images }) {
  const main = useRef<HTMLElement>(null);
  const root = useRef<HTMLElement>(null);
  const autoLayer = useRef<HTMLDivElement>(null);
  const autoA = useRef<HTMLAnchorElement>(null);
  const airA = useRef<HTMLAnchorElement>(null);
  const lineEl = useRef<SVGLineElement>(null);
  const pre = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  const split = useRef({ v: 70 });
  const horizontal = useRef(true);
  const introDone = useRef(false);
  const tween = useRef<gsap.core.Tween | null>(null);
  const activeRef = useRef<Active>('rest');
  const downActive = useRef<Active>('rest');
  const depth = useRef<{ x: (v: number) => void; d: number }[]>([]);

  const [active, setActive] = useState<Active>('rest');
  const [loaded, setLoaded] = useState(false);
  const { covered } = useTransition();
  const ready = loaded && !covered;

  /** Where the dividing edge sits (percent of width, or of height on small screens) for each state. */
  const targetFor = (a: Active) =>
    horizontal.current ? (a === 'auto' ? 78 : a === 'air' ? 38 : 70) : a === 'auto' ? 80 : a === 'air' ? 42 : 68;

  const apply = useCallback(() => {
    const r = root.current;
    if (!r) return;
    const v = split.current.v;
    r.style.setProperty('--s', v.toFixed(2));
    const a = autoLayer.current;
    if (horizontal.current) {
      if (a) a.style.clipPath = `polygon(0 0, ${v + SKEW}% 0, ${v - SKEW}% 100%, 0 100%)`;
      const l = lineEl.current;
      if (l) {
        l.setAttribute('x1', String(v + SKEW));
        l.setAttribute('x2', String(v - SKEW));
      }
    } else if (a) {
      a.style.clipPath = 'none';
    }
  }, []);

  const select = useCallback(
    (a: Active) => {
      if (activeRef.current === a) return;
      activeRef.current = a;
      setActive(a);
      if (!introDone.current) return;
      tween.current?.kill();
      tween.current = gsap.to(split.current, {
        v: targetFor(a),
        duration: prefersReduced() ? 0 : 1,
        ease: 'power3.out',
        onUpdate: apply,
      });
    },
    [apply],
  );

  /* Initial (pre-paint) state: the automotive world covers everything until the intro opens it up. */
  useIsoLayoutEffect(() => {
    const r = root.current;
    if (!r) return;
    horizontal.current = window.matchMedia(FINE_WIDE).matches;
    if (prefersReduced()) {
      split.current.v = targetFor('rest');
      introDone.current = true;
    } else {
      split.current.v = 104;
      introDone.current = false;
      gsap.set(gsap.utils.toArray('.dw-letter', r), { yPercent: 118 });
      gsap.set(gsap.utils.toArray('.dw-fade', r), { autoAlpha: 0, y: 30 });
      gsap.set(gsap.utils.toArray('.photo-in', r), { scale: 1.25 });
    }
    apply();
  }, [apply]);

  /* Layout mode follows the device: side-by-side with hover on desktop, stacked tap-to-select otherwise. */
  useEffect(() => {
    const mq = window.matchMedia(FINE_WIDE);
    const onChange = () => {
      horizontal.current = mq.matches;
      if (introDone.current) {
        split.current.v = targetFor(activeRef.current);
        apply();
      }
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [apply]);

  /* Preloader */
  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains('seen')) {
      setLoaded(true);
      return;
    }
    const el = pre.current;
    const finish = () => {
      try {
        sessionStorage.setItem('dc-seen', '1');
      } catch {}
      html.classList.add('seen');
    };
    if (!el) {
      setLoaded(true);
      return;
    }
    const c = { n: 0 };
    const safety = setTimeout(() => {
      setLoaded(true);
      finish();
    }, 7000);
    const tl = gsap.timeline({ onComplete: () => (clearTimeout(safety), finish()) });
    tl.fromTo('.pre-letter', { yPercent: 115 }, { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.06 }, 0.2)
      .fromTo('.pre-meta', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 0.5)
      .to(
        c,
        {
          n: 100,
          duration: 2,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counter.current) counter.current.textContent = String(Math.round(c.n)).padStart(3, '0');
          },
        },
        0.2,
      )
      .to('.pre-letter', { yPercent: -115, duration: 0.8, ease: 'power3.in', stagger: 0.03 }, '+=0.2')
      .add(() => setLoaded(true))
      .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'power3.inOut' }, '<');
    return () => {
      clearTimeout(safety);
      tl.kill();
    };
  }, []);

  /* Entrance: the automotive world opens to 70 / 30, the wordmark rises, copy settles in. */
  useEffect(() => {
    const r = root.current;
    if (!ready || !r || introDone.current || prefersReduced()) return;
    const tl = gsap.timeline({
      onComplete: () => {
        introDone.current = true;
        split.current.v = targetFor(activeRef.current);
        apply();
      },
    });
    tl.to(split.current, { v: targetFor('rest'), duration: 1.7, ease: 'expo.inOut', onUpdate: apply }, 0)
      .to(gsap.utils.toArray('.photo-in', r), { scale: 1, duration: 2.2, ease: 'power3.out' }, 0)
      .to(gsap.utils.toArray('.dw-letter', r), { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.05 }, 0.5)
      .to(gsap.utils.toArray('.dw-fade', r), { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1 }, 1);
    return () => {
      tl.kill();
    };
  }, [ready, apply]);

  /* Layered depth: each world's photograph drifts against the cursor. */
  useEffect(() => {
    const r = root.current;
    if (!r || prefersReduced()) return;
    const set = (sel: string, d: number) => {
      const node = r.querySelector<HTMLElement>(sel);
      return node ? { x: gsap.quickTo(node, 'x', { duration: 0.9, ease: 'power3' }), d } : null;
    };
    depth.current = [set('.dw-zone-auto .photo-in', 26), set('.dw-zone-air .photo-in', -18)].filter(
      Boolean,
    ) as typeof depth.current;
  }, []);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!horizontal.current || e.pointerType !== 'mouse' || !introDone.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    select(x < split.current.v ? 'auto' : 'air');
    const nx = (x / 100 - 0.5) * 2;
    depth.current.forEach(({ x: qx, d }) => qx(nx * d));
  };

  const onLeave = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || !horizontal.current) return;
    select('rest');
    depth.current.forEach(({ x: qx }) => qx(0));
  };

  const onKey = (e: KeyboardEvent<HTMLElement>) => {
    const prev = ['ArrowLeft', 'ArrowUp'].includes(e.key);
    const next = ['ArrowRight', 'ArrowDown'].includes(e.key);
    if (!prev && !next) return;
    e.preventDefault();
    (prev ? autoA : airA).current?.focus();
  };

  const onBlur = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) select('rest');
  };

  /** Touch / narrow screens: first tap selects a panel, the second (or ENTER) goes in. */
  const zoneClick = (w: World) => (e: React.MouseEvent) => {
    if (false && !horizontal.current && e.detail > 0 && downActive.current !== w) {
      e.preventDefault();
      select(w);
    }
  };

  const zoneProps = (w: World) => ({
    onFocus: () => select(w),
    onPointerDown: () => {
      downActive.current = activeRef.current;
    },
    onClick: zoneClick(w),
  });

  useReveals(main, ready);

  return (
    <main id="main" ref={main} className="home">
      <Nav world="home" />

      <div ref={pre} className="preloader" aria-hidden="true">
        <noscript>
          <style>{`.preloader{display:none!important}`}</style>
        </noscript>
        <p className="pre-meta">{TAGLINE}</p>
        <div className="pre-word">
          {WORD.map((l, i) => (
            <span key={i} className="pre-mask">
              <span className="pre-letter">{l}</span>
            </span>
          ))}
        </div>
        <div className="pre-foot">
          <i className="dot" />
          <span ref={counter} className="pre-count">
            000
          </span>
        </div>
      </div>

      <section
        ref={root}
        className="dw"
        data-active={active}
        aria-label="Choose your world"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onKeyDown={onKey}
        onBlur={onBlur}
      >
        {/* Aviation — the continuous canvas underneath */}
        <div className="dw-layer dw-layer-air">
          <TLink
            ref={airA}
            href="/aviation"
            className="dw-zone dw-zone-air"
            aria-label="Enter Aviation Services"
            data-cursor="Enter"
            {...zoneProps('air')}
          >
            <Photo src={images['air-hero']} kind="air" slot="air-hero" priority sizes="60vw" />
            <span className="dw-grade dw-grade-air" />
            <span className="dw-content dw-content-air">
              <span className="dw-kicker dw-fade">02 — Aviation Services</span>
              <span className="dw-title dw-title-air dw-fade">Aviation</span>
              <span className="dw-lede dw-fade">
                Aircraft appearance management for business aviation, with ramp support at VOMM Chennai.
              </span>
              <span className="dw-enter dw-fade">
                <i aria-hidden="true">→</i>
                <b>Enter aviation</b>
              </span>
            </span>
            <span className="dw-vert dw-vert-air" aria-hidden="true">
              Aviation
            </span>
          </TLink>
        </div>

        {/* Automotive — dominant, masked by a leaning edge that moves with the cursor */}
        <div ref={autoLayer} className="dw-layer dw-layer-auto">
          <TLink
            ref={autoA}
            href="/automotive"
            className="dw-zone dw-zone-auto"
            aria-label="Enter Automotive Care"
            data-cursor="Enter"
            {...zoneProps('auto')}
          >
            <Photo src={images['auto-hero'] ?? images['seg-supercars']} kind="auto" slot="auto-hero" priority sizes="100vw" art="retro" place="right" />
            <span className="dw-grade dw-grade-auto" />
            <span className="dw-content dw-content-auto">
              <span className="dw-kicker dw-fade">01 — Automotive Care</span>
              <span className="dw-title dw-title-auto dw-fade">Automotive</span>
              <span className="dw-lede dw-fade">
                Exterior and interior detailing, paint correction, ceramic coating and protection — for cars kept to a
                higher standard.
              </span>
              <span className="dw-enter dw-fade">
                <i aria-hidden="true">→</i>
                <b>Enter automotive</b>
              </span>
            </span>
            <span className="dw-vert dw-vert-auto" aria-hidden="true">
              Automotive
            </span>
          </TLink>
        </div>

        <p className="dw-choose" aria-hidden="true">
          Choose your world
        </p>

        <svg className="dw-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line ref={lineEl} x1="74" y1="0" x2="66" y2="100" vectorEffect="non-scaling-stroke" />
        </svg>

        <h1 className="dw-word" aria-label="DetailCraft">
          {WORD.map((l, i) => (
            <span key={i} className="dw-mask" aria-hidden="true">
              <span className="dw-letter">{l}</span>
            </span>
          ))}
        </h1>

        <div className="dw-foot dw-fade" aria-hidden="true">
          <span>{TAGLINE}</span>
          <span className="dw-scroll">
            <i className="dot" /> Scroll
          </span>
        </div>
      </section>

      <section className="vm" aria-labelledby="vm-h">
        <Mask as="h2" className="vm-big display">
          <span id="vm-h">Preserved, not just cleaned.</span>
        </Mask>
        <div className="vm-cols">
          <article>
            <h3 data-reveal="up">Our vision</h3>
            <p data-reveal="up">{VISION}</p>
          </article>
          <article>
            <h3 data-reveal="up">Our mission</h3>
            <p data-reveal="up">{MISSION}</p>
          </article>
        </div>
        <div className="vm-rule" data-reveal="rule" />
        <div className="vm-ctas">
          <TLink href="/automotive" className="btn btn-solid" data-cursor="Enter">
            Automotive care
          </TLink>
          <TLink href="/aviation" className="btn btn-line">
            Aviation services
          </TLink>
        </div>
      </section>

      <Footer world="home" />
    </main>
  );
}
