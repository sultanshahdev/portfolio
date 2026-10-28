import EngineeringArtifact from '../illustrations/EngineeringArtifact.jsx';

export default function StudyWorkbench() {
  return <details className="study-workbench">
    <summary><span className="study-mark" aria-hidden="true">[ + ]</span> A note from the workbench <span>source → structure</span></summary>
    <div className="study-workbench-body"><EngineeringArtifact kind="parser" /><div><p className="section-label">A small compiler thought</p><p>In <code>x + 1</code>, the tokens are <code>x</code>, <code>+</code>, and <code>1</code>. The syntax tree puts <code>Add</code> at the root, with an identifier and an integer as its children.</p><p className="study-note">Parsing gives structure. Whether <code>x</code> exists, and whether the types can be added, are questions for semantic analysis.</p></div></div>
  </details>;
}
