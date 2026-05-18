# ADR-004: Bundled-first render in tenant boot

## Status

Accepted

## Date

2026-05-18

## Context

Tenants run in two modes:

- **Local mode** — no `VITE_OLONJS_CLOUD_URL` / `VITE_OLONJS_API_KEY` configured. Page and site data come from the bundled JSON files under `src/data/pages/*.json` and `src/data/config/*.json`, hydrated by `getInitialData()` (file-backed or draft).
- **Cloud mode** — both env vars set. Page and site data come from `GET {apiBase}/content`, with retry/backoff and a `localStorage` cache (`jp_cloud_content_cache_v1`, TTL 5 min).

The pre-existing `App.tsx` gated the first paint on a successful cloud fetch:

```ts
const localInitialData = useMemo(
  () => (isCloudMode ? null : getInitialData()),
  [isCloudMode]
);
// ...
const shouldRenderEngine = !isCloudMode || hasInitialCloudResolved;
return shouldRenderEngine ? <JsonPagesEngine config={config} /> : null;
```

Concrete effect in cloud mode: a **blank screen** (sometimes with a 6 px progress bar and a `bg-background/80 backdrop-blur-sm` overlay) for the full duration of the cloud round-trip — up to several seconds at p95 when retries are needed. Lighthouse LCP was dominated by this idle window even though `pages`, `siteConfig`, `themeConfig`, and `menuConfig` were already present in the JS bundle as imported JSON.

Cloud content is authored in the visual editor and dumped back to the repo on save. So in practice the JSON files in the repo **are** the current production content at deploy time. The cloud fetch is freshness insurance, not source-of-truth.

## Decision

Render the engine **on the first frame** using bundled data, regardless of mode. Cloud content, when it arrives, replaces `pages` and `siteConfig` via `setState` — the engine re-renders into the updated content without unmount.

Concretely, in `src/App.tsx`:

1. `localInitialData` is always computed:
   ```ts
   const localInitialData = useMemo(() => getInitialData(), []);
   ```
   No `isCloudMode` guard. `useState` initializers for `pages` and `siteConfig` read from `localInitialData` regardless of mode.

2. `shouldRenderEngine` is hardcoded to `true`. `hasInitialCloudResolved` remains in state (still used by the error-fallback retry button) but no longer gates rendering. The unused-variable warning is silenced with an explicit `void hasInitialCloudResolved;`.

3. The full-screen backdrop overlay (`<div className="fixed inset-0 z-[1290] bg-background/80 backdrop-blur-sm">`) is removed entirely.

4. The top progress bar is kept (still a useful signal for "cloud refresh in flight") but reduced from `height: 6` to `height: 2`. It overlays the rendered content rather than replacing it.

## Alternatives Considered

### A. Keep the blank-until-cloud gate, optimise the cloud round-trip

Reduce p95 by parallelising candidates or pre-warming the endpoint.

Rejected: even at optimistic latency, an unconditional blank first paint is worse than rendering already-bundled content. The fastest network call is one whose result is not required for first paint.

### B. Render a skeleton screen during the cloud fetch

Rejected: we already have the real content bundled. A skeleton is a placeholder when no content exists; here it would mask correct content for no benefit.

### C. SSR / SSG full pre-rendering of every route

Rejected for this ADR (not for the project): the engine already supports SSG via `entry-ssg.tsx`. That is an orthogonal optimisation. The decision here is about the client boot path independent of whether the HTML is pre-rendered.

## Consequences

- First paint in cloud mode shows the bundled snapshot. If the user has just edited content in the cloud and the bundled JSON in the repo is **older** than what the cloud returns, they will briefly see the previous version, then a soft swap when the cloud response arrives.
  - This is acceptable because: (a) editing flows always re-deploy after dumping to repo, so the gap is intentional and short; (b) the alternative — a blank screen — is worse UX in every case where the content is in fact current.
- `EmptyTenantView` now only shows when the **bundled** data has zero pages, not when the cloud is still loading. This narrows its trigger and is the correct semantic.
- The cloud-error notification (`contentMode === 'error'`) remains. When cloud fails and there is no cached fallback, the user still sees the bundled content rendered correctly, plus a small error toast top-right.
- Engineers reordering boot logic must not reintroduce the `isCloudMode` ternary in `localInitialData` — the bundled snapshot is the contract for first paint.

## References

- Implementation: `src/App.tsx` — `localInitialData`, `shouldRenderEngine`, removal of the backdrop overlay block.
- Related: `SPEC-001-tenant-spa-and-boot-modernization.md` for the full migration playbook.
