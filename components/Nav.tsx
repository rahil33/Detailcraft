'use client';

import { useEffect, useState } from 'react';
import { TLink } from './TransitionProvider';
import { QuoteButton } from './QuoteModal';
import { CONTACT } from '@/lib/content';

export default function Nav({ world }: { world: 'home' | 'auto' | 'air' }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (world === 'home') return;
    const on = () => setSolid(window.scrollY > 80);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [world]);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', esc);
      document.body.style.overflow = '';
    };
  }, [open]);


  return (
    <header className={`nav nav-${world} ${solid ? 'is-solid' : ''} ${open ? 'is-open' : ''}`}>
      <TLink href="/" className="nav-brand" aria-label="DetailCraft — home" onClick={() => setOpen(false)}>
        <i className="dot" />
        <span>DETAILCRAFT</span>
      </TLink>

      <nav className="nav-links" aria-label="Primary">
        <TLink href="/automotive" aria-current={world === 'auto' ? 'page' : undefined} data-cursor="Auto">
          Automotive
        </TLink>
        <TLink href="/aviation" aria-current={world === 'air' ? 'page' : undefined} data-cursor="Air">
          Aviation
        </TLink>
        <QuoteButton className="nav-cta" topic={{ world }} data-cursor="Quote">
          Get a quote
        </QuoteButton>
      </nav>

      <button
        type="button"
        className="nav-burger"
        aria-expanded={open}
        aria-controls="menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr">{open ? 'Close menu' : 'Open menu'}</span>
        <i />
        <i />
      </button>

      <div id="menu" className="menu" hidden={!open}>
        <TLink href="/automotive" onClick={() => setOpen(false)}>
          Automotive
        </TLink>
        <TLink href="/aviation" onClick={() => setOpen(false)}>
          Aviation
        </TLink>
        <QuoteButton className="menu-quote" topic={{ world }} onClick={() => setOpen(false)}>
          Get a quote
        </QuoteButton>
        <p>
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <br />
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </p>
      </div>
    </header>
  );
}
