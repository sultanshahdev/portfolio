const message = 'build';
const binary = [...new TextEncoder().encode(message)].map(byte => byte.toString(2).padStart(8, '0')).join(' ');

export default function EngineeringEasterEgg() {
  return <details className="binary-note"><summary><span aria-hidden="true">{binary}</span><span className="sr-only">Decode the footer’s binary note</span><span aria-hidden="true" className="binary-hint"> / decode</span></summary><p><code>{message}</code> — five UTF-8 bytes. A small reminder to keep making things.</p></details>;
}
