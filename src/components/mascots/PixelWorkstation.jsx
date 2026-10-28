import MascotFrame, { Face } from './MascotFrame.jsx';

// Pixel's component-window silhouette, seated at a shallow 2.5D desk. Shared
// mascot gestures animate the tiles; display playback drives separate hands.
export default function PixelWorkstation(props) {
  return <MascotFrame character="pixel" pose="workstation" {...props}>
    <ellipse cx="81" cy="147" rx="66" ry="6" className="ground-shadow" />
    <path d="M59 104v26m42-26v26M53 137h15m26 0h14" className="ink-line limb-line" />
    <path d="m44 99 18 13h46l12-13-15-6H58Z" className="shade-fill ink-line" /><path d="M51 107v30l-8 3m66-33v30l9 3" className="ink-line" />
    <rect x="40" y="29" width="75" height="68" rx="12" className="shade-fill ink-line" transform="rotate(5 78 63)" />
    <rect x="31" y="36" width="76" height="66" rx="11" className="coat-fill ink-line" /><rect x="37" y="43" width="64" height="49" rx="6" className="paper-fill ink-line" />
    <path d="M37 53h64m-58-5h3m4 0h7" className="muted-line" /><circle cx="92" cy="48" r="1.8" className="accent-fill pixel-work-led" />
    <g className="pixel-work-gaze"><Face x={69} y={68} mood="curious" /></g>
    <path d="M38 94h55m-47 4h21" className="highlight-line fine-line" /><path d="m58 29 5-17 13 12-8 2-3 7Z" className="paper-fill ink-line" />
    <g className="pixel-tile-a"><rect x="112" y="19" width="29" height="23" rx="3" className="paper-fill ink-line" transform="rotate(-7 126 30)" /><path d="M118 26h16m-16 5h10" className="accent-line fine-line" /></g>
    <g className="pixel-tile-b"><rect x="119" y="46" width="24" height="22" rx="3" className="shade-fill ink-line" /><path d="M124 51h14v10h-14Z" className="paper-fill ink-line" /><path d="m128 57 3 2 4-5" className="accent-line fine-line" /></g>
    <path d="m18 114 30-17 94 21-29 19Z" className="paper-fill ink-line" /><path d="m18 114 95 23v7l-95-23Zm95 23 29-19v7l-29 19Z" className="shade-fill ink-line" />
    <path d="m32 114 75 17m-65-22 75 17m-65-22 75 17m-65-19-9 7m22-4-9 7m22-4-9 7m22-4-9 7" className="muted-line fine-line" />
    <path d="M36 90q-13 6-5 20m70-20q19 3 17 20" className="ink-line limb-line" />
    <g className="pixel-work-hand pixel-work-hand-left"><path d="m24 107 15-3 12 10-16 5-11-6Z" className="coat-fill ink-line" /><path d="m29 109 12 4" className="highlight-line fine-line" /></g>
    <g className="pixel-work-hand pixel-work-hand-right"><path d="m104 106 14-2 11 9-15 6-10-6Z" className="coat-fill ink-line" /><path d="m109 108 12 4" className="highlight-line fine-line" /></g>
    <path d="M143 126h7v-23q0-8-10-8h-5" className="accent-line" /><rect x="130" y="91" width="8" height="7" rx="1" className="paper-fill ink-line" />
  </MascotFrame>;
}
