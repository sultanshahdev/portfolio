// Native gzip measurements. The reported sizes include the complete gzip framing.
export async function measureCompression(text, {
  Compression = globalThis.CompressionStream,
  Decompression = globalThis.DecompressionStream,
} = {}) {
  const input = new TextEncoder().encode(text);
  if (typeof Compression !== 'function') return { supported: false, originalBytes: input.byteLength };
  const stream = new Blob([input]).stream().pipeThrough(new Compression('gzip'));
  const compressed = new Uint8Array(await new Response(stream).arrayBuffer());
  let verified = null;
  if (typeof Decompression === 'function') {
    const restoredStream = new Blob([compressed]).stream().pipeThrough(new Decompression('gzip'));
    const restored = new Uint8Array(await new Response(restoredStream).arrayBuffer());
    verified = restored.length === input.length && restored.every((byte, index) => byte === input[index]);
    if (!verified) throw new Error('The decompressed bytes did not match the input.');
  }
  const savedBytes = input.byteLength - compressed.byteLength;
  return {
    supported: true, method: 'gzip', originalBytes: input.byteLength,
    compressedBytes: compressed.byteLength, savedBytes,
    percent: input.byteLength ? (savedBytes / input.byteLength) * 100 : null,
    verified,
  };
}
