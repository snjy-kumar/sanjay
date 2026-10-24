---
title: "The books that still matter — a reading list for the AI era"
description: "A short, honest reading list for a JavaScript and TypeScript developer in the AI era: what to read first, what to read later, what to skip, and what is free online."
date: "2026-10-22"
---

Books compress experience. They do not replace it.

This is the short list I would give a JavaScript/TypeScript developer who wants
to be the person who understands the system, not the person who is fastest at
prompting one. It is deliberately small. Most of what makes an engineer is built
by shipping, breaking, and debugging — a book only gives you better questions to
ask while you do it.

The list assumes one thing: you are going to apply each book to real code. If
you are only collecting books, stop and build something first.

## The rule

One book at a time. Read it with a project open. After each chapter, write five
bullets and change one thing in the code. If a book never changes the code, it
was entertainment. That is allowed — just do not count it as study.

## Start here

Three books, this month, in this order. They are short, and each one changes how
you work immediately.

### *A Philosophy of Software Design* — John Ousterhout

The best book on design taste for someone at your stage. It is short, opinionated,
and it argues against some popular advice: it is pro-comment, and it is not
impressed by tiny functions for their own sake. Read it as an antidote to
cargo-culting, not as a law.

**Why it earns the slot.** Most juniors learn design by copying whatever the
codebase does. This gives you a vocabulary for complexity — dependencies,
obscurity, change amplification — so you can judge a design instead of imitating
one.

**Get it:** [Author's page](https://web.stanford.edu/~ouster/cgi-bin/book.php)
(print and ebook).

### *Debugging: The 9 Indispensable Rules* — David J. Agans

About 150 pages. It sounds basic and it is not. The rules — understand the
system, make it fail, quit thinking and look, divide and conquer, change one
thing at a time, keep an audit trail, check the plug, get a fresh view, if you
did not fix it it is not fixed — are the methodology most developers never
learn. They just guess faster.

**Why it earns the slot.** This is the book that makes you useful when something
breaks, which is the skill agents are worst at and teams value most.

**Get it:** [Book site](https://www.debuggingrules.com/).

### *Effective TypeScript* — Dan Vanderkam

Item-based, practical, and directly about your stack. Read it with your editor
open and fix your code as you go. The second edition covers the modern type
system, but the mindset is the point: types are not decoration, they are a
verification harness.

**Why it earns the slot.** In an AI-assisted workflow, `tsc` is one of the few
feedback loops that cannot be talked into agreeing with you. Strong types are
how you keep generated code honest.

**Get it:** [Book site](https://effectivetypescript.com/) (print and ebook).

## The core shelf

One book per skill. Read them over the next year, not all at once.

### *Working Effectively with Legacy Code* — Michael Feathers

For the "understand unknown code" muscle. Some of the techniques are dated; the
mindset is not. It teaches you how to get a grip on a system nobody understands,
find the seams, and change it without breaking it. This is the closest thing to
a manual for the work you will actually do.

**Get it:** [InformIT](https://www.informit.com/store/working-effectively-with-legacy-code-9780131177055).

### *Use the Index, Luke* — Markus Winand

SQL is the highest-ROI second language for a web developer, and this is the
practical place to start. Free online, with runnable examples. Then read
*SQL Performance Explained* by the same author if you want the book.

Learn indexes, query plans, and why the database ignores your index. Most
"slow app" problems live here.

**Get it:** [Free online](https://use-the-index-luke.com/) ·
[*SQL Performance Explained*](https://sql-performance-explained.com/).

### *High Performance Browser Networking* — Ilya Grigorik

The network under the web: TCP, TLS, HTTP/2 and HTTP/3, latency, and what the
browser actually does before your first byte. Free online. It fixes the hole
where most web developers do not understand the layer their app runs on.

**Get it:** [Free online](https://hpbn.co/).

### *The Linux Command Line* — William Shotts

Operational fluency. Processes, pipes, permissions, SSH, and the shell. Boring
and necessary. Agents are weakest at ambiguous environment problems, and this is
where those problems live.

**Get it:** [Free PDF](https://linuxcommand.org/tlcl.php).

### *Unit Testing: Principles, Practices, and Patterns* — Vladimir Khorikov

The verification skill, taught properly. Most testing advice online is bad —
too many mocks, too many shallow tests, too much confidence in coverage. This
book explains what a test is for and when a test is a liability.

**Get it:** [Manning](https://www.manning.com/books/unit-testing).

### *The Programmer's Brain* — Felienne Hermans

How programmers actually read and comprehend code. Unusual, research-backed, and
directly useful for the reading-code muscle. If you have ever stared at a file
for twenty minutes and retained nothing, this explains why and what to do about
it.

**Get it:** [Manning](https://www.manning.com/books/the-programmers-brain).

### *On Writing Well* — William Zinsser

Communication is the multiplier on everything else. Design docs, incident
reports, pull request descriptions, and the message that gets a decision made.
Read it once a year until the habits stick.

**Get it:** [HarperCollins](https://www.harpercollins.com/products/on-writing-well-william-zinsser).

## Later, once you have operated something

These are excellent. They are also the wrong books to read first, because you
will retain very little without a system to attach them to.

### *Designing Data-Intensive Applications* — Martin Kleppmann

The book that changes how you think about data. Replication, partitioning,
transactions, consistency, and the tradeoffs behind every database choice. Read
it slowly, twice, after you have run a database in production. Reading it before
that feels like homework and sticks about as well.

**Get it:** [Book site](https://dataintensive.net/).

### *Systems Performance* — Brendan Gregg

Start with the methodology chapters. They teach you to measure instead of guess:
where the time actually goes, and how to prove it. The rest is a reference you
will come back to when a specific layer gets slow.

**Get it:** [Author's page](https://www.brendangregg.com/systems-performance-2nd-edition-book.html).

### *The Staff Engineer's Path* — Tanya Reilly

Not because you are staff. Because the chapters on writing, influence, and
judgment are the skills that separate "good developer" from "the one people
trust with the ambiguous problem." Read it when you start owning work that spans
a team.

**Get it:** [Author's page](https://noidea.dog/staff).

### *Fundamentals of Software Architecture* — Mark Richards & Neal Ford

Tradeoff vocabulary: coupling, cohesion, boundaries, and the forces that push a
system toward one shape or another. Read it when you are ready to argue about
structure with reasons instead of preferences.

**Get it:** [Book site](https://fundamentalsofsoftwarearchitecture.com/).

## Book understanding by engineering topic

Books should not be collected as trophies; each book is an instrument to master a specific engineering discipline and mental model. Below is the topic-wise map of what each book teaches, the invariant mental model it establishes, and how to verify understanding in code.

| Engineering Topic | Recommended Book | Core Mental Model / Takeaway | Proof in Code / Practice Artifact |
| :--- | :--- | :--- | :--- |
| **Software Design & Complexity** | *A Philosophy of Software Design* (John Ousterhout) | Complexity is incremental. Deep modules hide information behind simple interfaces; shallow modules amplify changes. | Refactor a complex subsystem: simplify its public interface by 50% while hiding internal state machines. |
| **Debugging Methodology** | *Debugging: The 9 Indispensable Rules* (David J. Agans) | Never guess. Make it fail reliably, understand the system rules, divide and conquer, and prove the fix before closing. | Write reproduction steps, an audit trail, and regression tests for a bug before touching implementation. |
| **Type Systems & Invariants** | *Effective TypeScript* (Dan Vanderkam) | Types are a verification harness, not decoration. Wide types leak bugs; strict boundaries and narrowing keep generated code honest. | Enable strict compiler flags, replace wide primitives with branded types or discriminated unions, eliminate all `any`. |
| **Legacy Codebases & Refactoring** | *Working Effectively with Legacy Code* (Michael Feathers) | Legacy code is code without tests. Find natural seams, introduce sensing variables, break dependencies, and wrap changes in tests. | Extract a seam in a sprawling legacy function and write a characterization test before modifying logic. |
| **Database Internals & SQL Performance** | *Use the Index, Luke* (Markus Winand) | Databases are B-trees and block I/O. Indexes only work when matching access patterns; query plans reveal runtime truth. | Run `EXPLAIN ANALYZE` on a slow endpoint, inspect index scans vs sequential scans, and design an optimal compound index. |
| **Web Transport & Networking** | *High Performance Browser Networking* (Ilya Grigorik) | Speed is latency and connection mechanics (TCP slow start, TLS handshakes, HTTP/2 multiplexing, head-of-line blocking). | Profile network waterfalls in Chrome DevTools: eliminate roundtrips, optimize connection reuse, measure CWV. |
| **Operating Systems & Linux Shell** | *The Linux Command Line* (William Shotts) / *OSTEP* | The computer is processes, file descriptors, virtual memory, signals, and pipes. Operational fluency beats GUI crutches. | Debug an unreachable production service via SSH: inspect `ps`, `ss`, open file descriptors, system logs, and memory. |
| **Testing & Behavioral Verification** | *Unit Testing: Principles, Practices, and Patterns* (Vladimir Khorikov) | Tests must verify observable business behavior, not implementation details. Mocking internal collaborators produces fragile tests. | Rewrite a brittle test suite: eliminate mocks of private helpers and verify end-to-end outcome invariants. |
| **Distributed Systems & Data Architecture** | *Designing Data-Intensive Applications* (Martin Kleppmann) | There is no magic database. Understand replication lag, partition tolerance, consensus, write-ahead logs, and transactions. | Model a dual-write problem between Postgres and cache/search index, and design an idempotent event-driven reconciliation. |
| **Systems Performance & Observability** | *Systems Performance* (Brendan Gregg) | Performance is measurement, not intuition. Use the USE method (Utilization, Saturation, Errors) across CPU, memory, and I/O. | Profile CPU flame graphs and memory heap allocations under load to identify the exact bottleneck. |
| **Software Architecture & Tradeoffs** | *Fundamentals of Software Architecture* (Mark Richards & Neal Ford) | Architecture is the decisions that are hard to change. Every pattern has tradeoffs; evaluate coupling, cohesion, and scalability forces. | Author an Architectural Decision Record (ADR) analyzing three structural options for a service boundary. |
| **Code Comprehension & Cognition** | *The Programmer's Brain* (Felienne Hermans) | Reading code uses short-term memory, working memory, and long-term memory. Structure code to minimize cognitive load. | Re-structure an unreadable module using cognitive chunking, semantic naming conventions, and explicit variable roles. |
| **Technical Writing & Communication** | *On Writing Well* (William Zinsser) | Clarity of writing is clarity of thought. Eliminate clutter, state invariants directly, and write for the reader's decision-making. | Write a 1-page design proposal or incident postmortem that enables a team decision without verbal explanation. |

## Free, legal, and worth bookmarking

Several of the best books in this list cost nothing. Start with these if money
is tight — it is not a downgrade.

| Book | What it covers | Link |
| :--- | :--- | :--- |
| *Use the Index, Luke* | SQL indexes and query plans | [use-the-index-luke.com](https://use-the-index-luke.com/) |
| *High Performance Browser Networking* | The network under the browser | [hpbn.co](https://hpbn.co/) |
| *The Linux Command Line* | Shell and operating system | [linuxcommand.org](https://linuxcommand.org/tlcl.php) |
| *You Don't Know JS Yet* | Scope, closures, types, async | [GitHub](https://github.com/getify/You-Dont-Know-JS) |
| *Operating Systems: Three Easy Pieces* | Processes, memory, concurrency | [OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/) |
| *Site Reliability Engineering* | Production ownership and failure | [sre.google](https://sre.google/sre-book/table-of-contents/) |
| CS:APP labs | Memory and performance, by doing | [csapp.cs.cmu.edu](https://csapp.cs.cmu.edu/3e/labs.html) |

## What I would skip

- **Clean Code.** Dogmatic, and some of it is actively harmful — the comment
  hatred and the tiny-function absolutism in particular. *A Philosophy of
  Software Design* covers the good parts better and shorter.
- **The Pragmatic Programmer.** Fine. Read it once, then move on. It is a vibe
  book, not a curriculum.
- **The Mythical Man-Month.** Historically important, not useful to you now.
- **Cracking the Coding Interview.** It builds interview skill, not engineering
  skill. Use it when you are actually interviewing, not before.
- **Books about AI.** They date in months. Read documentation, papers, and
  engineering blogs instead.
- **"Learn X in 30 days" and tutorial ebooks.** Consumption disguised as
  progress.

## A twelve-month sequence

| Months | Read | Apply it to |
| :--- | :--- | :--- |
| 1 | *A Philosophy of Software Design* | Name the complexity in one file you own |
| 1 | *Debugging* | Write reproduction steps before your next fix |
| 2–3 | *Effective TypeScript* | Turn on strict mode and remove every `any` |
| 4–5 | *Use the Index, Luke* | Read the query plan for your slowest endpoint |
| 6 | *High Performance Browser Networking* | Measure one page load and fix one network cost |
| 7 | *The Linux Command Line* | Deploy and debug on a server without a GUI |
| 8 | *Unit Testing* | Rewrite one test suite around behavior |
| 9 | *The Programmer's Brain* | Read an unfamiliar repository end to end |
| 10 | *On Writing Well* | Write one design doc and one postmortem |
| 11–12 | *Designing Data-Intensive Applications* | Map each chapter to a system you have run |

## How to read so it counts

1. **One book at a time.** Parallel reading is how you finish twelve books and
   remember none.
2. **Read with the project open.** Apply as you go, not after.
3. **After each chapter, write five bullets and make one change.** The change is
   the proof you understood it.
4. **Keep the notes public.** A public reading log is evidence, and explaining
   forces you to find the holes.
5. **Re-read the short ones yearly.** *A Philosophy of Software Design* and
   *Debugging* reward a second pass more than most books reward a first.
6. **Quit a book that is not paying rent.** There are too many good ones to
   finish a bad one out of guilt.

## The point

Books are not the edge. The edge is what you can explain, debug, and prove.

The books on this list give you better questions: What is the invariant? What
happens when this dies? What does this actually cost? Who is allowed to do this?
How do I know it works? Those questions are what people trust you for, and they
are the last thing anyone wants to lose when the tools change again.

## Related

- [The underrated fundamentals](/sanjay/plans/underrated-fundamentals/) — the ten
  lenses behind this list, with a practice artifact for each.
- [The traditional core](/sanjay/plans/traditional-software-developer/) — the
  full computer science and systems path.
- [The learning path](/sanjay/path/) — every note on this site, in order.
