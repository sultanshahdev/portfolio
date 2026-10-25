import { Flag, Mic2, Network, Presentation } from 'lucide-react';
import { community } from '../../data/experience.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import OrganizationLogo from './OrganizationLogo.jsx';
import LocationMeta from './LocationMeta.jsx';
import '../../styles/profile-journey.css';

const icons = { Flag, Mic2, Network, Presentation };

function LeadershipEntry({ entry, index }) {
  const Icon = icons[entry.icon];

  return (
    <li className={`leadership-entry leadership-entry--${entry.id} leadership-entry--logo-${index % 2 === 0 ? 'left' : 'right'}`}>
      <article aria-labelledby={entry.id} data-reveal>
        <div className="leadership-rail" aria-hidden="true">
          <span className="leadership-marker"><Icon size={19} strokeWidth={1.5} /></span>
          <span className="leadership-number">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="leadership-composition">
          <div className="leadership-insignia"><OrganizationLogo organization={entry.organization} /></div>
          <div className="leadership-content">
            <header className="leadership-header">
              <div>
                <p className="journey-kicker">{entry.category}</p>
                <p className="journey-date">{entry.period}{' '}<span className="journey-duration">{entry.duration}</span></p>
              </div>
            </header>
            <h3 id={entry.id} className="leadership-title">{entry.title}</h3>
            <p className="leadership-organization">
              {entry.organizationContext && <span className="organization-context">{entry.organizationContext} · </span>}
              {entry.organization.url
                ? <a className="institution-link" href={entry.organization.url}>{entry.organization.name}</a>
                : entry.organization.name}
            </p>
            {entry.event && <p className="leadership-event">{entry.event}</p>}
            <div className="leadership-meta">
              <LocationMeta location={entry.location} mode={entry.mode} />
              {entry.kind && <span className="journey-kind">{entry.kind}</span>}
            </div>
            <p className="journey-description">{entry.description}</p>
            {entry.highlights.length > 0 && (
              <ul className="leadership-highlights">
                {entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            )}
            {entry.emphasis && (
              <p className="leadership-emphasis"><span>{entry.emphasis.label}</span>{' '}{entry.emphasis.value}</p>
            )}
          </div>
        </div>
      </article>
    </li>
  );
}

export default function CommunityLeadershipSection() {
  return (
    <section className="home-section community-leadership canvas-standard" aria-labelledby="community">
      <SectionHeading id="community" number="05" eyebrow="People / places / shared ideas">Community & leadership</SectionHeading>
      <p className="journey-route"><span>Lahore</span><i aria-hidden="true" /><span>Karachi</span><i aria-hidden="true" /><span>Sukkur</span></p>
      <ol className="leadership-timeline">
        {community.map((entry, index) => <LeadershipEntry key={entry.id} entry={entry} index={index} />)}
      </ol>
    </section>
  );
}
