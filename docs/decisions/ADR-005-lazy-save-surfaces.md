# ADR-005: Lazy-load save/editor surfaces in the tenant bundle

## Status

Accepted

## Date

2026-05-18

## Context

The tenant bundle is a single SPA served to every visitor — including the vast majority who never edit content. Yet historically `App.tsx` eagerly imported the full save/edit surface at module top-level:

```ts
import { DopaDrawer } from '@/components/save-drawer/DopaDrawer';
```

`DopaDrawer` is the cloud-save progress drawer. It is only rendered when `cloudSaveUi.isOpen === true`, which can only be triggered by an authenticated editor action inside the studio UI. For an anonymous visitor on a public page, the drawer is unreachable code — but its module graph still ships in the main chunk.

Bundle analysis on bitcomv2 (Vite 6, Rollup): the main chunk was ~983 KB minified (~277 KB gzip) before this change. The drawer's transitive dependencies (Radix Dialog, animation utilities, surrounding UI primitives) account for a measurable slice that has no value on a cold visitor pageload.

The same pattern will recur as more editor surfaces are added (image picker, section add dialog, form factory) if they are pulled in by static import from a component that the visitor renders.

## Decision

Code-split editor surfaces by **dynamic import + conditional mount**:

```ts
const DopaDrawer = lazy(() =>
  import('@/components/save-drawer/DopaDrawer').then((m) => ({ default: m.DopaDrawer })),
);
```

and at the render site:

```tsx
{cloudSaveUi.isOpen ? (
  <Suspense fallback={null}>
    <DopaDrawer {...props} />
  </Suspense>
) : null}
```

The `Suspense fallback` is `null` because the drawer is invoked by an explicit user action; a flash is acceptable during the first open. After the chunk is fetched once, subsequent opens are instant.

This rule applies to **any tenant-rendered component that is only used inside an editing flow**:
- `DopaDrawer` (save progress) — included by this ADR.
- Future studio-only surfaces should follow the same pattern.

It does **not** apply to:
- `JsonPagesEngine` itself — required for first paint.
- Components in `ComponentRegistry` — these are the page renderers, used on every visitor pageload.
- `ThemeProvider`, `OlonFormsContext` — required wrappers around the engine.

## Alternatives Considered

### A. Manual chunk via `build.rollupOptions.output.manualChunks`

Split the drawer into its own chunk by file path pattern. Configuration in `vite.config.ts`.

Rejected: still loads the chunk on every page (even if separated), because the static import in `App.tsx` keeps the dependency edge. `React.lazy` is the only mechanism that defers the actual download.

### B. Defer the entire editor behind an auth check at the top of `App.tsx`

Render two completely different trees depending on `isCloudMode && isAuthenticated`.

Rejected: the tenant has no auth context — cloud mode is a configuration signal, not a session signal. The drawer can be triggered in cloud mode without studio auth (e.g. local save-to-file in dev). The right boundary is the **render** of the surface, not the **mode**.

### C. Server-side bundle splitting per route

Out of scope: the tenant is a SPA and the engine resolves routes client-side.

## Consequences

- First-load JS chunk size drops by the size of `DopaDrawer` and its tree. On bitcomv2 the dedicated chunk is ~17 KB (~5 KB gzip).
- The first time a user opens the save drawer there is a brief async chunk fetch. With a hot cache and chunk preloading by the browser, this is single-digit ms in practice; cold (slow 3G), 100–300 ms is realistic. The fallback is `null`, so the user sees the drawer appear once it lands — no spinner needed for a one-time micro-delay.
- Build output now includes a `DopaDrawer-<hash>.js` artifact. Cache invalidation works naturally via content hashing.
- Engineers must not reintroduce `import { DopaDrawer } from '@/components/save-drawer/DopaDrawer'` at module top-level in `App.tsx`. The lazy wrapper is the contract.

## References

- Implementation: `src/App.tsx` — `lazy()` declaration, `<Suspense>` wrapper around the conditional `<DopaDrawer>`.
- React docs: [`lazy`](https://react.dev/reference/react/lazy), [`Suspense`](https://react.dev/reference/react/Suspense).
- Related: `SPEC-001-tenant-spa-and-boot-modernization.md`.
