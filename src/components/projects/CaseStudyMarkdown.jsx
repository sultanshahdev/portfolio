import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TechnicalDiagram from './TechnicalDiagram.jsx';
import EngineeringTimeline from './EngineeringTimeline.jsx';
import { assetUrl } from '../../lib/assets.js';

const text = (node) => node.value ?? (node.children || []).map(text).join('');
const slug = (value) => value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');

function headingIds(prefix) {
  return (tree) => {
    const used = new Map();
    for (const node of tree.children) {
      if (node.type !== 'heading') continue;
      const base = `${prefix}--${slug(text(node))}`;
      const count = (used.get(base) || 0) + 1;
      used.set(base, count);
      node.data = { ...node.data, hProperties: { id: count === 1 ? base : `${base}-${count}` } };
    }
  };
}

export default function CaseStudyMarkdown({ chapter, diagrams, sources }) {
  return (
    <Markdown skipHtml remarkPlugins={[remarkGfm, () => headingIds(chapter.id)]} components={{
      h1: ({ children, node, ...props }) => <h3 {...props}>{children}</h3>,
      h2: ({ children, node, ...props }) => <h3 {...props}>{children}</h3>,
      a: ({ href, children }) => {
        if (href?.startsWith('#')) return <Link to={href}>{children}</Link>;
        const source = sources.find((item) => item.filename === href);
        return <a href={source ? assetUrl(source.url) : href}>{children}</a>;
      },
      pre: ({ node, children }) => {
        const code = node.children.find((child) => child.tagName === 'code');
        const source = code ? text(code).trimEnd() : '';
        const language = code?.properties.className?.find((name) => name.startsWith('language-'))?.replace('language-', '');
        if (language === 'mermaid') return <TechnicalDiagram source={source} diagram={diagrams.find((d) => d.source.trim() === source.trim())} />;
        return <figure className="code-block"><figcaption>{language || 'Code excerpt'}</figcaption><pre tabIndex="0" aria-label={`${language || 'Source'} code excerpt`}>{children}</pre></figure>;
      },
      table: ({ children }) => chapter.timeline
        ? <EngineeringTimeline>{children}</EngineeringTimeline>
        : <div className="technical-table" tabIndex="0" role="region" aria-label="Scrollable technical table"><table>{children}</table></div>,
      img: ({ src, alt }) => <img src={src} alt={alt || ''} loading="lazy" decoding="async" />,
    }}>{chapter.markdown}</Markdown>
  );
}
