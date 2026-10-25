import Mascot from './Mascot.jsx';

export default function MascotScene({ className = '' }) {
  return <span className={`mascot-scene ${className}`} aria-hidden="true">
    <Mascot character="relay" pose="delivering" size="100%" />
    <span className="scene-connection"><i /><i /><i /></span>
    <Mascot character="pixel" pose="waving" size="100%" />
  </span>;
}
