"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLinearGradient = useLinearGradient;
exports.useRadialGradient = useRadialGradient;
exports.useConicGradient = useConicGradient;
const runtime_core_1 = require("@vue/runtime-core");
const linear_gradient_1 = require("./linear-gradient");
const radial_gradient_1 = require("./radial-gradient");
const conic_gradient_1 = require("./conic-gradient");
function resolve(value) {
    return (0, runtime_core_1.isRef)(value) ? value.value : value;
}
function useLinearGradient(baseColor, options) {
    return (0, runtime_core_1.computed)(() => (0, linear_gradient_1.createLinearGradient)(resolve(baseColor), resolve(options)));
}
function useRadialGradient(baseColor, options) {
    return (0, runtime_core_1.computed)(() => (0, radial_gradient_1.createRadialGradient)(resolve(baseColor), resolve(options)));
}
function useConicGradient(baseColor, options) {
    return (0, runtime_core_1.computed)(() => (0, conic_gradient_1.createConicGradient)(resolve(baseColor), resolve(options)));
}
exports.default = {
    install(app) {
        app.config.globalProperties.$useLinearGradient = useLinearGradient;
        app.config.globalProperties.$useRadialGradient = useRadialGradient;
        app.config.globalProperties.$useConicGradient = useConicGradient;
    }
};
