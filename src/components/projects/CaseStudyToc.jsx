import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function CaseStudyToc({ chapters, appendices }) {
  const location = useLocation();
  const [active, setActive] = useState('');
  const disclosure = useRef(null);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 640px)');
    const change = () => { if (disclosure.current) disclosure.current.open = media.matches; };
    change();
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  useEffect(() => {
    if (!location.hash) return;
    let id = location.hash.slice(1);
    try { id = decodeURIComponent(id); } catch { /* Malformed fragment stays literal. */ }
    const element = document.getElementById(id);
    const details = element?.closest('.case-study-appendix');
    if (details) details.open = true;
    // Run after the lazy publication and any disclosure have mounted/opened.
    const frame = requestAnimationFrame(() => {
      element?.scrollIntoView();
      element?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash, location.key]);
  useEffect(() => {
    const targets = [...document.querySelectorAll('[data-chapter]')];
    const update = () => {
      const current = targets.filter((element) => element.getClientRects().length > 0 && element.getBoundingClientRect().top <= 160).at(-1);
      setActive(current?.id || targets[0]?.id || '');
    };
    let frame;
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, [chapters]);
  const items = [...chapters, ...appendices];
  return (
    <nav className="case-study-toc" aria-label="On this page">
      <details ref={disclosure}>
        <summary><span>On this page</span><span className="toc-count">{chapters.length} chapters + sources</span></summary>
        <ol>{items.map((chapter, index) => <li key={chapter.id}>
          <Link to={`#${chapter.id}`} aria-current={active === chapter.id ? 'location' : undefined}>
            <span className="toc-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{chapter.title}
          </Link>
        </li>)}</ol>
      </details>
    </nav>
  );
}
