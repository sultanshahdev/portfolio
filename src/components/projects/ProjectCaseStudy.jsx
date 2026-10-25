import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import CaseStudyToc from './CaseStudyToc.jsx';
import CaseStudyMarkdown from './CaseStudyMarkdown.jsx';
import { assetUrl } from '../../lib/assets.js';

function Chapter({ chapter, data, appendix = false }) {
  const Heading = appendix ? 'h3' : 'h2';
  return (
    <section className="case-study-chapter" aria-labelledby={chapter.id}>
      <Heading id={chapter.id} tabIndex="-1" data-chapter>{chapter.title}</Heading>
      <CaseStudyMarkdown chapter={chapter} diagrams={data.diagrams} sources={data.sources} />
    </section>
  );
}

function CaseStudyReader({ data, project }) {
  const sourceChapter = { id: 'publication-sources', title: 'Source & evidence' };
  return (
    <>
      <section className="case-study-glance" aria-labelledby="at-a-glance">
        <h2 id="at-a-glance" className="section-label">At a glance</h2>
        <dl>{project.highlights.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
      </section>
      <div className="case-study-reading-layout">
        <CaseStudyToc chapters={data.chapters} appendices={[...data.appendices, sourceChapter]} />
        <div className="case-study-manuscript">
          <div className="article-content case-study-content">
            {data.chapters.map((chapter) => <Chapter key={chapter.id} chapter={chapter} data={data} />)}
            {data.appendices.map((appendix) => (
              <details className="case-study-appendix" key={appendix.id}>
                <summary id={appendix.id} data-chapter>{appendix.title}</summary>
                {appendix.chapters.map((chapter) => <Chapter key={chapter.id} chapter={chapter} data={data} appendix />)}
              </details>
            ))}
          </div>
          <section className="source-section publication-sources" aria-labelledby={sourceChapter.id}>
            <h2 id={sourceChapter.id} tabIndex="-1" data-chapter>{sourceChapter.title}</h2>
            <p>This publication preserves the supplied engineering record. Product test results are reported from that record; they were not rerun as part of building this portfolio.</p>
            <div className="inline-links">
              <a className="text-link" href={project.repositoryUrl}>GitHub repository ↗</a>
              {project.demoUrl && <a className="text-link" href={project.demoUrl}>Live demo ↗</a>}
            </div>
            <p className="source-download-label">Original documentation</p>
            <ul className="source-files">{data.sources.map((source) => <li key={source.filename}><a href={assetUrl(source.url)} download>{source.filename}</a></li>)}</ul>
            <p className="source-revision">{data.diagrams.length} source diagrams. Original Mermaid text is available with every figure. Upstream source revisions and verification boundaries are retained in the narrative and evidence notes.</p>
          </section>
          <div className="article-end case-study-end"><Link className="text-link" to="/projects">← Back to projects</Link><Link className="text-link" to="#case-study-top">Back to top ↑</Link></div>
        </div>
      </div>
    </>
  );
}

// Each generated publication is its own chunk, loaded only for its detail route.
const documents = import.meta.glob('../../content/projects/*.json', { import: 'default' });
const readers = Object.fromEntries(Object.entries(documents).map(([path, load]) => [
  path.split('/').at(-1).replace('.json', ''),
  lazy(async () => {
    const data = await load();
    return { default: (props) => <CaseStudyReader data={data} {...props} /> };
  }),
]));

export default function ProjectCaseStudy({ project }) {
  const Reader = readers[project.slug];
  return <Suspense fallback={<p className="publication-loading" role="status">Loading engineering study…</p>}><Reader project={project} /></Suspense>;
}
