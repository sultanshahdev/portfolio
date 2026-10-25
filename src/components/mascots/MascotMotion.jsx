import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// A single observer and delegated events serve every decorative cameo.
// No new focus targets, scroll listeners, continuous loops or per-character effects.
export default function MascotMotion() {
  const { pathname } = useLocation();
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const timers = new Map();
    const settle = (element) => { clearTimeout(timers.get(element)); timers.delete(element); element.dataset.mascotState = 'settled'; };
    const act = (element) => {
      if (media.matches || element.dataset.mascotMotion === 'off' || timers.has(element)) return;
      element.dataset.mascotState = 'acting';
      timers.set(element, setTimeout(() => settle(element), 1100));
    };
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        act(entry.target);
        entry.target.dataset.mascotSeen = 'true';
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.5 });
    const observe = (element) => { if (!element.dataset.mascotSeen) observer.observe(element); };
    document.querySelectorAll('[data-mascot-motion="on"]').forEach(observe);
    // Archive filtering replaces entries without changing the route. Observe new
    // residents and release removed ones; only watch the four-entry collection.
    const archive = document.querySelector('.project-list--archive');
    const changes = archive ? new MutationObserver(records => records.forEach(record => {
      record.removedNodes.forEach(node => {
        if (node instanceof Element) node.querySelectorAll('[data-mascot-motion="on"]').forEach(element => { observer.unobserve(element); settle(element); });
      });
      record.addedNodes.forEach(node => {
        if (node instanceof Element) node.querySelectorAll('[data-mascot-motion="on"]').forEach(observe);
      });
    })) : null;
    if (archive) changes.observe(archive, { childList: true });
    const reactToControl = (target) => {
      if (!(target instanceof Element) || !target.closest('a, button')) return;
      target.closest('[data-mascot-scope]')?.querySelectorAll('[data-mascot-motion="on"]').forEach(act);
    };
    const pointer = (event) => {
      if (event.pointerType === 'touch' || !(event.target instanceof Element)) return;
      const cameo = event.target.closest('[data-mascot-motion="on"]');
      if (cameo && !cameo.contains(event.relatedTarget)) act(cameo);
      const control = event.target.closest('a, button');
      if (control && !control.contains(event.relatedTarget)) reactToControl(control);
    };
    const focus = (event) => reactToControl(event.target);
    const click = (event) => reactToControl(event.target);
    const change = () => { if (media.matches) [...timers.keys()].forEach(settle); };
    document.addEventListener('pointerover', pointer);
    document.addEventListener('focusin', focus);
    document.addEventListener('click', click);
    media.addEventListener('change', change);
    return () => {
      observer.disconnect();
      changes?.disconnect();
      document.removeEventListener('pointerover', pointer);
      document.removeEventListener('focusin', focus);
      document.removeEventListener('click', click);
      media.removeEventListener('change', change);
      [...timers.keys()].forEach(settle);
    };
  }, [pathname]);
  return null;
}
