'use client';

import { useState, type FormEvent } from 'react';
import { CONTACT, INQUIRY_OPTIONS } from '@/lib/content';
import { Mask } from './Reveal';

/**
 * No backend needed: the form composes the enquiry and hands it to the visitor's mail app
 * or WhatsApp, both going to DetailCraft's own contact details.
 */
export default function Inquiry({ world, defaultService }: { world: 'auto' | 'air'; defaultService: string }) {
  const [error, setError] = useState('');

  const compose = (e: FormEvent<HTMLFormElement>, via: 'mail' | 'wa') => {
    e.preventDefault();
    const form = (e.currentTarget as HTMLElement).closest('form') as HTMLFormElement;
    const f = new FormData(form);
    const get = (k: string) => String(f.get(k) ?? '').trim();
    if (!get('name') || (!get('phone') && !get('email'))) {
      setError('Please add your name and a phone number or email so we can reply.');
      return;
    }
    setError('');
    const lines = [
      `Service: ${get('service')}`,
      `Vehicle / aircraft: ${get('asset') || '—'}`,
      `Name: ${get('name')}`,
      `Phone: ${get('phone') || '—'}`,
      `Email: ${get('email') || '—'}`,
      '',
      get('message') || '(no additional notes)',
    ];
    const subject = `DetailCraft enquiry — ${get('service')}`;
    const body = lines.join('\n');
    if (via === 'mail') {
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      window.open(`${CONTACT.whatsapp}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`, '_blank', 'noopener');
    }
  };

  return (
    <section id="inquire" className={`inq inq-${world}`} aria-labelledby="inq-h">
      <div className="inq-head">
        <Mask as="h2" className="display">
          <span id="inq-h">Request a quote</span>
        </Mask>
        <p data-reveal="up">
          Tell us what you drive or fly and what it needs. We will reply with a tailored quotation.
        </p>
        <div className="inq-direct" data-reveal="up">
          <a className="btn btn-solid" href={`${CONTACT.whatsapp}?text=${encodeURIComponent('Hello DetailCraft, I would like a quote.')}`} target="_blank" rel="noopener noreferrer">
            WhatsApp us
          </a>
          <a className="btn btn-line" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Quote request')}`}>
            Email us
          </a>
        </div>
        <ul className="inq-contact" data-reveal="up">
          <li>
            <span>Phone</span>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          </li>
          <li>
            <span>Email</span>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </li>
          <li>
            <span>Based in</span>
            {CONTACT.city}
          </li>
        </ul>
      </div>

      <form className="inq-form" noValidate onSubmit={(e) => compose(e, 'mail')} data-reveal="up">
        <label>
          <span>Service</span>
          <select name="service" defaultValue={defaultService}>
            {INQUIRY_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Vehicle or aircraft</span>
          <input name="asset" type="text" autoComplete="off" placeholder="e.g. make, model, registration" />
        </label>
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" />
        </label>
        <label className="wide">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" />
        </label>
        <label className="wide">
          <span>Notes</span>
          <textarea name="message" rows={4} placeholder="Condition, timing, location, anything we should know" />
        </label>
        <p className="inq-err" role="alert">
          {error}
        </p>
        <div className="inq-actions wide">
          <button type="submit" className="btn btn-solid" data-cursor="Send">
            Send by email
          </button>
          <button type="button" className="btn btn-line" onClick={(e) => compose(e as unknown as FormEvent<HTMLFormElement>, 'wa')}>
            Send on WhatsApp
          </button>
        </div>
      </form>
    </section>
  );
}
