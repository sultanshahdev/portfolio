import { technicalExpertise } from '../../data/skills.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import SkillCategory from './SkillCategory.jsx';
import useExpertiseDisclosure from './useExpertiseDisclosure.js';
import '../../styles/technical-expertise.css';

// Separate columns retain the existing down-column reading order while unfolding.
const columnBreak = Math.ceil(technicalExpertise.length / 2);
const columns = [technicalExpertise.slice(0, columnBreak), technicalExpertise.slice(columnBreak)];

export default function TechnicalExpertise() {
  const { activeId, pinned, preview, leave, toggle, focus, close } = useExpertiseDisclosure();

  return (
    <section
      className="home-section technical-expertise"
      aria-labelledby="technical-expertise"
      onKeyDown={(event) => { if (event.key === 'Escape') close(); }}
    >
      <SectionHeading id="technical-expertise">TECHNICAL EXPERTISE &amp; SKILLS</SectionHeading>
      <div className="expertise-intro">
        <p>Languages, systems, and the practices behind the software.</p>
        <span>{technicalExpertise.length} categories</span>
      </div>
      <p className="expertise-hint">
        <span className="expertise-hint-hover">Hover to explore · Click to keep open</span>
        <span className="expertise-hint-touch">Tap a category to explore</span>
      </p>
      <div className="expertise-grid">
        {columns.map((categories, columnIndex) => (
          <div className="expertise-column" key={columnIndex}>
            {categories.map((category, index) => (
              <SkillCategory
                key={category.id}
                category={category}
                number={columnIndex * columnBreak + index + 1}
                expanded={activeId === category.id}
                pinned={activeId === category.id && pinned}
                onPreview={preview}
                onLeave={leave}
                onToggle={toggle}
                onFocus={focus}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
