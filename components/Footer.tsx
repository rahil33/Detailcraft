import Link from 'next/link';
import { CONTACT, TAGLINE } from '@/lib/content';
import { TLink } from './TransitionProvider';

export default function Footer({ world }: { world: 'home' | 'auto' | 'air' }) {
  return (
    <footer className={`foot foot-${world}`}>
      <div className="foot-grid">
        <p className="foot-tag">{TAGLINE}</p>
        <nav aria-label="Footer" className="foot-col">
          <h2 className="foot-h">Explore</h2>
          <TLink href="/">Choose your world</TLink>
          <TLink href="/automotive">Automotive care</TLink>
          <TLink href="/aviation">Aviation services</TLink>
        </nav>
        <div className="foot-col">
          <h2 className="foot-h">Concierge</h2>
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <span>{CONTACT.city}</span>
        </div>
      </div>
      <div className="foot-word" aria-hidden="true">
        DETAILCRAFT
      </div>
      <p className="foot-small">
        © 2026 DetailCraft. All rights reserved. <Link href="/">detailcraft</Link>
      </p>
    </footer>
  );
}
