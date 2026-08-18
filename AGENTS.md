# ui Canonical Agent Rules

## Authority

Shared UI brick of the Libre AI constellation, couche 4: React components
and design tokens, carrying the `design-system` history. Descends from the
hub dismantling (ADR-0020) via `git filter-repo`; the hub remains the
clonable archive.
Doctrine lives upstream: https://raw.githubusercontent.com/libre-ai/governance/main/docs/README.md

## Boundaries

- Components and tokens are owned here; no second durable implementation
  of this domain exists elsewhere in the constellation.
  `third_party/dtcg` tracks its own upstream W3C license, never rewritten.
- Product code and specifications for consuming applications live in their
  own repositories. Fleet doctrine and quality gates live upstream in
  `libre-ai/governance`.

## Quality gates

Run `bun run check` before pushing (Bun floor, secret scan, personal-data
scan, lint, typecheck, tests); never hide a red test.

## Agents

- Read actual state before editing.
- Stage files before running tree-walking gates (`git ls-files`-based
  scanners do not see untracked files).
- Security > quality > performance > completeness.
