import { technicalFocus } from '../../data/skills.js';
import SectionHeading from '../ui/SectionHeading.jsx';

export default function TechnicalFocus() {
  return (
    <section className="home-section" aria-labelledby="technical-focus">
      <SectionHeading id="technical-focus">Technical focus</SectionHeading>
      <dl className="focus-list">
        {technicalFocus.map((focus) => <div key={focus.title}><dt>{focus.title}</dt><dd>{focus.description}</dd></div>)}
      </dl>
    </section>
  );
}
