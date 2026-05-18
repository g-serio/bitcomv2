# ADR-006: Page transition via CSS keyframe + class re-toggle on `<main>`

## Status

Accepted

## Date

2026-05-18

## Context

ADR-002 establishes that internal navigation goes through React Router `<Link>`, not full document reloads. With client-side navigation in place, instantaneous content swaps are visually abrupt — the user clicks a menu item and the page changes with no signal that a navigation occurred. We want a soft fade (250 ms) on route change.

The natural pattern in React for page-level transitions is Framer Motion `<AnimatePresence>` wrapping a keyed child:

```tsx
<AnimatePresence mode="wait">
  <motion.div key={location.pathname} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.25}}>
    {pageContent}
  </motion.div>
</AnimatePresence>
```

This pattern requires the child to **unmount** when the key changes. `AnimatePresence` then keeps it in the DOM long enough to play the `exit` animation before remounting with the new key.

`@olonjs/core` routing (see ADR-002 context) defines `/` and `/*` as the **same component** (`VisitorRoute`). The route element does not change between public-site navigations — only the URL changes. `VisitorRoute` reads `useLocation()`, recomputes the slug, resolves a new `pageConfig`, and re-renders `PageRenderer` with new props. Nothing unmounts. The `<main>` element inside `PageRenderer` persists across navigations with the same DOM identity.

Wrapping `<JsonPagesEngine>` with our own `<AnimatePresence>` does not help: the engine is also stable across public-site routes. There is no unmount point above our reach that we can leverage.

We could intercept at the `<Link>` level using React Router 6.30's `unstable_viewTransition` flag, which calls `document.startViewTransition()` and exposes `::view-transition-old(root)` / `::view-transition-new(root)` pseudo-elements. This is the most "native" answer but is Chromium-only at time of writing (Firefox and Safari ignore the API; the navigation still works but unanimated).

## Decision

Use a **CSS keyframe + class re-toggle** strategy:

1. In `src/index.css`, define the keyframe and the trigger class:

   ```css
   @keyframes jp-page-fade-in {
     from { opacity: 0; }
     to   { opacity: 1; }
   }
   main.jp-page-enter { animation: jp-page-fade-in 0.25s ease forwards; }
   ```

2. In a tenant component that is rendered inside the engine's router context (in practice, the Header — it is present on every public page), subscribe to `useLocation()` and re-apply the class on every pathname change:

   ```tsx
   const location = useLocation();
   useLayoutEffect(() => {
     const main = document.querySelector('main');
     if (!main) return;
     main.classList.remove('jp-page-enter');
     void (main as HTMLElement).offsetWidth; // force reflow so the next add restarts the animation
     main.classList.add('jp-page-enter');
   }, [location.pathname]);
   ```

The forced reflow (`offsetWidth` read) is the documented browser trick to restart a CSS animation: removing then re-adding the class in the same paint frame is otherwise coalesced and the animation does not replay.

`useLayoutEffect` (not `useEffect`) avoids a one-frame visual gap between the new content being painted and the animation starting.

The Header is the chosen mount point because:
- It always renders inside the router context (`useLocation` works).
- It is present on every public page that uses a global header.
- It is a tenant component (we own its source), unlike `PageRenderer`.

## Alternatives Considered

### A. Framer Motion `<AnimatePresence>` around the engine output

Rejected (impractical): there is no unmount point above the engine that we control. Re-keying the engine itself on every pathname would tear down the whole tree including header, footer, theme, and form state — a regression in every direction.

### B. CSS View Transitions API (`unstable_viewTransition` on `<Link>`)

Cleanest from a code-perspective: a flag on every `<Link>`, a few lines of CSS for `::view-transition-old(root)` / `::view-transition-new(root)`. No JS to wire up the trigger.

Rejected (for now): not yet supported in Firefox/Safari (as of authoring date). The CSS keyframe approach works cross-browser today. View Transitions can be layered on top later by adding the flag and the pseudo-element CSS — they will degrade to the keyframe behavior automatically because the keyframe restart logic is independent.

### C. Wrap each section in `motion.div` with `key={pathname}`

The page-renderer is in the engine; we cannot wrap its sections from the tenant. Even if we could, this animates each section independently, which is busier than a single page-level fade.

### D. Toggle a class on `<body>` instead of `<main>`

Functionally similar, but `<body>` contains the header, the engine progress bar, error toasts, and the save drawer — animating its opacity makes those flash too. Targeting `<main>` keeps the fade scoped to swapped content.

## Consequences

- Page fade is 250 ms, ease-in, on every pathname change inside the engine's BrowserRouter. Initial page load also triggers the animation (the class is added once on first mount).
- The implementation depends on the engine continuing to render a single `<main>` element inside `PageRenderer`. If a future engine version changes the markup (e.g. multiple `<main>` or none), the selector must be updated. This is a low-frequency risk; a versioned `data-jp-page-root` attribute could be requested from `@olonjs/core` to harden the contract.
- The trigger relies on the Header being rendered. Tenants that hide the global header (`pageConfig['global-header'] === false`) lose the fade on those pages. If this becomes a real problem, the trigger can move into a dedicated hidden `<PageFadeMonitor>` component mounted unconditionally.
- The forced reflow is a one-pixel layout read per navigation — negligible cost, but worth knowing it is intentional. Removing it breaks animation restart silently.

## References

- Implementation:
  - `src/index.css` — `@keyframes jp-page-fade-in`, `main.jp-page-enter`.
  - `src/components/header/View.tsx` — `useLocation`, `useLayoutEffect` block at the top of `Header`.
- MDN: [Tips for restarting an animation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Tips#run_an_animation_again).
- Related: ADR-002 (SPA navigation), `SPEC-001-tenant-spa-and-boot-modernization.md`.
