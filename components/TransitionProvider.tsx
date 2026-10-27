'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
} from 'react';
import { gsap, prefersReduced } from '@/lib/gsap';

type Ctx = { go: (href: string) => void; covered: boolean };
const TransitionCtx = createContext<Ctx>({ go: () => {}, covered: false });

export const useTransition = () => useContext(TransitionCtx);

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const cover = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const pending = useRef<{ path: string; hash: string } | null>(null);
  const busy = useRef(false);
  const failsafe = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [covered, setCovered] = useState(false);

  const reveal = useCallback(() => {
    const el = cover.current;
    if (!el) return;
    if (failsafe.current) clearTimeout(failsafe.current);
    const hash = pending.current?.hash;
    pending.current = null;
    window.scrollTo(0, 0);
    setCovered(false); // let the incoming page start its own choreography as the cover lifts
    gsap.to(el, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 0.95,
      delay: 0.1,
      ease: 'power3.inOut',
      onComplete: () => {
        gsap.set(el, { display: 'none' });
        busy.current = false;
        if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'auto' });
      },
    });
  }, []);

  const go = useCallback(
    (href: string) => {
      if (busy.current) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) {
        window.location.href = href;
        return;
      }
      const reduced = prefersReduced();
      if (url.pathname === window.location.pathname) {
        if (url.hash) {
          document.querySelector(url.hash)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
          history.replaceState(null, '', url.hash);
        } else {
          window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
        }
        return;
      }
      if (reduced || !cover.current) {
        router.push(href);
        return;
      }
      busy.current = true;
      setCovered(true);
      const el = cover.current;
      el.dataset.world = url.pathname.startsWith('/aviation') ? 'air' : url.pathname.startsWith('/automotive') ? 'auto' : 'home';
      if (label.current) {
        label.current.textContent =
          el.dataset.world === 'air' ? 'Aviation' : el.dataset.world === 'auto' ? 'Automotive' : 'DetailCraft';
      }
      pending.current = { path: url.pathname, hash: url.hash };
      gsap.set(el, { display: 'grid', clipPath: 'inset(100% 0% 0% 0%)' });
      gsap
        .timeline()
        .to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power3.inOut' })
        .fromTo('.cover-in', { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: 'power4.out' }, '-=0.3')
        .call(() => router.push(href));
      failsafe.current = setTimeout(() => {
        if (busy.current) reveal();
      }, 5000);
    },
    [router, reveal],
  );

  useEffect(() => {
    if (pending.current && pathname === pending.current.path) {
      const t = setTimeout(reveal, 250); // give the new route a beat to mount and layout
      return () => clearTimeout(t);
    }
  }, [pathname, reveal]);

  const value = useMemo(() => ({ go, covered }), [go, covered]);

  return (
    <TransitionCtx.Provider value={value}>
      {children}
      <div ref={cover} className="cover" aria-hidden="true">
        <div className="cover-mask">
          <span className="cover-in">
            <i className="dot" />
            <span ref={label}>DetailCraft</span>
          </span>
        </div>
      </div>
    </TransitionCtx.Provider>
  );
}

type LinkProps = ComponentProps<typeof Link>;

export function TLink({ href, onClick, children, ...rest }: LinkProps) {
  const { go } = useTransition();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const target = typeof href === 'string' ? href : href.pathname ?? '/';
        e.preventDefault();
        go(target);
      }}
    >
      {children}
    </Link>
  );
}
