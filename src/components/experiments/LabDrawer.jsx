import CompressionLab from './CompressionLab.jsx';
import EngineeringConsole from './EngineeringConsole.jsx';
import EngineeringArtifact from '../illustrations/EngineeringArtifact.jsx';
import EngineeringBlueprint from '../lab/EngineeringBlueprint.jsx';
import { artifactCatalog } from '../../data/lab.js';
import '../../styles/experiments.css';

export default function LabDrawer() {
  return <div className="lab-drawer-content">
    <div className="lab-instruments"><CompressionLab /><EngineeringConsole /></div>
    <EngineeringBlueprint />
    <details className="artifact-cabinet"><summary><span>Parts drawer</span><span>10 hand-drawn engineering artifacts</span></summary><div className="artifact-catalog">{artifactCatalog.map((artifact, index) => <figure key={artifact.kind} data-artifact={artifact.kind}><EngineeringArtifact kind={artifact.kind} label={artifact.name} /><figcaption><span>{String(index + 1).padStart(2, '0')} / {artifact.name}</span><small>{artifact.note}</small></figcaption></figure>)}</div></details>
  </div>;
}
