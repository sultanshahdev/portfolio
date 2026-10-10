import { Link } from 'react-router-dom';

export default function TextLink({ to, href, children, arrow = false, className = '', ...props }) {
  const content = <>{children}{arrow && <span aria-hidden="true"> →</span>}</>;
  return to
    ? <Link to={to} className={`text-link ${className}`} {...props}>{content}</Link>
    : <a href={href} className={`text-link ${className}`} {...props}>{content}</a>;
}
