# `@libre-ai/ui`

Small accessible foundation for canonical Bun/React applications: local CSS tokens,
visible focus, semantic surfaces, skip navigation and React Aria action buttons.
It intentionally is not an exhaustive component catalogue. Its bounded `./tailwind` adapter uses
the public Tailwind v4 compiler to emit a deterministic allow-list of utilities.

No font, icon, script or style is loaded from a remote origin. Reduced-motion,
dark-color-scheme and forced-color behavior are CSS-level invariants.

The non-normative [color-system exploration](https://github.com/libre-ai/libre-ai/tree/main/packages/ui/color-system) compares four measured
OKLCH directions without changing the published foundation. Adoption remains a separate human
decision and implementation change.

## Quickstart

```sh
bun add @libre-ai/ui
```

```tsx
import { SkipLink, StatusMessage, Surface } from "@libre-ai/ui";

export function App() {
  return (
    <>
      <SkipLink targetId="main" />
      <Surface as="main" id="main">
        <StatusMessage politeness="polite">Ready.</StatusMessage>
      </Surface>
    </>
  );
}
```

Import the foundation stylesheet once (`@libre-ai/ui/styles.css`), and use the
bounded Tailwind adapter (`@libre-ai/ui/tailwind`) if you emit utilities at build
time. The three-engine Playwright evidence (SSR + hydration, no-JS, PWA offline,
reduced-motion, security headers) is exercised by the reference chain.

## Publication status

**Publish-ready** (`publishConfig.access=public`): the npm `@libre-ai` scope is
reserved (owner, 2026-07-22) and the `private` guard is lifted; publication is
the owner-run `Release satellites` workflow (LEXICON §7.4 — the release itself
stays an owner-gated external action; see
`docs/transformation/WAVE1-PUBLICATION-RUNBOOK.md`). **Dual runtime:** the
package ships a compiled `dist/` (ESM, React automatic runtime, `react`/
`react-dom`/`react-aria-components` external) so Node, Vite and Next consumers
resolve real JavaScript with no extra toolchain; Bun keeps running the
TypeScript source directly (the `bun` export condition points at `src/`), and
types resolve from the shipped source. The `dist/` is a release-time artifact
(built during the publish workflow, never committed).

## État du projet

<!-- libre-ai:project-status:begin -->
<!-- Section générée depuis project.v1.yaml — ne pas éditer à la main. -->

- Situation actuelle : Née verte en γ 3.4 (verdie au bump de gabarit suivant, tracé à l'index) ; porte l'ascendance packages/design-system.
- Maturité : usable
- Exposition : spec-published
- Confiance : medium
- Preuves vérifiées le : 2026-07-30
- Avancement : 50 % du périmètre actuellement déclaré

<!-- libre-ai:project-status:end -->

La fiche [`project.v1.yaml`](./project.v1.yaml) est l'autorité de l'état du projet ; cette section en est générée et le gate de flotte échoue si elles divergent.
