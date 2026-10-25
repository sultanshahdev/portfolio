import { useId } from 'react';

// Original portfolio characters: shared stroke language, distinct silhouettes.
export default function StudioMascot({ kind = 'bit', className = '', decorative = false }) {
  const title = useId();
  return (
    <svg className={`studio-mascot mascot-${kind} ${className}`} viewBox="0 0 120 112" fill="none" role={decorative ? undefined : 'img'} aria-hidden={decorative || undefined} aria-labelledby={decorative ? undefined : title} focusable="false">
      {!decorative && <title id={title}>{kind === 'bit' ? 'BIT, a bracket-shaped engineering assistant' : 'PACKET, a network companion'}</title>}
      <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {kind === 'bit' ? <>
          <path className="mascot-aerial" d="M60 24V13m-4 0h8" />
          <rect className="mascot-body" x="28" y="26" width="64" height="57" rx="9" />
          <path d="M20 40h-7v28h7m80-28h7v28h-7M43 84v13h-9m43-13v13h9" />
          <path className="mascot-screen" d="M37 35h46v34H37z" />
          <g className="mascot-eyes"><path d="M46 47v6m23-6v6" strokeWidth="3.5" /><path d="M54 60h10" /></g>
          <path className="mascot-accent" d="m42 75 4 2 4-2" />
        </> : <>
          <path className="packet-trail" d="M5 64h13M9 74h9M4 84h18" strokeDasharray="2 5" />
          <path className="mascot-body" d="M37 26h42l17 18v34L79 89H37L26 78V44z" />
          <path d="M37 26v13h42V26M36 89v10h9m34-10v10h-9M26 51h-8v14h8m70-14h9v14h-9" />
          <g className="mascot-eyes"><path d="M47 54v6m22-6v6" strokeWidth="3.5" /><path d="m54 70 5 3 5-3" /></g>
          <path className="mascot-accent" d="M48 32h12" strokeWidth="3" />
        </>}
      </g>
    </svg>
  );
}
