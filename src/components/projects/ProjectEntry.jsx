import { Link } from 'react-router-dom';
import TextLink from '../ui/TextLink.jsx';
import ProjectMeta from './ProjectMeta.jsx';

export default function ProjectEntry({ project, headingLevel = 2 }) {
  const Heading = `h${headingLevel}`;
  return (
    <article className="project-entry" data-category={project.category}>
      <ProjectMeta project={project} />
      <Heading className="project-title"><Link to={`/projects/${project.slug}`}>{project.title}<span className="project-subtitle"> — {project.subtitle}</span></Link></Heading>
      <p className="entry-summary">{project.summary}</p>
      <ul className="technology-list" aria-label="Technologies">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
      {project.attribution && <p className="attribution">{project.attribution}</p>}
      <div className="entry-links">
        <TextLink to={`/projects/${project.slug}`} aria-label={`Read case study: ${project.title} — ${project.subtitle}`} arrow>Case study</TextLink>
        <TextLink href={project.repositoryUrl} aria-label={`GitHub source: ${project.title} — ${project.subtitle}`}>GitHub <span aria-hidden="true">↗</span></TextLink>
        {project.demoUrl && <TextLink href={project.demoUrl}>Live demo <span aria-hidden="true">↗</span></TextLink>}
      </div>
    </article>
  );
}
