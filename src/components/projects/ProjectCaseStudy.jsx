import ArticleContent from '../writing/ArticleContent.jsx';
import TextLink from '../ui/TextLink.jsx';
import { assetUrl } from '../../lib/assets.js';

export default function ProjectCaseStudy({ project }) {
  return (
    <>
      {project.image?.src && <figure><img src={assetUrl(project.image.src)} alt={project.image.alt} width={project.image.width} height={project.image.height} loading="lazy" decoding="async" />{project.image.caption && <figcaption>{project.image.caption}</figcaption>}</figure>}
      <ArticleContent sections={project.sections} />
      <section className="source-section" aria-labelledby="project-source">
        <h2 id="project-source">Source & review</h2>
        <p className="entry-summary">{project.verification === 'source-reviewed' && project.reviewedAt
          ? `Source reviewed on ${project.reviewedAt}. This review describes the inspected snapshot; it is not a runtime certification.`
          : 'Draft case study. Source verification is still pending.'}</p>
        <div className="inline-links">
          <TextLink href={project.repositoryUrl}>GitHub repository <span aria-hidden="true">↗</span></TextLink>
          {project.demoUrl && <TextLink href={project.demoUrl}>Live demo <span aria-hidden="true">↗</span></TextLink>}
        </div>
        {project.sourceCommit && <p className="source-revision">Reviewed revision: <a href={`${project.repositoryUrl}/tree/${project.sourceCommit}`}><code>{project.sourceCommit.slice(0, 7)}</code></a></p>}
        {project.sourceFiles?.length > 0 && <ul className="source-files">{project.sourceFiles.map((file) => <li key={file}><a href={`${project.repositoryUrl}/blob/${project.sourceCommit}/${file}`}>{file}</a></li>)}</ul>}
      </section>
    </>
  );
}
