import SectionHeading from '../ui/SectionHeading.jsx';

export default function Experience({ entries, title = 'Experience & learning', id = 'experience' }) {
  if (!entries.length) return null;
  return (
    <section className="home-section" aria-labelledby={id}>
      <SectionHeading id={id}>{title}</SectionHeading>
      <div className="experience-list">
        {entries.map((entry) => (
          <article key={`${entry.organization}-${entry.title}`} className="experience-entry">
            <div className="entry-title-row"><h3>{entry.title}</h3><span className="meta">{entry.period}</span></div>
            <p className="organization">{entry.organization}{entry.kind && <span> · {entry.kind}</span>}</p>
            <p className="entry-summary">{entry.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
