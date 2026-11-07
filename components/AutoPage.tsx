'use client';

import { useRef } from 'react';
import type { Images } from '@/lib/images';
import { AUTO_PROSE, AUTO_WHY, FAQ } from '@/lib/content';
import Nav from './Nav';
import Footer from './Footer';
import Inquiry from './Inquiry';
import Pic, { U } from './Pic';
import Smooth from './Smooth';
import Hero from './Hero';
import Vid from './Vid';
import { QuoteButton } from './QuoteModal';
import { TLink, useTransition } from './TransitionProvider';
import { Mask, useReveals } from './Reveal';

export default function AutoPage({ images }: { images: Images }) {
  const main = useRef<HTMLElement>(null);
  const { covered } = useTransition();
  useReveals(main, !covered);

  return (
    <main id="main" ref={main} className="world-auto">
      <Smooth />
      <Nav world="auto" />

      <Hero
        id="ah-h"
        kicker="Automotive care · Chennai"
        title="Beyond clean."
        lead="Luxury detailing for automobiles. Precision, exclusivity and a flawless finish."
        actions={
          <>
            <QuoteButton className="btn btn-solid" topic={{ world: 'auto' }} data-cursor="Quote">Get a quote</QuoteButton>
            <TLink href="#inquire" className="btn btn-line">Book consultation</TLink>
          </>
        }
        video="/video/exterior.mp4"
        poster="/images/exterior-poster.jpg"
        alt="Machine polishing a black car"
      />

      <section className="au-svc" id="services" aria-labelledby="svc-h">
        <p className="svc-kicker" data-reveal="up">Our services</p>
        <Mask as="h2" className="display"><span id="svc-h">The work.</span></Mask>
        {AUTO_PROSE.map((s, i) => (
          <article key={s.name} className={`au-row ${i % 2 ? 'au-rev' : ''}`}>
            <figure data-reveal="img">
              {i === 0 ? (
                <Vid src="/video/exterior.mp4" poster="/images/exterior-poster.jpg" label="Machine polishing a black car" className="au-vid" />
              ) : s.name.toLowerCase().includes('ceramic') ? (
                <Vid src="/video/ceramic.mp4" poster="/images/ceramic-poster.jpg" label="Water beading on ceramic coated paint" className="au-vid" />
              ) : (
                <Pic src={s.img[0] ? U(s.img[0], 1100) : s.img[1]} fallback={s.img[1]} alt={s.name} />
              )}
            </figure>
            <div>
              <span className="au-n">{String(i + 1).padStart(2, '0')}</span>
              <h3 data-reveal="up">{s.name}</h3>
              <p data-reveal="up">{s.text}</p>
              <QuoteButton className="btn btn-line" topic={{ world: 'auto', service: s.name }}>Request a quote</QuoteButton>
            </div>
          </article>
        ))}
      </section>

      <section className="au-why" aria-labelledby="why-h">
        <Mask as="h2" className="display"><span id="why-h">Why DetailCraft</span></Mask>
        <p data-reveal="up">{AUTO_WHY}</p>
      </section>

      <section className="faq" aria-labelledby="faq-h">
        <Mask as="h2" className="display"><span id="faq-h">Questions, answered.</span></Mask>
        <div className="faq-list">
          {FAQ.map((f) => (
            <details key={f.q} data-reveal="up">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Inquiry world="auto" defaultService="Automotive — Full Detail" />

      <section className="au-air" aria-label="Aviation services">
        <Pic src="/images/air-hero.jpg" fallback="/images/air-hero.jpg" alt="Business aircraft on the ramp" className="au-air-bg" />
        <div className="au-air-in">
          <p className="svc-kicker">Also from DetailCraft</p>
          <h2>Aviation services</h2>
          <p>Aircraft appearance management for business aviation, with ramp support at VOMM Chennai.</p>
          <TLink href="/aviation" className="btn btn-line" data-cursor="Enter">Explore aviation →</TLink>
        </div>
      </section>

      <Footer world="auto" />
    </main>
  );
}
