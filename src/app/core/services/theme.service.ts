import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _theme = signal<'light' | 'dark'>('light');

  readonly theme  = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');

  constructor() {
    // Restore saved preference or detect system preference
    const saved = localStorage.getItem('db-theme') as 'light' | 'dark' | null;
    if (saved) {
      this._theme.set(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this._theme.set('dark');
    }

    // Reactively sync theme to <html> data-theme attribute
    effect(() => {
      document.documentElement.setAttribute('data-theme', this._theme());
      localStorage.setItem('db-theme', this._theme());
    });
  }

  toggle(): void {
    this._theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }

  setTheme(theme: 'light' | 'dark'): void {
    this._theme.set(theme);
  }
}