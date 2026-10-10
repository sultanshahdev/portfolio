import { Link, useParams } from 'react-router-dom';
import { writing } from '../data/writing.js';
import ArticleContent, { visibleSections } from '../components/writing/ArticleContent.jsx';
import TextLink from '../components/ui/TextLink.jsx';
import PageMeta from '../components/layout/PageMeta.jsx';
import NotFoundPage from './NotFoundPage.jsx';

export default function ArticlePage() {
  const { slug } = useParams();
  const article = writing.find((item) => item.slug === slug);
  if (!article) return <NotFoundPage />;
  const draft = article.status !== 'Published';
  return (
    <article className="detail-page">
      <PageMeta title={article.title} description={article.abstract} article noIndex={draft} />
      <TextLink to="/writing" className="back-link">← All writing</TextLink>
      <header className="detail-heading">
        <div className="project-meta"><span>{article.category}</span><span aria-hidden="true">·</span><span>{article.status}</span>{article.publishedAt && <time dateTime={article.publishedAt}>{article.publishedAt}</time>}</div>
        <h1>{article.title}</h1>
        <p className="abstract">{article.abstract}</p>
      </header>
      {draft && <p className="editorial-note">{article.status}. {article.status === 'Sample draft'
        ? 'This is editable sample content, not a published article or a claim of professional experience.'
        : 'This article is a work in progress and has not been published.'}</p>}
      {article.showTableOfContents && <nav className="table-of-contents" aria-label="On this page"><p className="section-label">On this page</p><ol>{visibleSections(article.sections).filter((section) => section.title).map((section) => <li key={section.id}><Link to={`#${section.id}`}>{section.title}</Link></li>)}</ol></nav>}
      <ArticleContent sections={article.sections} />
      {article.references?.length > 0 && <section className="source-section" aria-labelledby="article-references"><h2 id="article-references">References</h2><ul>{article.references.map((reference) => <li key={reference.url}><TextLink href={reference.url}>{reference.label}</TextLink></li>)}</ul></section>}
      <div className="article-end"><TextLink to="/writing">← Back to writing</TextLink></div>
    </article>
  );
}
