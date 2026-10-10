import { profile } from '../../data/profile.js';
import { assetUrl } from '../../lib/assets.js';
import TextLink from '../ui/TextLink.jsx';

export default function ContactLinks() {
  return (
    <div className="inline-links">
      {profile.socials.map((social) => <TextLink key={social.label} href={social.url}>{social.label}<span aria-hidden="true"> ↗</span></TextLink>)}
      {profile.email && <TextLink href={`mailto:${profile.email}`}>Email</TextLink>}
      {profile.resumeUrl && <TextLink href={assetUrl(profile.resumeUrl)}>Résumé</TextLink>}
    </div>
  );
}
