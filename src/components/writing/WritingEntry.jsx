import { Link } from 'react-router-dom';

export default function WritingEntry({ article }) {
  return (
    <article className="writing-entry">
      <div className="project-meta"><span>{article.category}</span><span aria-hidden="true">·</span><span>{article.status}</span>{article.publishedAt && <time dateTime={article.publishedAt}>{article.publishedAt}</time>}</div>
      <h2><Link to={`/writing/${article.slug}`}>{article.title}</Link></h2>
      <p>{article.abstract}</p>
      <Link className="text-link" to={`/writing/${article.slug}`}>Read {article.status === 'Published' ? 'article' : 'draft'} <span aria-hidden="true">→</span></Link>
    </article>
  );
}
