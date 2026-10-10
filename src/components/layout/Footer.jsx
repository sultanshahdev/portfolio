import { profile } from '../../data/profile.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <ul className="footer-links">
          {profile.socials.map((social) => <li key={social.label}><a href={social.url}>{social.label}</a></li>)}
        </ul>
      </div>
    </footer>
  );
}
