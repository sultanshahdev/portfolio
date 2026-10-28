import MascotFrame, { Face, Shadow } from './MascotFrame.jsx';
import PixelWorkstation from './PixelWorkstation.jsx';
export default function PixelMascot({ pose = 'working', ...props }) {
  if (pose === 'workstation') return <PixelWorkstation {...props} />;
  return <MascotFrame character="pixel" pose={pose} {...props}>
    <Shadow />
    <path d="m56 115-7 18h14l6-17m24-1 7 18h14l-10-20" className="coat-fill ink-line" />
    <path d="M39 81q-16-1-16-20m98 20q13-5 16-19" className="ink-line limb-line" />
    <path d="m17 60 5 2 5-4" className="ink-line" />
    <rect x="45" y="31" width="83" height="72" rx="13" className="shade-fill ink-line" transform="rotate(7 86 67)" />
    <path d="M38 43h77q9 0 9 10v54q0 10-10 10H39q-9 0-9-10V54q0-11 8-11Z" className="coat-fill ink-line" />
    <path d="M37 51h78v51q0 6-6 6H43q-6 0-6-6Z" className="paper-fill ink-line" />
    <path d="M38 58h76" className="muted-line" /><circle cx="44" cy="54" r="1.5" className="accent-fill" /><path d="M50 54h8" className="muted-line" />
    <path d="M31 104q1 12 12 12h70q10 0 11-12v8q0 10-11 10H41q-11 0-11-11Z" className="soft-shade" />
    <Face x={76} y={80} mood="happy" resting={pose === 'resting'} />
    <path d="m63 33 3-17 14 13-8 1-3 8Z" className="paper-fill ink-line" />
    <path d="M39 46h66" className="highlight-line" />
    <g className="pixel-tile-a"><rect x="119" y="32" width="24" height="19" rx="4" className="paper-fill ink-line" transform="rotate(-9 131 41)" /><path d="M124 38h13m-13 5h8" className="accent-line fine-line" /></g>
    <g className="pixel-tile-b"><rect x="125" y="56" width="20" height="18" rx="4" className="shade-fill ink-line" transform="rotate(8 135 65)" /><rect x="130" y="61" width="9" height="7" rx="1" className="paper-fill" /></g>
    {pose === 'waving' && <path d="m12 43-4-5m13 2v-6m9 9 4-4" className="accent-line" />}
  </MascotFrame>;
}
