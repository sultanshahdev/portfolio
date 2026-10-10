import { useRef, useState } from 'react';
import Navigation from './Navigation.jsx';

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const button = useRef(null);

  function handleKeyDown(event) {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      button.current.focus();
    }
  }

  return (
    <div className="mobile-navigation" onKeyDown={handleKeyDown}>
      <button ref={button} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div hidden={!open} id="mobile-menu">
        <Navigation onNavigate={() => setOpen(false)} />
      </div>
    </div>
  );
}
