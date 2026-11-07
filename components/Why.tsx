import { WHY } from '@/lib/content';
import { Mask } from './Reveal';

export default function Why({ world }: { world: 'auto' | 'air' }) {
  return (
    <section className={`why why-${world}`} aria-labelledby="why-h">
      <div className="why-head">
        <Mask as="h2" className="display">
          <span id="why-h">Why DetailCraft</span>
        </Mask>
        <p data-reveal="up">
          A private preservation facility for cars and aircraft — delivering premium aesthetic solutions with the highest
          hygiene and luxury standards.
        </p>
      </div>
      <ul className="why-list">
        {WHY.map((w) => (
          <li key={w.t} data-reveal="up">
            <i className="dot" aria-hidden="true" />
            <h3>{w.t}</h3>
            <p>{w.d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
