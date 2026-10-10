import { profile } from '../data/profile.js';
import { assetUrl } from '../lib/assets.js';
import PageHeading from '../components/ui/PageHeading.jsx';
import PageMeta from '../components/layout/PageMeta.jsx';
import TextLink from '../components/ui/TextLink.jsx';

export default function ContactPage() {
  return (
    <>
      <PageMeta title="Contact" description="Connect with Sultan Shah on GitHub and LinkedIn." />
      <PageHeading title="Contact" description="A conversation is a good place to start." />
      <p className="contact-intro">{profile.contactIntroduction}</p>
      <ul className="contact-list">
        {profile.socials.map((social) => (
          <li key={social.label}>
            <a href={social.url}><span className="contact-name">{social.label}<span aria-hidden="true"> ↗</span></span><span className="contact-detail">{social.detail}</span><span className="contact-handle">{social.handle}</span></a>
          </li>
        ))}
      </ul>
      {(profile.email || profile.resumeUrl) && <div className="inline-links">{profile.email && <TextLink href={`mailto:${profile.email}`}>{profile.email}</TextLink>}{profile.resumeUrl && <TextLink href={assetUrl(profile.resumeUrl)}>View résumé</TextLink>}</div>}
    </>
  );
}
