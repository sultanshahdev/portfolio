import {
  Activity, Blocks, Braces, BrainCircuit, Cable, Cloud, Container, Database,
  FlaskConical, GitPullRequest, Layers, ListChecks, Network, Palette,
  PanelsTopLeft, RadioTower, Rocket, Route, Server, ShieldCheck,
  TableProperties, Workflow, Wrench,
} from 'lucide-react';
import TechnicalMark, { technicalMarkNames } from '../illustrations/TechnicalMark.jsx';

const icons = {
  Activity, Blocks, Braces, BrainCircuit, Cable, Cloud, Container, Database,
  FlaskConical, GitPullRequest, Layers, ListChecks, Network, Palette,
  PanelsTopLeft, RadioTower, Rocket, Route, Server, ShieldCheck,
  TableProperties, Workflow, Wrench,
};

export default function SkillIcon({ name }) {
  if (technicalMarkNames.includes(name)) return <TechnicalMark name={name} className="expertise-icon" />;
  const Icon = icons[name];
  return <Icon className="expertise-icon" size={19} strokeWidth={1.5} aria-hidden="true" focusable="false" />;
}
