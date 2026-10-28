import Mascot from './Mascot.jsx';
import EngineeringArtifact from '../illustrations/EngineeringArtifact.jsx';

export default function MascotScene({ className = '' }) {
  return <span className={`mascot-scene ${className}`} aria-hidden="true">
    <Mascot character="relay" pose="delivering" size="100%" />
    <span className="scene-connection"><i /><i /><i /></span>
    <Mascot character="pixel" pose="waving" size="100%" />
    <span className="contact-packet"><EngineeringArtifact kind="packet" /></span>
    <svg className="contact-component-window" viewBox="0 0 160 42" fill="none" focusable="false"><rect x="3" y="2" width="154" height="37" rx="3" /><path d="M3 13h154M11 8h4m4 0h4m4 0h4" /><text x="12" y="29">{'<Connection />'}</text><path d="m130 22 4 4 8-9" /></svg>
  </span>;
}
