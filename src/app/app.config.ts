import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // ── Zoneless change detection (Angular 22 default) ──
    provideZonelessChangeDetection(),

    // ── Router ──────────────────────────────────────────
    provideRouter(
      routes,
      withComponentInputBinding(),   // route params as @Input / input()
      withViewTransitions()          // native view transitions API
    ),

    // ── HTTP with Fetch API + JWT interceptor ───────────
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),

    // ── Animations ──────────────────────────────────────
    provideAnimationsAsync(),
  ],
};