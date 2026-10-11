import {
  Activity, Blocks, Braces, BrainCircuit, Cable, Cloud, Container, Database,
  FlaskConical, GitPullRequest, Layers, ListChecks, Network, Palette,
  PanelsTopLeft, RadioTower, Rocket, Route, Server, ShieldCheck,
  TableProperties, Workflow, Wrench,
} from 'lucide-react';

const icons = {
  Activity, Blocks, Braces, BrainCircuit, Cable, Cloud, Container, Database,
  FlaskConical, GitPullRequest, Layers, ListChecks, Network, Palette,
  PanelsTopLeft, RadioTower, Rocket, Route, Server, ShieldCheck,
  TableProperties, Workflow, Wrench,
};

export default function SkillIcon({ name }) {
  const Icon = icons[name];
  return <Icon className="expertise-icon" size={19} strokeWidth={1.5} aria-hidden="true" focusable="false" />;
}
