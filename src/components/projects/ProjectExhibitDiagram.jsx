import { useCallback, useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, ShieldCheck } from 'lucide-react';
import Mascot from '../mascots/Mascot.jsx';
import { projectResidents } from '../../data/mascots.js';
import ProjectLabBench from '../lab/ProjectLabBench.jsx';

function Window({ x, y, width = 142, label, children, active = false }) {
  return <g className={active ? 'exhibit-node is-lit' : 'exhibit-node'} transform={`translate(${x} ${y})`}>
    <rect width={width} height="105" rx="4" className="exhibit-window" />
    <path d={`M0 25h${width}`} className="exhibit-rule" />
    <circle cx="12" cy="12" r="2" className="exhibit-dot" /><text x="23" y="16" className="svg-small">{label}</text>
    {children}
  </g>;
}
function Replica({ x, y, label, completed }) {
  return <Window x={x} y={y} width={146} label={label} active={completed}>
    <text x="13" y="48" className="svg-code">document.txt</text>
    <path d="M14 62h91m-91 10h72m-72 10h54" className="exhibit-code-line" />
    <rect x="111" y="56" width="6" height="29" className={completed ? 'exhibit-insert is-inserted' : 'exhibit-insert'} />
  </Window>;
}
function PeerNetwork({ completed }) {
  return <svg viewBox="0 0 580 350" fill="none" aria-hidden="true">
    <text x="28" y="28" className="svg-kicker">REPLICATED CHARACTER STATE</text>
    <path d="M151 208 290 100l139 108M151 208h278" className="exhibit-connection" />
    <path d="M151 208 290 100l139 108M151 208h278" className="exhibit-trace" pathLength="1" />
    <circle cx="290" cy="175" r="31" className="exhibit-orbit" />
    <text x="290" y="172" textAnchor="middle" className="svg-code">CRDT</text><text x="290" y="187" textAnchor="middle" className="svg-small">merge</text>
    <Replica x={217} y={48} label="Peer B / replica" completed={completed} />
    <Replica x={38} y={203} label="Peer A / local edit" completed={completed} />
    <Replica x={396} y={203} label="Peer C / replica" completed={completed} />
    <circle cx="203" cy="166" r="5" className="signal-node" /><circle cx="379" cy="166" r="5" className="signal-node signal-delayed" />
    <text x="290" y="277" textAnchor="middle" className="svg-small">TCP / edit propagation</text>
    <text x="290" y="322" textAnchor="middle" className="svg-small">Independent replicas. Shared document state.</text>
  </svg>;
}
function DatabaseFlow({ completed }) {
  return <svg viewBox="0 0 580 350" fill="none" aria-hidden="true">
    <text x="30" y="28" className="svg-kicker">ONE REQUEST, THROUGH THE LAYERS</text>
    <rect x="30" y="49" width="216" height="40" rx="3" className="exhibit-window" /><text x="45" y="74" className="svg-code">&gt; GET studio</text>
    <path d="M76 90v40h90m97 0h46m97 0h46" className="exhibit-connection" />
    <path d="M76 90v40h425v68" className="exhibit-trace" pathLength="1" />
    {['TCP', 'RESP2 Decoder', 'Command Dispatcher'].map((label, i) => <g key={label} transform={`translate(${30 + i * 175} 108)`} className={completed ? 'exhibit-node is-lit' : 'exhibit-node'}>
      <rect width="155" height="68" rx="3" className="exhibit-window" /><text x="13" y="23" className="svg-small">0{i + 1}</text><text x="77.5" y="48" textAnchor="middle" className="svg-label">{label}</text>
    </g>)}
    <g transform="translate(284 215)"><path d="M0 12c0-16 246-16 246 0v76c0 16-246 16-246 0z" className="exhibit-store" /><ellipse cx="123" cy="12" rx="123" ry="12" className="exhibit-store" /><text x="123" y="53" textAnchor="middle" className="svg-label">Shared Store</text><text x="123" y="74" textAnchor="middle" className="svg-small">one keyspace / sync.Mutex</text></g>
    <path d="M503 177v30m-5-6 5 6 5-6" className="exhibit-connection" />
    <text x="35" y="237" className="svg-kicker">04 / MEMORY</text><text x="35" y="263" className="svg-code">key → value</text><text x="35" y="286" className="svg-small">Read. Validate. Respond.</text>
    <circle cx="272" cy="142" r="5" className="signal-node" />
  </svg>;
}
function SecurityFlow({ completed }) {
  return <svg viewBox="0 0 580 350" fill="none" aria-hidden="true">
    <text x="30" y="28" className="svg-kicker">THE HUMAN IS PART OF THE SYSTEM</text>
    <path d="M98 143h380" className="exhibit-connection" /><path d="M98 143h380" pathLength="1" className="exhibit-trace" />
    <Window x={25} y={90} width={132} label="01 / Alert"><path d="m47 68 19-30 19 30zM66 49v9m0 5v1" className="exhibit-detail" /></Window>
    <Window x={208} y={90} width={145} label="02 / Evidence"><text x="15" y="51" className="svg-code">IP reputation</text><path d="M15 65h99m-99 11h75m-75 11h84" className="exhibit-code-line" /></Window>
    <g transform="translate(463 142)" className={completed ? 'exhibit-node is-lit' : 'exhibit-node'}><path d="m0-51 51 51L0 51-51 0z" className="approval-diamond" /><path d="m-12 0 8 9 18-20" className="exhibit-detail" /></g>
    <text x="463" y="217" textAnchor="middle" className="svg-label">03 / Human approval</text>
    <path d="M463 229v39H215" className="exhibit-connection" strokeDasharray="4 5" />
    <rect x="30" y="247" width="300" height="58" rx="3" className="exhibit-response" /><text x="45" y="270" className="svg-label">04 / Simulated Response</text><text x="45" y="290" className="svg-small">PostgreSQL lab blocklist only</text>
    <circle cx="380" cy="143" r="5" className="signal-node" />
  </svg>;
}
function SourceFlow({ completed }) {
  return <svg viewBox="0 0 580 350" fill="none" aria-hidden="true">
    <text x="28" y="28" className="svg-kicker">FOLLOW THE QUESTION TO THE SOURCE</text>
    <rect x="28" y="47" width="360" height="43" rx="3" className="exhibit-window" /><circle cx="48" cy="66" r="6" className="exhibit-detail" /><path d="m52 71 5 5" className="exhibit-detail" /><text x="70" y="73" className="svg-code">Where does this behavior live?</text>
    <path d="M120 91v35m0 33v34h140" className="exhibit-connection" /><path d="M120 91v102h232" className="exhibit-trace" pathLength="1" />
    <rect x="28" y="121" width="185" height="40" rx="3" className="exhibit-store" /><text x="120" y="146" textAnchor="middle" className="svg-label">Retrieval</text>
    <text x="28" y="210" className="svg-kicker">RANKED CANDIDATES</text>
    {[0, 1, 2].map(i => <g key={i}><rect x="28" y={225 + i * 29} width="185" height="24" className={completed && i === 0 ? 'exhibit-response' : 'exhibit-window'} /><text x="39" y={241 + i * 29} className="svg-code">0{i + 1}</text><path d={`M65 ${237 + i * 29}h${110 - i * 22}`} className="exhibit-code-line" /></g>)}
    <g transform="translate(260 122)" className={completed ? 'exhibit-node is-lit' : 'exhibit-node'}><rect width="292" height="193" rx="4" className="exhibit-window" /><path d="M0 29h292" className="exhibit-rule" /><text x="15" y="19" className="svg-small">SOURCE INSPECTION</text><text x="18" y="60" className="svg-code">{'{'} read the implementation {'}'}</text>{[0, 1, 2, 3, 4].map(i => <g key={i}><text x="17" y={91 + i * 18} className="svg-small">{i + 1}</text><path d={`M43 ${87 + i * 18}h${[155, 190, 115, 174, 100][i]}`} className={i === 2 ? 'exhibit-highlight' : 'exhibit-code-line'} /></g>)}<text x="18" y="181" className="svg-small">Inspect candidates. Establish relevance.</text></g>
  </svg>;
}
const mobileStages = {
  c2g: ['Local edit', 'TCP propagation', 'Replica merge', 'Shared document state'],
  clara: ['TCP', 'RESP2 Decoder', 'Command Dispatcher', 'Shared Store'],
  'soar-lite': ['Alert', 'Evidence', 'Human approval', 'Simulated Response'],
  codecraft: ['Behavior Question', 'Retrieval', 'Ranked Candidates', 'Source Inspection'],
};
const settings = {
  c2g: { label: 'Send an edit', ready: 'Ready to connect three replicas', done: 'Edit illustrated across three replicas', title: 'Connected collaboration', Component: PeerNetwork },
  clara: { label: 'Trace a request', ready: 'Follow a command into memory', done: 'Request traced from TCP to the shared store', title: 'Inside the database', Component: DatabaseFlow },
  'soar-lite': { label: 'Review & approve simulation', ready: 'Awaiting human approval · illustrative workflow', done: 'Approved illustration · response simulated, no traffic blocked', title: 'A deliberate response', Component: SecurityFlow },
  codecraft: { label: 'Follow the question', ready: 'Start with a behavior question', done: 'Candidates ranked · source inspection remains essential', title: 'From question to evidence', Component: SourceFlow },
};

export default function ProjectExhibitDiagram({ project, compact = false }) {
  const { label, ready, done, title, Component } = settings[project.slug];
  const [phase, setPhase] = useState('idle');
  const [iteration, setIteration] = useState(0);
  const figure = useRef(null);
  const timer = useRef(null);
  const activate = useCallback(() => {
    clearTimeout(timer.current);
    setIteration(i => i + 1);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPhase('complete');
    else {
      setPhase('running');
      timer.current = setTimeout(() => setPhase('complete'), 1600);
    }
  }, []);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => { if (motion.matches) { clearTimeout(timer.current); setPhase(current => current === 'running' ? 'complete' : current); } };
    motion.addEventListener('change', change);
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        // The security exhibit waits for an explicit human action.
        if (project.slug !== 'soar-lite' && !compact) activate();
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(figure.current);
    return () => { observer.disconnect(); clearTimeout(timer.current); motion.removeEventListener('change', change); };
  }, [activate, project.slug, compact]);
  return <div ref={figure} className={`project-exhibit exhibit-${project.slug}${compact ? ' exhibit-compact' : ''}`} data-phase={phase} data-mascot-scope>
    <figure className="exhibit-figure" aria-label={`${project.title}: ${title}`}>
    <div className="exhibit-caption"><span>{title}</span><span aria-hidden="true">FIG. {String(['c2g', 'clara', 'soar-lite', 'codecraft'].indexOf(project.slug) + 1).padStart(2, '0')}</span></div>
    <div className="exhibit-art-frame"><div key={iteration} className={`exhibit-art${phase === 'running' ? ' is-running' : ''}`}><Component completed={phase === 'complete'} /></div>{compact && <span className="project-resident"><Mascot character={projectResidents[project.slug]} size="100%" /></span>}</div>
    <ol className="diagram-stage-key" aria-label="Illustrated stages">{mobileStages[project.slug].map(stage => <li key={stage}>{stage}</li>)}</ol>
    {!compact && <ProjectLabBench slug={project.slug} phase={phase} />}
    <figcaption>{project.visual.caption}{project.slug === 'soar-lite' && <strong> No firewall or network traffic is blocked.</strong>}</figcaption>
    </figure>
    {!compact && <div className="exhibit-controls"><button type="button" onClick={activate} disabled={phase === 'running'}>{project.slug === 'soar-lite' ? <ShieldCheck size={14} aria-hidden="true" /> : phase === 'complete' ? <RotateCcw size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}{label}</button><span role="status">{phase === 'running' ? 'Tracing the illustration…' : phase === 'complete' ? done : ready}</span></div>}
  </div>;
}
