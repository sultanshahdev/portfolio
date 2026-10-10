import { profile } from '../../data/profile.js';
import { assetUrl } from '../../lib/assets.js';
import TextLink from '../ui/TextLink.jsx';
import About from './About.jsx';

export default function Intro() {
  return (
    <section className="intro" aria-labelledby="intro-title">
      <h1 id="intro-title" className="section-label">About me</h1>
      <div className="biography-identity">
        {profile.portrait && (
          <img
            className="biography-portrait"
            src={assetUrl(profile.portrait.src)}
            alt={`Portrait of ${profile.name}`}
            width="158"
            height="158"
            style={{ objectPosition: profile.portrait.objectPosition }}
          />
        )}
        <div className="biography-details">
          <h2 className="biography-name">{profile.name}</h2>
          <p>{profile.biographySubtitle}</p>
          <p>{profile.location}</p>
        </div>
      </div>
      <div className="intro-body">
        <About />
        <div className="inline-links">
          {profile.socials.map((social) => <TextLink href={social.url} key={social.label}>{social.label}<span aria-hidden="true"> ↗</span></TextLink>)}
        </div>
      </div>
    </section>
  );
}
