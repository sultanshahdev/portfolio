import { useEffect, useRef, useState } from 'react';
import { assetUrl } from '../../lib/assets.js';

export default function TechnicalDiagram({ diagram, source }) {
  const [failed, setFailed] = useState(false);
  const [fitted, setFitted] = useState(false);
  const viewport = useRef(null);
  const available = diagram?.src && !failed;
  const caption = diagram?.caption || 'Architecture diagram — original Mermaid source';
  const center = () => {
    const element = viewport.current;
    if (element) element.scrollLeft = element.scrollWidth * (diagram?.focusX ?? 0.5) - element.clientWidth / 2;
  };
  useEffect(() => { if (!fitted) center(); }, [fitted]);
  return (
    <figure className="technical-diagram" data-diagram={diagram?.number}>
      <div className="diagram-label"><span>Figure {String(diagram?.number || '').padStart(2, '0')}</span><span>{available ? 'Architecture / process' : 'Readable source fallback'}</span></div>
      {available && <div className="diagram-size-controls"><span>Scroll to explore ↔</span><button type="button" aria-pressed={fitted} onClick={() => setFitted(!fitted)}>Fit width</button></div>}
      {available ? (
        <div ref={viewport} className="diagram-scroll" tabIndex="0" role="region" aria-label={`Scrollable diagram: ${caption}`}>
          <img src={assetUrl(diagram.src)} alt={caption} width={diagram.width} height={diagram.height} loading="lazy" decoding="async" onLoad={center} onError={() => setFailed(true)} style={{ width: fitted ? '100%' : `${diagram.width}px` }} />
        </div>
      ) : <p className="diagram-fallback" role="status">The diagram could not be displayed. Its complete Mermaid source is available below.</p>}
      <figcaption>{caption}</figcaption>
      <div className="diagram-actions">
        {available && <a className="text-link" href={assetUrl(diagram.src)} target="_blank" rel="noreferrer">Open full-size diagram ↗</a>}
        {diagram?.sourcePath && <a className="text-link" href={assetUrl(diagram.sourcePath)} download>Download Mermaid source</a>}
      </div>
      <details className="diagram-source" open={available ? undefined : true}>
        <summary>Read diagram source</summary>
        <pre tabIndex="0" aria-label={`Mermaid source: ${caption}`}><code>{source}</code></pre>
      </details>
    </figure>
  );
}
