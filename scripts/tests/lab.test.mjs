import test from 'node:test';
import assert from 'node:assert/strict';
import { gzipSync } from 'node:zlib';
import { measureCompression } from '../../src/lib/compression.js';
import { runLabCommand, consoleCommands } from '../../src/lib/labCommands.js';
import { compressionSample, artifactCatalog } from '../../src/data/lab.js';
import { projects } from '../../src/data/projects.js';
import { technicalExpertise } from '../../src/data/skills.js';
import { profile } from '../../src/data/profile.js';

for (const [name, input] of [['empty', ''], ['short', 'x'], ['repeated', compressionSample], ['UTF-8', 'Hello, دنیا 🌍\n'.repeat(20)]]) {
  test(`gzip measures actual, lossless ${name} input`, async () => {
    const result = await measureCompression(input);
    const bytes = new TextEncoder().encode(input);
    assert.equal(result.originalBytes, bytes.length);
    assert.equal(result.compressedBytes, gzipSync(bytes).length);
    assert.equal(result.savedBytes, bytes.length - result.compressedBytes);
    assert.equal(result.verified, true);
    assert.equal(result.percent, bytes.length ? result.savedBytes / bytes.length * 100 : null);
    if (name === 'empty' || name === 'short') assert.ok(result.savedBytes < 0);
    if (name === 'repeated') assert.ok(result.savedBytes > 0);
  });
}

test('unsupported compression returns only known UTF-8 measurements', async () => {
  assert.deepEqual(await measureCompression('🌍', { Compression: null }), { supported: false, originalBytes: 4 });
});
test('missing decompression does not claim verified output', async () => {
  const result = await measureCompression(compressionSample, { Decompression: null });
  assert.equal(result.verified, null);
  assert.ok(result.compressedBytes > 0);
});
test('compression and verification errors propagate instead of reporting fabricated results', async () => {
  class FailingStream { constructor() { throw new Error('unavailable format'); } }
  await assert.rejects(measureCompression('abc', { Compression: FailingStream }), /unavailable format/);
  class CorruptDecompression { constructor() { return new TransformStream({ transform(_, controller) { controller.enqueue(new Uint8Array([0])); } }); } }
  await assert.rejects(measureCompression('abc', { Decompression: CorruptDecompression }), /did not match/);
});
test('console reports canonical project, skills and profile data', () => {
  assert.deepEqual(runLabCommand('  PrOjEcTs  ').lines, projects.map(p => `${p.title} — ${p.subtitle}`));
  const skills = runLabCommand('skills').lines;
  assert.equal(skills[0], `${technicalExpertise.length} categories / ${technicalExpertise.reduce((sum, c) => sum + c.skills.length, 0)} listed skills`);
  assert.ok(runLabCommand('about').lines.includes(profile.name));
  assert.ok(runLabCommand('architecture').lines.some(line => line.includes('HashRouter')));
  assert.deepEqual(runLabCommand('clear'), { lines: [], clear: true });
  assert.deepEqual(runLabCommand(' '), { lines: [] });
});
test('the console only recognizes exact whitelist commands', () => {
  for (const value of ['constructor', '__proto__', 'help; projects', 'projects now', '<script>alert(1)</script>', 'fetch("https://example.com")', 'rm -rf /']) {
    assert.deepEqual(runLabCommand(value), { lines: ['Unknown command. Type help to see the available commands.'] });
  }
  assert.deepEqual(consoleCommands, ['help', 'projects', 'skills', 'architecture', 'about', 'clear']);
  assert.equal(new Set(artifactCatalog.map(a => a.kind)).size, 10);
});
