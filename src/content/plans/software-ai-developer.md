---
title: "The software AI developer — full-stack, first principles, production"
description: "A 16–18 month, project-gated path to owning AI-native software end to end: core programming, frontend, backend, databases, DevOps, security, LLM engineering, RAG, agents, evals, and operations."
date: "2026-10-22"
---

AI can write the first draft. It cannot own the system.

This plan is for the developer who wants to own it: the whole application, the
data, the deploy, the security, the model, the evals, the bill, and the page at
2am. Not "the person who prompts." The person who can take a vague problem,
shape it into a product, build the frontend and backend, design the schema,
secure the permissions, add the AI feature, measure whether it works, and keep
it alive after launch.

That is what "software AI developer" means here: a full-stack developer with a
new dependency and a new failure surface. The model is a component. It is not
the architecture.

This is the **applied depth track**. It sits beside two other routes:

| Track | Question | Best for |
| :--- | :--- | :--- |
| [The traditional core](/sanjay/plans/traditional-software-developer/) | How does computation actually work? | Fundamentals, systems, confidence |
| [The real path to becoming a software developer](/sanjay/plans/software-developer/) | How do I go from zero to shipped features? | Beginners and career changers |
| **The software AI developer** (this page) | Can I own an AI-native product end to end? | Working developers going deep |

The broad route teaches you to build. The traditional core teaches you why the
machine behaves the way it does. This plan teaches you to operate the whole
stack when one of the components is probabilistic.

## The premise: the model is not the product

The first generation of AI products was a prompt in a text box. The next
generation is software: accounts, permissions, data, retrieval, latency budgets,
evals, guardrails, billing, and a rollback plan.

Three things are scarce, and none of them is the API call:

1. **Framing.** Turning "add AI" into a specific job with a measurable success
   criterion, a failure mode, and a reason a model is the right tool.
2. **Verification.** Proving that a probabilistic feature is good enough, safe
   enough, and cheap enough on the inputs that matter.
3. **Ownership.** Knowing why the system is shaped this way, what happens when
   the model changes, and how to degrade gracefully when the provider is down.

A demo can ignore all three. A product cannot.

## What a software AI developer owns

| Layer | What you own | Evidence |
| :--- | :--- | :--- |
| **Core** | Language, data, debugging, complexity | A from-scratch tool, not a tutorial |
| **Frontend** | UI, accessibility, performance, SEO | A production UI with real states |
| **Backend** | APIs, auth, jobs, reliability | A service with tests and SLOs |
| **Data** | Schema, queries, migrations, privacy | A tuned schema and a restore drill |
| **DevOps** | Deploy, observe, roll back | A runbook and an incident you handled |
| **Security** | Threat model, secrets, supply chain | A security review with findings |
| **AI** | Prompts, retrieval, evals, cost, latency | An eval suite and a cost budget |
| **Agents** | Tools, permissions, traces, approvals | A bounded agent with a kill switch |
| **Product** | Users, analytics, billing, support | Ten users and three iterations |

The layers are not a checklist to finish once. They are a stack you revisit. A
RAG feature is a data problem before it is a model problem. An agent is a
permissions problem before it is a planning problem. A chat UI is an
accessibility and latency problem before it is a prompt problem.

## What this plan assumes

- You can already write code in at least one language. If not, start with the
  broad route and return here.
- You have 10–15 hours a week for 16–18 months. If you have 5, stretch the
  calendar; do not skip the gates.
- You will build in public: a repository, a deploy, a note, a demo. Evidence is
  part of the curriculum.
- You are willing to learn the layer below the abstraction. "It works" is not
  the same as "I can explain why it works."

## The shape of the path

The path has five layers. Each one makes the next one legible.

| Layer | Question | Contents | Proof |
| :--- | :--- | :--- | :--- |
| **Foundations** | Can you build without a framework? | Language, HTTP, data, testing, debugging | A CLI and an HTTP server |
| **Product** | Can you build something usable? | Frontend, backend, database, auth | A full-stack app |
| **Operations** | Can you keep it alive? | DevOps, observability, security, incidents | A deploy, a runbook, a postmortem |
| **Intelligence** | Can you add AI without losing trust? | LLMs, RAG, evals, guardrails, cost | An eval suite and a production feature |
| **Ownership** | Can you run the whole thing? | Architecture, product, capstone | Real users and a case study |

AI sits on top of the first three layers. It does not replace them. If the
database is slow, the AI feature is slow. If the auth is broken, the AI feature
is a data breach. If the deploy is manual, the model update is a gamble.

## The 18-month map

The weeks assume 10–15 hours a week. The calendar is a planning aid; the gates
are the contract. Compress the calendar only if you can still pass the gates
without notes.

| Phase | Weeks | Focus | Gate |
| :--- | :--- | :--- | :--- |
| 0 | 1–2 | Orientation and baseline | A deployed app and a study log |
| 1 | 3–6 | Core programming from first principles | A router and JSON parser from scratch |
| 2 | 7–12 | Frontend engineering | An accessible, fast, tested UI |
| 3 | 13–18 | Backend engineering | An API with auth, jobs, and limits |
| 4 | 19–24 | Databases and data | A tuned schema and a restore drill |
| 5 | 25–30 | DevOps and production | A pipeline, dashboards, and a rollback |
| 6 | 31–34 | Security and privacy | A threat model and real fixes |
| 7 | 35–42 | AI engineering foundations | A RAG app with an eval suite |
| 8 | 43–50 | RAG and AI product engineering | A production AI feature |
| 9 | 51–56 | Agents and automation | A bounded agent with approvals |
| 10 | 57–60 | Architecture and system design | A design doc and a failure matrix |
| 11 | 61–62 | Product, users, and market | Ten users and three iterations |
| 12 | 63–68 | Capstone | An operated AI-native product |

The last stretch is buffer, capstone, and career work. If a phase takes longer,
take longer. A phase is done when you can pass the gate without notes.

## How to study

The method is build-first, evidence-heavy, and deliberately repetitive:

1. **Read the docs, not ten tutorials.** One source per layer, plus the
   official documentation.
2. **Build the smallest real thing.** Not a todo clone with no auth. A feature
   with a user, a failure mode, and a test.
3. **Measure.** Latency, cost, error rate, accessibility score, query time,
   eval score. A claim without a number is a guess.
4. **Write it down.** One note a week: the decision, the bug, the tradeoff, the
   measurement.
5. **Review and re-run.** Revisit one old layer every month. Rebuild one small
   thing from scratch every quarter.
6. **Teach it back.** Explain the system to a non-engineer. If the explanation
   needs jargon, the understanding is thin.

### The weekly rhythm

- **50% building.** Code, tests, deploys, measurements.
- **20% reading.** Documentation, one chapter, one design doc.
- **15% testing and evals.** Unit tests, integration tests, eval sets, load
  tests.
- **10% writing.** A note, a diagram, an ADR.
- **5% review.** Read your own diff, re-read an old note, update the runbook.

One note a week. One demo per phase. One retrospective per month. One
from-scratch exercise per quarter.

## Phase 0 — Orientation

**Weeks 1–2.**

Set up the environment and the habit before the material gets hard:

- TypeScript and Node, or Python if you prefer. Pick one for the core work.
- A browser with dev tools, a terminal, Git, and an editor you know.
- Docker, Postgres, and Redis. You will use all three.
- A deployment target: a small VPS, a platform, or a container host.
- An observability account: logs, metrics, traces, error tracking.
- A repository with a README, a study log, and a project board.

Build a baseline: a small full-stack app with a database, one authenticated
route, one form, one test, and a deploy. It does not need AI yet. The point is to
measure what you can already do and what you have been avoiding.

**Gate:** a deployed app with a README, a database, a test, and a study log. You
can explain every file in the repository.

## Phase 1 — Core programming from first principles

**Weeks 3–6.**

You are not here to learn syntax. You are here to learn what the runtime is
doing when the syntax succeeds.

- Values, types, scope, lifetime, and mutation.
- Functions, closures, recursion, and the call stack.
- The event loop, promises, async/await, and concurrency without threads.
- Errors: values, exceptions, rejected promises, and process exit codes.
- Data structures you use every day: arrays, maps, sets, queues, trees.
- Complexity: the cost of a loop, a lookup, a copy, and a serialization.
- HTTP: methods, headers, status codes, cookies, caching, and CORS.
- JSON, validation, and the boundary between untrusted input and your types.
- Testing: unit, integration, and the difference between a mock and a lie.
- Debugging: stack traces, breakpoints, logging, and reproducing a bug.
- Git: small commits, branches, and a readable history.

**Build:** a CLI tool and an HTTP server without a framework. The server should
route requests, parse JSON, validate input, return useful errors, and have tests.
Add a rate limiter and a request logger. Then rebuild the router as a small
library and document the API.

**Gate:** implement a router, a JSON parser, and a rate limiter from scratch.
Explain the event loop with a concrete example. Debug a failing async test
without adding a sleep. Explain why a `Map` is not an object.

## Phase 2 — Frontend engineering

**Weeks 7–12.**

The frontend is where the user decides whether the product is trustworthy. It is
also where AI-generated code most often looks finished and is not.

- Semantic HTML, landmarks, headings, and document structure.
- CSS: the box model, flexbox, grid, responsive design, and container queries.
- Accessibility: keyboard navigation, focus management, labels, contrast,
  screen readers, and reduced motion.
- TypeScript at the boundary: props, events, API responses, and error states.
- React: components, state, effects, context, reducers, and composition.
- Data fetching: loading, error, empty, stale, and optimistic states.
- Forms: validation, errors, disabled states, and submission feedback.
- Routing, code splitting, and the cost of client-side JavaScript.
- Performance: Core Web Vitals, images, fonts, bundle size, and hydration.
- SEO: titles, descriptions, canonicals, structured data, sitemaps, and
  server-rendered content.
- Design systems: tokens, primitives, variants, and documentation.
- Testing: component tests, accessibility checks, and end-to-end flows.

**Build:** a multi-page app with authentication, a dashboard, a form with
validation, a list with pagination, and an AI chat surface that handles
streaming, errors, and empty states. Add keyboard-only navigation, a Lighthouse
budget, and Playwright tests for the critical flows.

**Gate:** a keyboard-only user can complete the main flow. Lighthouse is 95+ on
performance, accessibility, best practices, and SEO for the core pages. There is
no layout shift on load. A component in the design system has a documented API
and tests. You can explain every network request the page makes.

## Phase 3 — Backend engineering

**Weeks 13–18.**

The backend is where trust is enforced. The frontend can hide a problem; the
backend cannot.

- HTTP and REST: resources, methods, status codes, idempotency, and pagination.
- API design: versioning, error shapes, validation, and OpenAPI.
- Authentication: passwords, sessions, cookies, JWTs, OAuth, and magic links.
- Authorization: roles, permissions, ownership checks, and tenant isolation.
- Input validation and output encoding at every boundary.
- Background jobs: queues, workers, retries, backoff, and dead-letter queues.
- Scheduled jobs, cron, and time zones.
- Caching: HTTP caching, application caching, Redis, and invalidation.
- Rate limiting, quotas, and abuse prevention.
- File uploads, object storage, signed URLs, and image processing.
- Email, notifications, and deliverability.
- Logging, correlation IDs, structured errors, and graceful shutdown.
- API tests, contract tests, and load tests.

**Build:** an API with email/password auth, session cookies, roles, a protected
resource, a background job, a rate limit, file upload, and OpenAPI docs. Add
integration tests against a real database. Kill a worker mid-job and prove the
job is retried safely.

**Gate:** threat-model the auth flow. Explain why a JWT in local storage is a
different risk from an HttpOnly cookie. Prove an endpoint is idempotent. Load
test the API and report p50/p95/p99. Show a graceful shutdown with in-flight
requests.

## Phase 4 — Databases and data

**Weeks 19–24.**

Most AI products are data products with a model attached. The retrieval quality,
the permissions, and the bill all start here.

- The relational model: keys, constraints, relationships, and normalization.
- SQL: joins, aggregates, subqueries, CTEs, window functions, and transactions.
- Schema design for real features: users, teams, roles, resources, events,
  billing, audit logs, and soft deletes.
- Indexes: B-trees, composite indexes, covering indexes, partial indexes, and
  selectivity.
- Query plans: `EXPLAIN`, statistics, join strategies, and the cost of a scan.
- Transactions: ACID, isolation levels, anomalies, MVCC, and locking.
- Migrations: forward, backward, zero-downtime, and data backfills.
- Backups: full, incremental, point-in-time recovery, and restore drills.
- Replication, read replicas, lag, failover, and split brain.
- Partitioning, sharding, and when a single Postgres is still the right answer.
- Caching: Redis, TTLs, invalidation, and cache stamps.
- Object storage: buckets, signed URLs, lifecycle rules, and metadata.
- Vector data: embeddings, dimensions, distance metrics, indexes, and the
  difference between a vector store and a search engine.
- Privacy: data minimization, retention, deletion, and tenant isolation.

**Build:** the schema for your capstone with constraints and indexes. A migration
with a rollback plan and a backfill. A slow query tuned with before-and-after
numbers. A backup and restore drill. A vector search table or index for a small
corpus, with a retrieval evaluation.

**Gate:** design a schema from requirements and defend the tradeoffs. Read a query
plan and explain why an index is or is not used. Explain an isolation anomaly and
how your code prevents it. Restore from backup. Delete a tenant's data and prove
it is gone from every store.

## Phase 5 — DevOps and production

**Weeks 25–30.**

Shipping is a skill. Operating is a different skill. This phase is the second
one.

- Linux: processes, files, permissions, ports, and signals.
- Docker: images, layers, volumes, networks, and multi-stage builds.
- CI/CD: build, test, artifact, deploy, and rollback.
- Infrastructure as code: the smallest useful setup, not a Kubernetes cluster
  you cannot debug.
- Cloud primitives: compute, object storage, managed Postgres, DNS, TLS, and
  secrets.
- Reverse proxies, load balancers, health checks, and zero-downtime deploys.
- Environments: development, preview, staging, production, and seed data.
- Configuration and secrets: environment variables, secret managers, and
  rotation.
- Observability: structured logs, metrics, traces, dashboards, and alerting.
- SLOs and SLIs: availability, latency, error rate, and saturation.
- Incident response: severity, roles, communication, mitigation, and
  postmortem.
- Scaling: vertical, horizontal, caching, queues, and the database bottleneck.
- Feature flags, canaries, and rollbacks.
- Cost: the bill is a production metric.

**Build:** a pipeline from commit to deploy with tests and a rollback. Dashboards
for latency, errors, saturation, and cost. Alerts that page only when a user is
affected. A runbook for the top three failures. A game day where you kill a
dependency and recover.

**Gate:** deploy a change and roll it back. Respond to an injected failure and
write a postmortem. Show an SLO and the error budget. Explain the first three
things you would check at 2am.

## Phase 6 — Security and privacy

**Weeks 31–34.**

Security is not a phase you add at the end. It is a property of the design. AI
adds new ways to leak data and new ways to be manipulated.

- Threat modeling: assets, trust boundaries, actors, and mitigations.
- Authentication and authorization: sessions, tokens, OAuth, RBAC, ABAC, and
  tenant isolation.
- OWASP: injection, broken access control, XSS, CSRF, SSRF, deserialization, and
  dependency risk.
- Secrets: storage, rotation, scanning, and the leaked-key drill.
- Cryptography basics: hashing, salting, symmetric and asymmetric encryption,
  signatures, and TLS.
- Supply chain: lockfiles, audits, provenance, and reproducible builds.
- Privacy: data minimization, retention, deletion, consent, and vendor terms.
- AI-specific risks: prompt injection, indirect prompt injection, tool abuse,
  data exfiltration, insecure output handling, model denial of service, and
  overreliance.
- Secure SDLC: review, automated checks, and a release gate.

**Build:** a threat model for the capstone. A security checklist for auth,
uploads, and AI tools. A dependency audit. A secrets scan. A self-penetration
test of the top three flows. A privacy review of what you send to the model
provider.

**Gate:** find and fix three real issues. Explain the difference between
authentication and authorization with an example from your app. Handle a leaked
secret. Show that a tenant cannot read another tenant's data. Explain prompt
injection and why "the model will follow the system prompt" is not a security
control.

## Phase 7 — AI engineering foundations

**Weeks 35–42.**

This is where the model becomes a component you can measure. The goal is not to
collect APIs. The goal is to build one feature and know whether it works.

- How LLMs work at the level you need: tokens, context windows, sampling,
  temperature, logprobs, and the difference between a completion and a chat
  model.
- Prompting as specification: role, task, constraints, examples, output schema,
  and failure instructions.
- Structured output: JSON schemas, validation, retries, and the cost of a
  malformed response.
- Tool/function calling: schemas, arguments, errors, and the boundary between
  the model and your code.
- Embeddings: what they represent, dimensions, distance metrics, and the limits
  of semantic similarity.
- Retrieval: ingestion, chunking, metadata, hybrid search, reranking, and
  citations.
- RAG: the full pipeline from document to answer, including freshness,
  permissions, and evaluation.
- Evaluation: golden sets, regression tests, rubric grading, LLM-as-judge and
  its biases, human review, and online metrics.
- Cost and latency: token budgets, caching, batching, streaming, model routing,
  and fallbacks.
- Model selection: capability, context, latency, cost, privacy, and vendor
  lock-in.
- Fine-tuning and distillation: when they help, when they are a distraction, and
  what data you need.
- Local models: privacy, hardware, and the quality tradeoff.
- Safety: content policy, refusal behavior, PII, and output handling.

**Build:** a RAG application over your own notes or a public corpus. Ingest the
documents, chunk them, embed them, retrieve, rerank, and generate an answer with
citations. Build an eval set of at least fifty questions, including
unanswerable ones. Measure retrieval recall, answer correctness, citation
accuracy, hallucination rate, p50/p95 latency, and cost per request. Improve one
metric with evidence.

**Gate:** explain the RAG pipeline without naming a vendor. Show an eval suite
that catches a regression. Explain when RAG is the wrong approach. Show a cost
and latency budget. Red-team the retrieval with a document that contains
instructions and prove your system does not obey it.

## Phase 8 — RAG and AI product engineering

**Weeks 43–50.**

A demo answers a question. A product handles uncertainty, abuse, permissions,
cost, and change.

- Use-case selection: where a model adds value and where a deterministic rule is
  better.
- UX for AI: uncertainty, citations, streaming, cancel, retry, feedback, and
  graceful degradation.
- Conversation design: context, memory, clarification, and the limits of a chat
  interface.
- Guardrails: input filtering, output validation, allowlists, and safe fallbacks.
- Human-in-the-loop: review queues, approvals, and escalation.
- Content moderation and abuse handling.
- Privacy: redaction, retention, tenant isolation, and provider terms.
- Billing and metering: tokens, seats, usage caps, and cost alerts.
- Experimentation: offline evals, online A/B tests, and the difference between
  a better model and a better product.
- Prompt and model versioning: a registry, a changelog, and a rollback.
- Observability: traces with redacted prompts/responses, eval dashboards,
  feedback loops, and drift.
- Incident response for AI: a bad model update, a prompt injection, a provider
  outage, and a cost spike.
- AI product metrics: task success, time to answer, acceptance rate, escalation
  rate, retention, and cost per successful task.

**Build:** a production AI feature on top of the app: a support assistant, a
document Q&A, or a writing copilot. It must have citations, feedback, an eval
suite, a guardrail, a cost limit, a model/prompt version, a fallback, and a
rollback plan. Add a red-team exercise and a failure taxonomy.

**Gate:** a user can tell when the answer is uncertain. A bad answer is
traceable to a retrieval, prompt, or model cause. An eval catches a regression.
A cost spike triggers an alert. A provider outage degrades to a useful non-AI
state. You can explain why the feature should exist at all.

## Phase 9 — Agents and automation

**Weeks 51–56.**

An agent is a loop with tools, a budget, and a stop condition. Most agents should
be deterministic workflows. The skill is knowing the difference.

- The agent loop: observe, plan, act, observe, stop.
- Tool design: schemas, idempotency, errors, and least privilege.
- MCP and tool protocols: discovery, permissions, and transport.
- Planning: decomposition, replanning, and the limits of long-horizon tasks.
- Memory: short-term context, long-term stores, and retrieval.
- Sandboxing: filesystem, network, process, and resource limits.
- Approvals: human-in-the-loop for risky actions.
- Traces: every tool call, argument, result, cost, and latency.
- Agent evals: task success, step count, cost, safety, and recovery.
- Failure modes: loops, drift, tool abuse, prompt injection, and silent failure.
- Multi-agent systems: when they help and when they add coordination cost.
- Deployment: queues, workers, timeouts, kill switches, and budget caps.

**Build:** an agent for this repository that reads the code, runs checks, and
proposes a patch — but cannot merge, push, or spend money without approval. Add
a trace viewer, a budget, a kill switch, an eval set of ten tasks, and a
deterministic fallback for the common cases.

**Gate:** prove the agent cannot exceed its permissions. Replay a trace and
explain every step. Measure task success, cost, and latency. Show a loop that
was stopped by the budget. Explain why a deterministic script is better for one
of your tasks.

## Phase 10 — Architecture and system design

**Weeks 57–60.**

Architecture is the set of decisions that are expensive to reverse. Learn to
make them explicitly.

- Modular monolith versus microservices: the default is a monolith until proven
  otherwise.
- Boundaries: domain, data ownership, and deployment.
- Event-driven design: events, commands, queues, and idempotency.
- CQRS and read models: when they simplify, when they complicate.
- Consistency: strong, eventual, and the user experience of each.
- Multi-tenancy: shared schema, separate schemas, separate databases, and the
  isolation tradeoff.
- Scaling: stateless services, sticky sessions, caching, read replicas, and the
  database bottleneck.
- Resilience: timeouts, retries, circuit breakers, bulkheads, and backpressure.
- Design docs and ADRs: context, decision, alternatives, consequences.
- Failure matrices: dependency, failure mode, detection, mitigation, recovery.
- Cost and operability as architecture concerns.

**Build:** a design doc for the capstone. An ADR set for the five decisions that
matter. A failure matrix for every external dependency. A load test that finds
the first bottleneck. A migration plan from the current design to the next one.

**Gate:** defend the architecture to a skeptical reviewer. Name the top three
failure modes and the mitigation for each. Estimate cost at 10x and 100x load.
Explain what you would not build and why.

## Phase 11 — Product, users, and market

**Weeks 61–62.**

A product is not a repository. It is a loop: problem, user, solution, feedback,
iteration.

- Problem framing: who has the problem, how often, and what they do today.
- User interviews: open questions, observed behavior, and the difference between
  a compliment and a commitment.
- Scope: the smallest version that tests the riskiest assumption.
- Analytics: events, funnels, retention, and the one metric that matters.
- SEO and distribution: intent, content, and technical foundations.
- Onboarding: the first five minutes, empty states, and time to value.
- Billing: pricing, trials, metering, invoices, and failed payments.
- Support: docs, macros, escalation, and feedback capture.
- Iteration: ship, measure, learn, and decide whether to continue.
- Launch: a checklist, a rollback plan, and a communication plan.

**Build:** put the capstone in front of ten real users. Run three iterations.
Keep a feedback log and a decision log. Add analytics, a pricing page, and a
support runbook. Measure one product metric before and after.

**Gate:** a user changed your roadmap. A metric moved in a direction you can
explain. A support request was handled with a documented process. You can say
what you would do with ten more users and what you would stop doing.

## Phase 12 — Capstone

**Weeks 63–68.**

Build and operate one AI-native product end to end. Not a tutorial. Not a demo
with no users. A small product with real constraints.

The product should include:

- Authentication, authorization, and tenant isolation.
- A database with migrations, indexes, and a backup/restore drill.
- A frontend with accessible, fast, tested core flows.
- A backend with validation, rate limits, jobs, and useful errors.
- An AI feature with retrieval, citations, evals, guardrails, and a cost budget.
- Observability: logs, metrics, traces, error tracking, and an eval dashboard.
- Security: a threat model, a secrets scan, and a dependency audit.
- DevOps: CI/CD, a rollback, a runbook, and an incident game day.
- Billing or metering, even if it is a test-mode integration.
- Documentation: README, architecture, ADRs, and a user guide.
- A postmortem: what broke, what you changed, and what you would do differently.
- A public case study: the problem, the design, the numbers, and the lessons.

**Gate:** a stranger can use it from the README. You can operate it without
guessing. You have numbers for quality, latency, cost, and reliability. You can
explain every layer and every dependency. The code is yours.

## The full-app checklist

Use this before calling any app "done." It is also a useful interview and
freelance checklist.

| Area | Minimum |
| :--- | :--- |
| Auth | Sign up, sign in, sign out, password reset, session expiry |
| Authorization | Roles, ownership checks, tenant isolation, admin access |
| Data | Schema, constraints, indexes, migrations, backup and restore |
| API | Validation, error shape, pagination, rate limits, idempotency |
| Frontend | Loading, error, empty, success states; keyboard access; responsive |
| Performance | Budgets for LCP, INP, CLS, bundle size, and API p95 |
| SEO | Title, description, canonical, sitemap, structured data, static content |
| Accessibility | Labels, focus, contrast, semantics, reduced motion |
| Security | Secrets, OWASP review, dependency audit, threat model |
| Observability | Logs, metrics, traces, error tracking, alerting |
| Reliability | Timeouts, retries, fallbacks, graceful shutdown, rollback |
| AI | Evals, citations, guardrails, cost cap, prompt/model version, fallback |
| Privacy | Data map, retention, deletion, provider terms, redaction |
| Ops | Runbook, on-call, incident process, postmortem |
| Product | Analytics, onboarding, support, pricing, feedback loop |
| Docs | README, architecture, ADRs, user guide, changelog |

## The AI policy

Use AI aggressively, but keep the judgment.

- **Use it for the first draft, tests, refactors, and alternatives.** It is a
  fast junior with infinite patience and no context.
- **Do not let it own the architecture, auth, payments, permissions, migrations,
  or security-critical code.** Those are the places where a plausible answer is
  expensive.
- **Read every generated line.** Retype it if you have to. Run it. Test it.
  Explain it. If you cannot explain it, you cannot operate it.
- **Closed-book for fundamentals.** The core phase and the traditional plan are
  where you build the ability to verify the model. Do not outsource that.
- **Eval before and after.** Every prompt, model, or retrieval change gets a
  before-and-after number. "It feels better" is not a release criterion.
- **Keep a delegation log.** What did you ask for? What did it get wrong? What
  did you have to fix? This is how you learn where the model is useful and where
  it is dangerous.

## What not to delegate

- Problem framing and scope.
- Architecture and data modeling.
- Authentication, authorization, and tenant isolation.
- Payments and billing.
- Database migrations and deletions.
- Security reviews and threat models.
- Evals and acceptance criteria.
- Incident command.
- The final code review.

You can delegate the typing. You cannot delegate the ownership.

## Retention: keeping the core

The AI era rewards people who can learn quickly, but it punishes people who
forget the layer below. Keep the core with a deliberate maintenance loop.

- **Spaced repetition for facts.** HTTP status codes, isolation levels, token
  budgets, eval metrics, security headers, and complexity tables. Keep the deck
  small.
- **Re-implementation for skills.** Once a quarter, rebuild one thing from a
  blank file: a router, a rate limiter, a B-tree, a RAG pipeline, an eval
  harness. Compare it to the old version.
- **Teach-back for understanding.** Write the note you wish you had read. Explain
  the system without vendor names. If you cannot, you are relying on the vendor.
- **Interleaving for transfer.** When you learn agents, revisit permissions. When
  you learn RAG, revisit indexes. When you learn evals, revisit statistics.
- **Measurements for intuition.** Keep a small dashboard of your own: p95
  latency, cost per request, eval score, error rate. Numbers age better than
  opinions.
- **A failure log for judgment.** Record the symptom, the cause, the fix, and the
  rule. Re-read it monthly. The patterns are the curriculum.

## Resources

Books and website guides, mapped to each phase. The AI stack changes monthly;
the fundamentals do not. This list separates the durable books from the
fast-moving docs. Read the durable book for the model, the docs for the current
API, and build the thing in between.

### The short list

If you buy or borrow only nine things, these are the spine:

| # | Book | Use it for | Free? |
| :--- | :--- | :--- | :--- |
| 1 | *The Pragmatic Programmer* — Hunt & Thomas | Craft, ownership, judgment | No |
| 2 | *Refactoring* — Fowler | Changing code without changing behavior | No |
| 3 | *Designing Data-Intensive Applications* — Kleppmann | Data, storage, replication, distributed systems | No |
| 4 | *Release It!* — Nygard | Production resilience and failure modes | No |
| 5 | *Web Security for Developers* — McDonald | Practical security for full-stack apps | No |
| 6 | *AI Engineering* — Chip Huyen | LLM apps, RAG, evals, cost, production | No |
| 7 | *Hands-On Large Language Models* — Alammar & Grootendorst | Embeddings, retrieval, transformers in practice | No |
| 8 | *Fundamentals of Software Architecture* — Richards & Ford | Architecture and tradeoffs | No |
| 9 | *The Mom Test* — Fitzpatrick | User interviews and problem validation | No |

### The reference shelf

Do not read these cover to cover. Use them when a phase raises a question.

| Book | Use it for |
| :--- | :--- |
| *Designing Machine Learning Systems* — Chip Huyen | Production ML, data, monitoring, drift |
| *Database Internals* — Petrov | Storage engines, indexes, replication |
| *Site Reliability Engineering* — Beyer et al. | Operations, SLOs, incident response; [free online](https://sre.google/books/) |
| *The Site Reliability Workbook* — Beyer et al. | Practical SRE exercises; [free online](https://sre.google/workbook/table-of-contents/) |
| *Accelerate* — Forsgren, Humble, Kim | Delivery metrics and high-performing teams |
| *The Web Application Hacker's Handbook* — Stuttard & Pinto | Deep web security |
| *Security Engineering* — Anderson | Security as a system property; [free chapters](https://www.cl.cam.ac.uk/~rja14/book.html) |
| *Software Architecture: The Hard Parts* — Ford et al. | Architecture tradeoffs and decision records |
| *API Design Patterns* — Geewax | Designing APIs that survive change |
| *Node.js Design Patterns* — Casciaro & Mammino | Streams, modules, scalability, patterns |
| *Refactoring UI* — Wathan & Schoger | Visual design for developers |
| *Inclusive Components* — Pickering | Accessible component patterns; [free online](https://inclusive-components.design/) |
| *Inspired* — Cagan | Product discovery and teams |
| *Continuous Discovery Habits* — Torres | Weekly user research and product decisions |
| *The DevOps Handbook* — Kim et al. | Delivery culture and flow |
| *The Staff Engineer's Path* — Reilly | Technical leadership and scope |

### Phase-by-phase reading path

| Phase | Primary book | Free website or course | Optional depth |
| :--- | :--- | :--- | :--- |
| 0 — Orientation | *The Pragmatic Programmer* | [MIT Missing Semester](https://missing.csail.mit.edu/), [The Twelve-Factor App](https://12factor.net/) | *The DevOps Handbook* |
| 1 — Core programming | *Eloquent JavaScript* or *You Don't Know JS Yet* | [JavaScript.info](https://javascript.info/), [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) | *Refactoring* |
| 2 — Frontend | *Refactoring UI* + *Inclusive Components* | [MDN](https://developer.mozilla.org/en-US/), [web.dev/learn](https://web.dev/learn/), [React docs](https://react.dev/learn), [Full Stack Open](https://fullstackopen.com/en/) | *CSS: The Definitive Guide* |
| 3 — Backend | *Node.js Design Patterns* | [Node docs](https://nodejs.org/en/docs), [Full Stack Open](https://fullstackopen.com/en/) | *API Design Patterns* |
| 4 — Databases and data | *Designing Data-Intensive Applications* | [PostgreSQL docs](https://www.postgresql.org/docs/), [Use The Index, Luke](https://use-the-index-luke.com/), [CMU 15-445](https://15445.courses.cs.cmu.edu/) | *Database Internals* |
| 5 — DevOps and production | *Release It!* + *Site Reliability Engineering* | [Google SRE](https://sre.google/books/), [OpenTelemetry docs](https://opentelemetry.io/docs/), [Docker docs](https://docs.docker.com/) | *Accelerate* |
| 6 — Security and privacy | *Web Security for Developers* | [OWASP Top 10](https://owasp.org/www-project-top-ten/), [PortSwigger Academy](https://portswigger.net/web-security) | *Security Engineering* |
| 7 — AI foundations | *AI Engineering* | [Hugging Face LLM Course](https://huggingface.co/learn/llm-course), [OpenAI Cookbook](https://cookbook.openai.com/) | *Designing Machine Learning Systems* |
| 8 — RAG and AI product | *AI Engineering* + *Hands-On Large Language Models* | [LlamaIndex docs](https://docs.llamaindex.ai/), [Ragas docs](https://docs.ragas.io/), provider docs | *Designing Machine Learning Systems* |
| 9 — Agents and automation | *AI Engineering* + Anthropic's [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) | [MCP specification](https://modelcontextprotocol.io/), provider tool-use docs | Agent papers and your own traces |
| 10 — Architecture | *Fundamentals of Software Architecture* | [Martin Fowler](https://martinfowler.com/), [System Design Primer](https://github.com/donnemartin/system-design-primer) | *Software Architecture: The Hard Parts* |
| 11 — Product and market | *The Mom Test* + *Inspired* | [Google Search Central](https://developers.google.com/search/docs), [web.dev](https://web.dev/) | *Continuous Discovery Habits* |
| 12 — Capstone | The short list, as reference | The official docs for every dependency | *The Staff Engineer's Path* |

### Free websites and courses

| Site | Use it for |
| :--- | :--- |
| [MDN Web Docs](https://developer.mozilla.org/en-US/) | HTML, CSS, JavaScript, HTTP, browser APIs |
| [web.dev/learn](https://web.dev/learn/) | Performance, accessibility, SEO, modern web |
| [React docs](https://react.dev/learn) | React from the source |
| [Astro docs](https://docs.astro.build/) | Static sites, content, SEO, islands |
| [Node.js docs](https://nodejs.org/en/docs) | Runtime, APIs, streams, test runner |
| [PostgreSQL docs](https://www.postgresql.org/docs/) | SQL, schema, indexes, transactions, operations |
| [Docker docs](https://docs.docker.com/) | Images, containers, volumes, networks |
| [OpenTelemetry docs](https://opentelemetry.io/docs/) | Logs, metrics, traces, instrumentation |
| [OWASP Top 10](https://owasp.org/www-project-top-ten/) | Web application security risks |
| [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) | AI-specific application risks |
| [PortSwigger Web Security Academy](https://portswigger.net/web-security) | Free, hands-on security labs |
| [Google SRE](https://sre.google/books/) | SRE and the SRE Workbook |
| [The Twelve-Factor App](https://12factor.net/) | Service design and deployment hygiene |
| [Full Stack Open](https://fullstackopen.com/en/) | Free full-stack course with React, Node, and testing |
| [The Odin Project](https://www.theodinproject.com/) | Ground-up web development curriculum |
| [CS50](https://cs50.harvard.edu/x/) | Computer science foundations |
| [JavaScript.info](https://javascript.info/) | Deep JavaScript, from the language up |
| [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) | The type system, from the source |
| [System Design Primer](https://github.com/donnemartin/system-design-primer) | System design vocabulary and tradeoffs |
| [Hugging Face LLM Course](https://huggingface.co/learn/llm-course) | Transformers, fine-tuning, embeddings |
| [OpenAI Cookbook](https://cookbook.openai.com/) | Practical LLM recipes and evals |
| [Anthropic: Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) | Agent design without the hype |
| [MCP specification](https://modelcontextprotocol.io/) | Tool and context protocols |
| [Ragas docs](https://docs.ragas.io/) | RAG evaluation |
| [LlamaIndex docs](https://docs.llamaindex.ai/) | RAG patterns and ingestion |
| [Google Search Central](https://developers.google.com/search/docs) | Technical SEO from the source |
| [Playwright docs](https://playwright.dev/) | End-to-end testing |
| [Vitest docs](https://vitest.dev/) | Unit and integration testing |
| [A11y Project](https://www.a11yproject.com/) | Accessibility checklist and patterns |
| [WebAIM](https://webaim.org/) | Accessibility guidance and contrast tools |
| [Inclusive Components](https://inclusive-components.design/) | Accessible component patterns |
| [Every Layout](https://every-layout.dev/) | Layout primitives that hold up |

### How to read these books

- **Durable books for concepts; docs for the current API.** *AI Engineering* will
  still be useful next year. A vendor's SDK page will not.
- **Read a chapter, build a feature, measure it.** The build is the retention
  mechanism. A chapter without an artifact is entertainment.
- **Date your notes.** Record the model name, version, date, and prompt. The API
  will move; your notes should tell you what changed.
- **One primary, one practical, and the docs.** Do not read five AI books in
  parallel. Pick the concept book, the hands-on book, and the official docs.
- **Build the eval set before the next AI book.** The eval set is the thing that
  turns reading into engineering.
- **Prefer official docs over summaries.** Vendor docs are useful and biased.
  Read them with the bias in view.
- **Keep a model and prompt changelog.** Every change gets a date, a reason, and
  a before-and-after number.

### What to skip

- Do not start with fine-tuning. Start with retrieval and evals.
- Do not start with an agent framework. Start with a tool call and a trace.
- Do not read Kubernetes documentation before Docker, Linux, and a single-server
  deploy.
- Do not collect AI courses. Build one RAG app and measure it.
- Do not confuse a framework with a concept. LangChain is not retrieval.
- Do not let a course replace the deploy, the incident, or the user interview.

## The first 30 days

A concrete start, before the calendar matters:

**Week 1.** Set up the repo, the deploy, Postgres, and the study log. Build a
"hello, world" full-stack app with one page, one API route, and one database
table. Deploy it. Write down every step you had to look up.

**Week 2.** Add authentication with sessions and a protected route. Add one
form with validation. Write one integration test. Deploy again.

**Week 3.** Add loading, error, and empty states. Run an accessibility check and
a Lighthouse check. Fix the three worst issues. Add a keyboard-only flow.

**Week 4.** Add a small AI feature: summarize a record or answer a question from
one document. Add ten eval cases, a cost counter, and a fallback. Measure
latency and cost. Write a short review of what the model got wrong.

At the end of 30 days you should have: a deployed app, auth, a database, tests,
an AI feature, ten evals, a cost number, and a clear answer to "what would I not
ship yet?"

## How this maps to this site

The site is the public notebook for the same path:

- [The learning path](/sanjay/path/) — every published note, in order.
- [Topics](/sanjay/topics/) — the subjects across series.
- [The traditional core](/sanjay/plans/traditional-software-developer/) — the CS fundamentals underneath.
- [The real path to becoming a software developer](/sanjay/plans/software-developer/) — the broad zero-to-shipped route.
- [The underrated fundamentals](/sanjay/plans/underrated-fundamentals/) — the ten lenses underneath the stack.
- [The log](/sanjay/log/) — the raw sessions behind the notes.

The deep dives from this plan belong in the site's **ui**, **backend**,
**craft**, **tools**, **packages**, **ai**, **agents**, and **use-cases** series
slots. The series pages appear when the first note is published; until then, this
plan is the map.

## The point

The model will keep changing. The frameworks will keep changing. The ability to
frame a problem, design the data, verify the behavior, secure the boundary, and
operate the system is the part that compounds.

That is the job. The model is a component.
