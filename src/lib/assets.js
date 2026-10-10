// Local public assets work when the site is deployed in a subdirectory, too.
export function assetUrl(path) {
  if (!path) return null;
  if (/^(https?:|data:)/.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
