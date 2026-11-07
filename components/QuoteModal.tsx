'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { CONTACT } from '@/lib/content';

type Topic = { world: 'auto' | 'air' | 'home'; service?: string };
const EVENT = 'dc:quote';

/** Button that opens the quote chooser (WhatsApp or email). */
export function QuoteButton({
  className = 'btn btn-solid',
  topic = { world: 'home' },
  children,
  onClick,
  ...rest
}: {
  className?: string;
  topic?: Topic;
  children: ReactNode;
  onClick?: () => void;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        window.dispatchEvent(new CustomEvent<Topic>(EVENT, { detail: topic }));
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

const lead = (t: Topic) =>
  t.world === 'air'
    ? 'Hello DetailCraft, I would like a quote for aircraft detailing.'
    : t.world === 'auto'
      ? 'Hello DetailCraft, I would like a quote for vehicle detailing.'
      : 'Hello DetailCraft, I would like a quote.';

export default function QuoteModal() {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<Topic>({ world: 'home' });
  const panel = useRef<HTMLDivElement>(null);
  const last = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    last.current?.focus();
  }, []);

  useEffect(() => {
    const on = (e: Event) => {
      last.current = document.activeElement as HTMLElement;
      setTopic((e as CustomEvent<Topic>).detail ?? { world: 'home' });
      setOpen(true);
    };
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector<HTMLElement>('a,button')?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && panel.current) {
        const f = Array.from(panel.current.querySelectorAll<HTMLElement>('a,button'));
        const first = f[0];
        const lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', key);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', key);
    };
  }, [open, close]);

  if (!open) return null;
  const text = topic.service ? `${lead(topic)}\nService: ${topic.service}` : lead(topic);
  const subject = topic.world === 'air' ? 'Aircraft detailing quote request' : 'Detailing quote request';

  return (
    <div className="qm" data-world={topic.world} onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="qm-panel" role="dialog" aria-modal="true" aria-labelledby="qm-h" ref={panel}>
        <button type="button" className="qm-x" onClick={close} aria-label="Close">
          ×
        </button>
        <p className="qm-k">Request a quote</p>
        <h2 id="qm-h">How would you like to reach us?</h2>
        <p className="qm-s">We reply with a clear quotation for your vehicle or aircraft. Choose whichever is easiest.</p>
        <div className="qm-opts">
          <a
            className="qm-opt qm-wa"
            href={`${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            <b>WhatsApp</b>
            <span>Message us directly · {CONTACT.phone}</span>
          </a>
          <a
            className="qm-opt"
            href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text + '\n\nName:\nPhone:\nVehicle / aircraft:\n')}`}
            onClick={close}
          >
            <b>Email</b>
            <span>{CONTACT.email}</span>
          </a>
        </div>
        <a className="qm-more" href="#inquire" onClick={close}>
          Or fill in the detailed form
        </a>
      </div>
    </div>
  );
}
