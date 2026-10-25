import MascotFrame, { Face, Shadow, Envelope } from './MascotFrame.jsx';
export default function SentinelMascot({ pose = 'working', ...props }) {
  return <MascotFrame character="sentinel" pose={pose} {...props}>
    <Shadow cx={81} rx={42} />
    <path d="m63 118-8 16h16l7-14m14-2 7 16h15l-10-20" className="ink-fill ink-line" />
    <path d="M42 52 80 37l41 15v38c0 21-24 38-40 44-17-7-39-25-39-44Z" className="coat-fill ink-line" />
    <path d="M81 44 113 57v31c0 16-18 33-32 39Z" className="soft-shade" />
    <path d="m51 58 29-11 31 12v22c0 17-15 30-30 37-16-9-30-21-30-37Z" className="paper-fill ink-line" />
    <Face x={81} y={73} mood="alert" />
    <path d="M42 54q-2-28 38-28t42 28Z" className="shade-fill ink-line" /><path d="M40 51h84v9H40Z" className="coat-fill ink-line" /><path d="M52 43q7-11 21-11" className="highlight-line" /><path d="M85 28v17" className="accent-line" strokeWidth="4" />
    <Envelope x={8} y={112} />
    <path d="m43 86-13 10m90-8 13-8" className="ink-line limb-line" />
    <g className="sentinel-lens"><circle cx="26" cy="96" r="13" className="paper-fill ink-line" /><circle cx="26" cy="96" r="9" className="shade-fill" /><path d="m34 106 7 9" className="ink-line limb-line" /><path d="m21 91 5-2" className="highlight-line" /></g>
    <g className="sentinel-verdict"><path d="m125 55 12-3 12 7v19l-12 8-12-8Z" className="paper-fill ink-line" /><path d="m131 68 5 5 8-11" className="accent-line" strokeWidth="2.5" /></g>
  </MascotFrame>;
}
