import ProjectEntry from './ProjectEntry.jsx';
import EmptyState from '../ui/EmptyState.jsx';

export default function ProjectList({ projects, headingLevel = 2, variant = 'archive' }) {
  if (!projects.length) return <EmptyState>No projects in this category yet.</EmptyState>;
  return <div className={`project-list project-list--${variant}`}>{projects.map((project, index) => <ProjectEntry key={project.id} project={project} number={index + 1} headingLevel={headingLevel} variant={variant} />)}</div>;
}
