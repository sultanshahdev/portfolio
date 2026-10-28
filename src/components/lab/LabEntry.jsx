import { Component, lazy, Suspense, useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import EngineeringLabScene from './EngineeringLabScene.jsx';

const LabDrawer = lazy(() => import('../experiments/LabDrawer.jsx'));

class LabLoadBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed
      ? <p className="lab-loading" role="alert">The lab could not load. Close this panel and reload the page to try again.</p>
      : this.props.children;
  }
}

function LabLauncher() {
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [open]);
  return <div className="lab-launcher">
    <button ref={trigger} type="button" className="lab-button" aria-haspopup="dialog" aria-controls={id} onClick={() => setOpen(true)}>Open Lab <ArrowUpRight size={15} aria-hidden="true" /></button>
    <dialog ref={dialog} id={id} className="lab-dialog" aria-labelledby={`${id}-title`} onCancel={() => setOpen(false)} onClose={() => setOpen(false)}>
      <header className="lab-dialog-header"><div><p className="section-label">The Hacker Hostel Lab / Workbench</p><h2 id={`${id}-title`}>Small experiments. Real ideas.</h2></div><button type="button" className="lab-button" onClick={() => setOpen(false)} autoFocus><X size={16} aria-hidden="true" />Close lab</button></header>
      {open && <LabLoadBoundary><Suspense fallback={<p className="lab-loading" role="status">Opening the workbench…</p>}><LabDrawer /></Suspense></LabLoadBoundary>}
    </dialog>
  </div>;
}

export default function LabEntry() {
  return <div className="lab-entry" aria-label="The Hacker Hostel Lab">
    <div className="lab-entry-copy"><p className="section-label">Field station / The Hacker Hostel Lab</p><h2>A few machines.<br /><em>A lot of curiosity.</em></h2><p>Follow a packet through the workshop. Compress a thought. Look under the hood.</p><LabLauncher /></div>
    <EngineeringLabScene />
  </div>;
}
