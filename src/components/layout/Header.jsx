import { Link, useLocation } from 'react-router-dom';
import { profile } from '../../data/profile.js';
import Navigation from './Navigation.jsx';
import MobileNavigation from './MobileNavigation.jsx';

export default function Header() {
  const { pathname } = useLocation();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="identity" aria-label={`${profile.name}, home`}>
          <span className="identity-name">{profile.name}</span>
          <span className="identity-title">{profile.title}</span>
        </Link>
        <Navigation className="desktop-navigation" />
        <MobileNavigation key={pathname} />
      </div>
    </header>
  );
}
