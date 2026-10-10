import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteFocus() {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const navigated = previousPath.current !== pathname;
    previousPath.current = pathname;
    if (hash) {
      // A malformed fragment should not interrupt an otherwise valid page.
      let id = hash.slice(1);
      try { id = decodeURIComponent(id); } catch { /* Keep the literal fragment. */ }
      document.getElementById(id)?.scrollIntoView();
    } else if (navigated) {
      window.scrollTo(0, 0);
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }
  }, [pathname, hash]);
  return null;
}
