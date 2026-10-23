// The level progression every book chapter and every plan phase's learning
// strategy walks through, in this order. The order is checked at build time
// (scripts/check-build.mjs): a block that skips a level, repeats one or puts
// them out of order fails the build.

export const levels = [
  { name: 'Beginner', id: 'beginner', ask: 'What is it, and what is the smallest thing that works?' },
  { name: 'Intermediate', id: 'intermediate', ask: 'How do the pieces combine in a real program?' },
  { name: 'Advanced', id: 'advanced', ask: 'What does it do underneath, and what are its exact rules?' },
  { name: 'Edge cases', id: 'edge-cases', ask: 'Where does it behave differently at the boundaries?' },
  { name: 'Corner cases', id: 'corner-cases', ask: 'What happens when two boundaries meet?' },
  { name: 'Production level', id: 'production', ask: 'What breaks when it runs for real, for other people?' },
  { name: 'Mindset', id: 'mindset', ask: 'What habit of thought does this teach?' },
  { name: 'System design', id: 'system-design', ask: 'Where does this decision sit in a larger system?' },
  { name: 'Strategy', id: 'strategy', ask: 'How do I learn it, and how do I know I have?' },
] as const;

export type LevelName = (typeof levels)[number]['name'];

export const levelNames: readonly string[] = levels.map((level) => level.name);

export const levelByName = (name: string) => {
  const level = levels.find((entry) => entry.name === name);
  if (!level) {
    throw new Error(`Unknown level "${name}". Use one of: ${levelNames.join(', ')}.`);
  }
  return level;
};
