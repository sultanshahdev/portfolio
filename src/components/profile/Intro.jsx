import { profile } from '../../data/profile.js';
import { ArrowDown, ArrowRight, ArrowUpRight, CodeXml, ContactRound } from 'lucide-react';
import TextLink from '../ui/TextLink.jsx';
import About from './About.jsx';
import StudioSchematic from '../studio/StudioSchematic.jsx';
import EngineeringDisciplines from './EngineeringDisciplines.jsx';
import '../../styles/intro-hero.css';

const socialIcons = { GitHub: CodeXml, LinkedIn: ContactRound };
export default function Intro() {
  return (
    <section id="about" data-section className="intro intro-hero" aria-labelledby="intro-title">
      <div className="intro-composition">
        <div className="intro-editorial">
          <p className="section-label intro-eyebrow"><span aria-hidden="true" />The living systems portfolio</p>
          <p className="intro-name">{profile.name}</p>
          <p className="intro-identity">{profile.biographySubtitle}</p>
          <h1 id="intro-title" className="intro-headline">{profile.headline.map((line, i) => <span key={line}>{line}{i < profile.headline.length - 1 && ' '}</span>)}</h1>
          <p className="intro-architecture"><span className="intro-architecture-mark" aria-hidden="true">↳</span><span>{profile.architectureFocus}</span><span className="architecture-suffix"> / Linux / Networks</span></p>
          <div className="hero-actions">
            <TextLink to="/projects" className="intro-project-link">Explore My Projects<ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" /></TextLink>
            <nav className="intro-socials" aria-label="Social links">{profile.socials.map((social) => {
              const Icon = socialIcons[social.label];
              return <TextLink href={social.url} key={social.label} target="_blank" rel="noopener noreferrer"><Icon size={16} strokeWidth={1.5} aria-hidden="true" />{social.label}<ArrowUpRight size={13} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></TextLink>;
            })}</nav>
          </div>
        </div>
        <div className="intro-portrait-column"><StudioSchematic /></div>
      </div>
      <div className="hero-bottom"><p className="studio-caption"><span aria-hidden="true">⌘</span> Interfaces, protocols, and everything between.</p><TextLink to="/#work" className="scroll-invitation">Step inside Selected Work <ArrowDown size={16} aria-hidden="true" /></TextLink></div>
      <EngineeringDisciplines />
      <div className="intro-narrative canvas-standard" data-reveal><div className="narrative-margin"><p className="section-label">01 / A connected practice</p><h2>Curiosity, from<br />the surface<br /><em>to the system.</em></h2><span className="narrative-line" aria-hidden="true" /></div><div className="intro-body"><About /></div></div>
    </section>
  );
}
