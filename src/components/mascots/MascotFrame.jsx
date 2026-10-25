import { useId } from 'react';

// One palette and contour treatment; the eight silhouettes are independent artwork.
export function Face({ x = 0, y = 0, mood = 'happy', resting = false }) {
  return <g transform={`translate(${x} ${y})`} className="resident-face">
    {resting ? <path d="M-13 0q4-4 8 0m10 0q4-4 8 0" className="ink-line" /> : <g className="resident-eyes">
      <ellipse cx="-9" cy="0" rx="3.1" ry="4.6" className="ink-fill" /><ellipse cx="9" cy="0" rx="3.1" ry="4.6" className="ink-fill" />
      <circle cx="-10" cy="-1.5" r="1" className="paper-fill" /><circle cx="8" cy="-1.5" r="1" className="paper-fill" />
    </g>}
    {mood === 'curious' && <path d="m-14-9 8-2m11 2 8 1" className="ink-line fine-line" />}
    {mood === 'calm' && <path d="M-14-9h8m11 0h8" className="ink-line fine-line" />}
    {mood === 'alert' && <path d="m-14-10 8 3m11 0 8-3" className="ink-line fine-line" />}
    <path d={mood === 'calm' ? 'M-4 11h8' : mood === 'alert' ? 'M-4 11q4-2 8 0' : 'M-5 9q5 7 10 0'} className="ink-line" />
    <ellipse cx="-18" cy="8" rx="4" ry="2.2" className="resident-blush" /><ellipse cx="18" cy="8" rx="4" ry="2.2" className="resident-blush" />
  </g>;
}
export function Shadow({ cx = 80, rx = 45 }) { return <ellipse cx={cx} cy="140" rx={rx} ry="5" className="ground-shadow" />; }
export function Envelope({ x = 0, y = 0, className = '' }) {
  return <g transform={`translate(${x} ${y})`}><g className={className}><rect width="27" height="20" rx="3" className="paper-fill ink-line" /><path d="m1 2 12.5 9L26 2" className="ink-line fine-line" /><path d="m11 8 3 2 3-2" className="accent-line" /></g></g>;
}
export default function MascotFrame({ character, pose = 'working', size = 96, label, motion = true, className = '', children }) {
  const id = useId();
  return <span className={`mascot-cameo resident-${character} pose-${pose} ${className}`} style={{ '--mascot-size': typeof size === 'number' ? `${size}px` : size }} data-character={character} data-pose={pose} data-mascot-motion={motion ? 'on' : 'off'}>
    <svg className="engineering-mascot" viewBox="0 0 160 160" fill="none" role={label ? 'img' : undefined} aria-hidden={label ? undefined : true} aria-labelledby={label ? id : undefined} focusable="false">
      {label && <title id={id}>{label}</title>}
      <g strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{children}</g>
    </svg>
  </span>;
}
