import { useEffect, useId, useRef, useState } from 'react';
import { CornerDownLeft } from 'lucide-react';
import { runLabCommand } from '../../lib/labCommands.js';

export default function EngineeringConsole() {
  const [command, setCommand] = useState('');
  const [entries, setEntries] = useState([]);
  const [announcement, setAnnouncement] = useState('');
  const input = useRef(null);
  const output = useRef(null);
  const history = useRef([]);
  const cursor = useRef(0);
  const sequence = useRef(0);
  const id = useId();
  useEffect(() => { output.current.scrollTop = output.current.scrollHeight; }, [entries]);

  const submit = (value) => {
    if (!value.trim()) return;
    const result = runLabCommand(value);
    history.current = [...history.current, value].slice(-30);
    cursor.current = history.current.length;
    if (result.clear) {
      setEntries([]);
      setAnnouncement('Console cleared.');
    } else {
      setEntries(current => [...current, { id: sequence.current++, command: value, lines: result.lines }].slice(-30));
      setAnnouncement('');
    }
    setCommand('');
    input.current?.focus({ preventScroll: true });
  };
  const recall = (event) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    event.preventDefault();
    cursor.current = Math.min(history.current.length, Math.max(0, cursor.current + (event.key === 'ArrowUp' ? -1 : 1)));
    setCommand(history.current[cursor.current] || '');
  };

  return <section className="engineering-console" aria-labelledby={`${id}-title`}>
    <header className="instrument-heading"><div><p className="section-label">02 / Portfolio interface</p><h3 id={`${id}-title`}>Engineering console</h3></div><span className="instrument-stamp">local / read-only</span></header>
    <p className="instrument-intro" id={`${id}-description`}>A small command interface to this portfolio. Type <code>help</code> to explore. No system shell or server connection.</p>
    <div className="diagnostic-screen">
      <div className="screen-title"><span><i aria-hidden="true" />sultan / workshop</span><span>portfolio console</span></div>
      <div ref={output} className="console-output" role="log" aria-label="Console output" aria-live="polite" aria-relevant="additions" tabIndex={0}>
        {entries.length === 0 && !announcement && <p className="console-welcome">Welcome to the workshop.<br />Try <span>projects</span>, <span>skills</span>, or <span>architecture</span>.</p>}
        {entries.map(entry => <div className="console-entry" key={entry.id}><p className="console-echo"><span aria-hidden="true">› </span>{entry.command}</p><pre>{entry.lines.join('\n')}</pre></div>)}
      </div>
      <form className="console-prompt" onSubmit={event => { event.preventDefault(); submit(command); }}>
        <label htmlFor={`${id}-command`} className="sr-only">Portfolio command</label><span aria-hidden="true">›</span>
        <input ref={input} id={`${id}-command`} value={command} onChange={event => setCommand(event.target.value)} onKeyDown={recall} maxLength={120} autoComplete="off" autoCapitalize="off" spellCheck={false} aria-describedby={`${id}-description`} placeholder="help" />
        <button type="submit" className="screen-button" aria-label="Run command"><CornerDownLeft size={16} aria-hidden="true" /></button>
      </form>
      <div className="console-shortcuts" aria-label="Suggested commands">{['help', 'projects', 'architecture'].map(value => <button type="button" key={value} onClick={() => submit(value)}>{value}</button>)}</div>
      <span className="sr-only" role="status">{announcement}</span>
    </div>
    <p className="instrument-note">Enter to run · ↑ / ↓ for history · <code>clear</code> to start again. Output is drawn from the portfolio’s own data.</p>
  </section>;
}
