// Core gradient generators
export * from './linear-gradient.js';
export * from './radial-gradient.js';
export * from './conic-gradient.js';

// Shared types & helpers
export type { ColorStop, ResolvedColor } from './utils.js';

// Presets & dynamic generators
export * from './presets.js';

// Accessibility utilities
export * from './accessibility.js';

// CSS variable utilities
export * from './css-variables.js';

// Canvas / image export utilities
export * from './canvas-export.js';

// Vue 3 reactive hooks & plugin live at css-magic-gradient/vue, not here —
// vue-gradient-plugin.ts does a real (non-type-only) `import ... from
// '@vue/runtime-core'`, so re-exporting it from this root entry would pull
// that in for every consumer, including ones with no Vue installed at all
// (vue is an optional peer; this entry point must stay usable without it —
// confirmed broken and fixed 2026-08-31, see design.md). Same treatment
// React hooks already get below.

// React hooks are available via css-magic-gradient/react (not re-exported here
// to avoid making react a required dependency for all consumers).
