import Mascot from '../mascots/Mascot.jsx';
import { skillResidents } from '../../data/mascots.js';
import { memo } from 'react';
import SkillIcon from './SkillIcon.jsx';

function SkillCategory({ category, number, expanded, pinned, onPreview, onLeave, onToggle, onFocus }) {
  const headingId = `expertise-${category.id}`;
  const panelId = `${headingId}-content`;

  return (
    <section
      className={`expertise-category${expanded ? ' is-expanded' : ''}${pinned ? ' is-pinned' : ''}`}
      aria-labelledby={headingId}
      data-mascot-scope
      // Physical pointer movement selects a preview; layout-driven pointerenter
      // events cannot cascade through headings as a previous layer contracts.
      onPointerMove={(event) => onPreview(category.id, event.pointerType)}
      onPointerLeave={(event) => onLeave(category.id, event.pointerType)}
    >
      <h3 id={headingId} className="expertise-category-heading">
        <button
          className="expertise-trigger"
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => onToggle(category.id)}
          onFocus={() => onFocus(category.id)}
        >
          <SkillIcon name={category.icon} />
          <span className="expertise-title">{category.title}</span>
          <span className="expertise-number" aria-hidden="true">{String(number).padStart(2, '0')}</span>
          <span className="expertise-disclosure" aria-hidden="true" />
        </button>
      </h3>
      <div id={panelId} className="expertise-reveal" aria-hidden={!expanded} inert={!expanded}>
        <div className="expertise-clip">
          <div className={`expertise-panel-body${skillResidents[category.id] ? ' has-resident' : ''}`}>
            {skillResidents[category.id] && <span className="skill-resident"><Mascot character={skillResidents[category.id]} size="100%" /></span>}
            <p className="expertise-panel-meta"><span>{category.skills.length} skills</span><span>{pinned ? 'Kept open' : ''}</span></p>
            <ul className="expertise-skills" role="list">
              {category.skills.map((skill, index) => (
                <li key={`${skill}-${index}`} style={{ '--reveal-step': Math.min(Math.floor(index / 4), 5) }}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(SkillCategory);
