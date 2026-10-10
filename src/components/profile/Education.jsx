import { profile } from '../../data/profile.js';
import SectionHeading from '../ui/SectionHeading.jsx';

export default function Education() {
  return (
    <section className="home-section" aria-labelledby="education">
      <SectionHeading id="education">Education</SectionHeading>
      {profile.education.map((entry) => (
        <article key={entry.institution}>
          <div className="entry-title-row"><h3>{entry.institution}</h3><span className="meta">{entry.period}</span></div>
          <p className="organization">{entry.qualification}</p>
          <p className="entry-summary">{entry.note}</p>
        </article>
      ))}
    </section>
  );
}
