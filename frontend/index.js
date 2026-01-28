import { registerRootComponent } from 'expo';

import App from './App';

// Suppress audio API warnings in web/development
if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0]?.includes?.('DynamicsCompressor') || args[0]?.includes?.('AudioContext')) {
      return;
    }
    originalWarn(...args);
  };
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
