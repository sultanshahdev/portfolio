import Mascot from '../mascots/Mascot.jsx';

export default function EngineeringBlueprint() {
  return <details className="engineering-blueprint">
    <summary><span className="blueprint-glyph" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M5 4h22v24H5Z" /><path d="M16 11v7H9m7 0h7" /><path d="M12 7h8v6h-8ZM6 18h7v6H6Zm13 0h7v6h-7Z" /></svg></span><span>Unfold the architecture blueprint</span><span className="blueprint-index">VIEW / 01</span></summary>
    <div className="blueprint-body" data-mascot-scope>
      <div className="blueprint-heading"><div><p className="section-label">This portfolio / real frontend architecture</p><h3>Small pieces, explicit boundaries.</h3></div><Mascot character="archie" size={76} /></div>
      <ol className="blueprint-flow"><li><strong>Vite</strong><span>Builds static assets</span></li><li><strong>React + HashRouter</strong><span>Resolves pages under /portfolio/</span></li><li><strong>Page components</strong><span>Compose local data + reusable UI</span></li><li><strong>Optional chunks</strong><span>Case studies + this lab load on demand</span></li></ol>
      <p className="blueprint-footnote"><code>dist/ → GitHub Pages</code><span>SVG and CSS for the illustrations. Native browser streams for gzip.</span></p>
    </div>
  </details>;
}
