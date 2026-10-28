// Original illustrative examples; the portfolio never executes these strings.
// c2g's documented implementation uses Python/TCP. The replica example below
// is a conceptual JavaScript model, not an excerpt or a live network.
export const controlRoom = {
  frontend: {
    port: 'INPUT', focus: 'Components · interaction · accessibility',
    title: 'Start with the person using it.',
    note: 'Native controls include keyboard behavior.',
    examples: [
      { file: 'interface.jsx', language: 'React / JSX', context: 'A native link to the project archive.', source: `function ProjectLink() {
  return (
    <a href="#/projects">
      Explore projects
    </a>
  );
}` },
      { file: 'field.jsx', language: 'React / JSX', context: 'An input with its own accessible label.', source: `function Field() {
  return (
    <label>
      Name
      <input name="name" required />
    </label>
  );
}` },
    ],
  },
  backend: {
    port: 'SERVICE', focus: 'APIs · application logic · data',
    title: 'Give each request a clear boundary.',
    note: 'Validate inputs before applying business rules.',
    examples: [
      { file: 'health.js', language: 'Express / JavaScript', context: 'Illustrative route; an Express app is in scope.', source: `app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});` },
      { file: 'validation.js', language: 'JavaScript', context: 'A small, bounded input validation rule.', source: `function validLimit(value) {
  const limit = Number(value);
  return Number.isInteger(limit)
    && limit > 0 && limit <= 100;
}` },
    ],
  },
  distributed: {
    port: 'MESSAGE', focus: 'Communication · replicas · concurrency',
    title: 'One message. Independent state.',
    note: 'Conceptual JavaScript; c2g uses Python and TCP.',
    examples: [
      { file: 'replicas.js', language: 'Conceptual JavaScript', context: 'Each supplied replica provides its own merge method.', source: `function deliver(edit, replicas) {
  for (const replica of replicas) {
    replica.merge(edit);
  }
}` },
      { file: 'message.js', language: 'JavaScript / JSON', context: 'Serializing an illustrative edit message.', source: `const message = {
  type: 'edit',
  peer: 'A',
  sequence: 1,
  payload: { text: 'hi' },
};
const wire = JSON.stringify(message);` },
    ],
  },
  security: {
    port: 'POLICY', focus: 'Protocols · authorization · trust',
    title: 'Make the trust boundary explicit.',
    note: 'One rule, not a complete security policy.',
    examples: [
      { file: 'ownership.js', language: 'JavaScript', context: 'An ownership check, not a complete authorization system.', source: `function mayRead(user, document) {
  return Boolean(user)
    && user.id === document.ownerId;
}` },
      { file: 'protocol.js', language: 'JavaScript / URL', context: 'Checks the URL scheme only, not the host or its content.', source: `function isHttps(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}` },
    ],
  },
};

export const playbackTiming = { character: 34, hold: 2800, gap: 450 };
