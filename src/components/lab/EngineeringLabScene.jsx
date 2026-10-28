import { useEffect, useId, useRef, useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { ArtifactGlyph } from '../illustrations/EngineeringArtifact.jsx';
import Mascot from '../mascots/Mascot.jsx';

export default function EngineeringLabScene() {
  const [phase, setPhase] = useState('idle');
  const [cycle, setCycle] = useState(0);
  const timer = useRef(null);
  const id = useId();
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const settle = () => {
      if (motion.matches) {
        clearTimeout(timer.current);
        setPhase(current => current === 'running' ? 'complete' : current);
      }
    };
    motion.addEventListener('change', settle);
    return () => { clearTimeout(timer.current); motion.removeEventListener('change', settle); };
  }, []);
  const activate = () => {
    clearTimeout(timer.current);
    setCycle(value => value + 1);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) setPhase('complete');
    else {
      setPhase('running');
      timer.current = setTimeout(() => setPhase('complete'), 1650);
    }
  };

  return <div className="engineering-lab" data-lab-phase={phase}>
    <div className="lab-world" key={cycle}>
      <svg viewBox="0 0 640 315" fill="none" role="img" aria-labelledby={id} focusable="false">
        <title id={id}>Miniature workshop: workstation, network switch, server and storage connected by cables; Daemon tends the server.</title>
        <path d="m30 170 280-140 290 145-280 140L30 170Z" className="lab-floor" />
        <path d="m30 170 290 145 280-140v8L320 323 30 178Z" className="lab-floor-edge" transform="translate(0 -8)" />
        <g className="lab-floor-grid"><path d="m100 135 290 145m-220-180 290 145M240 65l290 145M100 205 380 65M170 240 450 100M240 275 520 135" /></g>
        <path d="M151 205 235 247 307 211 413 158 507 205" className="lab-wire" />
        <path d="M151 205 235 247 307 211 413 158 507 205" pathLength="1" className="lab-wire-signal" />
        <path d="m413 158-95-47-53 26m43 75 66 33 66-33" className="lab-wire" strokeDasharray="3 4" />
        <ArtifactGlyph kind="processor" transform="translate(191 25) scale(.6)" />
        <ArtifactGlyph kind="server" transform="translate(342 14) scale(1.1)" />
        <ArtifactGlyph kind="terminal" transform="translate(65 73) scale(.95)" />
        <ArtifactGlyph kind="storage" transform="translate(448 95) scale(.85)" />
        <ArtifactGlyph kind="switch" transform="translate(230 139) scale(.85)" />
        <g className="lab-packet"><path d="m-7-6 9-4 10 6-9 5Z M-7-6v9l10 6V1m10-5v9L3 9" /><path d="m-3-5 7 4" /></g>
        <text x="72" y="225" className="lab-world-label">01 / WORKSTATION</text>
        <text x="350" y="25" className="lab-world-label">03 / COMPUTE</text>
        <text x="476" y="233" className="lab-world-label">04 / STORE</text>
        <text x="259" y="286" className="lab-world-mark">02 / ROUTE</text>
        <g transform="translate(125 245)"><rect width="116" height="23" rx="2" className="lab-world-terminal" /><text x="9" y="15" className="lab-world-terminal-text">{phase === 'complete' ? 'rx: delivered' : phase === 'running' ? 'tx: packet_01' : 'tx: ready'}</text></g>
      </svg>
      <span className="lab-world-resident"><Mascot character="daemon" size="100%" motion={phase === 'running'} /></span>
    </div>
    <div className="lab-scene-controls">
      <button type="button" className="lab-button" onClick={activate} disabled={phase === 'running'}>{phase === 'complete' ? <RotateCcw size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}Send a packet</button>
      <span role="status">{phase === 'running' ? 'Routing through the workshop…' : phase === 'complete' ? 'Packet delivered to storage.' : 'A small system, ready to explore.'}</span>
    </div>
    <p className="lab-scene-caption">Workstation → switch → server → storage · illustrated flow</p>
  </div>;
}
