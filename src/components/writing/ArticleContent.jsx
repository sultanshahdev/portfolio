import { assetUrl } from '../../lib/assets.js';

function hasContent(block) {
  if (block.type === 'prose' || block.type === 'callout') return Boolean(block.text?.trim());
  if (block.type === 'code') return Boolean(block.code?.trim());
  if (block.type === 'image') return Boolean(block.src && block.alt);
  if (block.type === 'list' || block.type === 'metadata') return Boolean(block.items?.length);
  if (block.type === 'diagram') return Boolean(block.nodes?.length);
  return false;
}

export function visibleSections(sections = []) {
  return sections.map((section) => ({ ...section, blocks: (section.blocks || []).filter(hasContent) })).filter((section) => section.blocks.length);
}

function ContentBlock({ block }) {
  switch (block.type) {
    case 'prose': return <p>{block.text}</p>;
    case 'list': {
      const List = block.ordered ? 'ol' : 'ul';
      return <List>{block.items.map((item, index) => <li key={index}>{item}</li>)}</List>;
    }
    case 'code': return (
      <figure className="code-block">
        <figcaption>{block.caption || block.language || 'Code example'}</figcaption>
        <pre tabIndex="0" aria-label={block.caption || `${block.language || ''} code example`}><code>{block.code}</code></pre>
      </figure>
    );
    case 'image': return (
      <figure><img src={assetUrl(block.src)} alt={block.alt} width={block.width} height={block.height} loading="lazy" decoding="async" />{block.caption && <figcaption>{block.caption}</figcaption>}</figure>
    );
    case 'diagram': return (
      <figure className="flow-diagram">
        <ol>{block.nodes.map((node, index) => <li key={index}>{node}{index < block.nodes.length - 1 && <span aria-hidden="true" className="flow-arrow">→</span>}</li>)}</ol>
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    );
    case 'callout': return <aside className="technical-callout">{block.title && <p className="callout-title">{block.title}</p>}<p>{block.text}</p></aside>;
    case 'metadata': return <dl className="content-metadata">{block.items.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>;
    default: return null;
  }
}

export default function ArticleContent({ sections }) {
  return (
    <div className="article-content">
      {visibleSections(sections).map((section) => (
        <section key={section.id} aria-labelledby={section.title ? section.id : undefined}>
          {section.title && <h2 id={section.id}>{section.title}</h2>}
          {section.blocks.map((block, index) => <ContentBlock block={block} key={index} />)}
        </section>
      ))}
    </div>
  );
}
