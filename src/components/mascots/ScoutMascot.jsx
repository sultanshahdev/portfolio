import MascotFrame, { Face, Shadow } from './MascotFrame.jsx';
export default function ScoutMascot({ pose = 'working', ...props }) {
  return <MascotFrame character="scout" pose={pose} {...props}>
    <Shadow />
    <path d="M58 122v13h17l2-12m14-1 4 13h17l-8-16" className="ink-fill ink-line" />
    <path d="M57 73q-13 20-18 49 38 13 79 0-8-32-22-48Z" className="coat-fill ink-line" />
    <path d="m87 77 17 43-15 6 29-4-20-44Z" className="soft-shade" />
    <path d="m57 84 20 13 21-16-7-12H65Z" className="accent-fill ink-line" />
    <path d="M45 52q2-25 34-26t35 31c1 23-17 38-35 38S44 76 45 52Z" className="paper-fill ink-line" />
    <path d="M99 41q18 31-7 50c19-7 27-30 17-45Z" className="soft-shade" />
    <Face x={77} y={61} mood="curious" />
    <path d="M43 46c0-24 27-30 49-27 16 2 20 13 19 22l16 5q-28 9-83 7Z" className="ink-fill ink-line" /><path d="M48 44q29 6 62-3" className="accent-line" strokeWidth="3" /><path d="M54 32q12-9 28-7" className="highlight-line fine-line" />
    <path d="m44 99-13-10m82 9 13-1" className="ink-line limb-line" /><path d="M68 104v13m9-8v8" className="muted-line" />
    <g className="scout-source"><rect x="117" y="76" width="30" height="45" rx="3" className="shade-fill ink-line" /><path d="M113 81h27v45h-27Z" className="paper-fill ink-line" /><path d="m119 88-3 3 3 3m14-6 3 3-3 3M119 101h15m-15 7h12m-12 7h15" className="muted-line fine-line" /><path d="M118 108h17" className="accent-line scout-match" strokeWidth="3" /></g>
    <g className="scout-lens"><path d="m40 92-12 21" className="ink-line limb-line" /><circle cx="46" cy="82" r="18" className="paper-fill ink-line" /><circle cx="46" cy="82" r="13" className="lens-fill ink-line" /><path d="M39 79q2-6 8-6" className="highlight-line" /><path d="m42 86 4 3 6-7" className="muted-line fine-line" /></g>
  </MascotFrame>;
}
