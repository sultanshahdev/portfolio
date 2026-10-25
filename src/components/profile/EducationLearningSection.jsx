import Mascot from '../mascots/Mascot.jsx';
import { BookOpen, GraduationCap } from 'lucide-react';
import { profile } from '../../data/profile.js';
import { learning } from '../../data/experience.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import OrganizationLogo from './OrganizationLogo.jsx';
import LocationMeta from './LocationMeta.jsx';
import '../../styles/profile-journey.css';

function EducationEntry({ entry }) {
  return (
    <article className="academic-entry" data-reveal aria-labelledby={entry.id}>
      <div className="academic-insignia"><OrganizationLogo organization={entry.organization} /></div>
      <div className="academic-content">
        <div className="journey-kicker">
          <span><GraduationCap size={17} strokeWidth={1.5} aria-hidden="true" />{entry.kind}</span>
          <span className="academic-period">{entry.period}</span>
        </div>
        <h3 id={entry.id} className="academic-title">{entry.qualification}</h3>
        <a className="institution-link" href={entry.organization.url}>{entry.organization.name}</a>
        <p className="academic-status">{entry.note}</p>
        <LocationMeta location={entry.location} />
      </div>
    </article>
  );
}

function LearningEntry({ entry }) {
  return (
    <article className="independent-entry" data-reveal aria-labelledby={entry.id}>
      <div className="independent-heading">
        <OrganizationLogo organization={entry.organization} />
        <div>
          <p className="journey-kicker"><span><BookOpen size={15} strokeWidth={1.5} aria-hidden="true" />{entry.kind}</span></p>
          <h3 id={entry.id} className="independent-title">{entry.title}</h3>
          <a className="institution-link" href={entry.organization.url}>{entry.organization.name}</a>
        </div>
      </div>
      <div className="independent-content">
        <p className="journey-date">{entry.period}</p>
        <p className="journey-description">{entry.description}</p>
        <p className="learning-approach">{entry.approach}</p>
      </div>
    </article>
  );
}

export default function EducationLearningSection() {
  return (
    <section id="journey" data-section className="home-section education-learning canvas-standard" aria-labelledby="education">
      <div className="resident-heading"><SectionHeading id="education" number="04" eyebrow="An ongoing education">Education & learning</SectionHeading><span className="heading-resident"><Mascot character="archie" pose="reading" size="100%" /></span></div>
      {profile.education.map((entry) => <EducationEntry key={entry.id} entry={entry} />)}
      {learning.map((entry) => <LearningEntry key={entry.id} entry={entry} />)}
    </section>
  );
}
