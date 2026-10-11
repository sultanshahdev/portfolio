import SkillIcon from './SkillIcon.jsx';

export default function SkillCategory({ category, number }) {
  return (
    <section className="expertise-category" aria-labelledby={`expertise-${category.id}`}>
      <div className="expertise-category-heading">
        <SkillIcon name={category.icon} />
        <h3 id={`expertise-${category.id}`}>{category.title}</h3>
        <span className="expertise-number" aria-hidden="true">{String(number).padStart(2, '0')}</span>
      </div>
      <ul className="expertise-skills" role="list">
        {category.skills.map((skill, index) => (
          <li key={`${skill}-${index}`}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}
