import { Link, useLocation } from 'react-router-dom';
import { profile } from '../../data/profile.js';
import Navigation from './Navigation.jsx';
import MobileNavigation from './MobileNavigation.jsx';

export default function Header() {
  const { pathname } = useLocation();
  return <header className="site-header"><div className="container header-inner">
    <Link to="/" className="identity" aria-label={`${profile.name}, home`}><svg className="identity-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M12 7H6v26h6m16-26h6v26h-6M23 12l-6 16" stroke="currentColor" strokeWidth="1.5" /><circle cx="29" cy="8" r="3" fill="currentColor" /></svg><span><span className="identity-name">{profile.name}</span><span className="identity-title">Software engineer / A connected practice</span></span></Link>
    <Navigation className="desktop-navigation" /><MobileNavigation key={pathname} />
  </div></header>;
}
