import Mascot from '../mascots/Mascot.jsx';
import EngineeringEasterEgg from '../lab/EngineeringEasterEgg.jsx';
import { ArrowUp } from 'lucide-react';
import { profile } from '../../data/profile.js';
export default function Footer() {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    document.getElementById('main-content')?.focus({ preventScroll: true });
  };
  return <footer className="site-footer"><div className="container">
    <div className="footer-closing"><p>Always a work <em>in progress.</em></p><span className="footer-connection" aria-hidden="true"><i /><span /><span className="footer-resident"><Mascot character="forge" pose="resting" motion={false} size="100%" /></span><i /></span><button className="back-top" onClick={backToTop}>Back to top <ArrowUp size={16} aria-hidden="true" /></button></div>
    <div className="footer-inner"><p>© {new Date().getFullYear()} {profile.name}<span className="footer-signature"> / The living systems portfolio</span></p><ul className="footer-links">{profile.socials.map(social => <li key={social.label}><a href={social.url}>{social.label} ↗</a></li>)}</ul></div>
    <EngineeringEasterEgg />
  </div></footer>;
}
