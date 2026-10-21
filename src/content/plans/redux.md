---
title: "The Redux plan — legacy Redux first, then Redux Toolkit"
description: "The full curriculum behind the Redux series: thirty-six steps that learn Redux the old way, a legacy-to-RTK migration map, and how each step became one of the sixteen published notes."
series: "redux"
date: "2026-12-03"
---

A phased, step-by-step curriculum to learn **Redux, Redux Toolkit, react-redux and
redux-thunk**, understand every part and the data flow, and **migrate legacy Redux
to RTK**. Work top to bottom. Every step is written so it can later be promoted
into a blog post using this site's 7-section format.

**The rule:** learn the legacy way first, feel the pain, then let RTK remove it.
Skipping ahead makes RTK feel like magic; going in order makes it feel obvious.

---


## How this plan became sixteen notes

The plan has thirty-six steps. The series has sixteen notes, because a note
a day is the pace I can keep, and because several steps belong in the same
note: learning `combineReducers` and learning `configureStore` is one
idea, not two.

| Note | Steps it covers |
| :--- | :--- |
| 01 | 01 — why state management exists |
| 02 | 02 — the three principles |
| 03 | 03 — one-way data flow |
| 04 | 04 — `createStore`, `dispatch`, `getState`, `subscribe` |
| 05 | 05, 06 — actions, action types and action creators |
| 06 | 07 — reducers and `switch` |
| 07 | 08 — immutability and spread |
| 08 | 09 — `combineReducers` |
| 09 | 10 — a hand-built store (checkpoint) |
| 10 | 11, 12 — why reducers cannot be async, and `redux-thunk` |
| 11 | 13 — the manual async lifecycle |
| 12 | 20, 21, 22 — `configureStore`, `createSlice`, Immer |
| 13 | 23, 24 — `extraReducers` and composing slices |
| 14 | 25, 27 — `createAsyncThunk` and `createEntityAdapter` |
| 15 | 15, 16, 17, 18, 19 — `Provider`, `connect`, hooks, selectors |
| 16 | 29–36 — the migration, TypeScript, testing, and when not to use Redux |

Steps 14 (saga and observable), 26, 28, 28 (RTK Query) and 37+ are not
notes of their own. They are covered inside the notes above, or they are
knowing that a thing exists — which is a different kind of knowledge from
knowing how it works.

---

## Table of contents

- [The one mental model (data flow)](#the-one-mental-model-data-flow)
- [Glossary — every piece named once](#glossary--every-piece-named-once)
- [Phase 0 — Foundations](#phase-0--foundations)
- [Phase 1 — Legacy Redux core](#phase-1--legacy-redux-core)
- [Phase 2 — Async in legacy Redux](#phase-2--async-in-legacy-redux)
- [Phase 3 — React bindings (react-redux)](#phase-3--react-bindings-react-redux)
- [Phase 4 — Redux Toolkit core](#phase-4--redux-toolkit-core)
- [Phase 5 — Async the RTK way](#phase-5--async-the-rtk-way)
- [Phase 6 — Data fetching](#phase-6--data-fetching)
- [Phase 7 — Migration legacy → RTK](#phase-7--migration-legacy--rtk)
- [Phase 8 — TS, testing, and "do I even need Redux?"](#phase-8--ts-testing-and-do-i-even-need-redux)
- [Master step list](#master-step-list)
- [Legacy → RTK migration map](#legacy--rtk-migration-map)
- [Mapping a step to a blog post](#mapping-a-step-to-a-blog-post)
- [Recommended resources](#recommended-resources)

---


## How I work this track

1. Read the plan top to bottom, so I know the whole map before the first
   step.
2. Work the steps **in order**. The legacy parts are not optional — RTK only
   makes sense once I have felt the boilerplate it removes.
3. After each step, write a short entry in the
   [log](/sanjay/log/): what I learned, the flow in my own words, and the
   gotcha that bit me.
4. Promote the step into a note, following the same seven-section format as
   every other note on this site.

The one mental model everything hangs off:

```
   ┌──────────────────────────────────────────────────────────┐
   │                                                          │
   ▼                                                          │
 UI event ──► dispatch(action) ──► reducer(state, action) ──► new state
 (component)      (store)              (pure fn)         (store updated)
                                                     │
                                                     └─► subscribers notified
                                                           └─► UI re-renders
```

Every step is one arrow in that diagram, made concrete.

---

## The one mental model (data flow)

Learn this once; every step is a concrete version of one arrow.

**Legacy / vanilla Redux:**

```
UI event
  │  store.dispatch(action)
  ▼
Middleware (e.g. redux-thunk) ── can run async, dispatch more actions
  │  (sync) reducer(state, action)
  ▼
Reducer (pure) ── returns a brand-new state (no mutation)
  │
  ▼
Store swaps in the new state
  │  store.subscribe(listener) fires
  ▼
react-redux notifies components ──► UI re-renders with new state
```

**Modern Redux Toolkit (same flow, fewer moving parts):**

```
UI event
  │  dispatch(sliceAction)            or            dispatch(asyncThunk())
  ▼                                                            │
configureStore (thunk + DevTools built in)                      │
  │                                                            │
  ├─ SYNC:  slice case reducer (Immer draft) → new state        │
  │                                                            │
  └─ ASYNC: thunk ─ pending ─► API call ─ fulfilled/rejected ─►
                   extraReducers handle the outcome → new state
  │
  ▼
useSelector reads state (memoized selectors) ─► React re-renders only what changed
```

Two things never change, legacy or RTK:

1. **State is read-only to components** — you never mutate it, you `dispatch`.
2. **Reducers stay pure** — no async, no side effects, no mutation. Side effects
   live in middleware/thunks; "safe mutation" lives in Immer drafts.

---

## Glossary — every piece named once

- **Action** — plain object `{ type: string, payload?: any }` describing what
  happened. The *only* way to say "something happened" to the store.
- **Action creator** — a function that returns an action: `increment()` →
  `{ type: 'counter/increment' }`. Sugar for not hand-writing objects.
- **Reducer** — pure `(state, action) => newState`. Switches on `action.type`.
- **`combineReducers`** — splits the state tree into slices, one reducer per key.
- **Store** — the single object holding state; `dispatch`, `getState`,
  `subscribe`, (and `replaceReducer`). Created by `createStore` (legacy) or
  `configureStore` (RTK).
- **Middleware** — wraps `dispatch` to intercept actions (logging, async). Applied
  in a pipeline between dispatch and the reducer.
- **Thunk** — a function returned by an action creator instead of an object;
  handled by `redux-thunk` so you can do async work and dispatch many actions.
- **`<Provider store>`** — react-redux component that puts the store on React
  context so any descendant can read/dispatch.
- **`connect()`** — legacy HOC wiring `mapStateToProps` / `mapDispatchToProps`.
- **`useSelector` / `useDispatch`** — the modern react-redux hooks (replaces most
  `connect` usage).
- **Selector** — a function `state => value` reading part of the tree; memoized
  ones (`createSelector`) avoid recompute and needless re-renders.
- **Slice (RTK)** — one feature's `{ name, initialState, reducers }`; auto-creates
  action types + creators and wires them to a reducer via Immer.
- **Immer** — lets you "mutate" a draft state in a reducer; it produces a new
  immutable object for you.
- **`configureStore` (RTK)** — one-call store setup: combines slice reducers, adds
  thunk middleware, enables DevTools, adds dev checks.
- **`createAsyncThunk` (RTK)** — a thunk with a built-in
  `pending / fulfilled / rejected` lifecycle.
- **`createEntityAdapter` (RTK)** — normalized (id-keyed) CRUD state + selectors.
- **RTK Query** — RTK's data-fetching/caching layer (`createApi`) for server state.

---

## Phase 0 — Foundations

Goal: know the vocabulary and *why* Redux exists before writing any.

- **Step 01 — Why state management / the problem Redux solves.**
  What: prop drilling, state scattered across components, "who owns this?".
  Build a tiny counter with plain React `useState` lifted to a common parent and
  feel the pain when a sibling 4 levels down needs it.
  Flow (your words): a click deep in the tree has to bubble data back up before it
  can come down to a distant sibling.
  Practice: list the props you had to thread through that had nothing to do with
  the intermediate components.

- **Step 02 — The three principles.**
  Single source of truth, state is read-only, changes via pure reducers. Read the
  official "three principles" page. These three sentences justify *everything*
  that follows, including the boilerplate.

- **Step 03 — Mental model of one-way data flow.**
  Draw the diagrams above by hand from memory. If you can reproduce the diagram,
  you can debug any Redux app.

---

## Phase 1 — Legacy Redux core

Goal: build a working store by hand, the old way. This is the "before" you'll
migrate away from, so do it for real — `npm i redux` in a scratch project.

- **Step 04 — `createStore`, `dispatch`, `getState`, `subscribe`.**
  `const store = createStore(reducer)`. Log state on every subscribe. Fire a
  couple of `dispatch({ type: 'INCREMENT' })` and watch the store notify.
  Flow: dispatch → reducer → new state → subscribers.

- **Step 05 — Actions & action type constants.**
  Hand-write `{ type: 'ADD_TODO', payload: text }`. Feel the typo risk of raw
  strings; that's exactly why people wrote `const ADD_TODO = 'ADD_TODO'`.

- **Step 06 — Action creators.**
  `const addTodo = text => ({ type: 'ADD_TODO', payload: text })`. Learn why they
  exist (one place to change shape) and that they are just functions.

- **Step 07 — Reducers & `switch` statements.**
  `(state = initialState, action) => switch (action.type) {...}`. Always return
  the *previous* state as the default. Understand purity + why returning the same
  reference for unchanged slices matters for re-renders.

- **Step 08 — Immutability & spread.**
  Never mutate. `return { ...state, todos: [...state.todos, action.payload] }`.
  Reproduce a "mutation bug" (mutate `state.todos.push(...)` and see why React
  does not re-render / DevTools shows no change). This is the pain Immer removes.

- **Step 09 — `combineReducers` & multiple slices.**
  Split `todos` and `filter` reducers; see the state tree keys come from reducer
  names. Understand the one rule: each combined reducer only owns its own slice.

- **Step 10 — A complete hand-built store (checkpoint).**
  Wire 04–09 into one mini app (a todo or cart) with no UI framework yet — just
  `store.subscribe(render)`. If this works, you truly understand Redux.

---

## Phase 2 — Async in legacy Redux

Goal: do real work (fetch data) while keeping reducers pure.

- **Step 11 — Why reducers can't be async.**
  A pure function can't `await`. So async has to happen *before* dispatch, in a
  thunk or middleware.

- **Step 12 — `redux-thunk` middleware.**
  `applyMiddleware(thunk)`. A thunk action creator returns a **function**
  `(dispatch, getState) => {...}` instead of an object. Now you can `await` a
  fetch and `dispatch` several actions: `FETCH_START`, `FETCH_SUCCESS`,
  `FETCH_ERROR`. This REQUEST/SUCCESS/FAILURE triple is the thing
  `createAsyncThunk` later automates.

- **Step 13 — The manual async lifecycle (the pain).**
  Write it fully by hand: a `loading` boolean, an `error` string, three action
  types, three reducer cases, and error handling. Count the lines. This is the
  boilerplate RTK targets.

- **Step 14 — (Awareness) other middleware.**
  Know `redux-saga` (generators), `redux-observable` (RxJS) exist and *why* most
  teams just use thunk. Don't deep-dive — know the tradeoff.

---

## Phase 3 — React bindings (react-redux)

Goal: connect React to the store, legacy style then modern style.

- **Step 15 — `<Provider store={store}>`.**
  Put the store on context once at the app root. Everything else reads from it.

- **Step 16 — `connect()` + `mapStateToProps` / `mapDispatchToProps`.**
  The legacy HOC. Understand what each map does and the "return a new object from
  mapStateToProps causes re-renders" footgun (returns a fresh `{}` each time).

- **Step 17 — `useSelector` + `useDispatch` (the modern hooks).**
  Replace `connect`. `useSelector(s => s.todos.items)`. Learn the equality footgun
  (returning a new array/object from the selector re-renders every dispatch) and
  the fix: select the smallest slice, or use a memoized selector.

- **Step 18 — Selectors & `reselect` (`createSelector`).**
  Derive data (e.g. filtered todos) in a memoized selector so it only recomputes
  when its inputs change. This is both a perf and a re-render fix.

- **Step 19 — Rendering & performance habits.**
  Select narrow slices; keep components small; don't dispatch in render. Reproduce
  an over-render and fix it with a better selector.

---

## Phase 4 — Redux Toolkit core

Goal: rewrite Phase 1 in RTK and feel the boilerplate evaporate.

- **Step 20 — Why RTK + `configureStore`.**
  RTK is the official, recommended way. `configureStore({ reducer })` gives you
  thunk middleware + Redux DevTools + good defaults **for free**. Compare to your
  hand-built `createStore(...applyMiddleware(thunk))`.

- **Step 21 — `createSlice`: name, initialState, reducers.**
  One file per feature. Inside `reducers`, write **case reducer functions** that
  take `(state, action)` — RTK auto-generates the action types
  (`'todos/addTodo'`) and action creators (`slice.actions.addTodo`). No more
  constants, no more switch, no more manual creators.

- **Step 22 — Immer: "mutate" the draft safely.**
  In a case reducer, write `state.items.push(action.payload)` — Immer records it
  and returns a new immutable object. This directly fixes the Step 08 pain. Know
  the rule: either mutate the draft **or** return a new state, not both; and never
  keep references to the draft outside the reducer.

- **Step 23 — `extraReducers`.**
  Handle actions from *other* slices or from async thunks inside this slice —
  object form (`'other/action': reducer`) or builder-callback form. This replaces
  responding to cross-slice action types by hand.

- **Step 24 — Composing slices into the store.**
  `configureStore({ reducer: { todos: todosReducer, filter: filterReducer } })`.
  Same tree shape as `combineReducers`, with zero manual wiring.

---

## Phase 5 — Async the RTK way

Goal: replace the Step 13 hand-written lifecycle.

- **Step 25 — `createAsyncThunk`.**
  `createAsyncThunk('todos/fetchTodos', async () => api.get())` auto-dispatches
  `pending`, `fulfilled`, `rejected`. Handle them in `extraReducers`. Compare
  side-by-side with your Step 12/13 code — same behavior, a fraction of the lines.
  Learn `thunkAPI` (`getState`, `dispatch`) and `condition` / rejection handling.

- **Step 26 — The full CRUD async feature (checkpoint).**
  Build create/read/update/delete with `createAsyncThunk` + `extraReducers`
  loading/error state. This is the modern replacement for the entire Phase 2 pain.

- **Step 27 — `createEntityAdapter`.**
  For collections keyed by id: normalized `{ ids, entities }`, plus `addOne`,
  `updateOne`, `removeOne`, `setAll` and generated selectors. Use it whenever you
  store a list you'll look items up in.

---

## Phase 6 — Data fetching

Goal: know when Redux thunks are *not* the right tool.

- **Step 28 — RTK Query (`createApi`).**
  Declare endpoints once; RTK Query handles caching, dedup, loading/error state,
  polling, and invalidation, and generates hooks. For *server cache*, prefer it
  over hand-rolled thunks.
  Contrast: thunks = you orchestrate; RTK Query = it orchestrates caching for you.

---

## Phase 7 — Migration legacy → RTK

Goal: move a real legacy codebase to RTK **incrementally, without a big bang**.
Redux Toolkit builds on Redux, so old and new coexist under one store.

- **Step 29 — The safe migration strategy (read first).**
  Order of operations (do not skip):
  1) Swap `createStore(...applyMiddleware(thunk))` → `configureStore`, keeping your
     existing reducers working (RTK accepts plain reducers as-is).
  2) Convert **one** feature at a time into a slice (`createSlice`), starting with
     a leaf feature that has no dependents.
  3) Update imports that referenced old action creators/types to `slice.actions`.
  4) Convert async thunks to `createAsyncThunk` last, one at a time.
  5) Delete the old reducer + action files only after the slice is verified.
  Keep DevTools open; replay the same actions and diff state before/after.

- **Step 30 — Migrate a synchronous slice.**
  Take one legacy reducer + its constants/creators → one `createSlice` with Immer
  drafts. Verify identical action types and state shape.

- **Step 31 — Migrate a thunk.**
  Turn a hand-written `FETCH_*` thunk into `createAsyncThunk` +
  `extraReducers` for pending/fulfilled/rejected.

- **Step 32 — Migrate `connect` → hooks.**
  Convert one `connect`ed component to `useSelector`/`useDispatch`. Keep
  `mapStateToProps` logic as a selector; fix the equality footgun from Step 17.

- **Step 33 — Mixed store & cleanup (checkpoint).**
  Run with some features on RTK and some still legacy under one `configureStore`.
  Finish migrating, then delete the legacy files. Prove identical behavior with
  the same action sequence in DevTools.

---

## Phase 8 — TS, testing, and "do I even need Redux?"

Goal: harden the track with types, tests, and judgment.

- **Step 34 — TypeScript with RTK.**
  Type `initialState`, infer `RootState`/`AppDispatch` from the store, and make
  pre-typed `useAppDispatch` / `useAppSelector` hooks. Typed thunks and
  `extraReducers` builder form.

- **Step 35 — Testing.**
  Reducers are pure — trivial to unit test. Test a slice's case reducers, an async
  thunk's fulfilled/rejected path, and a component via its hooks with a test store.

- **Step 36 — When *not* to use Redux.**
  Judgment call. Local UI state → `useState`; server cache → RTK Query or a data
  lib; URL state → the router. Reach for Redux for genuinely shared, long-lived
  client state. Being able to argue this is a senior signal.

---

## Master step list

| # | Step | Phase |
| :-- | :--- | :--- |
| 01 | Why state management | 0 |
| 02 | The three principles | 0 |
| 03 | One-way data flow model | 0 |
| 04 | createStore / dispatch / getState / subscribe | 1 |
| 05 | Actions & type constants | 1 |
| 06 | Action creators | 1 |
| 07 | Reducers & switch | 1 |
| 08 | Immutability & spread | 1 |
| 09 | combineReducers | 1 |
| 10 | Hand-built store (checkpoint) | 1 |
| 11 | Why reducers can't be async | 2 |
| 12 | redux-thunk middleware | 2 |
| 13 | Manual async lifecycle (the pain) | 2 |
| 14 | Awareness: saga / observable | 2 |
| 15 | Provider | 3 |
| 16 | connect + mapState/mapDispatch | 3 |
| 17 | useSelector + useDispatch | 3 |
| 18 | Selectors & createSelector | 3 |
| 19 | Rendering & performance | 3 |
| 20 | configureStore / why RTK | 4 |
| 21 | createSlice | 4 |
| 22 | Immer drafts | 4 |
| 23 | extraReducers | 4 |
| 24 | Composing slices | 4 |
| 25 | createAsyncThunk | 5 |
| 26 | Full async CRUD (checkpoint) | 5 |
| 27 | createEntityAdapter | 5 |
| 28 | RTK Query | 6 |
| 29 | Migration strategy | 7 |
| 30 | Migrate a sync slice | 7 |
| 31 | Migrate a thunk | 7 |
| 32 | Migrate connect → hooks | 7 |
| 33 | Mixed store & cleanup (checkpoint) | 7 |
| 34 | TypeScript with RTK | 8 |
| 35 | Testing | 8 |
| 36 | When not to use Redux | 8 |

---

## Legacy → RTK migration map

| Legacy (the pain) | Modern RTK (the fix) | Step |
| :--- | :--- | :-- |
| `createStore(reducer, applyMiddleware(thunk))` | `configureStore({ reducer })` (thunk + DevTools built in) | 20, 29 |
| `const ADD = 'ADD'` string constants | auto action types from `createSlice` (`'todos/addTodo'`) | 21 |
| `const add = p => ({ type: ADD, payload: p })` | `slice.actions.addTodo` auto-generated | 21 |
| `switch (action.type)` reducer | case reducer functions inside `createSlice` | 21 |
| `return { ...state, items: [...] }` spread everywhere | Immer drafts: `state.items.push(...)` | 22 |
| manual `combineReducers` | pass slice reducers straight into `configureStore` | 24 |
| hand-written `FETCH_START/SUCCESS/ERROR` thunk | `createAsyncThunk` + `extraReducers` | 25, 31 |
| `connect(mapState, mapDispatch)` | `useSelector` / `useDispatch` | 32 |
| ad-hoc derived arrays in components | memoized `createSelector` | 18 |
| manual id lookups in a list | `createEntityAdapter` | 27 |
| bespoke fetch + cache layer | RTK Query `createApi` | 28 |

---

## Mapping a step to a blog post

Each step is designed to become one post in this site's 7-section format
(see `AGENT_POST_GUIDELINES.md`). When you promote a step:

- **`#what-it-is`** → the concept + the flow arrow this step fills.
- **`#the-code`** → the minimal snippet that shows the part in isolation.
- **`#old`** → the legacy/painful version + Best/Worst case.
- **`#new`** → the RTK/modern version + Best/Worst case.
- **`#when`** → "when to use which" (e.g. thunk vs RTK Query, connect vs hooks).
- **`#practice`** → a small refactor exercise (from your log's gotcha).
- **`#sources`** → official Redux / RTK docs + MDN.

Strongest "old vs new" posts come straight from the migration map:
Step 08→22 (spread vs Immer), Step 12→25 (manual thunk vs `createAsyncThunk`),
Step 16→32 (`connect` vs hooks), Step 07→21 (switch vs slice).

---

## Recommended resources

- Redux docs — "Redux Essentials" and "Redux Fundamentals": https://redux.js.org/
- Redux Toolkit — https://redux-toolkit.js.org/
- react-redux hooks — https://react-redux.js.org/
- Immer — https://immerjs.github.io/immer/
- RTK Query — https://redux-toolkit.js.org/rtk-query/overview
- Redux Style Guide (opinions worth adopting) — https://redux.js.org/style-guide/

