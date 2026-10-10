import ProjectEntry from './ProjectEntry.jsx';
import EmptyState from '../ui/EmptyState.jsx';

export default function ProjectList({ projects, headingLevel = 2 }) {
  if (!projects.length) return <EmptyState>No projects in this category yet.</EmptyState>;
  return <div className="project-list">{projects.map((project) => <ProjectEntry key={project.id} project={project} headingLevel={headingLevel} />)}</div>;
}
