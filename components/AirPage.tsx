'use client';

import { useRef } from 'react';
import type { Images, Slot } from '@/lib/images';
import { AIR, CONTACT, TAGLINE } from '@/lib/content';
import Nav from './Nav';
import Footer from './Footer';
import Photo from './Photo';
import Inquiry from './Inquiry';
import BeforeAfter from './BeforeAfter';
import { HeroFlight, FlightPath } from './FlyOver';
import { QuoteButton } from './QuoteModal';
import { TLink, useTransition } from './TransitionProvider';
import { Mask, useReveals } from './Reveal';

export default function AirPage({ images }: { images: Images }) {
  const main = useRef<HTMLElement>(null);
  const { covered } = useTransition();
  useReveals(main, !covered);

  return (
    <main id="main" ref={main} className="world-air">
      <Nav world="air" />

      {/* Hero */}
      <section className="vh" aria-labelledby="vh-h">
        <Photo src={images['air-hero']} kind="air" slot="air-hero" priority par={8} className="vh-photo" sizes="100vw" />
        <div className="vh-shade" />
        <HeroFlight />
        <div className="vh-in">
          <p className="vh-kicker" data-reveal="up">
            Business aviation · Chennai
          </p>
          <h1 id="vh-h" className="mask vh-title" aria-label="Aircraft Appearance Management">
            <span className="mask-in" data-reveal="mask" aria-hidden="true">
              Aircraft
              <br />
              <em>Appearance</em>
              <br />
              Management
            </span>
          </h1>
          <div className="vh-row">
            <p data-reveal="up">{AIR.tag}</p>
            <div className="vh-cta" data-reveal="up">
              <QuoteButton className="btn btn-solid" topic={{ world: 'air' }} data-cursor="Quote">
                Request a quote
              </QuoteButton>
              <a className="btn btn-line" href="#quote">
                Fleet categories
              </a>
            </div>
          </div>
        </div>
        <p className="vh-tag" aria-hidden="true">
          {TAGLINE}
        </p>
      </section>

      {/* Services at a glance */}
      <section className="vs" aria-label="Services at a glance">
        <ul>
          {AIR.services.map((s) => (
            <li key={s} data-reveal="up">
              {s}
            </li>
          ))}
        </ul>
      </section>

      {/* Overview */}
      <section className="vo" aria-labelledby="vo-h">
        <div className="vo-lead">
          <Mask as="h2" className="serif">
            <span id="vo-h">{AIR.overviewTitle}</span>
          </Mask>
          <p data-reveal="up">{AIR.overview}</p>
          <blockquote data-reveal="up">{AIR.philosophy}</blockquote>
        </div>
        <ol className="vo-pillars">
          {AIR.pillars.map((p) => (
            <li key={p.t} data-reveal="up">
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <FlightPath />

      {/* Services index */}
      <section className="sx" aria-labelledby="sx-h">
        <p className="sx-k" data-reveal="up">
          Our services
        </p>
        <Mask as="h2" className="serif">
          <span id="sx-h">
            Three ways we care <em>for your aircraft</em>
          </span>
        </Mask>
        <ul className="sx-list">
          {AIR.serviceSections.map((v, i) => (
            <li key={v.id} data-reveal="up">
              <a href={`#${v.id}`}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <b>{v.title}</b>
                <em>{v.short}</em>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* One section per service */}
      {AIR.serviceSections.map((v, i) => (
        <section key={v.id} id={v.id} className={`sv ${i % 2 ? 'sv-alt' : ''}`} aria-labelledby={`${v.id}-h`}>
          <div className="sv-lead">
            <span className="sv-n" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <Mask as="h2" className="serif">
              <span id={`${v.id}-h`}>{v.title}</span>
            </Mask>
            <p data-reveal="up">{v.intro}</p>
            <p className="sv-for" data-reveal="up">
              <b>Suited to</b> {v.for}
            </p>
            <QuoteButton className="btn btn-solid" topic={{ world: 'air', service: `Aviation — ${v.title}` }} data-cursor="Quote">
              Request a quote
            </QuoteButton>
          </div>
          <div className="sv-list">
            <h3 data-reveal="up">What is included</h3>
            <ol>
              {v.items.map(([a, b]) => (
                <li key={a} data-reveal="up">
                  <b>{a}</b>
                  {b ? <span>{b}</span> : null}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}

      {/* Fleets */}
      <section className="vf" aria-labelledby="vf-h">
        <Mask as="h2" className="serif">
          <span id="vf-h">
            Fleet categories <em>we support</em>
          </span>
        </Mask>
        <div className="vf-row">
          {AIR.fleets.map((f) => (
            <figure key={f.t} data-reveal="up">
              <div className="vf-img">
                <Photo src={images[f.slot as Slot]} kind="air" slot={f.slot} alt={f.t} sizes="(max-width: 900px) 70vw, 24vw" />
              </div>
              <figcaption>
                <b>{f.t}</b>
                <span>{f.d}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="vp" aria-labelledby="vp-h">
        <Mask as="h2" className="serif">
          <span id="vp-h">
            How we work: <em>5-stage detailing standard</em>
          </span>
        </Mask>
        <ol>
          {AIR.process.map(([t, d], i) => (
            <li key={t} data-reveal="up">
              <span className="vp-n">{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Correction */}
      <section className="vr" aria-labelledby="vr-h">
        <div className="vr-lead">
          <Mask as="h2" className="serif">
            <span id="vr-h">{AIR.correctionTitle}</span>
          </Mask>
          <p data-reveal="up">{AIR.correction}</p>
        </div>
        <div className="vr-ba" data-reveal="up">
          <BeforeAfter
            before={images['air-before']}
            after={images['air-after']}
            kind="air"
            alt="Business jet paint correction"
            ratio="6.4 / 1"
            beforeCap={AIR.beforeCap}
            afterCap={AIR.afterCap}
          />
          <p className="ba-hint">← Drag the handle, or use the arrow keys, to compare before and after →</p>
          <p className="vr-case">Demonstrated results · paint correction case study</p>
        </div>
        <ol className="vr-list">
          {AIR.restorations.map(([t, d], i) => (
            <li key={t} data-reveal="up">
              <span>{String(i + 1).padStart(2, '0')}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Ramp & hangar */}
      <section className="vm2" aria-labelledby="vm2-h">
        <div className="vm2-top">
          <Mask as="h2" className="serif">
            <span id="vm2-h">{AIR.ramp.title}</span>
          </Mask>
          <div>
            <p className="vm2-base" data-reveal="up">
              <i className="dot" /> {AIR.ramp.base}
            </p>
            <div className="vm2-two">
              <ul>
                {AIR.ramp.left.map((x) => (
                  <li key={x} data-reveal="up">
                    {x}
                  </li>
                ))}
              </ul>
              <ul>
                {AIR.ramp.right.map((x) => (
                  <li key={x} data-reveal="up">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <span className="vm2-badge" data-reveal="up">
              {AIR.ramp.badge}
            </span>
          </div>
        </div>
        <div className="vm2-cols">
          {[AIR.ramp.ron].map((c) => (
            <div key={c.t}>
              <h3 data-reveal="up">{c.t}</h3>
              <p className="vm2-sub" data-reveal="up">
                {c.s}
              </p>
              <span className="rule" data-reveal="rule" />
              <ul>
                {c.items.map((x) => (
                  <li key={x} data-reveal="up">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="vm2-commit" data-reveal="up">
          <b>Our ramp commitment.</b> {AIR.ramp.commitment}
        </p>
      </section>

      {/* Fleet categories + quote */}
      <section id="quote" className="vx" aria-labelledby="vx-h">
        <Mask as="h2" className="serif">
          <span id="vx-h">
            Every aircraft is <em>quoted individually</em>
          </span>
        </Mask>
        <p className="vx-lead" data-reveal="up">
          Scope, schedule and surface condition differ for every airframe, so we prepare a clear quote for your aircraft
          and your ramp. Tell us the type, base and the service you need.
        </p>
        <ul className="vx-grid">
          {AIR.categories.map((c) => (
            <li key={c[0]} data-reveal="up">
              <h3>{c[0]}</h3>
              <p>{c[1]}</p>
            </li>
          ))}
        </ul>
        <ul className="vx-add">
          {AIR.addons.map((a) => (
            <li key={a} data-reveal="up">
              {a}
            </li>
          ))}
        </ul>
        <div className="vx-cta" data-reveal="up">
          <QuoteButton className="btn btn-solid" topic={{ world: 'air' }} data-cursor="Quote">
            Request a quote
          </QuoteButton>
        </div>
      </section>

      {/* Helicopters & training */}
      <section className="vt" aria-labelledby="vt-h">
        <Mask as="h2" className="serif">
          <span id="vt-h">
            Helicopter <em>&amp; training aircraft detailing</em>
          </span>
        </Mask>
        <p className="vt-lead" data-reveal="up">
          Available across India.
        </p>
        <div className="vt-cols">
          {[AIR.helicopter, AIR.training].map((c) => (
            <div key={c.t}>
              <h3 data-reveal="up">{c.t}</h3>
              <p data-reveal="up">{c.s}</p>
              <span className="rule" data-reveal="rule" />
              <ul>
                {c.items.map((x) => (
                  <li key={x} data-reveal="up">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Terms */}
      <section className="vk" aria-labelledby="vk-h">
        <h2 id="vk-h" className="vk-h">
          Terms <em>and conditions</em>
        </h2>
        <ul>
          {AIR.terms.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <Inquiry world="air" defaultService="Aviation — Aircraft appearance management" />
      <Footer world="air" />
    </main>
  );
}
