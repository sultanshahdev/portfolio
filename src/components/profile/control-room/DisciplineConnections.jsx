import { useMediaPreference } from './useCodePlayback.js';

const routes = {
  wide: {
    frontend: 'M125 49H250V68H375V49',
    backend: 'M125 49H250V68H375V49H500V68H625V49',
    distributed: 'M375 49H500V68H625V49H750V68H875V49',
    security: 'M625 49H750V68H875V49M875 49H970V174H650V200',
  },
  compact: {
    frontend: 'M250 25H500V34H750V25',
    backend: 'M250 25H500V34H750V25M750 25V90H250V125',
    distributed: 'M750 25V90H250V125H500V134H750V125',
    security: 'M250 125H500V134H750V125M750 125H970V188H650V200',
  },
};

export default function DisciplineConnections({ active }) {
  const compact = useMediaPreference('(max-width: 639px)');
  const paths = routes[compact ? 'compact' : 'wide'];
  return <svg className="discipline-connectors" viewBox="0 0 1000 200" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
    <g className="discipline-connector-base"><path d={paths.backend} /><path d={paths.distributed} /><path d={paths.security} /></g>
    <g className="discipline-connector-active">{Object.entries(paths).map(([id, path]) => <path key={id} data-path={id} d={path} pathLength="1" />)}</g>
    <path key={active} className="control-room-signal" d={paths[active]} pathLength="1" />
  </svg>;
}
