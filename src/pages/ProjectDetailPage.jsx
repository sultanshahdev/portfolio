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
    <article className="detail-page case-study" id="case-study-top" tabIndex="-1" key={project.slug}>
      <PageMeta title={`${project.title} — ${project.subtitle}`} description={project.summary} article />
      <TextLink to="/projects" className="back-link">← All projects</TextLink>
      <header className="detail-heading">
        <ProjectMeta project={project} />
        <h1>{project.title}</h1>
        <p className="detail-subtitle">{project.subtitle}</p>
        <p className="abstract">{project.summary}</p>
        <p className="case-study-role">{project.role} · {project.year}</p>
        <div className="inline-links">
          <TextLink href={project.repositoryUrl}>GitHub repository ↗</TextLink>
          {project.demoUrl && <TextLink href={project.demoUrl}>Live demo ↗</TextLink>}
        </div>
        <ul className="technology-list" aria-label="Technologies">{project.technologies.map((item) => <li key={item}>{item}</li>)}</ul>
        <aside className="technical-callout project-qualification" aria-label="Project status and verification boundary"><p className="callout-title">{project.status}</p><p>{project.qualification}</p></aside>
        {project.attribution && <p className="attribution">{project.attribution}</p>}
      </header>
      <ProjectCaseStudy project={project} />
    </article>
  );
}
