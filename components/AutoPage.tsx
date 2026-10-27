'use client';

import { useRef, useState } from 'react';
import type { Images } from '@/lib/images';
import { AUTO_SERVICES, FAQ } from '@/lib/content';
import Nav from './Nav';
import Footer from './Footer';
import Photo from './Photo';
import Why from './Why';
import Inquiry from './Inquiry';
import { QuoteButton } from './QuoteModal';
import { TLink, useTransition } from './TransitionProvider';
import { Mask, useReveals } from './Reveal';

export default function AutoPage({ images }: { images: Images }) {
  const main = useRef<HTMLElement>(null);
  const { covered } = useTransition();
  useReveals(main, !covered);

  return (
    <main id="main" ref={main} className="world-auto">
      <Nav world="auto" />

      {/* 1 — Flagship hero */}
      <section className="ah" aria-labelledby="ah-h">
        <div className="ah-grid">
          <div className="ah-in">
            <p className="ah-kicker" data-reveal="up">
              Automotive Care · Chennai
            </p>
            <h1 id="ah-h" className="mask ah-title" aria-label="Craftsmanship beyond clean.">
              <span className="mask-in" data-reveal="mask" aria-hidden="true">
                Beyond
                <br />
                <em>clean.</em>
              </span>
            </h1>
            <p className="ah-lead" data-reveal="up">
              Luxury detailing for automobiles, fleets and aircraft. Experience precision, exclusivity, and a flawless
              finish.
            </p>
            <div className="ah-cta" data-reveal="up">
              <QuoteButton className="btn btn-solid" topic={{ world: 'auto' }} data-cursor="Quote">
                Get a quote
              </QuoteButton>
              <TLink href="#inquire" className="btn btn-line">
                Book consultation
              </TLink>
            </div>
          </div>
          <figure className="ah-fig" data-reveal="img">
            <Photo
              src={images['auto-hero'] ?? images['seg-supercars']}
              kind="auto"
              slot="auto-hero"
              priority
              className="ah-photo"
              sizes="(max-width: 960px) 100vw, 50vw"
              alt="Black supercar in a studio"
              art="retro"
              place="right"
            />
          </figure>
        </div>
        <p className="ah-meta" aria-hidden="true">
          <span>Cars · SUVs · Trucks · Vans · RVs · Boats</span>
          <span className="dw-scroll">
            <i className="dot" /> Scroll
          </span>
        </p>
      </section>

      {/* 4 — Services */}
      <Services images={images} />

      {/* Why */}
      <Why world="auto" />

      {/* 9 — FAQ + inquiry */}
      <section className="faq" aria-labelledby="faq-h">
        <Mask as="h2" className="display">
          <span id="faq-h">Questions, answered.</span>
        </Mask>
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
      <Footer world="auto" />
    </main>
  );
}

/* ───────────────────────── Services ───────────────────────── */

function Services({ images }: { images: Images }) {
  const [open, setOpen] = useState(0);
  const svc = AUTO_SERVICES[open];
  return (
    <section className="svc" id="services" aria-labelledby="svc-h">
      <div className="svc-head">
        <p className="svc-kicker" data-reveal="up">Our services</p>
        <Mask as="h2" className="display">
          <span id="svc-h">The work.</span>
        </Mask>
      </div>
      <div className="svc-body">
        <ul className="svc-tabs" role="tablist" aria-label="Services">
          {AUTO_SERVICES.map((s, i) => (
            <li key={s.name}>
              <button
                type="button"
                role="tab"
                id={`svc-tab-${i}`}
                aria-selected={open === i}
                aria-controls="svc-panel"
                onClick={() => setOpen(i)}
              >
                <span className="svc-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="svc-name">{s.name}</span>
                <span className="svc-plus" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
        <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${open}`} className="svc-panel" key={svc.name}>
          <p className="svc-lead">{svc.text}</p>
          <ul className="svc-items">
            {svc.items.map((x) => {
              const [t, d] = Array.isArray(x) ? x : [x, ''];
              return (
                <li key={t}>
                  <b>{t}</b>
                  {d && <span>{d}</span>}
                </li>
              );
            })}
          </ul>
          <div className="svc-foot">
            <QuoteButton className="btn btn-solid" topic={{ world: 'auto', service: svc.name }}>
              Request a quote
            </QuoteButton>
            <figure className="svc-fig">
              <Photo src={images['auto-macro'] ?? images['seg-performance']} kind="auto" slot="auto-macro" tone="b" alt="Black performance car in a studio" sizes="(max-width: 900px) 80vw, 30vw" art="retro" place="low" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
