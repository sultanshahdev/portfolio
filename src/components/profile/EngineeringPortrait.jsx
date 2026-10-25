import { MapPin } from 'lucide-react';
import { profile } from '../../data/profile.js';
import { assetUrl } from '../../lib/assets.js';

export default function EngineeringPortrait() {
  if (!profile.portrait) return null;

  return (
    <figure className="engineering-portrait">
      <div className="portrait-dimension" aria-hidden="true"><span>Engineering portrait</span><span>01</span></div>
      <div className="portrait-frame">
        <img
          className="biography-portrait"
          src={assetUrl(profile.portrait.src)}
          alt={`Portrait of ${profile.name}`}
          width="1206"
          height="1206"
          fetchPriority="high"
          style={{ objectPosition: profile.portrait.objectPosition }}
        />
        <svg className="portrait-registration" viewBox="0 0 300 300" fill="none" aria-hidden="true" focusable="false">
          <path className="portrait-registration-line" d="M0 22V0H22 M278 0H300V22 M300 278V300H278 M22 300H0V278" />
          <path className="portrait-registration-tick" d="M150 0V7 M293 150H300 M150 293V300 M0 150H7" />
        </svg>
      </div>
      <figcaption className="portrait-location"><MapPin size={14} strokeWidth={1.5} aria-hidden="true" />{profile.location}</figcaption>
    </figure>
  );
}
