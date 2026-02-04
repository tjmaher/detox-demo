// Detox initialization is automatic for both iOS and Android with official setup.
// No custom native bridge or manual init required.

export const init = async () => {
  // No-op: Detox handles initialization via instrumentation (Android) or EarlGrey (iOS)
};

export default {
  init,
};
