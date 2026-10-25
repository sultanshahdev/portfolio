import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const sections = [['about', 'About'], ['work', 'Work'], ['skills', 'Skills'], ['journey', 'Journey'], ['contact', 'Contact']];

export default function ScrollExperience() {
  const { pathname } = useLocation();
  const progress = useRef(null);
  const [active, setActive] = useState('about');
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const value = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
      if (progress.current) progress.current.style.transform = `scaleX(${value})`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!motion.matches) entry.target.classList.add('has-entered');
        reveal.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach((element) => reveal.observe(element));
    const index = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    }), { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('[data-section]').forEach((element) => index.observe(element));
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
      resize.disconnect();
      reveal.disconnect();
      index.disconnect();
    };
  }, [pathname]);
  return <>
    <div className="page-progress" aria-hidden="true"><span ref={progress} /></div>
    {pathname === '/' && <nav className="section-index" aria-label="Explore this page">
      {sections.map(([id, label], i) => <Link key={id} to={`/#${id}`} aria-current={active === id ? 'location' : undefined}><span className="index-label">{label}</span><span className="index-dot" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span></Link>)}
    </nav>}
  </>;
}
