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
}

export const profile: SiteProfile = {
  name: 'Sanjay Kumar Thakur',
  role: 'Software engineer',
  location: 'Pune',
  email: 'sanjay17126@gmail.com',
  github: 'https://github.com/snjy-kumar',
  repo: 'https://github.com/snjy-kumar/sanjay',
  linkedin: '',
};

export const profileLinks = [
  { label: 'GitHub', href: profile.github },
  ...(profile.linkedin ? [{ label: 'LinkedIn', href: profile.linkedin }] : []),
  { label: 'Email', href: `mailto:${profile.email}` },
];
