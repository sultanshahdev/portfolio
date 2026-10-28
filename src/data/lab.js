export const compressionSample = Array(8).fill('Small messages. Shared state. Thoughtful systems.').join('\n');

export const artifactCatalog = [
  { kind: 'server', name: 'Server rack', note: 'Drive bays · console port · ventilation' },
  { kind: 'switch', name: 'Network switch', note: 'Ethernet ports · link indicators' },
  { kind: 'processor', name: 'Processor', note: 'Pins · traces · fetch / decode / execute' },
  { kind: 'memory', name: 'Memory module', note: 'Addressed bytes · contact fingers' },
  { kind: 'storage', name: 'Storage unit', note: 'Key slots · value blocks' },
  { kind: 'terminal', name: 'Workstation', note: 'Terminal · keyboard · process tree' },
  { kind: 'gateway', name: 'Security gateway', note: 'Inspect · approve · pass' },
  { kind: 'parser', name: 'Code parser', note: 'x + 1 → tokens → Add AST → analysis' },
  { kind: 'container', name: 'Deployment unit', note: 'Application inside a runtime boundary' },
  { kind: 'packet', name: 'Data packet', note: 'Header · length · payload' },
];

export const projectLabs = {
  c2g: {
    title: 'Distributed systems lab', code: '01 / REPLICAS',
    stations: [['terminal', 'Peer A'], ['server', 'Peer B'], ['terminal', 'Peer C']],
    operator: 0,
    note: 'Conceptual edit delivery · each peer merges into its own replica.',
    annotation: 'edit → propagate → merge',
  },
  clara: {
    title: 'Database engine lab', code: '02 / KEYSPACE',
    stations: [['terminal', 'Client'], ['server', 'TCP'], ['packet', 'RESP2'], ['storage', 'Store']],
    operator: 3,
    note: 'GET lab framing · $3 counts three UTF-8 bytes. One sync.Mutex protects the shared store.',
    annotation: '*2\\r\\n$3\\r\\nGET\\r\\n$3\\r\\nlab\\r\\n',
  },
  'soar-lite': {
    title: 'Security operations lab', code: '03 / TRUST BOUNDARY',
    stations: [['packet', 'Alert / evidence'], ['gateway', 'Human approval'], ['storage', 'Lab audit trail']],
    operator: 1,
    note: 'Illustrative approval gate · simulated response stays inside the lab.',
    annotation: 'alert → enrich → approve → simulate',
  },
  codecraft: {
    title: 'Source intelligence lab', code: '04 / INSPECTION',
    stations: [['terminal', 'Behavior question'], ['processor', 'Ranked candidates'], ['parser', 'Source inspection']],
    operator: 2,
    note: 'Illustrative source inspection · no CodeCraft inference runs here.',
    annotation: 'function readKey(store, key) { return store.get(key); }',
  },
};
