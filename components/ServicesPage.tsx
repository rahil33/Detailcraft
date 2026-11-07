'use client';

import { useRef } from 'react';
import type { Images } from '@/lib/images';
import Nav from './Nav';
import Footer from './Footer';
import Inquiry from './Inquiry';
import Smooth from './Smooth';
import Vid from './Vid';
import Pic, { U } from './Pic';
import { QuoteButton } from './QuoteModal';
import { TLink, useTransition } from './TransitionProvider';
import { Mask, useReveals } from './Reveal';

const SERVICES: { name: string; text: string; img: string; photo?: string; video?: string; href?: string }[] = [
  { name: 'Exterior detailing', img: '/images/exterior-poster.jpg', video: '/video/exterior.mp4', text: 'A careful hand wash, decontamination and machine polish remove grime and swirl marks, then wax or sealant locks in the gloss. Every exterior leaves cleaner, deeper and protected.' },
  { name: 'Interior detailing', img: '/images/seg-vans.webp', photo: 'ovrOPhu8vSw', text: 'The cabin is cleaned surface by surface, from a light refresh to a deep shampoo. Seats, mats, glass and trim come back fresh, and the car smells as good as it looks.' },
  { name: 'Ceramic coating', img: '/images/ceramic-poster.jpg', video: '/video/ceramic.mp4', text: 'A durable ceramic layer bonds to cured paint for a mirror-like, water-beading finish that is far easier to keep clean, with simple care advice to keep it performing.' },
  { name: 'PPF & paint correction', img: '/images/seg-performance.webp', photo: 'MN3_noM5mCo', text: 'We refine the paint first, then protect it with film planned around how you drive and park. Some vehicles stay overnight so the work is never rushed.' },
  { name: 'Aircraft appearance management', img: '/images/air-hero.jpg', href: '/aviation', text: 'Aviation-certified products and trained crews care for business aircraft, with ramp support at Chennai airport and fast turnarounds between flights.' },
];

export default function ServicesPage({ images }: { images: Images }) {
  const main = useRef<HTMLElement>(null);
  const { covered } = useTransition();
  useReveals(main, !covered);
  void images;

  return (
    <main id="main" ref={main} className="world-auto">
      <Smooth />
      <Nav world="auto" />

      <section className="sp-hero">
        <div className="sp-hero-media" aria-hidden="true">
          <Vid src="/video/exterior.mp4" poster="/images/exterior-poster.jpg" className="sp-hero-vid" />
        </div>
        <p className="ah-kicker" data-reveal="up">Services · Chennai</p>
        <h1 className="mask ah-title" aria-label="Care, in every detail.">
          <span className="mask-in" data-reveal="mask" aria-hidden="true">Care, in<br />every detail.</span>
        </h1>
        <p className="ah-lead" data-reveal="up">Tell us what the vehicle needs. Every job is quoted exactly, with no surprises.</p>
        <div className="ah-cta" data-reveal="up">
          <QuoteButton className="btn btn-solid" topic={{ world: 'auto' }}>Get a quote</QuoteButton>
          <TLink href="/aviation" className="btn btn-line">Aviation services</TLink>
        </div>
      </section>

      <section className="sp-what" aria-labelledby="wh-h">
        <Mask as="h2" className="display"><span id="wh-h">What we do.</span></Mask>
        {SERVICES.map((v, i) => (
          <article key={v.name} className={`sp-row ${i % 2 ? 'sp-rev' : ''}`}>
            <figure data-reveal="img">
              {v.video ? (
                <Vid src={v.video} poster={v.img} label={v.name} className="sp-media" />
              ) : (
                <Pic src={v.photo ? U(v.photo, 1400) : v.img} fallback={v.img} alt={v.name} className="sp-media" />
              )}
            </figure>
            <div>
              <span className="au-n">{String(i + 1).padStart(2, '0')}</span>
              <h3 data-reveal="up">{v.name}</h3>
              <p data-reveal="up">{v.text}</p>
              {v.href ? (
                <TLink href={v.href} className="btn btn-line">Explore aviation →</TLink>
              ) : (
                <QuoteButton className="btn btn-line" topic={{ world: 'auto', service: v.name }}>Request a quote</QuoteButton>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="sp-proc" aria-labelledby="pr-h">
        <Mask as="h2" className="display"><span id="pr-h">How we work.</span></Mask>
        <p className="sp-proc-p" data-reveal="up">Send us an inquiry by phone, WhatsApp or email and we will review the vehicle, its paint condition and your schedule. You get a clear quote for the exact work, our specialists carry it out by hand, and the vehicle is released after a final quality check.</p>
      </section>

      <Inquiry world="auto" defaultService="Automotive — Full Detail" />
      <Footer world="auto" />
    </main>
  );
}
