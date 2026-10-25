import { useState } from 'react';
import { assetUrl } from '../../lib/assets.js';

// The adjacent organization name supplies the accessible label for this insignia.
export default function OrganizationLogo({ organization, className = '' }) {
  const [unavailable, setUnavailable] = useState(false);
  const showLogo = organization.logo && !unavailable;

  return (
    <span className={`organization-logo organization-logo--${organization.id} ${className}`} aria-hidden="true" style={{ '--logo-width': organization.visualWidth, '--logo-height': organization.visualHeight }}>
      {showLogo ? (
        <img
          className={organization.logoTreatment === 'ink' ? 'organization-logo-ink' : undefined}
          src={assetUrl(organization.logo)}
          width={organization.width}
          height={organization.height}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setUnavailable(true)}
        />
      ) : <span className="organization-monogram">{organization.monogram}</span>}
    </span>
  );
}
