import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { playbackTiming } from '../../../data/controlRoom.js';

export function useMediaPreference(query) {
  const media = useMemo(() => window.matchMedia(query), [query]);
  const subscribe = useCallback(callback => {
    media.addEventListener('change', callback);
    return () => media.removeEventListener('change', callback);
  }, [media]);
  return useSyncExternalStore(subscribe, () => media.matches);
}

// One pending timeout. Every suspension/unmount cancels it, so a hidden tab
// cannot accumulate work. Character updates stay inside the display component.
export default function useCodePlayback(examples, paused) {
  const viewport = useRef(null);
  const reduced = useMediaPreference('(prefers-reduced-motion: reduce)');
  const [visible, setVisible] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(() => !document.hidden);
  const [frame, setFrame] = useState(() => ({
    index: 0, count: paused || reduced ? examples[0].source.length : 0,
    phase: paused || reduced ? 'holding' : 'typing',
  }));
  const example = examples[frame.index];
  const running = visible && documentVisible && !paused && !reduced;

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      setVisible(entries.some(entry => entry.isIntersecting));
    }, { threshold: 0.05 });
    observer.observe(viewport.current);
    const visibility = () => setDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  useEffect(() => {
    if (reduced) setFrame(current => ({ ...current, count: examples[current.index].source.length, phase: 'holding' }));
  }, [reduced, examples]);

  useEffect(() => {
    if (!running) return;
    const delay = frame.phase === 'typing' ? playbackTiming.character
      : frame.phase === 'holding' ? playbackTiming.hold : playbackTiming.gap;
    const timer = setTimeout(() => {
      setFrame(current => {
        if (current.phase === 'holding') return { ...current, count: 0, phase: 'gap' };
        if (current.phase === 'gap') return { index: (current.index + 1) % examples.length, count: 0, phase: 'typing' };
        const count = current.count + 1;
        return { ...current, count, phase: count >= examples[current.index].source.length ? 'holding' : 'typing' };
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [running, frame, examples]);

  return { viewport, example, running, visible, reduced,
    phase: reduced ? 'holding' : frame.phase,
    text: reduced ? example.source : example.source.slice(0, frame.count) };
}
