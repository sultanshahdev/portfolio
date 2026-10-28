import { useState } from 'react';
import Mascot from '../mascots/Mascot.jsx';
import { profile } from '../../data/profile.js';
import { controlRoom } from '../../data/controlRoom.js';
import DisciplineGlyph from './control-room/DisciplineGlyph.jsx';
import DisciplineConnections from './control-room/DisciplineConnections.jsx';
import DisciplineCodeDisplay from './control-room/DisciplineCodeDisplay.jsx';
import '../../styles/control-room.css';

export default function EngineeringDisciplines() {
  const [selection, setSelection] = useState({ id: profile.disciplines[0].id, explicit: false, revision: 0 });
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const [paused, setPaused] = useState(false);
  // A single derived value coordinates every part of the control room.
  const selected = selection.id;
  const active = hovered || focused || selected;
  const discipline = profile.disciplines.find(item => item.id === active);
  const instrument = controlRoom[active];

  return <section className="engineering-disciplines engineering-control-room" aria-labelledby="disciplines-title" data-active={active} data-reveal data-mascot-scope onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(null); }}>
    <header className="disciplines-heading"><div><p className="control-room-eyebrow">The engineering control room</p><h2 id="disciplines-title">Engineering disciplines</h2></div><p className="control-room-caption">Four connected layers.<br />One engineering practice.</p></header>
    <div className="disciplines-graph" role="group" aria-labelledby="disciplines-title">
      <DisciplineConnections active={active} />
      {profile.disciplines.map(({ id, label }, index) => <button
        key={id} type="button" className="discipline-node" data-discipline={id}
        aria-label={label} aria-pressed={selected === id}
        aria-describedby={`discipline-description-${id}`} aria-controls="discipline-explanation"
        onPointerEnter={event => { if (!selection.explicit && event.pointerType !== 'touch' && !document.activeElement?.closest('.control-room-instrument')) setHovered(id); }}
        onPointerLeave={() => setHovered(null)}
        onFocus={() => { setHovered(null); setFocused(id); }}
        onBlur={event => { if (!event.relatedTarget?.closest('.control-room-instrument')) setFocused(null); }}
        onClick={() => { setHovered(null); setSelection(current => ({ id, explicit: true, revision: current.revision + 1 })); }}
      ><span className="control-node-index" aria-hidden="true">0{index + 1} / {controlRoom[id].port}</span><DisciplineGlyph kind={id} /><span className="discipline-label">{label}</span><span className="control-node-focus">{controlRoom[id].focus}</span><span className="control-node-port" aria-hidden="true" /></button>)}
    </div>
    <div className="control-room-workstation">
      <div className="control-room-context">
        <p className="control-mode"><span aria-hidden="true">↳</span> MODE / {active === 'security' ? 'NETWORK & SECURITY' : active.toUpperCase()}</p>
        <div className="control-context-titles">{profile.disciplines.map(({ id }) => <h3 key={id} aria-hidden={active !== id} className={active === id ? 'is-active' : undefined}>{controlRoom[id].title}</h3>)}</div>
        <p id="discipline-explanation" className="discipline-description"><span className="discipline-explanations">{profile.disciplines.map(({ id, description }) => <span key={id} id={`discipline-description-${id}`} className={active === id ? 'is-active' : undefined} aria-hidden={active !== id}>{description}</span>)}</span></p>
        <div className="control-context-notes">{profile.disciplines.map(({ id }) => <p key={id} aria-hidden={active !== id} className={active === id ? 'is-active' : undefined}>{controlRoom[id].note}</p>)}</div>
      </div>
      <div className="control-room-instrument">
        <svg className="control-workstation-cable" viewBox="0 0 150 140" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M8 6v29h46v28h72v55h24" /><circle cx="8" cy="6" r="3" /><path d="M147 112v12" /></svg>
        <span className="discipline-resident"><Mascot character="pixel" pose="workstation" size="100%" label="Pixel, a frontend engineering companion" /><span className="control-pixel-caption" aria-hidden="true">PIXEL / at the keys</span></span>
        <DisciplineCodeDisplay key={`${active}-${selection.revision}`} discipline={discipline} examples={instrument.examples} paused={paused} onTogglePause={() => setPaused(value => !value)} />
      </div>
    </div>
    <p className="control-room-footnote"><span>Explore a layer. Follow the connection.</span><span>Code illustration / local display</span></p>
  </section>;
}
