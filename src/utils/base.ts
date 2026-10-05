/**
 * Prefix a root-relative path with the configured Astro `base`.
 *
 * GitHub project pages serve this site under /sanjay/ (see `base` in
 * astro.config.mjs), so every internal link must go through this helper.
 * External URLs, hash links, and relative paths pass through unchanged.
 *
 *   withBase('/')                      → '/sanjay/'
 *   withBase('/posts/typescript/01/')  → '/sanjay/posts/typescript/01/'
 */
export function withBase(path: string): string {
  if (!path.startsWith('/')) return path;
  const base = import.meta.env.BASE_URL; // '/' locally un-based, '/sanjay' with base
  if (base === '/' || base === '') return path;
  return `${base.replace(/\/$/, '')}${path}`;
}