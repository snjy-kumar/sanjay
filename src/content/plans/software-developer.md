---
title: "The real path to becoming a software developer in the AI era"
description: "An 18-month, project-gated path from first principles to shipped AI features and agents: what to learn, what to build, how to prove it, and what not to delegate."
date: "2026-10-22"
---

Most learning plans are lists of technologies. This one is a sequence of
capabilities. Each phase ends with something you can do that you could not do
before, and the next phase assumes it. The calendar is 18 months at 10–15
hours a week; the gates matter more than the dates.

It is written for someone starting from zero, but it is also the map behind
this site. The notes here are the deep dives; this is the route.

## The premise: the ladder changed, not the destination

AI made the first draft cheap. It did not make judgment cheap.

The tasks that used to train a junior — wiring a form, writing CRUD, scaffolding
a test, translating an error message — now take seconds. That removes the
practice reps, not the need for the skill. The gap between "a demo that works"
and "a system you can operate" is where the job is.

Three things are now scarce:

1. **Problem framing.** Turning a vague request into a small, testable
   specification.
2. **Verification.** Proving that the generated code does what it claims, on the
   inputs that matter, including the ones nobody thought about.
3. **Ownership.** Knowing why the system is shaped this way, and what to do when
   it breaks at 2am.

The dangerous middle is real: people who can prompt a demo but cannot debug it.
This plan is built to avoid that. Every phase produces evidence, and most of the
evidence is something running in public.

## What a developer is now

A software developer is not a person who types code faster than a model. A
developer is a person who can:

| Competency | What it means | Evidence |
| :--- | :--- | :--- |
| **Build** | Turn a requirement into a working feature, alone | A deployed app with real users or realistic data |
| **Verify** | Prove it works and fails safely | Types, tests, evals, monitoring, a failure log |
| **Operate** | Deploy, observe, debug, roll back | A runbook, a postmortem, a rollback you have done |
| **Judge** | Choose what to build, what to skip, and when to use AI | A decision log with tradeoffs, not just outcomes |

Junior means you can do all four with help on scope. Mid means you can do them
on a feature. Senior means you can do them on a system and teach the judgment to
someone else.

## The shape of the path

The path has four layers. They are not strictly sequential — you will revisit
them — but the order matters because each layer makes the next one legible.

| Layer | Question | Contents | Proof |
| :--- | :--- | :--- | :--- |
| **Foundations** | Can you read and write the language? | JS, TS, HTML/CSS, HTTP, Git, the terminal | A vanilla app, deployed |
| **Product** | Can you build something usable? | React, UI systems, Node, Postgres, auth | A full-stack app |
| **Craft** | Can you make it reliable? | Tests, CI, security, performance, observability | A hardened app with a gate |
| **Intelligence** | Can you add AI without losing trust? | LLM APIs, RAG, evals, agents, guardrails | An AI feature and a bounded agent |
| **Market** | Will anyone use it? | Users, analytics, SEO, billing, support | 10 users and 3 iterations |

AI sits on top of the first four layers. It does not replace them. A RAG feature
is still a data problem, a security problem, and a product problem before it is
a model problem.

## The 18-month map

The first 13 months are the curriculum. The last 5 are buffer, capstone, and
career work. The weeks assume 10–15 hours a week; if you have 25–30, compress
the calendar, not the gates.

| Phase | Weeks | Focus | Ship |
| :--- | :--- | :--- | :--- |
| 0 | 1–2 | Orientation: terminal, Git, HTTP, deploy | A static page, public |
| 1 | 3–10 | JavaScript and TypeScript | A vanilla app, no framework |
| 2 | 11–18 | React, UI systems, accessibility | A multi-page React app |
| 3 | 19–26 | Node, APIs, Postgres, auth | A full-stack app |
| 4 | 27–32 | Testing, CI, security, performance | A hardened app |
| 5 | 33–40 | AI engineering: RAG, evals, cost | An AI feature with citations |
| 6 | 41–46 | Agents: tools, MCP, guardrails | A bounded maintainer agent |
| 7 | 47–56 | Product, users, iteration | A product with 10 users |
| 8 | 57–78 | Career: portfolio, open source, interviews | Interviews or paid work |

If you only have 5 hours a week, expect roughly three years. That is not a
failure; it is arithmetic. The gates are the same.

## Phase 0 — Orientation (weeks 1–2)

**Goal:** stop being afraid of the terminal, the browser, and the deploy.

**Learn:** the terminal and file paths; an editor you can navigate without the
mouse; Git (`init`, `add`, `commit`, `branch`, `push`, pull request); the shape
of an HTTP request and response; DNS at a high level; JSON; browser DevTools;
deploying a static page.

**Build:** a one-page site with semantic HTML and one CSS file, deployed to
GitHub Pages. A repository with ten meaningful commits and a README that says
what it is and how to run it.

**Proof:** a public URL. You can explain what happens between typing a URL and
seeing the page, including which parts are the browser, the network, and the
server.

**Traps:** ten hours of Git videos instead of ten commits; installing thirty
editor extensions; starting with a framework because the tutorial used one.

**AI-era note:** ask a model to explain an error or a Git command. Do not ask it
to write the first page. You need one memory of doing it by hand, because that
memory is what you will debug against later.

## Phase 1 — Language (weeks 3–10)

**Goal:** read and write JavaScript without guessing, then use TypeScript to
make your mistakes visible before runtime.

**Learn:** values and types; functions and scope; closures; `this`; arrays and
objects; destructuring; modules; promises and `async`/`await`; the event loop;
the DOM and events; `fetch`; errors; JSON. TypeScript: annotations, unions,
narrowing, generics, utility types, `unknown`, strict mode, and when not to
annotate.

**Build:** a vanilla app with add, delete, filter, search, and `localStorage` —
no framework. Twenty small exercises. One typed utility module with tests.

**Proof:** explain closures, `this`, and the event loop without notes. Debug a
broken app from the console. Ship code with no `any` and no unexplained casts.

**Traps:** tutorial hell; copy-pasting code you cannot rewrite; reaching for
React before you can manipulate the DOM; avoiding arrays because `map` feels
clever.

**AI-era note:** use AI for code review — "what is wrong with this function?" —
not for the first draft of every function. Keep a bug log: the error, the cause,
the fix, and the rule you keep so it does not happen again. That log becomes
your notes.

## Phase 2 — UI and framework (weeks 11–18)

**Goal:** build a real interface with React and a small design system, not a
demo that only works on the happy path.

**Learn:** components and props; state; derived state; effects and when not to
use them; the rules of hooks; lists and keys; controlled forms; context;
memoization; composition; accessibility; responsive CSS; design tokens; loading,
error, and empty states.

**Build:** a multi-page React app — a dashboard or a catalog — with search,
filters, forms, routing, and a component gallery page. Deploy it.

**Proof:** a keyboard and screen-reader pass; no console errors; tests for five
components; a README with screenshots and a short design rationale.

**Traps:** storing derived state; using `useEffect` as an event handler;
abstracting a component before the second use; cargo-cult `useMemo`; a wall of
`div`s with no landmarks.

**AI-era note:** AI is good at scaffolding a component. It is not good at
deciding who owns the state. Review every effect dependency and every piece of
state that could be computed. Ask it to critique your component, not to replace
your judgment.

## Phase 3 — Backend and data (weeks 19–26)

**Goal:** own the whole request path, from the click to the row in the database.

**Learn:** Node; Express or Fastify; routing and middleware; validation; REST
and status codes; Postgres; SQL (joins, indexes, transactions); schema design;
Prisma; migrations; authentication with sessions or short-lived tokens;
password hashing; cookies; CORS; file upload; email; structured logging; error
handling.

**Build:** a full-stack app with auth and a real database. A user can sign up,
log in, create, edit, and delete their own records, and upload an image. Deploy
the API and the database.

**Proof:** a schema diagram; API documentation; an auth flow you can draw from
memory; integration tests; a seed script. A second user cannot read the first
user's data, and you can prove it with a test.

**Traps:** skipping SQL because an ORM hides it; trusting client-side
validation; secrets in the repository; no migrations; checking authentication
but not authorization.

**AI-era note:** AI can generate CRUD faster than you can type it. Your value is
the schema, the boundaries, and the failure modes. Ask the model to attack your
API, then write the test that proves the attack fails.

## Phase 4 — Craft (weeks 27–32)

**Goal:** make the app reliable enough that you would let a stranger use it.

**Learn:** the test pyramid; unit, integration, and end-to-end tests; Vitest and
Playwright; fixtures and mocks; CI/CD with GitHub Actions; code review;
linting and formatting; logs, metrics, and traces; Core Web Vitals; bundle
analysis; database indexes; OWASP basics; secrets management; XSS, CSRF, and
SSRF; caching; rate limiting.

**Build:** add tests, a CI gate, error tracking, a performance budget, and a
runbook to the Phase 3 app. Introduce one deliberate failure and practise the
rollback.

**Proof:** a red build blocks a bad change; an end-to-end test covers the main
journey; a load test has a number; a security checklist is signed off; a
postmortem explains one real failure.

**Traps:** coverage theatre; testing implementation details; no staging
environment; alert fatigue; treating security as a later ticket.

**AI-era note:** AI writes tests quickly. The skill is judging whether they test
behaviour or implementation. Mutation testing is a cheap way to expose tests
that assert nothing.

A minimum security checklist for every app:

- Validate on the server, always.
- Hash passwords with argon2 or bcrypt.
- Prefer `httpOnly`, `secure` cookies; keep tokens short-lived.
- Check authorization on every record, not just authentication.
- Keep secrets in environment variables, never in Git.
- Escape output; avoid `innerHTML` with user data.
- Rate-limit login and expensive endpoints.
- Log events without personal data.
- Patch dependencies on a schedule.

## Phase 5 — AI engineering (weeks 33–40)

**Goal:** add an AI feature that is useful, measurable, and safe enough to keep.

**Learn:** the LLM API (roles, tokens, temperature, streaming); prompting as a
specification; structured output with JSON Schema and Zod; embeddings; vector
search; chunking and metadata; retrieval-augmented generation; reranking;
citations and grounding; hallucination and refusal; evals; cost and latency;
caching; model selection; privacy; prompt injection; local models.

**Build:** RAG over your own notes. Ingest, chunk, embed, retrieve, rerank, and
answer with citations. Build a 30-question eval set, a cost and latency
dashboard, and a fallback for when retrieval finds nothing.

**Proof:** measured accuracy, latency, and cost per query; a failure log; a
privacy review; a demo that says "I don't know" when the sources do not support
an answer.

**Traps:** demo-driven development; no eval set; fine-tuning before retrieval;
leaking secrets or personal data into prompts; treating the model as a
database; shipping a chat box because a chat box is easy.

**AI-era note:** the hard parts are retrieval and evaluation, not the API call.
A RAG system is a search system with a language model at the end. Learn to
measure retrieval separately from generation.

An eval that is worth keeping:

| Field | Example |
| :--- | :--- |
| Question | "What did the React series say about stale closures?" |
| Expected answer | The handler captures the render's value; use a ref or a functional update |
| Required source | `posts/react/06` |
| Pass condition | Correct, grounded, cited, and concise |
| Refusal case | A question the notes do not answer — the system must say so |
| Budget | Under 2 seconds and under a fixed cost per query |

A change ships only if it does not regress the eval. That is the whole
discipline.

## Phase 6 — Agents (weeks 41–46)

**Goal:** build bounded automation, not autonomous chaos.

**Learn:** tool calling and schemas; MCP; planning loops; memory; sandboxing;
filesystem and network permissions; guardrails; human-in-the-loop; traces and
spans; agent evals; multi-agent tradeoffs; deployment as a cron job, a queue
worker, or a request; idempotency; retries; compensation.

**Build:** a maintainer agent for your repository. It reads issues and draft
notes, runs the build and check, proposes a pull request, and comments with a
summary. It cannot merge, deploy, or write to `main` without approval.

**Proof:** ten successful runs; zero unapproved writes; a full trace of every
tool call; a failure postmortem; a cost per run; a kill switch you have used.

**Traps:** giving an agent write access because it is convenient; no trace; no
stop condition; multi-agent architecture before a single agent works; using an
agent for a job a deterministic script would do better.

**AI-era note:** automation is not an agent. If the steps are known, write a
script. Use an agent only when the path has to be chosen. The publish bot on
this site is deterministic on purpose; the agent would sit above it, with
approval.

A bounded agent design:

- **Tools:** read repository, run tests, open a draft PR, comment. No merge, no
  deploy, no secrets.
- **Loop:** observe → plan → act → check → stop.
- **Guardrails:** allowlist, approval, token budget, timeout, kill switch.
- **Trace:** every tool call, input, output, token count, latency, and decision.
- **Eval:** task success, trajectory correctness, tool correctness, cost.

## Phase 7 — Product and users (weeks 47–56)

**Goal:** ship something someone else uses, and learn from the gap between what
you built and what they needed.

**Learn:** problem framing; user interviews; scope; analytics; SEO;
accessibility; billing with Stripe; email; onboarding; support; iteration;
pricing; distribution.

**Build:** a small product with ten real users. Instrument it. Iterate three
times. Write a case study with the problem, the constraints, the decisions, and
the outcome.

**Proof:** ten users, three iterations, usage data, a postmortem, and one
testimonial or support thread that changed the roadmap.

**Traps:** building in secret; no distribution; feature creep; vanity metrics;
confusing activity with progress; asking friends for opinions instead of
watching strangers use it.

**AI-era note:** AI lowers the cost of building, which raises the value of
choosing the right problem and talking to users. The bottleneck moves from
implementation to distribution and judgment.

## Phase 8 — Career (months 14–18)

**Goal:** get hired, get clients, or decide the product is the career.

**Learn:** portfolio narrative; case studies; open source; code review; system
design; interviews; negotiation; one area of depth.

**Build:** three case studies — problem, constraints, decisions, outcome. Five
open-source pull requests. Mock interviews. A one-page résumé that links to
running work.

**Proof:** interviews, referrals, paid work, or a launched product with users.
A senior engineer can look at your work and say what you would be trusted with.

**Traps:** a portfolio of clones; no narrative; lying about AI usage; only
applying online; optimizing for the interview instead of the work.

**AI-era note:** companies will ask how you use AI and how you verify it. Have a
concrete answer and a failure story. "I let it write everything" is a red flag;
"I use it for the first draft, then review the diff, add tests, and measure the
result" is a skill.

## The project ladder

The projects are the curriculum. The notes are the by-product. Each project
should be deployed and linked from your portfolio.

| # | Project | Phase | Scope | Acceptance |
| :-- | :--- | :--- | :--- | :--- |
| 1 | Static page | 0 | Semantic HTML, one CSS file, deployed | Public URL, Lighthouse 95+, no console errors |
| 2 | Vanilla app | 1 | State, events, DOM, `localStorage` | Add, delete, filter, search, persist; no framework |
| 3 | React app | 2 | Components, forms, routing, a11y | Keyboard pass, tests for five components, deployed |
| 4 | Full-stack app | 3 | Auth, Postgres, CRUD, upload | Two users cannot read each other's data; integration tests |
| 5 | Hardened app | 4 | CI, E2E, observability, perf, security | Red build blocks a bad change; runbook; postmortem |
| 6 | RAG feature | 5 | Embeddings, retrieval, citations, evals | 30-question eval; cost and latency numbers; refusal works |
| 7 | Maintainer agent | 6 | Tools, approval, trace, budget | 10 runs, 0 unapproved writes, kill switch used |
| 8 | Product | 7 | 10 users, 3 iterations | Usage data, postmortem, case study |

Do not skip a project because the next one looks more interesting. The ladder is
the point: each rung is the evidence for the next.

## The weekly operating system

Ten to fifteen hours a week, split roughly like this:

| Block | Hours | What happens |
| :--- | :--- | :--- |
| Learn | 4–5 | One concept, one chapter, one exercise |
| Build | 5–6 | The current project, one shippable slice |
| Write | 2 | The log entry and the note |
| Review | 1 | The week, the diff, the next single outcome |

A sample day is 90 minutes: one concept, one commit, one log line. A sample week
ends with something deployed, even if it is small.

The note loop is the same as this site's:

1. Do the work.
2. Write the raw log: what broke, what you tried, the gotcha.
3. Promote it into a note with a claim, code, the old way, the new way, when to
   use which, a practice exercise, and sources.
4. Ship it. The note is proof you understood it; the log is proof it happened.

Every month, publish one artifact and update the portfolio. Every quarter, run a
gate and delete one thing: a dependency, a note that no longer teaches, a habit
that is not working.

## How to learn, not just what

Five techniques do most of the work:

1. **Build first, read second.** Read enough to start, then let the bug teach you
   the rest.
2. **Explain it in a note.** If you cannot write the rule in your own words, you
   do not own it yet.
3. **Space the review.** Revisit a topic after a day, a week, and a month. The
   note is the artefact; the review is the retention.
4. **Interleave.** Mix a language exercise, a UI bug, and a database query in
   the same week. Real work is interleaved.
5. **Keep a bug log.** Error, cause, fix, rule. This is the highest-value file
   you will keep.

Deliberate practice means working at the edge of your ability, with feedback, on
a task that resembles the real thing. Watching a tutorial is not practice.
Rebuilding a feature from memory is.

## What it costs

Learning to code is cheaper than it has ever been, but not free. A realistic
budget:

| Item | Cheap option | Monthly |
| :--- | :--- | :--- |
| Hosting | GitHub Pages, Vercel, or Netlify free tier | $0 |
| Database | Neon, Supabase, or SQLite | $0 |
| Auth | roll your own or a free tier | $0–25 |
| AI API | pay-as-you-go, with a hard cap | $5–20 |
| Domain | optional | ~$1 |
| **Total** | | **$0–45** |

Set a hard cap on the AI API before you ship anything. A cost overrun is a
design bug, not a surprise.

## The AI-era split

AI is a junior pair with infinite patience and no accountability. Treat it that
way.

| Delegate to AI | Keep for yourself | Verify every time |
| :--- | :--- | :--- |
| Boilerplate and scaffolding | Problem framing and scope | The diff, line by line |
| First drafts and refactors | Data model and state ownership | Behaviour, not just compilation |
| Test generation | Auth and security boundaries | Tests actually assert something |
| Error explanations | Tradeoffs and naming | Citations and sources |
| Documentation summaries | UX and accessibility | Performance and cost |
| Translation between languages | Final review and merge | Privacy and secrets |

Six rules that keep the split honest:

1. Never merge code you cannot explain.
2. Never ship an AI feature without an eval.
3. Keep a model-free path for critical flows.
4. Log prompts, model versions, and costs for anything user-facing.
5. Treat model output as untrusted input.
6. If a deterministic script can do it, use the script.

## Assessment gates

A phase is done when you can pass its gate without notes. The AI-assisted
version is the second half of each gate: use the model, then explain every line
and every tradeoff.

| Gate | Task | Pass condition |
| :--- | :--- | :--- |
| 1 | Build a todo app from scratch, no framework | Works, persists, and you can explain every function |
| 2 | Explain why a React component re-renders | Fix a stale closure and a derived-state bug |
| 3 | Design a multi-user schema | Auth, authorization, migrations, and a test that proves isolation |
| 4 | Make a failing test pass | Add CI, find a security bug, read a flame graph |
| 5 | Build a RAG feature | Measure retrieval and generation; show a refusal |
| 6 | Build a tool-using agent | Approval gate, trace, budget, kill switch |
| 7 | Ship to ten users | Three iterations and a postmortem |
| 8 | Present three case studies | A stranger can explain what you would be trusted with |

If you cannot pass a gate, the next phase will not fix it. Go back.

## The skills matrix

Use this to locate yourself honestly. The titles are less important than the
evidence.

| Skill | Junior | Mid | Senior |
| :--- | :--- | :--- | :--- |
| Code | Ships small features | Owns a feature end to end | Sets boundaries and reviews |
| Debug | Uses logs and breakpoints | Isolates the cause | Prevents the class of bug |
| Data | Writes queries | Designs schemas and migrations | Owns scale and integrity |
| AI | Uses an assistant | Builds RAG with evals | Sets policy, cost, and guardrails |
| Ops | Deploys with a checklist | Owns CI and observability | Runs incidents and rollbacks |
| Product | Takes tickets | Scopes with users | Chooses the problem |
| Communication | Writes a clear update | Writes a design doc | Makes the tradeoff legible |

## What to ignore

- The framework of the month. Learn one well; read the others' docs.
- Tutorial marathons. One project beats ten courses.
- LeetCode as a complete career plan. Some practice is useful; shipping is
  better.
- A portfolio of clones with no narrative.
- Certificates that do not link to running work.
- Microservices, Kubernetes, and GraphQL before a monolith and REST are boring.
- "AI will do it" without verification.
- Building in secret for six months.
- Perfectionism. A deployed 80% is a teacher; a perfect local branch is not.
- Comparing your month three to someone else's year five.

## Twelve rules

1. Ship something every week.
2. Type the first version by hand.
3. Learn the primitive before the framework that hides it.
4. One project per phase, not ten tutorials.
5. Tests are how you know, not how you feel.
6. Read the error, reproduce the bug, fix the cause.
7. AI is a junior pair, not an oracle.
8. Keep a bug log and a decision log.
9. Write in public; the note is the proof.
10. Measure before optimizing.
11. Security and accessibility are features, not chores.
12. Talk to users before adding features.

## How this maps to this site

The site is the long-form version of the same path:

- [The learning path](/sanjay/path/) — every note in order, with what is next.
- [TypeScript](/sanjay/posts/typescript/) — the type layer, learned from bugs.
- [React](/sanjay/posts/react/) — the UI layer, learned from mistakes.
- [The Redux plan](/sanjay/plans/redux/) — the state layer, legacy first.
- [The log](/sanjay/log/) — the raw evidence behind the notes.
- [Topics](/sanjay/topics/) — the same subjects across series.

The site's order is a spiral: use the abstraction, then open it. TypeScript and
React come before the JavaScript series because that is the order the bugs
arrived in. This plan makes the foundations explicit for someone starting from
zero. Use the series as the deep dives and this page as the map.

The dedicated series that complete the map. Each one has a slot in
`src/data/series.ts`; a series page appears only when its first note is
published, so the site never claims notes that do not exist.

| Series | Notes | What it adds |
| :--- | :--- | :--- |
| UI and design systems | ~8 | Tokens, component APIs, states, accessibility |
| Backend and data | ~16 | Node, HTTP, Postgres, auth, queues |
| Craft and architecture | ~12 | Testing, security, performance, migration |
| Tools and delivery | ~8 | Git, CI, deploy, observability |
| Packages and supply chain | ~6 | npm, semver, lockfiles, publishing |
| AI engineering | ~16 | LLMs, RAG, evals, cost, privacy |
| Agents and automation | ~16 | Tools, MCP, guardrails, traces, approval |
| Use cases and products | ~6 | Problem framing, users, analytics, billing |
| Bugs I fixed | ongoing | Symptom, cause, fix, rule |

## The first 30 days

A concrete start, before the calendar matters:

**Week 1.** Install the tools. Learn the terminal and five Git commands. Deploy
a static page to GitHub Pages. Write a README.

**Week 2.** JavaScript values, functions, and arrays. Ten small exercises. A
tiny DOM app that changes text on a click.

**Week 3.** Objects, closures, and events. Build the vanilla todo app with add,
delete, and filter. Write your first bug log.

**Week 4.** `fetch`, promises, and error handling. Consume a public API. Add
loading, error, and empty states. Deploy again.

At the end of 30 days you should have: one public URL, one repository with real
commits, one small app, ten log entries, and a clear answer to "what broke this
week?"

## Sources worth using

Use the official docs first; they are better than most courses.

- [MDN Web Docs](https://developer.mozilla.org/) — HTML, CSS, JavaScript, HTTP.
- [JavaScript.info](https://javascript.info/) — the language, in order.
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/) — the
  type system.
- [React docs](https://react.dev/learn) — the mental model, not just the API.
- [Node.js docs](https://nodejs.org/en/docs) and the
  [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html).
- [web.dev](https://web.dev/) — Core Web Vitals and accessibility.
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — the security
  baseline.
- [Vitest](https://vitest.dev/) and [Playwright](https://playwright.dev/) — the
  test tools.
- [Model Context Protocol](https://modelcontextprotocol.io/) — the agent
  integration standard.
- [The Pragmatic Programmer](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/)
  — judgment, not syntax.
- [Designing Data-Intensive Applications](https://dataintensive.net/) — read it
  after your first full-stack app, not before.

A course is useful when it comes with a project you would not otherwise build. A
video without a build is entertainment.

## The honest caveats

- Eighteen months assumes 10–15 hours a week and some comfort with a computer.
  If you have less time, the path still works; it takes longer.
- No plan guarantees a job. The market is local, timing-dependent, and sometimes
  unfair. The plan improves your odds by making your competence visible.
- AI raises the floor for what can be generated and the ceiling for what can be
  judged. Juniors need proof of judgment earlier than before.
- The best signal is a deployed product with users, not a certificate or a
  perfect GitHub streak.
- You will forget things. The log, the notes, and the projects are the memory.
- Compare yourself to last month, not to someone else's highlight reel.

The path is not a straight line. It is a ladder of evidence. Climb one rung at a
time, and make each rung visible.
