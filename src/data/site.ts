// The one place the details about the person are kept. Adding a profile
// here adds it to the homepage footer and to the structured data.

export interface SiteProfile {
  name: string;
  role: string;
  location: string;
  email: string;
  github: string;
  /** Where the notes are written, for the "view source" link. */
  repo: string;
  /** Leave empty until there is a profile to point at. */
  linkedin: string;
  /** The Buttondown username for the email list. Empty means no form is
   *  rendered — the feed is the only way to follow until it is set. */
  buttondown: string;
  /** The Cloudflare Web Analytics site token. Empty means no beacon is
   *  rendered, so nothing third-party is loaded by default. */
  analytics: string;
}

export const profile: SiteProfile = {
  name: 'Sanjay Kumar Thakur',
  role: 'Software engineer',
  location: 'Pune',
  email: 'sanjay17126@gmail.com',
  github: 'https://github.com/snjy-kumar',
  repo: 'https://github.com/snjy-kumar/sanjay',
  linkedin: '',
  buttondown: '',
  analytics: '',
};

export const profileLinks = [
  { label: 'GitHub', href: profile.github },
  ...(profile.linkedin ? [{ label: 'LinkedIn', href: profile.linkedin }] : []),
  { label: 'Email', href: `mailto:${profile.email}` },
];
