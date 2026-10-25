import MascotFrame, { Face, Shadow, Envelope } from './MascotFrame.jsx';
export default function DaemonMascot({ pose = 'working', ...props }) {
  return <MascotFrame character="daemon" pose={pose} {...props}>
    <Shadow rx={49} />
    <path d="M49 122v13h18v-12m27 0v12h19v-14" className="ink-fill ink-line" />
    <path d="m112 38 18 13v65l-17 12Z" className="shade-fill ink-line" /><path d="M121 62v33m4-30v17" className="muted-line" />
    <rect x="40" y="38" width="77" height="90" rx="14" className="coat-fill ink-line" />
    <rect x="46" y="47" width="65" height="43" rx="9" className="paper-fill ink-line" />
    <Face x={78} y={66} mood="calm" resting={pose === 'resting'} />
    <rect x="47" y="99" width="63" height="18" rx="4" className="shade-fill ink-line" />
    <path d="M54 105h23m-23 5h18" className="ink-line fine-line" /><circle cx="99" cy="108" r="3" className="accent-fill daemon-status" />
    <path d="M45 43h57" className="highlight-line" /><path d="M46 121h66" className="muted-line" />
    <path d="M39 91 25 99l-8-6m99-8 14-11 8 2" className="ink-line limb-line" />
    <Envelope x={9} y={75} className="daemon-request" /><Envelope x={125} y={53} className="daemon-response" />
    <path d="M61 30h35m-29-5h23" className="muted-line" />
  </MascotFrame>;
}
