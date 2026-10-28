// Original filled schematics; shared paper, enclosure, ink and shallow depth.
export default function DisciplineGlyph({ kind }) {
  return <svg className="control-node-glyph" viewBox="0 0 104 76" fill="none" aria-hidden="true" focusable="false">
    <ellipse cx="52" cy="67" rx="39" ry="4" className="room-glyph-shadow" />
    {kind === 'frontend' && <>
      <rect x="24" y="10" width="66" height="45" rx="3" className="room-glyph-side" /><rect x="14" y="17" width="66" height="43" rx="3" className="room-glyph-paper" />
      <path d="M14 28h66m-59-6h3m3 0h3m3 0h3M23 36h18m-18 6h12" /><rect x="48" y="35" width="23" height="17" rx="2" className="room-glyph-shade" />
      <path d="m55 43 4 4 7-8M23 52h14" className="room-glyph-accent" /><path d="m79 49 9 9-6 1-3 6Z" className="room-glyph-paper" />
    </>}
    {kind === 'backend' && <>
      <path d="m21 17 10-6 55 9v40l-10 6Z" className="room-glyph-side" /><rect x="21" y="17" width="55" height="48" rx="3" className="room-glyph-paper" />
      {[24, 37, 50].map(y => <g key={y}><rect x="28" y={y} width="40" height="9" rx="1" className="room-glyph-shade" /><path d={`M33 ${y + 4}h19`} /><circle cx="61" cy={y + 4} r="1.6" className="room-glyph-led" /></g>)}
      <path d="M6 32h13m-5-4 5 4-5 4m65 12h14m-4-4 4 4-4 4" className="room-glyph-accent" />
    </>}
    {kind === 'distributed' && <>
      <path d="m24 47 28-28 28 28H24Z" className="room-glyph-accent" strokeDasharray="3 3" />
      {[[38, 6], [9, 39], [67, 39]].map(([x, y]) => <g key={x} transform={`translate(${x} ${y})`}><rect x="4" y="-3" width="27" height="23" rx="2" className="room-glyph-side" /><rect width="27" height="23" rx="2" className="room-glyph-paper" /><path d="M5 6h13m-13 5h17m-17 5h9" /><rect x="20" y="14" width="3" height="4" className="room-glyph-led" /></g>)}
      <rect x="45" y="47" width="12" height="8" rx="1" className="room-glyph-paper" /><path d="m47 49 4 3 4-3" className="room-glyph-accent" />
    </>}
    {kind === 'security' && <>
      <path d="m28 16 10-6 43 9v42l-10 5Z" className="room-glyph-side" /><rect x="28" y="16" width="43" height="49" rx="3" className="room-glyph-paper" />
      <path d="m50 23 15 6v11c0 10-9 17-15 20-6-3-15-10-15-20V29Z" className="room-glyph-shade" />
      <path d="m42 40 6 6 11-13M8 41h18m-5-4 5 4-5 4m52-4h18m-5-4 5 4-5 4" className="room-glyph-accent" /><circle cx="83" cy="59" r="2" className="room-glyph-led" />
    </>}
  </svg>;
}
