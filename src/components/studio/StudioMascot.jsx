import Mascot from '../mascots/Mascot.jsx';

// Compatibility for earlier placements; the finished family owns all artwork.
export default function StudioMascot({ kind = 'bit', decorative = false, ...props }) {
  const character = kind === 'packet' ? 'relay' : 'archie';
  return <Mascot character={character} label={decorative ? undefined : `${character === 'relay' ? 'Relay, a networking' : 'Archie, a software architecture'} companion`} {...props} />;
}
