import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, Play, RotateCcw } from 'lucide-react';
import { compressionSample } from '../../data/lab.js';
import { measureCompression } from '../../lib/compression.js';

export default function CompressionLab() {
  const [text, setText] = useState(compressionSample);
  const [result, setResult] = useState(null);
  const [state, setState] = useState('idle');
  const revision = useRef(0);
  const id = useId();
  const originalBytes = new TextEncoder().encode(text).byteLength;
  const supported = typeof globalThis.CompressionStream === 'function';
  useEffect(() => () => { revision.current += 1; }, []);

  function edit(value) {
    revision.current += 1;
    setText(value);
    setResult(null);
    setState('idle');
  }
  async function compress(event) {
    event.preventDefault();
    const request = ++revision.current;
    setState('busy');
    setResult(null);
    try {
      const measurement = await measureCompression(text);
      if (request !== revision.current) return;
      setResult(measurement);
      setState(measurement.supported ? 'complete' : 'unsupported');
    } catch {
      if (request === revision.current) setState('error');
    }
  }
  const measured = result?.supported;
  const delta = measured ? `${Math.abs(result.savedBytes)} B ${result.savedBytes >= 0 ? 'smaller' : 'larger'}` : '—';
  const percentage = measured && result.percent !== null
    ? `${Math.abs(result.percent).toFixed(1)}% ${result.percent >= 0 ? 'reduction' : 'increase'}` : null;

  return <section className="compression-lab" aria-labelledby={`${id}-title`}>
    <header className="instrument-heading"><div><p className="section-label">01 / Data representation</p><h3 id={`${id}-title`}>Compression Lab</h3></div><span className="instrument-stamp">UTF-8 → gzip</span></header>
    <p className="instrument-intro">Repeated patterns take less space. Try a paragraph, a single letter, or nothing at all.</p>
    <form className="diagnostic-screen" onSubmit={compress}>
      <div className="screen-title"><span><i aria-hidden="true" />compression / local browser</span><span>gzip</span></div>
      <label htmlFor={`${id}-input`}>Input text <span>up to 12,000 characters</span></label>
      <textarea id={`${id}-input`} value={text} onChange={event => edit(event.target.value)} maxLength={12000} spellCheck={false} rows={5} aria-describedby={`${id}-note`} />
      <div className="compression-flow" aria-hidden="true"><span>UTF-8 bytes</span><ArrowRight size={15} /><span>deflate + gzip framing</span><ArrowRight size={15} /><span>output</span></div>
      <dl className="compression-metrics">
        <div><dt>Original</dt><dd data-measure="original">{originalBytes}<span> B</span></dd></div>
        <div><dt>Compressed</dt><dd data-measure="compressed">{measured ? result.compressedBytes : '—'}{measured && <span> B</span>}</dd></div>
        <div><dt>Difference</dt><dd className="metric-difference" data-measure="difference">{delta}<small>{percentage || (measured ? 'Percentage undefined for 0 bytes' : 'Run to measure')}</small></dd></div>
      </dl>
      <div className="instrument-actions"><button className="screen-button" type="submit" disabled={!supported || state === 'busy'}><Play size={13} aria-hidden="true" />{state === 'busy' ? 'Compressing…' : 'Compress text'}</button><button type="button" className="screen-button screen-button--quiet" onClick={() => edit(compressionSample)}><RotateCcw size={13} aria-hidden="true" />Reset sample</button></div>
      <p className={`instrument-status${state === 'error' ? ' is-error' : ''}`} role="status" aria-live="polite">{!supported || state === 'unsupported' ? 'Gzip is unavailable in this browser. UTF-8 bytes are still measured; try a browser with CompressionStream support.' : state === 'busy' ? 'Measuring the gzip output…' : state === 'error' ? 'Compression failed in this browser. Edit the text or reset the sample and try again.' : measured ? `${delta}${percentage ? ` · ${percentage}` : ''}. ${result.verified ? 'Round trip verified: every byte restored.' : 'Gzip measured; round-trip verification is unavailable in this browser.'}` : 'Ready. Measurements run entirely in your browser.'}</p>
    </form>
    <p id={`${id}-note`} className="instrument-note">Gzip includes a header and trailer. Short or empty inputs can grow; repeating text often shrinks. These are byte counts, not a speed benchmark.</p>
  </section>;
}
