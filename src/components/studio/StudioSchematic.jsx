import EngineeringPortrait from '../profile/EngineeringPortrait.jsx';
import Mascot from '../mascots/Mascot.jsx';

export default function StudioSchematic() {
  return (
    <div className="studio-schematic">
      <svg className="studio-drafting" viewBox="0 0 540 480" fill="none" aria-hidden="true">
        <circle cx="285" cy="218" r="192" stroke="currentColor" strokeDasharray="2 8" />
        <path d="M20 136h65v-64h112M345 34h150v258h-52M37 332h93v91h258v-58" stroke="currentColor" />
        <path d="M13 136h14m-7-7v14M488 34h14m-7-7v14M123 423h14m-7-7v14" stroke="currentColor" />
        <path className="drafting-signal" d="M38 332h92v91h258" stroke="currentColor" strokeDasharray="4 5" />
        <circle cx="85" cy="136" r="4" fill="currentColor" />
        <circle cx="495" cy="217" r="4" fill="currentColor" />
        <text x="26" y="119">INPUT</text><text x="407" y="319">IDEA → SYSTEM</text>
        <text x="166" y="447">BUILD / OBSERVE / REFINE</text>
      </svg>
      <EngineeringPortrait />
      <div className="hero-resident"><Mascot character="archie" size="100%" label="Archie, a software architecture companion" /><span className="hero-resident-note">ARCHIE / field notes</span></div>
      <span className="schematic-note">A little curiosity.<br />A lot of connections.</span>
    </div>
  );
}
