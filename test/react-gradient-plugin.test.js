// Runs against the BUILT dist/ output (via `npm run build && node --test test/`)
// — this package has no existing test framework, so these use Node's built-in
// node:test/node:assert instead of pulling in a new one. React hooks require
// an active dispatcher, provided here via a real SSR render (react-dom/server)
// rather than a full DOM/jsdom setup.
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const {
  useMonochromaticGradient,
  useHueWheelGradient,
} = require('../dist/react-gradient-plugin.js');
const { createMonochromaticGradient, createHueWheelGradient } = require('../dist/presets.js');

// Regression: useMonochromaticGradient/useHueWheelGradient didn't exist at
// all in the React bindings either — same gap as the Vue side.

function renderHook(useHook) {
  let result;
  function Probe() {
    result = useHook();
    return null;
  }
  renderToStaticMarkup(React.createElement(Probe));
  return result;
}

test('useMonochromaticGradient returns the same string as createMonochromaticGradient', () => {
  const result = renderHook(() => useMonochromaticGradient('#3498db', 5));
  assert.equal(typeof result, 'string');
  assert.equal(result, createMonochromaticGradient('#3498db', 5));
});

test('useHueWheelGradient returns the same string as createHueWheelGradient', () => {
  const result = renderHook(() => useHueWheelGradient('#9b59b6', { steps: 12 }));
  assert.equal(typeof result, 'string');
  assert.equal(result, createHueWheelGradient('#9b59b6', { steps: 12 }));
});
