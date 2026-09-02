"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Core gradient generators
__exportStar(require("./linear-gradient.js"), exports);
__exportStar(require("./radial-gradient.js"), exports);
__exportStar(require("./conic-gradient.js"), exports);
// Presets & dynamic generators
__exportStar(require("./presets.js"), exports);
// Accessibility utilities
__exportStar(require("./accessibility.js"), exports);
// CSS variable utilities
__exportStar(require("./css-variables.js"), exports);
// Canvas / image export utilities
__exportStar(require("./canvas-export.js"), exports);
// Vue 3 reactive hooks & plugin live at css-magic-gradient/vue, not here —
// vue-gradient-plugin.ts does a real (non-type-only) `import ... from
// '@vue/runtime-core'`, so re-exporting it from this root entry would pull
// that in for every consumer, including ones with no Vue installed at all
// (vue is an optional peer; this entry point must stay usable without it —
// confirmed broken and fixed 2026-08-31, see design.md). Same treatment
// React hooks already get below.
// React hooks are available via css-magic-gradient/react (not re-exported here
// to avoid making react a required dependency for all consumers).
