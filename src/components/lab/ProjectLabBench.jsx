import EngineeringArtifact from '../illustrations/EngineeringArtifact.jsx';
import Mascot from '../mascots/Mascot.jsx';
import { projectResidents } from '../../data/mascots.js';
import { projectLabs } from '../../data/lab.js';

// Shares the exhibit's phase and activation control. No extra timers or observers.
export default function ProjectLabBench({ slug, phase }) {
  const lab = projectLabs[slug];
  return <div className={`project-lab-bench bench-${slug}`} data-bench-phase={phase}>
    <div className="bench-heading"><span>{lab.title}</span><span aria-hidden="true">{lab.code}</span></div>
    <div className="bench-machines">
      <div className="bench-stations" style={{ '--station-count': lab.stations.length }}>
        <span className="bench-delivery" aria-hidden="true"><i /></span>
        {lab.stations.map(([kind, label], index) => <div className="bench-station" key={label}>
          <div className="bench-station-art">
            <EngineeringArtifact kind={kind} />
            {index === lab.operator && <span className="project-resident"><Mascot character={projectResidents[slug]} size="100%" /></span>}
            {slug === 'clara' && index === 1 && <span className="bench-daemon"><Mascot character="daemon" size="100%" /></span>}
            {slug === 'clara' && index === 3 && <span className="bench-memory"><EngineeringArtifact kind="memory" /></span>}
          </div>
          <span className="bench-station-label">{label}</span>
        </div>)}
      </div>
    </div>
    <p className="bench-annotation"><span className="bench-port" aria-hidden="true">↳</span><code>{slug === 'codecraft' ? <>function readKey(store, key) {'{'} <mark>return store.get(key);</mark> {'}'}</> : lab.annotation}</code></p>
    <p className="bench-note">{lab.note}</p>
  </div>;
}
