import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/writing', label: 'Writing' },
  { to: '/contact', label: 'Contact' },
];

export default function Navigation({ className = '', onNavigate, id }) {
  return (
    <nav aria-label="Main navigation" className={className} id={id}>
      <ul className="nav-list">
        {links.map(({ to, label }) => (
          <li key={to}><NavLink to={to} end={to === '/'} onClick={onNavigate}>{label}</NavLink></li>
        ))}
      </ul>
    </nav>
  );
}
