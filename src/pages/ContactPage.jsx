import StudioMascot from '../components/studio/StudioMascot.jsx';
import { profile } from '../data/profile.js';
import { assetUrl } from '../lib/assets.js';
import PageHeading from '../components/ui/PageHeading.jsx';
import PageMeta from '../components/layout/PageMeta.jsx';
import TextLink from '../components/ui/TextLink.jsx';

export default function ContactPage() {
  return (
    <div className="contact-page canvas-standard">
      <PageMeta title="Contact" description="Connect with Sultan Shah on GitHub and LinkedIn." />
      <p className="section-label page-kicker">An open channel</p>
      <PageHeading title="Contact" />
      <div className="contact-page-opening"><h2>Good systems start with<br /><em>a conversation.</em></h2><StudioMascot /></div>
      <p className="contact-intro">{profile.contactIntroduction}</p>
      <ul className="contact-list">
        {profile.socials.map((social) => (
          <li key={social.label}>
            <a href={social.url}><span className="contact-name">{social.label}<span aria-hidden="true"> ↗</span></span><span className="contact-detail">{social.detail}</span><span className="contact-handle">{social.handle}</span></a>
          </li>
        ))}
      </ul>
      {(profile.email || profile.resumeUrl) && <div className="inline-links">{profile.email && <TextLink href={`mailto:${profile.email}`}>{profile.email}</TextLink>}{profile.resumeUrl && <TextLink href={assetUrl(profile.resumeUrl)}>View résumé</TextLink>}</div>}
    </div>
  );
}
