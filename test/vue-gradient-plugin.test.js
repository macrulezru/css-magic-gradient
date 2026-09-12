// Runs against the BUILT dist/ output (via `npm run build && node --test test/`)
// — this package has no existing test framework, so these use Node's built-in
// node:test/node:assert instead of pulling in a new one.
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  useMonochromaticGradient,
  useHueWheelGradient,
} = require('../dist/vue-gradient-plugin.js');
const { createMonochromaticGradient, createHueWheelGradient } = require('../dist/presets.js');

// Regression: useMonochromaticGradient/useHueWheelGradient didn't exist at
// all — every other generator in presets.ts/linear-gradient.ts/
// radial-gradient.ts/conic-gradient.ts/accessibility.ts has a reactive Vue
// wrapper via the other 15 use*Gradient hooks; these two were the only ones
// missing.

test('useMonochromaticGradient returns a ComputedRef matching createMonochromaticGradient', () => {
  const ref = useMonochromaticGradient('#3498db', 5);
  assert.equal(typeof ref.value, 'string');
  assert.equal(ref.value, createMonochromaticGradient('#3498db', 5));
});

test('useMonochromaticGradient is reactive to a ref input', () => {
  const { ref: vueRef } = require('@vue/reactivity');
  const baseColor = vueRef('#3498db');
  const result = useMonochromaticGradient(baseColor, 5);
  const before = result.value;

  baseColor.value = '#e74c3c';

  assert.notEqual(result.value, before);
  assert.equal(result.value, createMonochromaticGradient('#e74c3c', 5));
});

test('useHueWheelGradient returns a ComputedRef matching createHueWheelGradient', () => {
  const ref = useHueWheelGradient('#9b59b6', { steps: 12 });
  assert.equal(typeof ref.value, 'string');
  assert.equal(ref.value, createHueWheelGradient('#9b59b6', { steps: 12 }));
});

test('useHueWheelGradient is reactive to a ref input', () => {
  const { ref: vueRef } = require('@vue/reactivity');
  const baseColor = vueRef('#3498db');
  const result = useHueWheelGradient(baseColor);
  const before = result.value;

  baseColor.value = '#2ecc71';

  assert.notEqual(result.value, before);
  assert.equal(result.value, createHueWheelGradient('#2ecc71'));
});
