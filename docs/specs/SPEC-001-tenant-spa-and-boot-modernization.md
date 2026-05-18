# SPEC-001: Tenant SPA navigation + boot modernization

## Status

Active

## Date

2026-05-18

## Goal

Apply three coordinated changes to a tenant built on `@olonjs/core` so that:

- **First paint is instant**: the engine renders from bundled JSON on the first frame, in any mode (local or cloud).
- **Editor surfaces don't bloat the visitor bundle**: the save drawer is code-split and only loaded on demand.
- **In-app navigation is client-side**: `<Link>` replaces `<a href>` for internal paths, and a 250 ms CSS fade plays on every route change.

This spec is the operational playbook. It assumes the tenant has the same skeleton as `bitcomv2` and `radice` (App.tsx, ComponentRegistry, index.css, components/header, etc.). All tenants share this skeleton.

## Decisions backing this spec

- ADR-002 — SPA navigation via React Router `Link`
- ADR-004 — Bundled-first render
- ADR-005 — Lazy-load save/editor surfaces
- ADR-006 — Page fade via CSS keyframe + class re-toggle

Read those before deviating from the patterns below.

## Prerequisites

Verify in `package.json`:

- `@olonjs/core` ≥ 1.1.3
- `react-router-dom` ≥ 6.30.0 (for the router context the engine provides)
- `react` 19.x

If `src/lib/isInAppPathHref.ts` does not exist, create it with this exact content:

```ts
/**
 * Returns true when `href` should be handled by the client-side router
 * (React Router `<Link>`), false when it must remain a real `<a>`.
 *
 * In-app: non-empty, trimmed, starts with `/`, no scheme prefix.
 * External: http/https, mailto, tel, protocol-relative, javascript, data URIs.
 *
 * @see docs/decisions/ADR-002-spa-navigation-react-router-link.md
 */
export function isInAppPathHref(href: string | undefined | null): boolean {
  if (!href) return false;
  const t = href.trim();
  if (!t) return false;
  const lower = t.toLowerCase();
  if (
    lower.startsWith('http://')
    || lower.startsWith('https://')
    || lower.startsWith('mailto:')
    || lower.startsWith('tel:')
    || lower.startsWith('//')
    || lower.startsWith('javascript:')
    || lower.startsWith('data:')
  ) {
    return false;
  }
  return t.startsWith('/');
}
```

## Phase A — Boot modernization (`src/App.tsx`)

Backing ADR: ADR-004, ADR-005.

### A.1 — Always compute `localInitialData`

Find:

```ts
const localInitialData = useMemo(
  () => (isCloudMode ? null : getInitialData()),
  [isCloudMode]
);
const localInitialPages = useMemo(() => {
  if (!localInitialData) return {};
  const normalized = normalizePageRegistry(localInitialData.pages as unknown);
  return Object.keys(normalized).length > 0 ? normalized : localInitialData.pages;
}, [localInitialData]);
const [pages, setPages] = useState<Record<string, PageConfig>>(localInitialPages);
const [siteConfig, setSiteConfig] = useState<SiteConfig>(
  localInitialData?.siteConfig ?? fileSiteConfig
);
```

Replace with:

```ts
const localInitialData = useMemo(() => getInitialData(), []);
const localInitialPages = useMemo(() => {
  const normalized = normalizePageRegistry(localInitialData.pages as unknown);
  return Object.keys(normalized).length > 0 ? normalized : localInitialData.pages;
}, [localInitialData]);
const [pages, setPages] = useState<Record<string, PageConfig>>(localInitialPages);
const [siteConfig, setSiteConfig] = useState<SiteConfig>(
  localInitialData.siteConfig ?? fileSiteConfig
);
```

### A.2 — Hardcode `shouldRenderEngine`

Find:

```ts
const shouldRenderEngine = !isCloudMode || hasInitialCloudResolved;
```

Replace with:

```ts
const shouldRenderEngine = true;
void hasInitialCloudResolved;
```

The `void` keeps the variable referenced for TypeScript even though the render gate no longer reads it (it is still set by the retry button handler).

### A.3 — Remove the full-screen backdrop overlay

Find and delete the block:

```tsx
{isCloudMode && !hasInitialCloudResolved ? (
  <div className="fixed inset-0 z-[1290] bg-background/80 backdrop-blur-sm">
    <div className="mx-auto w-full max-w-[1600px] p-6">
      {/* ... */}
    </div>
  </div>
) : null}
```

### A.4 — Reduce top progress bar height

In the cloud-loading progress bar block, change `height: 6` to `height: 2`. Keep the rest of the styles (z-index, gradient, animation, `willChange`) unchanged.

### A.5 — Lazy-load `DopaDrawer`

At the imports, add `lazy, Suspense`:

```ts
import { useCallback, useEffect, useMemo, useRef, useState, lazy, Suspense } from 'react';
```

Replace the static drawer import:

```ts
import { DopaDrawer } from '@/components/save-drawer/DopaDrawer';
```

with:

```ts
const DopaDrawer = lazy(() =>
  import('@/components/save-drawer/DopaDrawer').then((m) => ({ default: m.DopaDrawer })),
);
```

At the render site, wrap in `Suspense` and gate on `cloudSaveUi.isOpen`:

```tsx
{cloudSaveUi.isOpen ? (
  <Suspense fallback={null}>
    <DopaDrawer
      isOpen={cloudSaveUi.isOpen}
      phase={cloudSaveUi.phase}
      currentStepId={cloudSaveUi.currentStepId}
      doneSteps={cloudSaveUi.doneSteps}
      progress={cloudSaveUi.progress}
      errorMessage={cloudSaveUi.errorMessage}
      deployUrl={cloudSaveUi.deployUrl}
      onClose={closeCloudDrawer}
      onRetry={retryCloudSave}
    />
  </Suspense>
) : null}
```

### A.6 — Optional: drop `fonts.css?inline`

If `App.tsx` concatenates a separate `fonts.css?inline` with `index.css?inline` and the fonts in `fonts.css` are already covered by the `@import url(...)` at the top of `index.css`, remove the redundant inline import.

Before:

```ts
import tenantRemoteCss from './fonts.css?inline';
import tenantCss from './index.css?inline';
const tenantCssBundled = `${tenantRemoteCss}\n${tenantCss}`;
// ...
const tenantCssParts = useMemo(() => extractLeadingRemoteCssImports(tenantCssBundled), [tenantCssBundled]);
const resolvedTenantCss = useMemo(
  () => [tenantCssParts.rest, buildThemeFontVarsCss(themeConfig)].filter(Boolean).join('\n'),
  [tenantCssParts, themeConfig],
);
```

After:

```ts
import tenantCss from './index.css?inline';
// ...
const tenantCssParts = useMemo(() => extractLeadingRemoteCssImports(tenantCss), []);
const resolvedTenantCss = useMemo(
  () => [buildThemeFontVarsCss(themeConfig), tenantCssParts.rest].filter(Boolean).join('\n'),
  [tenantCssParts],
);
```

Note the **inverted order**: `buildThemeFontVarsCss(themeConfig)` now goes **before** `tenantCssParts.rest`. This is safe because `extractLeadingRemoteCssImports` has already lifted any leading `@import` rules out into `<link rel="stylesheet">` elements; the remaining `rest` does not start with `@import`, so the `:root { --theme-font-* }` block can precede it without violating CSS ordering rules (see ADR-001).

Do NOT delete `src/fonts.css` itself: it is still imported by `entry-ssg.tsx` and `src/components/save-drawer/DopaDrawer.tsx`. Only remove the import from `App.tsx`.

### A.7 — Verify

```bash
npx tsc --noEmit
npm run build
```

Expected: build clean; new `DopaDrawer-<hash>.js` chunk in `dist/assets/`; main chunk size reduced by the drawer's tree.

## Phase B — Page-fade transition (CSS + Header hook)

Backing ADR: ADR-006.

### B.1 — Add keyframe and trigger class to `src/index.css`

Insert after the existing `@keyframes jp-fadeUp` / `.jp-animate-in` definitions:

```css
/* Page transition (ADR-002): re-triggered on each route change by toggling .jp-page-enter on <main>. */
@keyframes jp-page-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
main.jp-page-enter { animation: jp-page-fade-in 0.25s ease forwards; }
```

### B.2 — Mount the trigger in the Header

In `src/components/header/View.tsx`:

Add to imports:

```ts
import React, { useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
```

Inside the `Header` component body, top of function:

```tsx
const location = useLocation();

// Page fade 250ms — engine reuses <main> across routes; restart the keyframe by re-toggling the class.
useLayoutEffect(() => {
  const main = document.querySelector('main');
  if (!main) return;
  main.classList.remove('jp-page-enter');
  void (main as HTMLElement).offsetWidth; // force reflow so the next add restarts the animation
  main.classList.add('jp-page-enter');
}, [location.pathname]);
```

The forced reflow is **load-bearing** — without it the class removal/addition is coalesced into one paint frame and the animation does not restart. Do not remove the `void offsetWidth` line.

## Phase C — Migrate `<a href>` to `<Link>` (ADR-002)

Backing ADR: ADR-002.

The migration rule is the same in every component:

```tsx
{isInAppPathHref(href) ? (
  <Link to={href} className={...}>{children}</Link>
) : (
  <a href={href} className={...}>{children}</a>
)}
```

Apply this rule to every `<a href={dataDrivenHref}>` in components that are **registered in `src/lib/ComponentRegistry.tsx`**. Components not in the registry are not currently rendered and can be migrated later.

### C.1 — Header (`src/components/header/View.tsx`)

Four call sites:

1. **Desktop logo** (`<a href="/">`) — always internal. Use `<Link to="/">` directly, no ternary needed.

2. **Desktop nav** (Radix `NavigationMenuLink`) — use `asChild` to pass `<Link>` for internal items:
   ```tsx
   {isInAppPathHref(item.href) ? (
     <NavigationMenuLink asChild>
       <Link to={item.href} className={navClass}>{item.label}</Link>
     </NavigationMenuLink>
   ) : (
     <NavigationMenuLink href={item.href} className={navClass}>
       {item.label}
     </NavigationMenuLink>
   )}
   ```

3. **Mobile logo** (inside `<SheetContent>`) — wrap in `<SheetClose asChild>` so tapping closes the sheet, then `<Link to="/">`.

4. **Mobile menu items and CTAs** — same `SheetClose asChild` + ternary pattern.

### C.2 — Footer (`src/components/footer/View.tsx`)

Single call site: the link list. Apply the ternary rule with a shared `linkClass` string.

### C.3 — Registered section components with CTAs

Identify every component listed in `ComponentRegistry` that contains `<a href={data.someCta.href}>` or `<a href={data.someCta.href}><Button>...</Button></a>`. Apply the ternary.

For the `<a href><Button>` pattern, extract the `<Button>` as an `inner` constant and choose `<Link>` or `<a>` around it:

```tsx
const btn = (
  <Button variant="default" className="...">
    {data.primaryCta.label}
  </Button>
);
return isInAppPathHref(data.primaryCta.href) ? (
  <Link to={data.primaryCta.href}>{btn}</Link>
) : (
  <a href={data.primaryCta.href}>{btn}</a>
);
```

For inline `<a className="..."><label/><Icon/></a>` patterns, extract the inner JSX (`label` + `icon`) into a fragment and reuse it inside both branches.

Skip components that are not in the registry. Note them so they can be migrated when added.

### C.4 — External href handling

`isInAppPathHref` correctly classifies `tel:`, `mailto:`, `https://wa.me/...`, etc. as external. Those continue to use plain `<a href>` automatically through the ternary — no special-case needed.

## Verification

Run after each phase:

```bash
npx tsc --noEmit
npm run build
```

Manual smoke tests (recommended after Phase C):

1. **Boot speed**: open a clean tab in cloud mode. The page renders the bundled snapshot immediately; the 2 px top progress bar shows briefly while the cloud refresh completes.
2. **Navigation**: clicking any internal menu item or CTA does **not** trigger a full document reload (check the Network tab for a document request — there should not be one).
3. **External links**: clicking a `tel:`, `mailto:`, or `https://` link still works as before (opens dialer/mail client/new tab).
4. **Fade**: every internal navigation plays the 250 ms fade on `<main>`. Inspect `<main class="jp-page-enter">` toggling in DevTools.
5. **Mobile menu**: opening the sheet, tapping a link, the sheet closes AND the route changes via SPA (no reload).
6. **Save flow** (cloud mode, authorized editor): trigger a cloud save from the studio. The drawer appears (network tab shows a one-time fetch of `DopaDrawer-<hash>.js` if it is the first open). The flow completes.

## Done criteria

- Every registered tenant component routes internal navigation through `<Link>`.
- `<main>` plays a 250 ms fade on every pathname change.
- `dist/assets/` contains a separate `DopaDrawer-<hash>.js` chunk.
- First paint in cloud mode shows real content, not a blank screen.
- Build is clean, TypeScript has no errors, and the smoke tests pass.

## Notes for future tenants

- The `<Link>` pattern composes with any UI primitive that accepts `asChild` (Radix). For primitives without `asChild`, render `<Link>` outside the primitive and let the primitive style its children.
- If a future engine version unmounts/remounts `PageRenderer` on route change, the ADR-006 trigger can be simplified or removed (the keyframe will play naturally on remount via `.jp-animate-in`-style first-mount semantics). Re-evaluate then; do not pre-optimise.
- Image optimisation, additional code splitting, and view-transitions opt-in are explicitly **out of scope** for this spec. They are separate decisions with their own ADRs (to be written when needed).
