import { Pause, Play } from 'lucide-react';
import useCodePlayback from './useCodePlayback.js';

// Highlighted tokens remain escaped React text, including partially typed text.
const tokens = /(\/\/[^\n]*|'[^']*'?|"[^"]*"?|\b(?:function|return|const|for|of|if|try|catch|new)\b|\b(?:true|false|null|Boolean|Number|JSON|URL)\b|\b\d+\b)/g;
function CodeLine({ text }) {
  return text.split(tokens).map((token, index) => {
    const kind = /^\/\//.test(token) ? 'comment' : /^['"]/.test(token) ? 'string'
      : /^(function|return|const|for|of|if|try|catch|new)$/.test(token) ? 'keyword'
        : /^(true|false|null|Boolean|Number|JSON|URL|\d+)$/.test(token) ? 'value' : '';
    return <span key={index} className={kind ? `code-${kind}` : undefined}>{token}</span>;
  });
}

export default function DisciplineCodeDisplay({ discipline, examples, paused, onTogglePause }) {
  const { viewport, example, text, phase, running, visible, reduced } = useCodePlayback(examples, paused);
  const state = reduced ? 'Static / reduced motion' : paused ? 'Paused' : !running ? 'Standby' : phase === 'holding' ? 'Example complete' : phase === 'gap' ? 'Next example' : 'Typing';
  return <figure ref={viewport} className="discipline-code-console" aria-label={`${discipline.label}: illustrative code example`} data-code-phase={phase} data-code-running={running} data-code-visible={visible} data-code-count={text.length}>
    <div className="control-code-header"><span className="control-window-marks" aria-hidden="true"><i /><i /><i /></span><span className="control-code-file">{example.file}</span><button type="button" className="control-code-toggle" onClick={onTogglePause} aria-pressed={paused} aria-label={paused ? 'Resume code animation' : 'Pause code animation'} disabled={reduced}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}<span>{paused ? 'Resume' : 'Pause'}</span></button></div>
    <div className="control-code-viewport" tabIndex={0} role="region" aria-label="Scrollable illustrative code">
      <pre className="control-code-visual" aria-hidden="true"><code>{text.split('\n').map((line, index, lines) => <span className="control-code-line" key={index}><span className="control-line-number">{String(index + 1).padStart(2, '0')}</span><span className="control-line-text"><CodeLine text={line} />{index === lines.length - 1 && <span className="control-code-cursor" />}</span></span>)}</code></pre>
      <pre className="sr-only" aria-label="Completed code example"><code>{example.source}</code></pre>
    </div>
    <div className="control-code-readout" aria-hidden="true"><span><i />{state}</span><span>{text.length} / {example.source.length} chars</span></div>
    <figcaption><span>Illustrative {example.language}</span><span>{example.context}</span></figcaption>
  </figure>;
}
