import MascotFrame, { Face, Shadow } from './MascotFrame.jsx';
export default function KeeperMascot({ pose = 'working', ...props }) {
  return <MascotFrame character="keeper" pose={pose} {...props}>
    <Shadow />
    <path d="m59 123-3 12h15l4-12m19 0 3 12h15l-3-15" className="ink-fill ink-line" />
    <path d="M44 49v63c0 22 77 22 77 0V49Z" className="coat-fill ink-line" />
    <path d="M104 46v68q0 9-13 14c21-1 30-8 30-16V49Z" className="soft-shade" />
    <ellipse cx="82.5" cy="49" rx="38.5" ry="14" className="paper-fill ink-line" />
    <ellipse cx="82" cy="47" rx="27" ry="7" className="shade-fill" /><path d="M57 44q16-7 39-2" className="highlight-line" />
    <path d="M44 80c0 18 77 18 77 0m-77 22c0 17 77 17 77 0" className="muted-line" />
    <Face x={81} y={70} mood="curious" />
    <rect x="64" y="99" width="36" height="22" rx="4" className="ink-fill" />
    <g className="keeper-door"><rect x="63" y="98" width="37" height="23" rx="4" className="paper-fill ink-line" /><path d="M76 105h13" className="muted-line" /><circle cx="92" cy="113" r="2" className="accent-fill" /></g>
    <path d="m44 87-16 11 5 10m88-17 12 10-8 6" className="ink-line limb-line" />
    <g className="keeper-cube"><path d="m111 95 16-7 14 9-16 8Z" className="paper-fill ink-line" /><path d="m111 95 14 10v17l-14-9Z" className="shade-fill ink-line" /><path d="m125 105 16-8v17l-16 8Z" className="accent-fill ink-line" /><path d="m129 106 8-4" className="paper-line fine-line" /></g>
    <g transform="rotate(-23 28 110)"><circle cx="27" cy="104" r="8" className="paper-fill ink-line" /><circle cx="27" cy="104" r="3" className="shade-fill ink-line" /><path d="M27 112v18m0-4h7m-7-5h5" className="ink-line" strokeWidth="3" /></g>
  </MascotFrame>;
}
