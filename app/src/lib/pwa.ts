import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker() {
  if (typeof window === 'undefined') return;
  try {
    registerSW({ immediate: true });
  } catch {
    // ignore — SW is optional
  }
}
