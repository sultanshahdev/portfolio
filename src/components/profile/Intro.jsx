import { profile } from '../../data/profile.js';
import { ArrowRight, ArrowUpRight, CodeXml, ContactRound } from 'lucide-react';
import TextLink from '../ui/TextLink.jsx';
import About from './About.jsx';
import EngineeringPortrait from './EngineeringPortrait.jsx';
import EngineeringDisciplines from './EngineeringDisciplines.jsx';
import '../../styles/intro-hero.css';

const socialIcons = { GitHub: CodeXml, LinkedIn: ContactRound };

export default function Intro() {
  return (
    <section className="intro intro-hero" aria-labelledby="intro-title">
      <div className="intro-composition">
        <div className="intro-editorial">
          <p className="section-label intro-eyebrow"><span aria-hidden="true" />About me</p>
          <p className="intro-name">{profile.name}</p>
          <p className="intro-identity">{profile.biographySubtitle}</p>
          <h1 id="intro-title" className="intro-headline">
            {profile.headline.map((line, index) => (
              <span key={line}>{line}{index < profile.headline.length - 1 && ' '}</span>
            ))}
          </h1>
          <p className="intro-architecture">
            <span className="intro-architecture-mark" aria-hidden="true">↳</span>
            <span>{profile.architectureFocus}</span>
          </p>
          <TextLink to="/projects" className="intro-project-link">
            Explore My Projects<ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
          </TextLink>
        </div>
        <div className="intro-portrait-column">
          <EngineeringPortrait />
          <nav className="intro-socials" aria-label="Social links">
            {profile.socials.map((social) => {
              const Icon = socialIcons[social.label];
              return (
                <TextLink href={social.url} key={social.label} target="_blank" rel="noopener noreferrer">
                  {Icon && <Icon size={16} strokeWidth={1.5} aria-hidden="true" />}
                  {social.label}<ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </TextLink>
              );
            })}
          </nav>
        </div>
        <EngineeringDisciplines />
      </div>
      <div className="intro-narrative">
        <div className="intro-body"><About /></div>
      </div>
    </section>
  );
}
