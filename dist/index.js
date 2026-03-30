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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueGradientPlugin = exports.useRainbowConicGradient = exports.useConicGradient = exports.useRadialGradient = exports.useMixedLinearGradient = exports.useMultiStepLinearGradient = exports.useLinearGradient = void 0;
// Core gradient generators
__exportStar(require("./linear-gradient.js"), exports);
__exportStar(require("./radial-gradient.js"), exports);
__exportStar(require("./conic-gradient.js"), exports);
// Presets & dynamic generators
__exportStar(require("./presets.js"), exports);
// Accessibility utilities
__exportStar(require("./accessibility.js"), exports);
// Vue 3 reactive hooks & plugin (also available via css-magic-gradient/vue)
var vue_gradient_plugin_js_1 = require("./vue-gradient-plugin.js");
Object.defineProperty(exports, "useLinearGradient", { enumerable: true, get: function () { return vue_gradient_plugin_js_1.useLinearGradient; } });
Object.defineProperty(exports, "useMultiStepLinearGradient", { enumerable: true, get: function () { return vue_gradient_plugin_js_1.useMultiStepLinearGradient; } });
Object.defineProperty(exports, "useMixedLinearGradient", { enumerable: true, get: function () { return vue_gradient_plugin_js_1.useMixedLinearGradient; } });
Object.defineProperty(exports, "useRadialGradient", { enumerable: true, get: function () { return vue_gradient_plugin_js_1.useRadialGradient; } });
Object.defineProperty(exports, "useConicGradient", { enumerable: true, get: function () { return vue_gradient_plugin_js_1.useConicGradient; } });
Object.defineProperty(exports, "useRainbowConicGradient", { enumerable: true, get: function () { return vue_gradient_plugin_js_1.useRainbowConicGradient; } });
var vue_gradient_plugin_js_2 = require("./vue-gradient-plugin.js");
Object.defineProperty(exports, "VueGradientPlugin", { enumerable: true, get: function () { return __importDefault(vue_gradient_plugin_js_2).default; } });
// React hooks are available via css-magic-gradient/react (not re-exported here
// to avoid making react a required dependency for all consumers).
