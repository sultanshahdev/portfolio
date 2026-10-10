import { useParams } from 'react-router-dom';
import { projects } from '../data/projects.js';
import ProjectMeta from '../components/projects/ProjectMeta.jsx';
import ProjectCaseStudy from '../components/projects/ProjectCaseStudy.jsx';
import TextLink from '../components/ui/TextLink.jsx';
import PageMeta from '../components/layout/PageMeta.jsx';
import NotFoundPage from './NotFoundPage.jsx';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFoundPage />;
  return (
    <article className="detail-page">
      <PageMeta title={`${project.title} — ${project.subtitle}`} description={project.summary} article />
      <TextLink to="/projects" className="back-link">← All projects</TextLink>
      <header className="detail-heading">
        <ProjectMeta project={project} detailed />
        <h1>{project.title}</h1>
        <p className="detail-subtitle">{project.subtitle}</p>
        <p className="abstract">{project.summary}</p>
        <ul className="technology-list" aria-label="Technologies">{project.technologies.map((item) => <li key={item}>{item}</li>)}</ul>
        {project.attribution && <p className="attribution">{project.attribution}</p>}
      </header>
      <ProjectCaseStudy project={project} />
      <div className="article-end"><TextLink to="/projects">← Back to projects</TextLink></div>
    </article>
  );
}
