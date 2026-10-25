import MascotFrame, { Face, Shadow, Envelope } from './MascotFrame.jsx';
export default function RelayMascot({ pose = 'working', ...props }) {
  const resting = pose === 'resting';
  return <MascotFrame character="relay" pose={pose} {...props}>
    <Shadow cx={83} rx={47} />
    <path d="M57 94C16 106 15 66 33 70q16 4 0 12" className="ink-line" /><rect x="25" y="76" width="9" height="10" rx="3" className="accent-fill ink-line" />
    <path d={resting ? 'M67 115 51 131H37m51-16 12 17h16' : 'm65 113-19 13-14-1m57-12 18 16 15-3'} className="ink-line limb-line" />
    <path d="M34 124h15l-2 9H29Zm72 4 16-5 6 6-17 8Z" className="ink-fill ink-line" />
    <path d="M68 43C50 44 40 60 43 82c3 28 28 46 51 37 21-8 31-39 17-58-10-14-24-21-43-18Z" className="coat-fill ink-line" />
    <path d="M96 47c34 31 9 75-10 75 20-1 42-28 25-61Z" className="soft-shade" />
    <path d="M51 60q8-12 24-11" className="highlight-line" />
    <path d="m68 44-6-20-8 2m33 18 7-22 9 2" className="ink-line" /><circle cx="54" cy="25" r="4" className="paper-fill ink-line" /><circle cx="103" cy="23" r="4" className="accent-fill ink-line" />
    <Face x={79} y={69} mood="curious" resting={resting} />
    <path d="m49 85 48 26" className="ink-line" strokeWidth="5" /><path d="m50 84 48 26" className="paper-line" strokeWidth="2" />
    <path d="m45 82-12 8m76-8 18 8" className="ink-line limb-line" />
    {pose === 'community' ? <g className="relay-flag"><path d="M126 98V49" className="ink-line" /><path d="M127 49q12-9 25-2v21q-13-7-25 2Z" className="paper-fill ink-line" /><path d="M132 54h13m-13 5h9" className="accent-line" /></g> : <Envelope x={106} y={87} className="relay-envelope" />}
    <path d="M12 119h15m108-80h13m-5-5 5 5-5 5" className="accent-line relay-signal" pathLength="1" />
  </MascotFrame>;
}
