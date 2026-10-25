import { Link } from 'react-router-dom';
import TextLink from '../ui/TextLink.jsx';
import ProjectMeta from './ProjectMeta.jsx';
import ArchitectureSignature from './ArchitectureSignature.jsx';

export default function ProjectEntry({ project, headingLevel = 2, variant = 'archive', number }) {
  const Heading = `h${headingLevel}`;
  const technologies = variant === 'showcase' ? project.showcaseTechnologies : project.technologies;
  return (
    <article className={`project-entry project-entry--${variant}`} data-category={project.category} data-project={project.slug}>
      <div className="project-index"><span className="project-number">{String(number).padStart(2, '0')} /</span><ProjectMeta project={project} /></div>
      <div className="project-entry-grid">
        <div className="project-copy">
          <Heading className="project-title"><Link to={`/projects/${project.slug}`}>{project.title}</Link></Heading>
          <p className="project-deck">{project.subtitle}</p>
          <p className="entry-summary">{project.summary}</p>
          <ul className="technology-list" aria-label="Technologies">{technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
        </div>
        <ArchitectureSignature visual={project.visual} />
      </div>
      <p className="project-distinction">{project.distinction}</p>
      <p className="project-evidence">{project.evidence}</p>
      {variant === 'archive' && <p className="project-status">{project.status}</p>}
      <div className="entry-links">
        <TextLink to={`/projects/${project.slug}`} aria-label={`Read case study: ${project.title} — ${project.subtitle}`} arrow>Explore case study</TextLink>
        <TextLink href={project.repositoryUrl} aria-label={`GitHub source: ${project.title} — ${project.subtitle}`}>GitHub <span aria-hidden="true">↗</span></TextLink>
        {project.demoUrl && <TextLink href={project.demoUrl}>Live demo <span aria-hidden="true">↗</span></TextLink>}
      </div>
    </article>
  );
}
