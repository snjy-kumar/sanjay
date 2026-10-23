---
title: "The underrated fundamentals — the core that outlives frameworks"
description: "Ten foundational ideas most engineers learn too late: memory, state, concurrency, failure, contracts, cost, trust, investigation, framing, and communication — with books, references, and lectures."
date: "2026-10-22"
---

The underrated fundamentals are not more technologies. They are the things that
remain true after the framework, the language, and the model change.

They rarely get attention because they are invisible when they work: no demo, no
badge, no tutorial. They show up later as a 2am bug, a slow query, a leak, a
breach, or a product nobody wanted.

This page is the log. One item per week, one small artifact, one note. The point
is not to finish the list. The point is to keep the lenses sharp.

## How to use this page

For each fundamental, ask three questions:

1. **Can I explain it without naming a framework?**
2. **Can I debug it when it breaks?**
3. **Can I measure it or prove it?**

If the answer to any of those is no, the learning is not done. Read a chapter,
build the smallest artifact, break it deliberately, and write down what happened.

The resources below are deliberately short. One book, one reference, and a
lecture, talk, or lab where one is worth your time. Add more only when the first
one is not enough.

## 1. Memory is a physical model, not a box

A variable is not a container. It is a name for a location, a lifetime, and an
encoding.

Stack versus heap. Value versus reference. Ownership and aliasing. Alignment,
padding, cache lines, and locality. This is not low-level trivia. It explains why
one loop is 20× faster, why a leak survives a restart, why two threads corrupt
the same object, and why a safe-looking string operation becomes a security bug.

It is underrated because garbage collectors and frameworks hide it. The bill
still arrives in performance, concurrency, and security.

**Book:** *Computer Systems: A Programmer's Perspective* — Bryant & O'Hallaron.
The memory hierarchy, pointers, linking, and performance from the programmer's
point of view.

**Book:** *C Programming: A Modern Approach* — K. N. King. Pointers, arrays,
allocation, and the exercises that make them stick.

**Reference:** [CS:APP labs](https://csapp.cs.cmu.edu/3e/labs.html) and
[Compiler Explorer](https://godbolt.org/). See the assembly before and after the
abstraction.

**Video:** [CS50 Week 4: Memory](https://cs50.harvard.edu/x/2024/weeks/4/).
The lecture, notes, and exercises.

**Practice:** write a dynamic array in C, draw the memory of a small program,
run it under AddressSanitizer, and inspect the generated assembly in Compiler
Explorer. Then explain the lifetime of every allocation.

## 2. State, invariants, and the logic underneath

Code is not the source of complexity. State is.

Most expensive bugs are illegal states: `loading && error && data`, an order that
is both paid and cancelled, a user who is both invited and deleted, a retry that
charges twice. The fix is not more tests. It is making the illegal state
impossible to represent, and writing down the invariant that must always hold.

Underneath this is logic: predicates, sets, relations, quantifiers. It is the
grammar of types, permissions, SQL, and state machines. It is often skipped
because it is taught as mathematics rather than as a tool for engineering.

**Book:** *Types and Programming Languages* — Benjamin C. Pierce. The theory
behind the types you already use, and why they prevent whole classes of states.

**Book:** *Practical TLA+* — Hillel Wayne. A practical way to model state and
invariants before the code exists.

**Reference:** [Making Illegal States
Unrepresentable](https://fsharpforfunandprofit.com/posts/designing-with-types-making-illegal-states-unrepresentable/)
and the [TLA+ home page](https://lamport.azurewebsites.net/tla/tla.html).

**Video:** [TLA+ Video Course](https://lamport.azurewebsites.net/video/videos.html)
by Leslie Lamport.

**Practice:** model a login or order flow as a state machine. Replace a set of
booleans with a sum type or enum. Write the invariant as an assertion and a
property-based test. Try to construct a sequence of events that violates it.

## 3. Concurrency is interleaving, not speed

Concurrency is not “doing many things at once.” It is the study of what happens
when operations interleave.

Atomicity, visibility, ordering, locks, races, deadlocks, async/await, the event
loop, backpressure. Add time and you get timeouts, leases, clock skew, and
distributed ordering. These are not advanced topics. They are the default
conditions of any system with more than one actor.

It is underrated because a single-user demo hides every race. The first time it
matters is usually production.

**Book:** *Operating Systems: Three Easy Pieces* — Arpaci-Dusseau. The
concurrency chapters are free and unusually clear.

**Book:** *Java Concurrency in Practice* — Goetz et al. The concepts transfer even
if you never write Java.

**Reference:** [MIT 6.005 Concurrency](https://web.mit.edu/6.031/www/sp21/classes/19-concurrency/)
and [OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/).

**Video:** [MIT 6.172 Performance Engineering](https://ocw.mit.edu/courses/6-172-performance-engineering-of-software-systems-fall-2018/)
for the performance and hardware side of concurrency.

**Practice:** build a producer–consumer queue and a thread pool. Inject delays
and reorderings. Run a thread sanitizer. Write a deterministic test that fails
under the old implementation. Then explain why the fix is correct, not just why
it passes.

## 4. Failure is the normal path

The happy path is a special case. Networks drop, disks fill, processes die, APIs
time out, users double-click, and deployments go sideways.

Partial failure, retries, idempotency, timeouts, backoff with jitter, circuit
breakers, graceful degradation, backups, and restore drills. This is the
difference between “it works” and “it works when something else is broken.”

It is underrated because demos are local and successful. Failure handling is
invisible until the day it is the only thing that matters.

**Book:** *Release It!* — Michael Nygard. Stability patterns and the failure
modes that appear after launch.

**Book:** *Site Reliability Engineering* — Beyer et al.
[Free online](https://sre.google/sre-book/table-of-contents/).

**Reference:** [AWS Builders' Library](https://aws.amazon.com/builders-library/)
and [Principles of Chaos Engineering](https://principlesofchaos.org/).

**Talks:** [Google SRE](https://sre.google/) — books, talks, and case studies on
production ownership.

**Practice:** add idempotency keys, retries with jitter, and a timeout budget to
one endpoint. Kill a dependency during a request. Write a failure matrix:
dependency, failure mode, detection, mitigation, recovery.

## 5. Every boundary is a contract

Most bugs live at the edges: between the browser and the API, the API and the
database, your code and a third-party service, one team and another.

A boundary needs a contract: what goes in, what comes out, what errors mean, who
is allowed, what version it is, and what happens when it changes. Validation,
types, schemas, error shapes, and backward compatibility are not ceremony. They
are how systems stay composable.

It is underrated because internal code is more fun to write than edge cases.

**Book:** *API Design Patterns* — JJ Geewax. How to design interfaces that
survive change.

**Book:** *Domain-Driven Design* — Eric Evans. Boundaries, models, and the
language shared across them.

**Reference:** [Parse, Don't Validate](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/),
[JSON Schema](https://json-schema.org/), and [OpenAPI](https://www.openapis.org/).

**Video:** [Boundaries](https://www.destroyallsoftware.com/talks/boundaries) by
Gary Bernhardt.

**Practice:** write an OpenAPI schema for one endpoint and validate at the edge.
Make every error explicit. Add a contract test between the client and the server.
Ask: “What is the smallest promise I can make and keep?”

## 6. Cost is physics

Big-O tells you the shape. Constants pay the bill.

I/O, network round trips, allocations, serialization, memory bandwidth, cold
starts, N+1 queries, and p95 latency. An algorithm with a better complexity can
lose to a cache-friendly one. A “fast” service can spend 80% of its time waiting
on a database.

It is underrated because interviews reward asymptotic complexity, while
production is dominated by latency budgets and resource limits.

**Book:** *Systems Performance* — Brendan Gregg. Measurement, profiling, and the
real cost of the machine.

**Book:** *Computer Systems: A Programmer's Perspective* — Bryant & O'Hallaron.
The memory hierarchy and why locality matters.

**Reference:** [Latency Numbers Every Programmer Should
Know](https://gist.github.com/jboner/2841832) and [High Performance Browser
Networking](https://hpbn.co/).

**Video:** [Brendan Gregg's presentations](https://www.brendangregg.com/presentations.html).
Talks and slides on performance analysis.

**Practice:** benchmark one endpoint and profile it. Calculate a latency budget:
how many requests per second, how many bytes, how many round trips, how much
memory. Report p50 and p95, not averages. Fix one N+1 query and measure the
difference.

## 7. Trust is a boundary, not a feature

Authentication is who you are. Authorization is what you may do. Most serious
security bugs are authorization bugs: an endpoint that checks login but not
ownership, a tenant that can read another tenant’s data, an admin route protected
only by a hidden button.

Least privilege, deny by default, tenant isolation, secrets management, audit
logs, and threat modeling. Security is not a scanner you run at the end. It is a
property of the design.

It is underrated because login is visible and permissions are invisible — until a
breach makes them visible.

**Book:** *Web Security for Developers* — Malcolm McDonald. The practical
security mistakes that ship in real applications.

**Book:** *Security Engineering* — Ross Anderson.
[Free chapters](https://www.cl.cam.ac.uk/~rja14/book.html).

**Reference:** [OWASP Top 10](https://owasp.org/www-project-top-ten/) and [OWASP
ASVS](https://owasp.org/www-project-application-security-verification-standard/).

**Labs:** [PortSwigger Web Security Academy](https://portswigger.net/web-security)
— exploit the bug, then fix it.

**Practice:** threat-model one feature. Write down assets, actors, trust
boundaries, and abuse cases. Test cross-tenant access. Make the default deny.
Never trust the client for authorization.

## 8. Investigation is the job

Most engineering time is not typing. It is understanding: reading unfamiliar
code, following a request, reading a stack trace, forming a hypothesis,
reproducing a bug, bisecting a change, and proving the fix.

Debugging, observability, logs, traces, metrics, and reproduction steps are core
engineering skills, not support work. The ability to find out what is actually
true is more valuable than the ability to generate another plausible
implementation.

It is underrated because education rewards greenfield writing. Work rewards
understanding existing systems.

**Book:** *Why Programs Fail* — Andreas Zeller. A systematic approach to
debugging.

**Book:** *Debugging* — David J. Agans. The nine rules, short and memorable.

**Reference:** [Julia Evans' debugging zine](https://jvns.ca/debugging-zine/) and
[Julia Evans' talks](https://jvns.ca/talks/).

**Video:** [Julia Evans' talks](https://jvns.ca/talks/). Practical debugging,
profiling, and systems explanations.

**Practice:** debug a codebase you did not write. Write reproduction steps before
touching the code. Use `git bisect`. Keep a bug log: symptom, cause, fix, rule.
Read one layer below the abstraction when it leaks.

## 9. Problem framing is the first architecture

The most expensive bug is solving the wrong problem well.

Who has the problem? How often? What do they do today? What does “done” mean?
What is explicitly out of scope? What would make this fail? These questions
determine the architecture more than any framework choice.

It is underrated because coding feels productive. A week of code can feel better
than an hour of asking, even when the hour would save the week.

**Book:** *The Mom Test* — Rob Fitzpatrick. How to talk to users without asking
leading questions.

**Book:** *Are Your Lights On?* — Gause & Weinberg. A short classic on defining
the problem before solving it.

**Book:** *Inspired* — Marty Cagan. How product discovery and delivery fit
together.

**Reference:** [The Mom Test](https://www.momtestbook.com/).

**Video:** [How to Speak](https://ocw.mit.edu/courses/res-tll-005-how-to-speak-january-iap-2018/)
by Patrick Winston. Not about framing directly, but the best lecture on making
the framing land.

**Practice:** write a one-page spec before building. Include the problem, the
user, the success metric, the non-goals, and the riskiest assumption. Run a
pre-mortem: “It is six months later and this failed — why?” Talk to five users
and write down what changed your mind.

## 10. Communication and feedback loops compound

Naming, writing, design docs, ADRs, commit messages, code review, postmortems,
tests, CI, and observability are not overhead. They are how a system — and a
team — remembers what it learned.

A good name is compressed design. A good commit message is a tiny design
document. A good postmortem is how an incident becomes institutional knowledge.
A good feedback loop is how you find out you were wrong before the user does.

It is underrated because it does not look like “real work.” It is the work that
makes the rest of the work improve.

**Book:** *The Pragmatic Programmer* — Hunt & Thomas. Craft, communication, and
ownership.

**Book:** *Accelerate* — Forsgren, Humble, Kim. The feedback loops that actually
predict delivery performance.

**Reference:** [Architecture Decision Records](https://adr.github.io/),
[Conventional Commits](https://www.conventionalcommits.org/), and the [Google SRE
Workbook](https://sre.google/workbook/table-of-contents/).

**Video:** [How to Speak](https://ocw.mit.edu/courses/res-tll-005-how-to-speak-january-iap-2018/)
by Patrick Winston.

**Practice:** write an ADR for one decision. Write a postmortem for one incident,
even a small one. Rename one confusing thing. Make small commits. Add one CI gate
that would have caught a real bug.

## The common thread: know one layer below

Every abstraction is a promise, and every abstraction leaks.

| You use | Know one layer below |
| :--- | :--- |
| React | The DOM, HTTP, and the browser |
| An ORM | SQL, indexes, and transactions |
| An LLM API | Tokens, retrieval, and evals |
| A queue | Delivery semantics, retries, and ordering |
| A container | Processes, namespaces, and the kernel |
| A framework | The language runtime, memory, and the event loop |

You do not need to know everything. You need to know enough to debug the promise
when it breaks.

## The ten in one table

| # | Fundamental | The question to ask | Primary resource |
| :--- | :--- | :--- | :--- |
| 1 | Memory and representation | What is the lifetime and layout? | *CS:APP* |
| 2 | State and invariants | What must always be true? | *Practical TLA+* |
| 3 | Concurrency and time | What can interleave? | *OSTEP* |
| 4 | Failure and recovery | What happens when this part dies? | *Release It!* |
| 5 | Boundaries and contracts | What is the promise at the edge? | *API Design Patterns* |
| 6 | Cost and measurement | What does this actually cost? | *Systems Performance* |
| 7 | Trust and authorization | Who is allowed to do this? | *Web Security for Developers* |
| 8 | Investigation and debugging | How do I find out what is true? | *Why Programs Fail* |
| 9 | Problem framing | What problem are we solving? | *The Mom Test* |
| 10 | Communication and feedback | How does the system learn? | *The Pragmatic Programmer* |

## A 10-week practice plan

One item per week. Build the artifact, break it, write the note. Do not move on
until you can explain the artifact without the book.

| Week | Focus | Artifact |
| :--- | :--- | :--- |
| 1 | Memory | A dynamic array in C, with a memory diagram and a sanitizer run |
| 2 | State | A state machine for a login or order flow, with invariants and property tests |
| 3 | Concurrency | A producer–consumer queue with a deterministic race test |
| 4 | Failure | An endpoint with retries, idempotency keys, and a failure matrix |
| 5 | Contracts | An OpenAPI schema, boundary validation, and contract tests |
| 6 | Cost | A benchmark, a profile, and a latency budget for one endpoint |
| 7 | Trust | A threat model, a cross-tenant test, and a deny-by-default permission check |
| 8 | Investigation | A debugging write-up of an unfamiliar repository, including `git bisect` |
| 9 | Framing | A one-page spec, a pre-mortem, and five user interviews |
| 10 | Communication | An ADR, a postmortem, and a one-page design doc |

At the end, you have ten small artifacts and ten notes. That is a much better
foundation than ten more tutorials.

## YouTube channels worth following

Use these for intuition and interviews, not as a replacement for the build.

| Channel | Why |
| :--- | :--- |
| [MIT OpenCourseWare](https://www.youtube.com/@mitocw) | Full courses on algorithms, systems, and theory |
| [CS50](https://www.youtube.com/@cs50) | Memory, data structures, and computer science from the ground up |
| [Brendan Gregg](https://www.youtube.com/@BrendanGregg) | Performance analysis and systems measurement |
| [Hussein Nasser](https://www.youtube.com/@hnasr) | Backend, databases, networks, and protocols |
| [Computerphile](https://www.youtube.com/@Computerphile) | Short explanations of computer science ideas |
| [ByteByteGo](https://www.youtube.com/@ByteByteGo) | System design vocabulary and diagrams |
| [ArjanCodes](https://www.youtube.com/@ArjanCodes) | Software design, testing, and maintainability |

## Related paths

- [The traditional core](/sanjay/plans/traditional-software-developer/) — the full CS and systems path.
- [The software AI developer](/sanjay/plans/software-ai-developer/) — the full-stack AI path.
- [The real path to becoming a software developer](/sanjay/plans/software-developer/) — the broad zero-to-shipped route.
- [The learning path](/sanjay/path/) — every published note, in order.

## The point

The fundamentals are not a phase you finish. They are a set of questions you
keep asking:

What is the representation? What must always be true? What can interleave? What
happens on failure? What is the contract? What does it cost? Who is allowed?
How do I find out what is true? What problem are we solving? How does the system
learn?

Frameworks will change. The model will change. Those questions will still be
there.
