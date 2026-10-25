import MascotFrame, { Face, Shadow } from './MascotFrame.jsx';
export default function ForgeMascot({ pose = 'working', ...props }) {
  const resting = pose === 'resting';
  return <MascotFrame character="forge" pose={pose} {...props}>
    <Shadow rx={47} />
    <path d={resting ? 'm58 119-16 12H28v7h35l7-15m27-4 14 12h15v7H94l-6-15' : 'M57 120v16h17v-14m16 0v14h18v-16'} className="ink-fill ink-line" />
    <path d="M47 67q0-16 31-16t36 17l8 43q2 19-18 19H57q-21 0-17-19Z" className="shade-fill ink-line" />
    <path d="m107 72 10 45q0 10-10 12h7q12-4 8-18l-8-43Z" className="soft-shade" />
    <rect x="49" y="57" width="61" height="44" rx="18" className="paper-fill ink-line" /><Face x={80} y={75} resting={resting} mood={resting ? 'calm' : 'happy'} />
    <path d="M42 54q0-31 37-31t39 31Z" className="coat-fill ink-line" /><path d="M79 24v24" className="accent-line" strokeWidth="7" /><path d="M46 54h70" className="highlight-line" /><path d="M36 52h87v9H36Z" className="paper-fill ink-line" /><path d="M51 43q2-9 13-11" className="highlight-line" />
    <path d="M43 110h74v11H43Z" className="ink-fill ink-line" /><rect x="51" y="108" width="19" height="19" rx="3" className="coat-fill ink-line" /><rect x="84" y="108" width="20" height="19" rx="3" className="coat-fill ink-line" /><path d="M58 113v9m34-9v9" className="muted-line" />
    <path d="m44 84-13 9m84-7 15 14" className="ink-line limb-line" />
    <g className="forge-wrench"><path d="M23 76q-12 1-12 12 1 9 12 11l-1 27 9 1 1-29q10-5 6-16l-6 8-10-3Z" className="coat-fill ink-line" /><path d="M26 105v16" className="highlight-line fine-line" /></g>
    <g className="forge-pipe-left"><path d="M116 115v-9h15v10" className="ink-line" strokeWidth="7" /><path d="M116 114v-8h15" className="paper-line" strokeWidth="2" /></g>
    <g className="forge-pipe-right"><path d="M148 118v-13h-10v11" className="ink-line" strokeWidth="7" /><path d="M148 116v-11h-10" className="paper-line" strokeWidth="2" /></g>
    <path d="m125 132 7 5 10-10" className="accent-line forge-check" strokeWidth="2.5" />
  </MascotFrame>;
}
