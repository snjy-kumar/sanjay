---
title: "The traditional core — a computer science roadmap for working developers"
description: "A 14-month, project-gated path through the timeless parts of software: computation, discrete math, data structures, algorithms, architecture, operating systems, networks, databases, compilers, distributed systems, security, and a capstone."
date: "2026-10-22"
---

Most "learn computer science" lists are syllabi. This is a sequence of things
you can do. It is written for a working developer who wants the core back: the
material that does not expire when a framework does.

It is deliberately old-fashioned. The tools are new; the questions are not.
What is a pointer? Why is a hash table fast? What happens when a process reads a
file? Why can a database lose a write? How does a packet become a page? These
questions are still the difference between using a system and understanding it.

This is the **core track**. It sits underneath the applied work:

| Track | Question | Best for |
| :--- | :--- | :--- |
| **The traditional core** (this page) | How does computation actually work? | Fundamentals, systems, interviews, confidence |
| [The real path to becoming a software developer](/sanjay/plans/software-developer/) | How do I go from zero to shipped features? | Beginners and career changers |
| [The software AI developer](/sanjay/plans/software-ai-developer/) | Can I own an AI-native product end to end? | Working developers going deep |

You can run this track beside the other two. It is not a race, and it is not a
replacement for building products. It is the layer that makes the product work
legible.

## Who this is for

This plan assumes you can already write code in at least one language. You do
not need a CS degree. You do need:

- 8–12 hours a week for about 14 months, or 5 hours a week for about 24 months.
- A willingness to write code without AI first, then use AI to review it.
- A public repository and a study log, because evidence beats intention.
- Patience with proofs, benchmarks, and material that feels slow before it feels
  obvious.

If you are starting from zero, do the first phases of the applied path first.
Come back when a function, an array, and an HTTP request are not mysteries.

## What this plan is not

- **Not a CS degree.** It covers the core, not every elective. You will not
  spend a semester on compiler theory or linear algebra, but you will build a
  small compiler and use the linear algebra that matters.
- **Not interview prep only.** Interviews are a side effect. The goal is the
  ability to reason about systems when there is no answer key.
- **Not a tour of twenty languages.** You will use two languages deeply: C for
  the machine, and one high-level language for data structures, algorithms, and
  product work. SQL is a third, but it is a query language, not a general-purpose
  one.
- **Not a collection of courses.** One good source per topic is enough. The
  implementation is the course.

## Language choices

Use **C** for the machine layer. It is small, old, and honest about memory. You
will learn pointers, the stack, the heap, compilation, linking, undefined
behavior, and why a segfault is a feature of the operating system rather than a
punishment from the compiler.

Use **TypeScript or Python** for data structures and algorithms. TypeScript keeps
continuity with this site and with frontend work. Python removes syntax friction
and is common in interviews and systems scripting. Pick one and stay with it for
the whole plan. Do not learn a third language "for fun" until the capstone is
done.

Use **SQL** for databases. Use **Go or Rust** only if your capstone needs them,
and only after the core phases. The language is not the point; the model is.

## The shape of the path

The path moves from computation, to data, to the machine, to systems, to
judgment. Each layer makes the next one legible.

| Layer | Question | Contents | Evidence |
| :--- | :--- | :--- | :--- |
| **Foundations** | What is computation? | Programming, discrete math, complexity | Implementations and proofs |
| **Data** | How do we organize it? | Data structures and algorithms | A from-scratch library and benchmarks |
| **Machine** | How does it run? | Architecture, C, operating systems, networks | Systems labs |
| **Systems** | How do we store and connect? | Databases, distributed systems | A service with persistence and failure tests |
| **Judgment** | How do we build reliably? | Software engineering, security, capstone | A design doc, tests, and a postmortem |

The order matters, but it is not a straight line. You will revisit memory when
you study operating systems, graphs when you study networks, and indexes when
you study databases. That is the point. Repetition across layers is how the core
sticks.

## The 14-month map

The weeks assume 8–12 hours a week. If you have 5, stretch the calendar to about
24 months. If you have 20, compress the calendar, not the gates. A phase is done
when you can do the gate without notes.

| Phase | Weeks | Focus | Gate |
| :--- | :--- | :--- | :--- |
| 0 | 1–2 | Setup, study system, baseline | A public repo and a study log |
| 1 | 3–5 | Programming from first principles | A tested CLI tool |
| 2 | 6–9 | Discrete mathematics | Proofs and a probability simulation |
| 3 | 10–16 | Data structures | A from-scratch library |
| 4 | 17–23 | Algorithms | Unseen problems and benchmarks |
| 5 | 24–28 | Architecture and C | A memory-safe C project |
| 6 | 29–33 | Operating systems | A shell and a thread pool |
| 7 | 34–37 | Networks | An HTTP server and a DNS client |
| 8 | 38–41 | Databases | A tuned schema and a migration |
| 9 | 42–45 | Theory and compilers | A small interpreter or compiler |
| 10 | 46–50 | Distributed systems | A replicated key-value store |
| 11 | 51–53 | Software engineering and security | A threat model and a CI gate |
| 12 | 54–58 | Capstone | A system with evidence |

The last stretch is buffer, not new material. If a phase takes longer, take
longer. The calendar is a planning aid; the gates are the contract.

## How to study

The method is simple and repetitive:

1. **Read or watch once.** Do not collect courses. One source per topic.
2. **Implement from scratch.** No AI in the first pass. Use the documentation,
   the debugger, and your notes.
3. **Test and measure.** Write tests, then benchmarks. A claim without a number
   is a guess.
4. **Write it down.** One note a week: the idea, the bug, the fix, the rule.
5. **Teach it back.** Explain it to someone who does not know the topic, or write
   the explanation as if you were.
6. **Review later.** Spaced repetition for facts; re-implementation for skills.

Keep one repository for the whole plan. Give each phase a directory with a
README, source, tests, benchmarks, and a short "what I got wrong" section. That
repository becomes your evidence, your revision material, and your interview
stories.

### The weekly rhythm

- **60% implementation.** Code, tests, debugging, benchmarks.
- **20% reading.** One chapter or lecture, not five tabs.
- **10% writing.** A note, a diagram, or a proof.
- **10% review.** Revisit last week's code and one older topic.

Every month, write a synthesis: what you can now do, what is still fuzzy, and
what you will revisit. Every quarter, pick one old implementation and rebuild it
from scratch. That is the anti-forgetting system.

## Phase 0 — Orientation

**Weeks 1–2.**

Set up the environment before the material gets hard:

- A C toolchain: `clang` or `gcc`, `make`, `gdb` or `lldb`, AddressSanitizer,
  and Valgrind.
- A high-level language: TypeScript with Node, or Python.
- Git, a terminal, and an editor you know well.
- A Linux environment: a VM, a container, or WSL. You need to see processes,
  files, and permissions, not just a browser.
- A public repository with a README and a study log.

Read MIT's *The Missing Semester* for the tools you were never taught. Write a
baseline: a small C program that reads a file and prints statistics, and the same
program in TypeScript or Python. Note what you had to look up.

**Gate:** a public repo with a README, a study log, and two working baseline
programs. You can compile, run, debug, and commit without following a tutorial.

## Phase 1 — Programming from first principles

**Weeks 3–5.**

You already know how to write code. This phase is about the parts underneath the
syntax:

- Values, types, variables, scope, and lifetime.
- Control flow, functions, recursion, and iteration.
- The stack and the heap. Value semantics versus reference semantics.
- Pointers and memory addresses. Arrays and pointer arithmetic.
- Input, output, files, and process exit codes.
- Errors as values, exceptions, and crashes.
- Testing, debugging, and reading a stack trace.
- Complexity: counting operations instead of guessing.

**Build:** a command-line tool that reads a text file, validates its input,
reports useful errors, and has a test suite. A word-frequency counter, a CSV
cleaner, or a tiny `grep` all work. Write it twice: once in C, once in your
high-level language. Compare what each language makes easy and what it hides.

**Gate:** you can explain every line of the C version, including the lifetime of
each allocation. The tests cover the happy path, an empty file, invalid input,
and a large file. You can debug a crash with `gdb` and find a leak with
Valgrind or ASan.

## Phase 2 — Discrete mathematics

**Weeks 6–9.**

Discrete math is the grammar of computer science. It is also the antidote to
"it works on my machine" reasoning.

- Propositional and predicate logic. Truth tables, quantifiers, negation.
- Proof techniques: direct proof, contradiction, induction, strong induction.
- Sets, relations, functions, cardinality, countability.
- Combinatorics: permutations, combinations, the pigeonhole principle,
  inclusion–exclusion.
- Probability: conditional probability, independence, Bayes' theorem,
  expectation, variance, the law of large numbers.
- Number theory: divisibility, modular arithmetic, GCD, primes, modular inverse,
  a first look at RSA.
- Graphs and trees as mathematical objects: degree, paths, connectivity,
  coloring, trees.
- Recurrences and asymptotic notation.
- Boolean algebra, gates, and the connection to hardware.
- Linear algebra basics: vectors, matrices, dot products, transformations, and
  eigenvalues as a preview.

**Build:** a proof notebook with ten proofs you can explain without looking. A
probability simulation for the Monty Hall problem and the birthday paradox. A
modular-arithmetic toolkit: GCD, extended GCD, modular exponentiation, and a
small RSA demonstration. A graph property checker: connected components, cycles,
and bipartiteness.

**Gate:** prove a recurrence by induction, explain Bayes with a concrete example,
implement modular exponentiation, and run a simulation with a confidence
interval. You can say what a proof does not prove.

## Phase 3 — Data structures

**Weeks 10–16.**

This is the center of the plan. Do not memorize implementations. Learn the
representation, the operations, the cost, and the tradeoff, then build it.

- Arrays, dynamic arrays, strings, and the cost of resizing.
- Linked lists: singly, doubly, circular. When they are worse than arrays.
- Stacks, queues, deques, and ring buffers.
- Hash tables: chaining, open addressing, load factor, resizing, clustering,
  deletion, hash functions, and adversarial inputs.
- Trees: binary trees, binary search trees, tree traversals, height and balance.
- Balanced trees: AVL rotations, red–black invariants, and why databases prefer
  B-trees.
- Heaps and priority queues: binary heaps, heapify, and heapsort.
- Tries and prefix trees; radix trees as a preview.
- Graphs: adjacency lists, adjacency matrices, edge lists, directed and
  undirected graphs, weighted graphs.
- Union–find: path compression and union by rank.
- Applied structures: LRU cache, Bloom filter, skip list, segment tree, Fenwick
  tree. Pick two; know when to reach for them.
- Immutability and persistent structures as a design choice, not a default.

For every structure, answer:

| Question | Why it matters |
| :--- | :--- |
| What is the representation? | The layout determines the cost. |
| What are the operations? | Insert, delete, search, iterate, range query. |
| What is the complexity? | Average, worst, amortized, and space. |
| What is the tradeoff? | Memory, locality, simplicity, concurrency. |
| When would I not use it? | The negative case is the real knowledge. |

**Build:** a from-scratch library with a common interface: a dynamic array, a
hash table with open addressing, a binary heap, a BST, an AVL or red–black tree,
a trie, a graph, and union–find. Add property-based tests, a benchmark harness,
and a README with complexity tables. If you want a stretch goal, build a
visualizer for the tree rotations and the hash table resizing.

**Gate:** implement the structures from a blank file, without AI, and pass the
tests. Explain amortized resizing, hash collisions, tree balance, and the
difference between a B-tree and a binary search tree. Profile one structure and
show a number.

## Phase 4 — Algorithms

**Weeks 17–23.**

Algorithms are not a list of tricks. They are ways of turning a problem into a
smaller one.

- Complexity analysis: Big-O, Big-Theta, Big-Omega, amortized analysis, space.
- Recursion, divide and conquer, and backtracking.
- Sorting: insertion, selection, merge, quick, heap, counting, radix. Know what
  is stable, in-place, adaptive, and when the library sort is the right answer.
- Searching: binary search and its variants; lower bound and upper bound.
- Greedy algorithms: interval scheduling, Huffman coding, coin change
  counterexamples.
- Dynamic programming: 1D and 2D state, knapsack, longest common subsequence,
  edit distance, interval DP, bitmask DP, and the discipline of defining the
  state before writing the recurrence.
- Graph algorithms: BFS, DFS, topological sort, connected components, Dijkstra,
  Bellman–Ford, Floyd–Warshall, Prim, Kruskal, strongly connected components,
  and a first look at max flow.
- String algorithms: KMP, Rabin–Karp, tries, and a preview of suffix arrays.
- Randomized algorithms: randomized quicksort, reservoir sampling, and
  Monte Carlo versus Las Vegas.
- NP-hardness: reductions, approximation, and knowing when to stop looking for
  an exact polynomial algorithm.

**Build:** a sorting benchmark that compares five algorithms on different input
distributions; a route planner using Dijkstra and A*; a diff tool using LCS; a
task scheduler using greedy and DP; a string search tool using KMP and a trie.
Solve 30–40 problems across the patterns, not 300 random ones. For each problem,
write the state, the invariant, the complexity, and one alternative.

**Gate:** solve an unseen problem while explaining your reasoning. Implement
Dijkstra, Bellman–Ford, topological sort, KMP, and a dynamic program from
scratch. Explain when a greedy algorithm is wrong and why.

## Phase 5 — Computer architecture and C

**Weeks 24–28.**

You cannot reason about performance if the machine is a black box.

- Binary, hexadecimal, two's complement, integer overflow.
- Floating point: representation, rounding, and why `0.1 + 0.2` is not `0.3`.
- Gates, combinational logic, sequential logic, and a simple CPU.
- Instruction sets, registers, addressing modes, and assembly.
- The fetch–decode–execute cycle, pipelining, hazards, and branch prediction.
- Caches: locality, cache lines, associativity, write policies, and false
  sharing.
- The memory hierarchy: registers, L1/L2/L3, RAM, disk, and the cost of a miss.
- Virtual memory, page tables, TLBs, and the MMU.
- Compilation, linking, loading, static versus dynamic libraries.
- I/O, interrupts, DMA, and memory-mapped I/O.
- Performance: profiling, `perf`, cachegrind, and measuring before optimizing.

**Build:** a C dynamic array and string library with tests and sanitizers; a
cache simulator that reports hit and miss rates for a trace; a matrix
multiplication experiment that shows the effect of loop order on cache
behavior; a small program that reads a compiler-generated assembly listing and
explains it.

**Gate:** read a short assembly function and say what it does. Explain why a
cache-friendly loop is faster with a measurement. Use ASan and Valgrind to find
a memory error. Explain the difference between virtual and physical memory.

## Phase 6 — Operating systems

**Weeks 29–33.**

An operating system is the contract between your program and the machine. Learn
the contract by using it and, where possible, implementing a small part of it.

- Processes: address space, fork/exec, wait, signals, exit codes.
- Threads: stacks, shared memory, context switches, and the cost of a thread.
- System calls and the user/kernel boundary.
- Scheduling: FIFO, shortest job first, round robin, priority, and fairness.
- Synchronization: mutexes, semaphores, condition variables, atomics, and
  memory ordering.
- Deadlock: the four conditions, detection, prevention, and avoidance.
- Memory management: paging, segmentation, page replacement, and `malloc`.
- File systems: inodes, directories, journaling, and crash consistency.
- I/O: blocking, non-blocking, polling, interrupts, and `epoll`/`kqueue`.
- Containers: namespaces, cgroups, and why a container is not a tiny VM.
- Virtualization and the hypervisor boundary.

**Build:** a shell with pipes, redirection, background jobs, and signal
handling; a thread pool with a work queue; a producer–consumer queue; a simple
memory allocator with free lists; a `strace`-based report on a program's system
calls.

**Gate:** implement the shell and the thread-safe queue. Explain a deadlock you
created and how you fixed it. Use `strace` to explain what a process does when it
opens a file. Explain what happens on a page fault.

## Phase 7 — Networks

**Weeks 34–37.**

The network is the most common source of "it works locally" failures.

- Layering and encapsulation: application, transport, network, link.
- IP addressing, subnets, routing, NAT, and ARP.
- TCP: handshake, sequence numbers, acknowledgements, retransmission, flow
  control, and congestion control.
- UDP: when reliability is the wrong default.
- DNS: resolution, caching, TTLs, and record types.
- HTTP/1.1, HTTP/2, HTTP/3, headers, methods, status codes, and caching.
- TLS: certificates, the handshake, trust chains, and common failures.
- Sockets: blocking, non-blocking, and the connection lifecycle.
- Proxies, reverse proxies, load balancers, and CDNs.
- WebSockets and server-sent events.
- Debugging: `curl`, `dig`, `tcpdump`, Wireshark, and browser dev tools.

**Build:** an HTTP/1.1 server with keep-alive, routing, headers, and error
handling; a DNS client that resolves A and AAAA records; a chat server over
TCP; a reverse proxy that adds a header and forwards requests; a TLS experiment
with a self-signed certificate.

**Gate:** implement the HTTP server and explain the request lifecycle from DNS
to TLS to the first byte. Diagnose a connection timeout with `curl` and
`tcpdump`. Explain the difference between TCP and UDP with a use case for each.

## Phase 8 — Databases

**Weeks 38–41.**

Most applications are databases with a UI. Learn the data model, the query
planner, and the failure modes.

- The relational model, keys, constraints, and relational algebra.
- SQL: joins, aggregates, subqueries, CTEs, window functions, and transactions.
- Schema design: normalization, denormalization, and the cost of each.
- Indexes: B-trees, hash indexes, composite indexes, covering indexes, partial
  indexes, and selectivity.
- Query planning: `EXPLAIN`, statistics, join strategies, and the difference
  between a sequential scan and an index scan.
- Transactions: ACID, isolation levels, anomalies, MVCC, and locking.
- Replication: leader–follower, read replicas, lag, failover, and split brain.
- Partitioning and sharding: when a single Postgres is still the right answer.
- Backup and restore: full, incremental, point-in-time recovery, and drills.
- Caching: Redis, invalidation, and the two hard problems.
- NoSQL: document, key-value, wide-column, graph, and vector stores. Learn the
  tradeoff, not the marketing.
- Search and vector databases as specialized indexes, not magic.

**Build:** a schema for a real application with constraints and indexes; a slow
query tuned with before-and-after numbers; a migration with a rollback plan; a
backup and restore drill; a small B-tree or key-value store with persistence.

**Gate:** design a schema from a set of requirements and defend it. Read a query
plan and explain why an index is or is not used. Explain an isolation anomaly and
how you would prevent it. Restore a database from backup.

## Phase 9 — Theory and compilers

**Weeks 42–45.**

Theory tells you what is possible. Compilers show you how a language becomes a
machine.

- Finite automata, regular expressions, and regular languages.
- Context-free grammars, derivations, ambiguity, and parsing.
- Turing machines, computability, the halting problem, and decidability.
- Complexity classes: P, NP, NP-complete, reductions, and what "hard" means.
- Lexing: tokens, regular expressions, and a hand-written lexer.
- Parsing: recursive descent, Pratt parsing, precedence, and error recovery.
- Abstract syntax trees and semantic analysis.
- Type checking: rules, inference, and the difference between checking and
  guessing.
- Intermediate representations, bytecode, and a stack machine.
- Optimization: constant folding, dead code elimination, and inlining.
- Code generation, calling conventions, and a first look at JIT.
- Garbage collection: reference counting, tracing, and generational collectors.

**Build:** a regular-expression engine; a small interpreter with variables,
functions, closures, and conditionals; a compiler from a tiny language to
bytecode with a VM; a type checker for a subset of TypeScript or a small ML-like
language.

**Gate:** write a recursive-descent parser and an interpreter from scratch.
Explain why the halting problem is undecidable. Explain what a type checker
rejects and why. Explain the difference between an interpreter and a compiler.

## Phase 10 — Distributed systems

**Weeks 46–50.**

One machine is a special case. Distribution is the general case, and it is where
the interesting failures live.

- Failure models: crash, omission, timing, Byzantine, and partial failure.
- Timeouts, retries, backoff, jitter, and idempotency.
- CAP, PACELC, and consistency models: linearizability, sequential consistency,
  causal consistency, and eventual consistency.
- Replication: leader–follower, multi-leader, quorum, and conflict resolution.
- Consensus: Raft, leader election, log replication, and membership changes.
- Partitioning, rebalancing, and hot keys.
- Clocks: physical, logical, Lamport, vector clocks, and causality.
- Distributed transactions, two-phase commit, sagas, and compensation.
- Queues and streams: at-most-once, at-least-once, exactly-once, and why the
  last one is usually a property of the consumer.
- Observability: traces, correlation IDs, metrics, and logs.
- Case studies: Kafka, etcd, Dynamo, Spanner, and a simple replicated store.

**Build:** a replicated key-value store with Raft, persistence, snapshots, and a
client; a job queue with idempotent workers and retries; a failure-injection
test that kills a node and verifies recovery; a trace that follows one request
across services.

**Gate:** implement leader election and log replication. Explain a consistency
model with an example and a counterexample. Write a failure matrix for your
system. Explain why exactly-once delivery is a myth and what you do instead.

## Phase 11 — Software engineering and security

**Weeks 51–53.**

The last layer is judgment: how to change a system without breaking it, and how
to keep it safe.

- Git workflows, small commits, code review, and readable history.
- Testing: unit, integration, end-to-end, property-based, fuzzing, and the
  testing pyramid as a heuristic, not a law.
- CI/CD: reproducible builds, caching, artifacts, and gates.
- Design patterns and their critics; modularity, boundaries, and dependency
  direction.
- Documentation: READMEs, ADRs, runbooks, and design docs.
- Threat modeling: assets, trust boundaries, attackers, and mitigations.
- OWASP: injection, broken access control, XSS, CSRF, SSRF, deserialization,
  and dependency risk.
- Authentication and authorization: sessions, tokens, OAuth, RBAC, and the
  difference between the two.
- Cryptography basics: hashing, salting, symmetric and asymmetric encryption,
  signatures, and TLS.
- Supply chain: lockfiles, audits, provenance, and reproducible builds.
- Incident response: detect, contain, eradicate, recover, and learn.

**Build:** add a CI gate to your capstone; write a threat model; run a dependency
audit; do a self-review against the OWASP Top 10; write a postmortem for an
incident you caused in a game day.

**Gate:** a threat model with real findings, a CI pipeline that blocks a bad
change, and a postmortem with a preventive action. You can explain the security
tradeoffs in your capstone without hand-waving.

## Phase 12 — Capstone

**Weeks 54–58.**

Choose one system and build it properly. The point is depth, not breadth.

- **A relational database:** storage engine, B-tree indexes, a SQL subset,
  transactions, recovery, and a query planner.
- **A distributed key-value store:** Raft, persistence, snapshots, a client, and
  failure injection.
- **A compiler:** a small language, a parser, a type checker, a bytecode VM, and
  an optimizer.
- **A search engine:** crawler, inverted index, ranking, query parsing, and
  evaluation.
- **A small operating system:** boot, scheduler, virtual memory, a shell, and a
  file system.
- **A network stack or proxy:** TCP, HTTP, TLS, connection pooling, and
  observability.

Requirements:

- A design doc with goals, non-goals, constraints, and tradeoffs.
- An ADR for every decision you would otherwise forget.
- Tests, including property-based tests and failure tests.
- Benchmarks with numbers and a baseline.
- A security review and a threat model.
- A README a stranger can follow.
- A postmortem: what broke, what you changed, and what you would do differently.
- A demo or a public write-up.

**Gate:** a stranger can run it from the README. You can explain every design
decision and the alternatives you rejected. You have numbers, tests, and a
failure story. The code is yours.

## Retention: keeping the core

The core does not stay with you because you finished a course. It stays because
you use it.

- **Spaced repetition for facts.** Complexity tables, system calls, TCP states,
  isolation levels, and definitions. Keep the deck small and honest.
- **Re-implementation for skills.** Once a quarter, rebuild one data structure
  or one system component from a blank file. Compare it to your old version.
- **Teach-back for understanding.** Write the note you wish you had read. If you
  cannot explain it without jargon, you do not know it yet.
- **Interleaving for transfer.** Mix an old topic into each new phase. When you
  study databases, revisit B-trees. When you study networks, revisit queues.
- **Benchmarks for intuition.** Measure. A cache is not "fast"; it is faster for
  this access pattern, by this much.
- **A bug log for judgment.** Record the symptom, the cause, the fix, and the
  rule. Re-read it monthly. Patterns emerge.

### The AI policy

Use AI as a tutor, a reviewer, and a test generator. Do not use it to write the
first pass of a core implementation.

- **Closed-book gates.** The gate is the moment you find out what you actually
  know. No AI, no autocomplete, no search.
- **AI after the first pass.** Ask it to critique your design, suggest edge
  cases, or generate tests. Then verify every suggestion.
- **Rewrite generated code.** If you accept code, retype it, test it, and explain
  it. Otherwise it is not yours.
- **Keep a delegation log.** What did you ask for? What did it get wrong? What
  did you learn? This is the evidence that you are using AI as a tool rather
  than outsourcing your judgment.

## Resources

Books and website guides, mapped to each phase. This is a reading path, not a
bibliography. Each phase has one primary book, one free guide, and optional
depth. Read a chapter, build the thing, then come back. No book is worth
reading cover to cover before the first implementation.

### The short list

If you buy or borrow only eight things, these are the spine:

| # | Book | Use it for | Free? |
| :--- | :--- | :--- | :--- |
| 1 | *C Programming: A Modern Approach* — K. N. King | C, pointers, memory, the machine | No |
| 2 | *Mathematics for Computer Science* — Lehman, Leighton, Meyer | Logic, proofs, combinatorics, probability | [Yes, MIT](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/) |
| 3 | *Algorithms* — Sedgewick & Wayne | Data structures and algorithms with real code | [Companion site](https://algs4.cs.princeton.edu/home/) |
| 4 | *Computer Systems: A Programmer's Perspective* — Bryant & O'Hallaron | The machine, caches, linking, performance | [Labs](https://csapp.cs.cmu.edu/3e/labs.html) |
| 5 | *Operating Systems: Three Easy Pieces* — Arpaci-Dusseau | Processes, memory, concurrency, files | [Yes](https://pages.cs.wisc.edu/~remzi/OSTEP/) |
| 6 | *Computer Networking: A Top-Down Approach* — Kurose & Ross | HTTP down to packets | No |
| 7 | *Designing Data-Intensive Applications* — Kleppmann | Data, replication, partitioning, distributed systems | No |
| 8 | *Crafting Interpreters* — Nystrom | Parsing, ASTs, bytecode, a real language | [Yes](https://craftinginterpreters.com/) |

The alternative for C is *The C Programming Language* (Kernighan & Ritchie). It
is shorter and denser. Use it if you already know another language and want the
canonical reference; use King if you want exercises and a gentler path.

### The reference shelf

Do not read these cover to cover. Use them when a phase raises a question.

| Book | Use it for |
| :--- | :--- |
| *Introduction to Algorithms* — Cormen, Leiserson, Rivest, Stein | The authoritative algorithms reference |
| *The Algorithm Design Manual* — Skiena | Practical problem solving and a catalog of techniques |
| *Database Internals* — Petrov | Storage engines, B-trees, replication, consensus |
| *Introduction to the Theory of Computation* — Sipser | Automata, computability, complexity |
| *Computer Organization and Design* — Patterson & Hennessy | Architecture below the C level |
| *The Linux Programming Interface* — Kerrisk | System calls and POSIX reference |
| *TCP/IP Illustrated, Volume 1* — Stevens | Packet-level networking reference |
| *Security Engineering* — Anderson | Security as a system property; [free chapters](https://www.cl.cam.ac.uk/~rja14/book.html) |
| *The Pragmatic Programmer* — Hunt & Thomas | Craft, ownership, and judgment |
| *Refactoring* — Fowler | Changing code without changing behavior |

### Phase-by-phase reading path

| Phase | Primary book | Free website or course | Optional depth |
| :--- | :--- | :--- | :--- |
| 0 — Orientation | *The Pragmatic Programmer* | [MIT Missing Semester](https://missing.csail.mit.edu/) | *The DevOps Handbook* |
| 1 — Programming | *C Programming: A Modern Approach* | [CS50](https://cs50.harvard.edu/x/) | *The C Programming Language* |
| 2 — Discrete math | *Mathematics for Computer Science* | [MIT 6.042J](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/) | *Discrete Mathematics and Its Applications* (Rosen) |
| 3 — Data structures | *Algorithms* (Sedgewick & Wayne) | [VisuAlgo](https://visualgo.net/en), [Princeton Algorithms](https://algs4.cs.princeton.edu/home/) | *Data Structures and Algorithm Analysis* (Weiss) |
| 4 — Algorithms | *The Algorithm Design Manual* | [CP-Algorithms](https://cp-algorithms.com/), [NeetCode](https://neetcode.io/) | *Introduction to Algorithms* (CLRS) |
| 5 — Architecture and C | *Computer Systems: A Programmer's Perspective* | [CS:APP labs](https://csapp.cs.cmu.edu/3e/labs.html), [Nand2Tetris](https://www.nand2tetris.org/) | *Computer Organization and Design* |
| 6 — Operating systems | *Operating Systems: Three Easy Pieces* | [MIT 6.S081/6.1810](https://pdos.csail.mit.edu/6.S081/2021/schedule.html) | *The Linux Programming Interface* |
| 7 — Networks | *Computer Networking: A Top-Down Approach* | [Stanford CS144](https://cs144.github.io/), [Beej's Guide](https://beej.us/guide/bgnet/) | *TCP/IP Illustrated, Volume 1* |
| 8 — Databases | *Database Internals* | [CMU 15-445](https://15445.courses.cs.cmu.edu/), [Use The Index, Luke](https://use-the-index-luke.com/) | *Designing Data-Intensive Applications* |
| 9 — Theory and compilers | *Crafting Interpreters* | [Crafting Interpreters online](https://craftinginterpreters.com/), [Sipser lectures](https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/) | *Introduction to the Theory of Computation* |
| 10 — Distributed systems | *Designing Data-Intensive Applications* | [MIT 6.824/6.5840](https://pdos.csail.mit.edu/6.824/), [Raft](https://raft.github.io/) | *Distributed Systems* (Tanenbaum & van Steen) |
| 11 — Engineering and security | *The Pragmatic Programmer* + *Security Engineering* | [OWASP](https://owasp.org/), [PortSwigger Academy](https://portswigger.net/web-security), [MIT 6.858](https://ocw.mit.edu/courses/6-858-computer-systems-security-fall-2014/) | *The Web Application Hacker's Handbook* |
| 12 — Capstone | One system book from the list | The official docs and papers for your system | Whichever reference the system needs |

### Free websites and courses

| Site | Use it for |
| :--- | :--- |
| [MIT Missing Semester](https://missing.csail.mit.edu/) | Shell, Git, debugging, profiling, editors |
| [MIT OCW 6.042J](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/) | Discrete math lectures and exercises |
| [MIT OCW 6.006](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/) | Introduction to algorithms |
| [MIT OCW 6.046J](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/) | Advanced algorithms |
| [CS:APP labs](https://csapp.cs.cmu.edu/3e/labs.html) | Machine-level programming, caches, performance |
| [Nand2Tetris](https://www.nand2tetris.org/) | Gates to a working computer |
| [OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/) | The OS book, homework, and projects |
| [MIT 6.S081/6.1810](https://pdos.csail.mit.edu/6.S081/2021/schedule.html) | xv6 operating systems labs |
| [Stanford CS144](https://cs144.github.io/) | TCP/IP and network programming labs |
| [CMU 15-445](https://15445.courses.cs.cmu.edu/) | Database systems and storage |
| [MIT 6.824/6.5840](https://pdos.csail.mit.edu/6.824/) | Distributed systems labs |
| [Crafting Interpreters](https://craftinginterpreters.com/) | A free book on interpreters and compilers |
| [Use The Index, Luke](https://use-the-index-luke.com/) | SQL indexing and query performance |
| [Beej's Guide to Network Programming](https://beej.us/guide/bgnet/) | Sockets without the mystery |
| [VisuAlgo](https://visualgo.net/en) | Data structure and algorithm visualizations |
| [CP-Algorithms](https://cp-algorithms.com/) | Algorithm implementations and explanations |
| [OWASP](https://owasp.org/) | Web application security |
| [PortSwigger Web Security Academy](https://portswigger.net/web-security) | Free, hands-on security labs |
| [Google SRE](https://sre.google/books/) | SRE and the SRE Workbook |
| [The Twelve-Factor App](https://12factor.net/) | Service design and deployment hygiene |

### How to read a technical book

- **Read the table of contents first.** Choose the chapters that map to the phase.
  A book is a reference library, not a train you must ride to the end.
- **Read one chapter, then implement.** Close the book and write the smallest
  example from memory. The gap between "I understood that" and "I can build
  that" is the curriculum.
- **Do the exercises.** They are the actual book. If a book has no exercises,
  invent one: change the input, break the invariant, measure the result.
- **Keep a one-page summary per chapter.** The idea, the code, the failure, and
  the question you still have. This becomes your revision material.
- **Use the index later.** After the first pass, books are for looking things up,
  not for rereading.
- **Prefer the free official edition or a library.** Buy only the books you will
  annotate. Do not build a shelf you are afraid to write in.
- **If a book is too hard, switch to the gentler one.** Do not abandon the topic
  because the first author assumed more than you have.

### What to skip

- Do not read CLRS cover to cover before writing a hash table.
- Do not read the Dragon Book before building an interpreter.
- Do not read Kubernetes documentation before Linux and containers.
- Do not collect ten courses. One primary source plus the build is enough.
- Do not use LeetCode as a substitute for systems projects. It is a gym, not a
  curriculum. Use Advent of Code or Exercism for fluency, not for depth.

## The first 30 days

A concrete start, before the calendar matters:

**Week 1.** Install the C toolchain and a Linux environment. Write, compile, and
debug a "hello, world" in C. Create the repository, the README, and the study
log. Read the first chapter of *The Missing Semester*.

**Week 2.** Write a C program that reads a file, counts lines and words, and
handles errors. Write the same in TypeScript or Python. Add tests. Commit both.

**Week 3.** Learn the stack and the heap by drawing the memory of a small
program. Write a dynamic array in C. Add tests and a sanitizer run. Write a short
note on what you got wrong.

**Week 4.** Start discrete math: logic, sets, and induction. Write three proofs.
Build a probability simulation. Review the C code from week 3 and refactor one
function.

At the end of 30 days you should have: a public repository, a study log, a C
program with tests, a high-level counterpart, three proofs, and a clear answer to
"what did I not understand this week?"

## How this maps to this site

The site is the public notebook for the same path:

- [The learning path](/sanjay/path/) — every published note, in order.
- [Topics](/sanjay/topics/) — the subjects across series.
- [The real path to becoming a software developer](/sanjay/plans/software-developer/) — the broad, zero-to-shipped route.
- [The software AI developer](/sanjay/plans/software-ai-developer/) — the applied full-stack AI route.
- [The underrated fundamentals](/sanjay/plans/underrated-fundamentals/) — the ten lenses underneath every phase.
- [The log](/sanjay/log/) — the raw sessions behind the notes.

The deep dives from this plan belong in the site's **backend**, **craft**,
**tools**, and **packages** series slots. The series pages appear when the first
note is published; until then, this plan is the map.

## The point

The core is not a phase you finish. It is a set of questions you keep asking:
What is the representation? What is the cost? What happens on failure? What did
I measure? What would I do differently?

Frameworks will change. The model will change. Those questions will still be
there.
