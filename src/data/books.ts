// Every book the plans name, in one list.
//
// A book is cited by one or more plans, sometimes by a specific phase or
// lens. This list is the source of truth for /books/ and for the "books
// this plan cites" section on each plan page. A book gets a page of its own
// only when src/content/books/<slug>.mdx exists; until then it is listed as
// plain text, so the site never links to a page that is not written.
//
// `cited` uses the phase numbers of src/data/plans.ts: a traditional-core or
// AI-era phase, an underrated-fundamentals lens (1–10), or a row of the
// books plan's twelve-month sequence (1–10). A cite without a phase is a
// book a plan names in a shelf or reference table.

export type Shelf =
  | 'start-here'
  | 'core'
  | 'later'
  | 'free'
  | 'traditional'
  | 'ai-era'
  | 'fundamentals'
  | 'reference'
  | 'skip';

export interface ShelfInfo {
  id: Shelf;
  name: string;
  summary: string;
}

/** The shelves, in the order the books plan reads, then the roadmaps. */
export const shelves: ShelfInfo[] = [
  { id: 'start-here', name: 'Start here', summary: 'Three short books, in this order. Each one changes how I work the week I read it.' },
  { id: 'core', name: 'The core shelf', summary: 'One book per skill, read over a year with a project open.' },
  { id: 'later', name: 'Later, once I have operated something', summary: 'Excellent, and the wrong books to read first: they need a running system to attach to.' },
  { id: 'free', name: 'Free and worth bookmarking', summary: 'Legal, free editions. Not a downgrade.' },
  { id: 'traditional', name: 'The traditional core shelf', summary: 'The primary book for each phase of the computer science roadmap.' },
  { id: 'ai-era', name: 'The software AI developer shelf', summary: 'The primary books for the AI-era roadmap: production, security, AI engineering and product.' },
  { id: 'fundamentals', name: 'Under the fundamentals', summary: 'The books behind the ten lenses that sit under every roadmap.' },
  { id: 'reference', name: 'Depth and reference', summary: 'The optional depth for a phase: read a chapter when the phase needs it, not cover to cover.' },
  { id: 'skip', name: 'What I would skip, for now', summary: 'Named in the books plan as not worth the time at this stage, with the reason.' },
];

export interface BookCite {
  plan: string;
  phase?: number;
}

export interface Book {
  slug: string;
  title: string;
  author: string;
  shelf: Shelf;
  cited: BookCite[];
  /** A free, legal edition or the official site, if the plans give one. */
  link?: string;
}

const TR = 'traditional-software-developer';
const SD = 'software-developer';
const AI = 'software-ai-developer';
const UF = 'underrated-fundamentals';
const BK = 'books-that-still-matter';

export const books: Book[] = [
  // ---- The books plan: start here ----
  { slug: 'a-philosophy-of-software-design', title: 'A Philosophy of Software Design', author: 'John Ousterhout', shelf: 'start-here', cited: [{ plan: BK, phase: 1 }], link: 'https://web.stanford.edu/~ouster/cgi-bin/book.php' },
  { slug: 'debugging-9-indispensable-rules', title: 'Debugging: The 9 Indispensable Rules', author: 'David J. Agans', shelf: 'start-here', cited: [{ plan: BK, phase: 2 }, { plan: UF, phase: 8 }], link: 'https://www.debuggingrules.com/' },
  { slug: 'effective-typescript', title: 'Effective TypeScript', author: 'Dan Vanderkam', shelf: 'start-here', cited: [{ plan: BK, phase: 3 }], link: 'https://effectivetypescript.com/' },

  // ---- The books plan: the core shelf ----
  { slug: 'working-effectively-with-legacy-code', title: 'Working Effectively with Legacy Code', author: 'Michael Feathers', shelf: 'core', cited: [{ plan: BK }] },
  { slug: 'use-the-index-luke', title: 'Use the Index, Luke', author: 'Markus Winand', shelf: 'core', cited: [{ plan: BK, phase: 4 }, { plan: TR, phase: 8 }, { plan: AI, phase: 4 }], link: 'https://use-the-index-luke.com/' },
  { slug: 'sql-performance-explained', title: 'SQL Performance Explained', author: 'Markus Winand', shelf: 'core', cited: [{ plan: BK }], link: 'https://sql-performance-explained.com/' },
  { slug: 'high-performance-browser-networking', title: 'High Performance Browser Networking', author: 'Ilya Grigorik', shelf: 'core', cited: [{ plan: BK, phase: 5 }], link: 'https://hpbn.co/' },
  { slug: 'the-linux-command-line', title: 'The Linux Command Line', author: 'William Shotts', shelf: 'core', cited: [{ plan: BK, phase: 6 }], link: 'https://linuxcommand.org/tlcl.php' },
  { slug: 'unit-testing-principles-practices-patterns', title: 'Unit Testing: Principles, Practices, and Patterns', author: 'Vladimir Khorikov', shelf: 'core', cited: [{ plan: BK, phase: 7 }] },
  { slug: 'the-programmers-brain', title: "The Programmer's Brain", author: 'Felienne Hermans', shelf: 'core', cited: [{ plan: BK, phase: 8 }] },
  { slug: 'on-writing-well', title: 'On Writing Well', author: 'William Zinsser', shelf: 'core', cited: [{ plan: BK, phase: 9 }] },

  // ---- The books plan: later ----
  { slug: 'designing-data-intensive-applications', title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', shelf: 'later', cited: [{ plan: BK, phase: 10 }, { plan: TR, phase: 8 }, { plan: TR, phase: 10 }, { plan: SD }, { plan: AI, phase: 4 }], link: 'https://dataintensive.net/' },
  { slug: 'systems-performance', title: 'Systems Performance', author: 'Brendan Gregg', shelf: 'later', cited: [{ plan: BK }, { plan: UF, phase: 6 }], link: 'https://www.brendangregg.com/systems-performance-2nd-edition-book.html' },
  { slug: 'the-staff-engineers-path', title: "The Staff Engineer's Path", author: 'Tanya Reilly', shelf: 'later', cited: [{ plan: BK }, { plan: AI, phase: 12 }], link: 'https://noidea.dog/staff' },
  { slug: 'fundamentals-of-software-architecture', title: 'Fundamentals of Software Architecture', author: 'Mark Richards and Neal Ford', shelf: 'later', cited: [{ plan: BK }, { plan: AI, phase: 10 }], link: 'https://fundamentalsofsoftwarearchitecture.com/' },

  // ---- The books plan: free ----
  { slug: 'you-dont-know-js-yet', title: "You Don't Know JS Yet", author: 'Kyle Simpson', shelf: 'free', cited: [{ plan: BK }, { plan: AI, phase: 1 }], link: 'https://github.com/getify/You-Dont-Know-JS' },
  { slug: 'operating-systems-three-easy-pieces', title: 'Operating Systems: Three Easy Pieces', author: 'Remzi H. Arpaci-Dusseau and Andrea C. Arpaci-Dusseau', shelf: 'free', cited: [{ plan: BK }, { plan: TR, phase: 6 }, { plan: UF, phase: 3 }], link: 'https://pages.cs.wisc.edu/~remzi/OSTEP/' },
  { slug: 'site-reliability-engineering', title: 'Site Reliability Engineering', author: 'Betsy Beyer, Chris Jones, Jennifer Petoff and Niall Richard Murphy (eds.)', shelf: 'free', cited: [{ plan: BK }, { plan: AI, phase: 5 }, { plan: UF, phase: 4 }], link: 'https://sre.google/sre-book/table-of-contents/' },

  // ---- The traditional core ----
  { slug: 'c-programming-a-modern-approach', title: 'C Programming: A Modern Approach', author: 'K. N. King', shelf: 'traditional', cited: [{ plan: TR, phase: 1 }, { plan: UF, phase: 1 }] },
  { slug: 'mathematics-for-computer-science', title: 'Mathematics for Computer Science', author: 'Eric Lehman, F. Thomson Leighton and Albert R. Meyer', shelf: 'traditional', cited: [{ plan: TR, phase: 2 }], link: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/' },
  { slug: 'algorithms-sedgewick-wayne', title: 'Algorithms', author: 'Robert Sedgewick and Kevin Wayne', shelf: 'traditional', cited: [{ plan: TR, phase: 3 }], link: 'https://algs4.cs.princeton.edu/home/' },
  { slug: 'the-algorithm-design-manual', title: 'The Algorithm Design Manual', author: 'Steven S. Skiena', shelf: 'traditional', cited: [{ plan: TR, phase: 4 }] },
  { slug: 'computer-systems-a-programmers-perspective', title: "Computer Systems: A Programmer's Perspective", author: "Randal E. Bryant and David R. O'Hallaron", shelf: 'traditional', cited: [{ plan: TR, phase: 5 }, { plan: UF, phase: 1 }, { plan: UF, phase: 6 }], link: 'https://csapp.cs.cmu.edu/3e/labs.html' },
  { slug: 'computer-networking-a-top-down-approach', title: 'Computer Networking: A Top-Down Approach', author: 'James F. Kurose and Keith W. Ross', shelf: 'traditional', cited: [{ plan: TR, phase: 7 }] },
  { slug: 'database-internals', title: 'Database Internals', author: 'Alex Petrov', shelf: 'traditional', cited: [{ plan: TR, phase: 8 }, { plan: AI, phase: 4 }] },
  { slug: 'crafting-interpreters', title: 'Crafting Interpreters', author: 'Robert Nystrom', shelf: 'traditional', cited: [{ plan: TR, phase: 9 }], link: 'https://craftinginterpreters.com/' },
  { slug: 'the-pragmatic-programmer', title: 'The Pragmatic Programmer', author: 'David Thomas and Andrew Hunt', shelf: 'traditional', cited: [{ plan: TR, phase: 0 }, { plan: TR, phase: 11 }, { plan: SD }, { plan: AI, phase: 0 }, { plan: UF, phase: 10 }, { plan: BK }] },
  { slug: 'security-engineering', title: 'Security Engineering', author: 'Ross Anderson', shelf: 'traditional', cited: [{ plan: TR, phase: 11 }, { plan: AI, phase: 6 }, { plan: UF, phase: 7 }], link: 'https://www.cl.cam.ac.uk/~rja14/book.html' },

  // ---- The software AI developer ----
  { slug: 'eloquent-javascript', title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', shelf: 'ai-era', cited: [{ plan: AI, phase: 1 }], link: 'https://eloquentjavascript.net/' },
  { slug: 'refactoring-ui', title: 'Refactoring UI', author: 'Adam Wathan and Steve Schoger', shelf: 'ai-era', cited: [{ plan: AI, phase: 2 }] },
  { slug: 'inclusive-components', title: 'Inclusive Components', author: 'Heydon Pickering', shelf: 'ai-era', cited: [{ plan: AI, phase: 2 }], link: 'https://inclusive-components.design/' },
  { slug: 'nodejs-design-patterns', title: 'Node.js Design Patterns', author: 'Mario Casciaro and Luciano Mammino', shelf: 'ai-era', cited: [{ plan: AI, phase: 3 }] },
  { slug: 'release-it', title: 'Release It!', author: 'Michael T. Nygard', shelf: 'ai-era', cited: [{ plan: AI, phase: 5 }, { plan: UF, phase: 4 }] },
  { slug: 'web-security-for-developers', title: 'Web Security for Developers', author: 'Malcolm McDonald', shelf: 'ai-era', cited: [{ plan: AI, phase: 6 }, { plan: UF, phase: 7 }] },
  { slug: 'ai-engineering', title: 'AI Engineering', author: 'Chip Huyen', shelf: 'ai-era', cited: [{ plan: AI, phase: 7 }, { plan: AI, phase: 8 }, { plan: AI, phase: 9 }] },
  { slug: 'hands-on-large-language-models', title: 'Hands-On Large Language Models', author: 'Jay Alammar and Maarten Grootendorst', shelf: 'ai-era', cited: [{ plan: AI, phase: 8 }] },
  { slug: 'the-mom-test', title: 'The Mom Test', author: 'Rob Fitzpatrick', shelf: 'ai-era', cited: [{ plan: AI, phase: 11 }, { plan: UF, phase: 9 }], link: 'https://www.momtestbook.com/' },
  { slug: 'inspired', title: 'Inspired', author: 'Marty Cagan', shelf: 'ai-era', cited: [{ plan: AI, phase: 11 }, { plan: UF, phase: 9 }] },

  // ---- Under the fundamentals ----
  { slug: 'types-and-programming-languages', title: 'Types and Programming Languages', author: 'Benjamin C. Pierce', shelf: 'fundamentals', cited: [{ plan: UF, phase: 2 }] },
  { slug: 'practical-tla-plus', title: 'Practical TLA+', author: 'Hillel Wayne', shelf: 'fundamentals', cited: [{ plan: UF, phase: 2 }] },
  { slug: 'java-concurrency-in-practice', title: 'Java Concurrency in Practice', author: 'Brian Goetz et al.', shelf: 'fundamentals', cited: [{ plan: UF, phase: 3 }] },
  { slug: 'api-design-patterns', title: 'API Design Patterns', author: 'JJ Geewax', shelf: 'fundamentals', cited: [{ plan: UF, phase: 5 }, { plan: AI, phase: 3 }] },
  { slug: 'domain-driven-design', title: 'Domain-Driven Design', author: 'Eric Evans', shelf: 'fundamentals', cited: [{ plan: UF, phase: 5 }] },
  { slug: 'why-programs-fail', title: 'Why Programs Fail', author: 'Andreas Zeller', shelf: 'fundamentals', cited: [{ plan: UF, phase: 8 }] },
  { slug: 'are-your-lights-on', title: 'Are Your Lights On?', author: 'Donald C. Gause and Gerald M. Weinberg', shelf: 'fundamentals', cited: [{ plan: UF, phase: 9 }] },
  { slug: 'accelerate', title: 'Accelerate', author: 'Nicole Forsgren, Jez Humble and Gene Kim', shelf: 'fundamentals', cited: [{ plan: UF, phase: 10 }, { plan: AI, phase: 5 }] },

  // ---- Depth and reference ----
  { slug: 'the-c-programming-language', title: 'The C Programming Language', author: 'Brian W. Kernighan and Dennis M. Ritchie', shelf: 'reference', cited: [{ plan: TR, phase: 1 }] },
  { slug: 'discrete-mathematics-and-its-applications', title: 'Discrete Mathematics and Its Applications', author: 'Kenneth H. Rosen', shelf: 'reference', cited: [{ plan: TR, phase: 2 }] },
  { slug: 'data-structures-and-algorithm-analysis', title: 'Data Structures and Algorithm Analysis', author: 'Mark Allen Weiss', shelf: 'reference', cited: [{ plan: TR, phase: 3 }] },
  { slug: 'introduction-to-algorithms', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest and Clifford Stein', shelf: 'reference', cited: [{ plan: TR, phase: 4 }] },
  { slug: 'computer-organization-and-design', title: 'Computer Organization and Design', author: 'David A. Patterson and John L. Hennessy', shelf: 'reference', cited: [{ plan: TR, phase: 5 }] },
  { slug: 'the-linux-programming-interface', title: 'The Linux Programming Interface', author: 'Michael Kerrisk', shelf: 'reference', cited: [{ plan: TR, phase: 6 }] },
  { slug: 'tcp-ip-illustrated-volume-1', title: 'TCP/IP Illustrated, Volume 1', author: 'W. Richard Stevens (2nd ed. with Kevin R. Fall)', shelf: 'reference', cited: [{ plan: TR, phase: 7 }] },
  { slug: 'introduction-to-the-theory-of-computation', title: 'Introduction to the Theory of Computation', author: 'Michael Sipser', shelf: 'reference', cited: [{ plan: TR, phase: 9 }] },
  { slug: 'distributed-systems-tanenbaum-van-steen', title: 'Distributed Systems', author: 'Maarten van Steen and Andrew S. Tanenbaum', shelf: 'reference', cited: [{ plan: TR, phase: 10 }], link: 'https://www.distributed-systems.net/' },
  { slug: 'the-web-application-hackers-handbook', title: "The Web Application Hacker's Handbook", author: 'Dafydd Stuttard and Marcus Pinto', shelf: 'reference', cited: [{ plan: TR, phase: 11 }, { plan: AI }] },
  { slug: 'refactoring', title: 'Refactoring', author: 'Martin Fowler', shelf: 'reference', cited: [{ plan: TR }, { plan: AI, phase: 1 }] },
  { slug: 'the-devops-handbook', title: 'The DevOps Handbook', author: 'Gene Kim, Jez Humble, Patrick Debois and John Willis', shelf: 'reference', cited: [{ plan: TR, phase: 0 }, { plan: AI, phase: 0 }] },
  { slug: 'css-the-definitive-guide', title: 'CSS: The Definitive Guide', author: 'Eric A. Meyer and Estelle Weyl', shelf: 'reference', cited: [{ plan: AI, phase: 2 }] },
  { slug: 'designing-machine-learning-systems', title: 'Designing Machine Learning Systems', author: 'Chip Huyen', shelf: 'reference', cited: [{ plan: AI, phase: 7 }, { plan: AI, phase: 8 }] },
  { slug: 'the-site-reliability-workbook', title: 'The Site Reliability Workbook', author: 'Betsy Beyer et al. (eds.)', shelf: 'reference', cited: [{ plan: AI }], link: 'https://sre.google/workbook/table-of-contents/' },
  { slug: 'software-architecture-the-hard-parts', title: 'Software Architecture: The Hard Parts', author: 'Neal Ford, Mark Richards, Pramod Sadalage and Zhamak Dehghani', shelf: 'reference', cited: [{ plan: AI, phase: 10 }] },
  { slug: 'continuous-discovery-habits', title: 'Continuous Discovery Habits', author: 'Teresa Torres', shelf: 'reference', cited: [{ plan: AI, phase: 11 }] },

  // ---- Skip, for now ----
  { slug: 'clean-code', title: 'Clean Code', author: 'Robert C. Martin', shelf: 'skip', cited: [{ plan: BK }] },
  { slug: 'the-mythical-man-month', title: 'The Mythical Man-Month', author: 'Frederick P. Brooks Jr.', shelf: 'skip', cited: [{ plan: BK }] },
  { slug: 'cracking-the-coding-interview', title: 'Cracking the Coding Interview', author: 'Gayle Laakmann McDowell', shelf: 'skip', cited: [{ plan: BK }] },
];

export const bookBySlug = (slug: string): Book | undefined =>
  books.find((book) => book.slug === slug);

/** The books a plan cites, in list order. */
export const booksForPlan = (planId: string): Book[] =>
  books.filter((book) => book.cited.some((cite) => cite.plan === planId));

/** The books a plan cites for one phase. */
export const booksForPhase = (planId: string, phase: number): Book[] =>
  books.filter((book) => book.cited.some((cite) => cite.plan === planId && cite.phase === phase));
