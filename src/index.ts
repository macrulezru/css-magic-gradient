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

// Vue 3 reactive hooks & plugin (also available via css-magic-gradient/vue)
export {
  useLinearGradient,
  useMultiStepLinearGradient,
  useMixedLinearGradient,
  useRadialGradient,
  useConicGradient,
  useRainbowConicGradient,
} from './vue-gradient-plugin.js';
export { default as VueGradientPlugin } from './vue-gradient-plugin.js';

// React hooks are available via css-magic-gradient/react (not re-exported here
// to avoid making react a required dependency for all consumers).
