import Mascot from '../mascots/Mascot.jsx';
import { useState } from 'react';
import { Network, PanelsTopLeft, Server, ShieldCheck } from 'lucide-react';
import { profile } from '../../data/profile.js';

const icons = { frontend: PanelsTopLeft, backend: Server, distributed: Network, security: ShieldCheck };

export default function EngineeringDisciplines() {
  const [selected, setSelected] = useState(profile.disciplines[0].id);
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const active = hovered || focused || selected;

  return (
    <div className="engineering-disciplines" data-active={active} data-mascot-scope>
      <div className="disciplines-heading">
        <h2 id="disciplines-title">Engineering <br />disciplines</h2>
        <p>Connected layers.<br />One engineering practice.</p>
        <span className="discipline-resident"><Mascot character="pixel" size="100%" label="Pixel, a frontend engineering companion" /></span>
      </div>
      <div className="disciplines-content">
        <div className="disciplines-graph" role="group" aria-labelledby="disciplines-title">
          <svg className="discipline-connectors" viewBox="0 0 1000 100" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
            <g className="discipline-connector-base">
              <path d="M125 14H250V42H375 M375 42H500V14H625 M625 14H750V42H875" />
            </g>
            <g className="discipline-connector-active">
              <path data-path="frontend" d="M125 14H250V42H375" pathLength="1" />
              <path data-path="backend" d="M125 14H250V42H375H500" pathLength="1" />
              <path data-path="distributed" d="M375 42H500V14H625" pathLength="1" />
              <path data-path="security" d="M625 14H750V42H875" pathLength="1" />
            </g>
            <g className="discipline-junctions"><circle cx="250" cy="14" r="2" /><circle cx="500" cy="42" r="2" /><circle cx="750" cy="14" r="2" /></g>
          </svg>
          {profile.disciplines.map(({ id, label }) => {
            const Icon = icons[id];
            return (
              <button
                className="discipline-node"
                key={id}
                type="button"
                data-discipline={id}
                aria-label={label}
                aria-pressed={selected === id}
                aria-describedby={`discipline-description-${id}`}
                aria-controls="discipline-explanation"
                onPointerEnter={(event) => { if (event.pointerType !== 'touch') setHovered(id); }}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => { setHovered(null); setFocused(id); }}
                onBlur={() => setFocused(null)}
                onClick={() => { setHovered(null); setSelected(id); }}
              >
                <span className="discipline-symbol"><Icon size={23} strokeWidth={1.35} aria-hidden="true" /></span>
                <span className="discipline-label">{label}</span>
              </button>
            );
          })}
        </div>
        <p id="discipline-explanation" className="discipline-description">
          <span aria-hidden="true">↳</span>
          <span className="discipline-explanations">
            {profile.disciplines.map(({ id, description }) => (
              <span
                key={id}
                id={`discipline-description-${id}`}
                className={active === id ? 'is-active' : undefined}
                aria-hidden={active !== id}
              >{description}</span>
            ))}
          </span>
        </p>
      </div>
    </div>
  );
}
