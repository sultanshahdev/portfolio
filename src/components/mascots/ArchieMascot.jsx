import MascotFrame, { Face, Shadow } from './MascotFrame.jsx';
export default function ArchieMascot({ pose = 'working', ...props }) {
  const reading = pose === 'reading';
  return <MascotFrame character="archie" pose={pose} {...props}>
    <Shadow rx={47} />
    <path d="m61 120-5 14h15l5-13m18 0 3 13h15l-5-15" className="ink-fill ink-line" />
    <path d="m95 41 6-24 7 2-6 25m7-1 8-17 5 3-7 17" className="coat-fill ink-line" /><path d="m101 17 5-5 2 7" className="accent-fill ink-line" />
    <path d="M49 40h48l20 22v50q0 17-19 17H56q-13 0-13-13V52q0-12 6-12Z" className="paper-fill ink-line" />
    <path d="m98 41-1 22h20Z" className="shade-fill ink-line" /><path d="M106 65v47q0 10-11 15h12q10-4 10-15V64Z" className="soft-shade" />
    <path d="M51 46h37m-37 6h25" className="highlight-line" />
    <Face x={77} y={74} mood="curious" />
    <g className="archie-specs"><circle cx="67" cy="74" r="10" className="ink-line" /><circle cx="87" cy="74" r="10" className="ink-line" /><path d="M77 72h1m-22-1-8-3m49 3 10-3" className="ink-line" /></g>
    <path d="m43 92-12 16m85-18 15 15" className="ink-line limb-line" />
    {reading ? <g className="archie-book"><path d="m24 102 40-5 18 9 19-9 36 6-3 33-32-5-20 7-18-7-37 3Z" className="ink-fill ink-line" /><path d="m30 99 34-4 18 10 20-10 29 5-2 28-27-3-20 8-19-8-32 3Z" className="paper-fill ink-line" /><path d="M82 105v28m-43-25 22-3m-21 10 22-3m37-3 20-4m-20 11 20-3" className="muted-line" /><path d="m84 104 4-4 4 27-6 4Z" className="accent-fill" /></g> : <g className="archie-blueprint"><path d="M24 102q4-10 11-5l83 1q15-5 18 7l-4 24H29Z" className="shade-fill ink-line" /><path d="M35 98h82v33H35Z" className="paper-fill ink-line" /><path d="M34 98c12 0 12 33 0 33s-11-33 0-33m84 0c12 0 12 33 0 33" className="coat-fill ink-line" /><g className="archie-blocks"><path d="M56 116h42m-21 0v-7" className="accent-line" /><rect x="49" y="112" width="13" height="10" rx="2" className="coat-fill ink-line" /><rect x="91" y="112" width="13" height="10" rx="2" className="coat-fill ink-line" /><rect x="71" y="102" width="13" height="10" rx="2" className="shade-fill ink-line" /></g></g>}
  </MascotFrame>;
}
