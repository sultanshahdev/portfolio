import { MapPin } from 'lucide-react';

export default function LocationMeta({ location, mode }) {
  if (!location) return null;

  return (
    <span className="location-meta">
      <MapPin size={14} strokeWidth={1.5} aria-hidden="true" focusable="false" />
      <span><strong>{location.city}</strong> · {location.region}, {location.country}</span>
      {mode && <span className="location-mode">{mode}</span>}
    </span>
  );
}
