import { useCallback, useEffect, useReducer, useRef } from 'react';

const closed = { activeId: null, pinned: false, suppressedId: null };

function disclosure(state, action) {
  switch (action.type) {
    case 'preview':
      return state.pinned || state.activeId === action.id || state.suppressedId === action.id
        ? state : { activeId: action.id, pinned: false, suppressedId: null };
    case 'toggle':
      return state.activeId === action.id && state.pinned
        ? { ...closed, suppressedId: action.id }
        : { activeId: action.id, pinned: true, suppressedId: null };
    case 'release':
      return state.suppressedId === action.id ? { ...state, suppressedId: null } : state;
    case 'leave':
      return !state.pinned && state.activeId === action.id ? closed : state;
    case 'focus':
      return !state.pinned && state.activeId !== action.id && state.activeId !== null
        ? { ...state, activeId: null } : state;
    case 'close':
      return state.activeId === null ? state : { ...closed, suppressedId: state.activeId };
    default:
      return state;
  }
}

export default function useExpertiseDisclosure() {
  const [state, dispatch] = useReducer(disclosure, closed);
  const closeTimer = useRef(null);
  const hoverQuery = useRef(null);

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  useEffect(() => cancelClose, [cancelClose]);

  const supportsPreview = useCallback((pointerType) => {
    if (pointerType !== 'mouse' && pointerType !== 'pen') return false;
    hoverQuery.current ??= window.matchMedia('(hover: hover) and (pointer: fine)');
    return hoverQuery.current.matches;
  }, []);

  const preview = useCallback((id, pointerType) => {
    if (!supportsPreview(pointerType)) return;
    cancelClose();
    dispatch({ type: 'preview', id });
  }, [cancelClose, supportsPreview]);

  const leave = useCallback((id, pointerType) => {
    if (!supportsPreview(pointerType)) return;
    cancelClose();
    // Explicit close/Escape remains closed until the pointer leaves this category.
    dispatch({ type: 'release', id });
    // A short exit grace keeps the heading and unfolding layer one hover target.
    closeTimer.current = setTimeout(() => dispatch({ type: 'leave', id }), 90);
  }, [cancelClose, supportsPreview]);

  const toggle = useCallback((id) => {
    cancelClose();
    dispatch({ type: 'toggle', id });
  }, [cancelClose]);

  const focus = useCallback((id) => dispatch({ type: 'focus', id }), []);
  const close = useCallback(() => {
    cancelClose();
    dispatch({ type: 'close' });
  }, [cancelClose]);

  return { ...state, preview, leave, toggle, focus, close };
}
