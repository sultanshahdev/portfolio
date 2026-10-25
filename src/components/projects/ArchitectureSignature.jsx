// Small illustrations of documented relationships, not product screenshots.
export default function ArchitectureSignature({ visual }) {
  const peers = visual.kind === 'peers';
  const points = peers ? [[44, 70], [139, 31], [231, 70]] : visual.labels.map((_, index) => [30 + index * (215 / (visual.labels.length - 1)), 51]);
  return (
    <figure className={`architecture-signature signature-${visual.kind}`}>
      <svg viewBox="0 0 275 105" aria-hidden="true" fill="none">
        {peers ? <path d="M44 70 139 31 231 70 44 70" className="signature-line" /> : <path d="M30 51H245m-7-5 7 5-7 5" className="signature-line" />}
        {points.map(([x, y], index) => (
          <g key={visual.labels[index]}>
            {visual.kind === 'approval' && index === 2
              ? <path d={`M${x} ${y - 13}l13 13-13 13-13-13z`} className="signature-node signature-gate" />
              : <rect x={x - 13} y={y - 13} width="26" height="26" rx={peers ? 13 : 2} className="signature-node" />}
            {peers ? <path d={`M${x - 4} ${y - 5}h8m-8 5h8m-8 5h5`} className="signature-detail" /> : <circle cx={x} cy={y} r="2" className="signature-dot" />}
            <text x={x} y={y + 31} textAnchor="middle">{visual.labels[index]}</text>
          </g>
        ))}
      </svg>
      <figcaption>{visual.caption}</figcaption>
    </figure>
  );
}
