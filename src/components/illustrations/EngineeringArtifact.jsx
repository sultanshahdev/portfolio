import { useId } from 'react';

// All ten drawings share materials, a shallow 2.5D projection and 1.4-unit contours.
// Glyphs can be composed in a larger SVG; this file contains artwork only.
function Led({ x, y, dim = false }) {
  return <g transform={`translate(${x} ${y})`}><circle r="2.6" className="artifact-led-housing" /><circle r="1.45" className={dim ? 'artifact-led-dim' : 'artifact-led'} /></g>;
}
function Cabinet({ children }) {
  return <>
    <ellipse cx="83" cy="139" rx="57" ry="8" className="artifact-shadow" />
    <path d="m22 42 40-20 76 22-40 20Z" className="artifact-top" />
    <path d="m98 64 40-20v68l-40 20Z" className="artifact-side" />
    <path d="m22 42 76 22v68l-76-22Z" className="artifact-body" />
    <path d="m27 46 66 19m9 2 31-16" className="artifact-highlight" />
    <path d="m107 75 23-12m-23 18 23-12m-23 18 23-12m-23 18 23-12m-23 18 23-12" className="artifact-vent" />
    <g transform="translate(29 53) skewY(16)">{children}</g>
    <circle cx="26" cy="49" r="1" className="artifact-screw" /><circle cx="92" cy="125" r="1" className="artifact-screw" />
  </>;
}
function ServerRack() {
  return <Cabinet>
    {[0, 17, 34].map((y, i) => <g key={y} transform={`translate(0 ${y})`}>
      <rect width="61" height="14" rx="1.5" className="artifact-bay" /><path d="M7 5h29M7 9h29" className="artifact-vent" />
      <rect x="42" y="4" width="7" height="6" rx="1" className="artifact-port" /><Led x={55} y={7} dim={i === 2} />
    </g>)}
    <text x="2" y="57">RACK / 03U</text><path d="M45 55h12" className="artifact-vent" />
  </Cabinet>;
}
function NetworkSwitch() {
  return <>
    <ellipse cx="80" cy="126" rx="63" ry="7" className="artifact-shadow" />
    <path d="m15 74 40-22 92 26-40 22Z" className="artifact-top" />
    <path d="m107 100 40-22v21l-40 23Z" className="artifact-side" />
    <path d="m15 74 92 26v22l-92-26Z" className="artifact-body" />
    <g transform="translate(21 82) skewY(16)">
      {[0, 17, 34, 51].map((x, i) => <g key={x}><rect x={x} y="0" width="12" height="9" rx="1" className="artifact-port" /><path d={`M${x + 3} 1v3m3-3v3m3-3v3`} className="artifact-contact" /><Led x={x + 6} y={14} dim={i > 1} /></g>)}
      <text x="70" y="10">SW</text>
    </g>
    <path d="M35 99v15q0 10-17 13m35-23v17q0 10 21 14m3-23v10q0 16 38 18" className="artifact-cable" />
    <path d="m56 64 52 15m-44-19 52 15" className="artifact-vent" />
    <text x="61" y="72" transform="rotate(16 61 72)">LINK / TX</text>
  </>;
}
function Processor() {
  return <>
    <path d="m15 86 65-34 67 35-66 35Z" className="artifact-shadow" />
    <path d="m16 78 64-34 66 35-65 35Z" className="artifact-board" />
    <path d="m16 78 65 36v7L16 86Zm65 36 65-35v8l-65 35Z" className="artifact-side" />
    {[0, 1, 2, 3, 4].map(i => <g key={i} className="artifact-pins"><path d={`M${28 + i * 10} ${74 - i * 5}l-10-5M${90 + i * 10} ${49 + i * 5}l10-5M${28 + i * 10} ${88 + i * 5}l-10 6M${90 + i * 10} ${110 - i * 5}l10 6`} /></g>)}
    <path d="m48 72 33-18 34 18-34 19Z" className="artifact-top" />
    <path d="m48 72 33 19v10L48 82Z" className="artifact-body" /><path d="m81 91 34-19v10l-34 19Z" className="artifact-side" />
    <path d="m59 73 22-12 22 12-22 12Z" className="artifact-chip" />
    <text x="72" y="76" className="artifact-light-text">CPU</text>
    <path d="m36 80 9 5-10 6m82-10 10 5-8 4m-44 15v6" className="artifact-trace" /><circle cx="34" cy="92" r="2" className="artifact-contact-fill" />
    <text x="51" y="137">FETCH → EXEC</text>
  </>;
}
function Memory() {
  return <>
    <ellipse cx="79" cy="135" rx="60" ry="7" className="artifact-shadow" />
    <path d="m18 44 8-5 116 33v48l-8 5Z" className="artifact-side" />
    <path d="m18 44 116 33v48L18 92Z" className="artifact-board" />
    <g transform="translate(27 55) skewY(16)">
      {[0, 26, 52, 78].map(x => <g key={x}><path d={`M${x + 3} 0v-4m5 4v-4m5 4v-4m-10 29v4m5-4v4m5-4v4`} className="artifact-pins" /><rect x={x} width="18" height="25" rx="1.5" className="artifact-chip" /><path d={`M${x + 4} 7h10m-10 5h10m-10 5h6`} className="artifact-vent-light" /></g>)}
      <path d="M0 36h95" className="artifact-trace" />
      {Array.from({ length: 15 }, (_, i) => <path key={i} d={`M${i * 6.5} 38v7`} className="artifact-pins" />)}
    </g>
    <text x="46" y="144">0x00 → 0x0F</text>
  </>;
}
function Storage() {
  return <Cabinet>
    <rect width="61" height="13" rx="2" className="artifact-screen" /><text x="6" y="9" className="artifact-light-text">KEY → VALUE</text>
    {[20, 40].map((y, i) => <g key={y} transform={`translate(0 ${y})`}><rect width="61" height="16" rx="2" className="artifact-bay" /><rect x="5" y="4" width="10" height="8" className={i === 0 ? 'artifact-accent' : 'artifact-top'} /><path d="M21 5h21m-21 5h15" className="artifact-vent" /><Led x={54} y={8} /></g>)}
    <text x="3" y="64">K / V</text>
  </Cabinet>;
}
function Terminal() {
  return <>
    <ellipse cx="80" cy="140" rx="63" ry="7" className="artifact-shadow" />
    <path d="m29 30 9-5 90 26v66l-9 5Z" className="artifact-side" />
    <path d="m29 30 90 26v66l-90-26Z" className="artifact-body" />
    <path d="m35 39 78 23v48l-78-23Z" className="artifact-screen" />
    <g transform="translate(41 49) skewY(16)"><text y="0" className="artifact-light-text">$ ps --forest</text><path d="M0 10h8v10h8m-8-4h8m-8-6h8m-8 10v9h8" className="artifact-terminal-line" /><text x="20" y="12" className="artifact-light-text">app</text><text x="20" y="22" className="artifact-light-text">worker</text><path d="M0 36h8" className="artifact-terminal-line terminal-cursor" /></g>
    <path d="M69 109v12l-14 7 39 11 14-7-24-7v-12" className="artifact-body" />
    <path d="m15 120 25-13 85 24-25 14Z" className="artifact-top" /><path d="m15 120 85 25v5l-85-25Zm85 25 25-14v5l-25 14Z" className="artifact-side" />
    <path d="m29 120 70 20m-63-24 70 20m-58-18-8 5m20-2-8 5m20-2-8 5m20-2-8 5" className="artifact-vent" />
    <Led x={111} y={112} />
  </>;
}
function Gateway() {
  return <>
    <Cabinet><rect y="32" width="61" height="19" rx="2" className="artifact-bay" /><rect x="5" y="37" width="10" height="8" className="artifact-port" /><rect x="45" y="37" width="10" height="8" className="artifact-port" /><path d="M19 41h22m-5-3 5 3-5 3" className="artifact-trace" /><text x="2" y="61">IN / CHECK / OUT</text></Cabinet>
    <path d="m41 53 27-5 26 20v15c0 15-19 23-26 26-12-9-27-24-27-37Z" className="artifact-top" />
    <path d="m50 61 18-3 17 14v9c0 8-10 15-17 18-9-8-18-18-18-27Z" className="artifact-accent" />
    <path d="m57 77 9 9 13-14" className="artifact-check" />
    <path d="m9 116 15 4m109-3 15-8" className="artifact-cable" />
  </>;
}
function Parser() {
  return <>
    <ellipse cx="84" cy="141" rx="59" ry="7" className="artifact-shadow" />
    <path d="m24 29 9-5 104 30v76l-9 5Z" className="artifact-side" />
    <path d="m24 29 104 30v76l-104-30Z" className="artifact-top" />
    <g transform="translate(33 44) skewY(16)">
      <text y="0">SOURCE / x + 1</text><path d="M0 7h84" className="artifact-vent" />
      {['x', '+', '1'].map((v, i) => <g key={v} transform={`translate(${i * 29} 13)`}><rect width="22" height="15" rx="2" className="artifact-bay" /><text x="7" y="11">{v}</text></g>)}
      <path d="M40 29v8m0 11v6H14v7m26-7h26v7" className="artifact-trace" />
      <rect x="27" y="36" width="27" height="14" rx="2" className="artifact-accent" /><text x="32" y="46" className="artifact-light-text">Add</text>
      <text x="3" y="72">Id(x)</text><text x="55" y="72">Int(1)</text><text x="10" y="86">AST → ANALYZE</text>
    </g>
  </>;
}
function Container() {
  return <>
    <Cabinet><path d="M5 0v49m10-46v49m10-46v49m10-46v49m10-46v49m10-46v49" className="artifact-vent" /><rect x="9" y="12" width="44" height="28" rx="3" className="artifact-screen" /><text x="17" y="24" className="artifact-light-text">app</text><text x="15" y="34" className="artifact-light-text">runtime</text><text x="0" y="62">BUILD → SHIP</text></Cabinet>
    <path d="m30 36 30-15 68 20" className="artifact-boundary" /><path d="m5 117 21 7m106-7 21-11m-7-1 7 1-1 7" className="artifact-cable" />
  </>;
}
function Packet() {
  return <>
    <ellipse cx="83" cy="129" rx="49" ry="7" className="artifact-shadow" />
    <path d="m32 59 37-20 65 20-37 20Z" className="artifact-top" />
    <path d="m97 79 37-20v45l-37 20Z" className="artifact-side" />
    <path d="m32 59 65 20v45l-65-20Z" className="artifact-body" />
    <path d="m32 59 65 20v12l-65-20Z" className="artifact-accent" />
    <g transform="translate(40 70) skewY(16)"><text className="artifact-light-text">HDR / LEN</text><text y="21">PAYLOAD</text><path d="M0 27h42m-42 5h26" className="artifact-vent" /></g>
    <path d="m62 54 36 11m-23-17 36 11" className="artifact-vent" /><path d="m107 90 17-9m-17 15 17-9" className="artifact-trace" />
  </>;
}

const drawings = { server: ServerRack, switch: NetworkSwitch, processor: Processor, memory: Memory, storage: Storage, terminal: Terminal, gateway: Gateway, parser: Parser, container: Container, packet: Packet };

export function ArtifactGlyph({ kind, ...props }) {
  const Drawing = drawings[kind];
  return Drawing ? <g className={`artifact-glyph artifact-${kind}`} {...props}><Drawing /></g> : null;
}

export default function EngineeringArtifact({ kind, label, className = '' }) {
  const id = useId();
  return <svg className={`engineering-artifact ${className}`} viewBox="0 0 160 160" fill="none" role={label ? 'img' : undefined} aria-hidden={label ? undefined : true} aria-labelledby={label ? id : undefined} focusable="false">
    {label && <title id={id}>{label}</title>}
    <ArtifactGlyph kind={kind} />
  </svg>;
}
