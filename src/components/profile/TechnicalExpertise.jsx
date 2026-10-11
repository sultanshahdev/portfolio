import { technicalExpertise } from '../../data/skills.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import SkillCategory from './SkillCategory.jsx';
import '../../styles/technical-expertise.css';

export default function TechnicalExpertise() {
  return (
    <section className="home-section technical-expertise" aria-labelledby="technical-expertise">
      <SectionHeading id="technical-expertise">TECHNICAL EXPERTISE &amp; SKILLS</SectionHeading>
      <div className="expertise-intro">
        <p>Languages, systems, and the practices behind the software.</p>
        <span>{technicalExpertise.length} categories</span>
      </div>
      <div className="expertise-grid">
        {technicalExpertise.map((category, index) => (
          <SkillCategory key={category.id} category={category} number={index + 1} />
        ))}
      </div>
    </section>
  );
}
