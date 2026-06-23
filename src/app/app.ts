import { Component, OnInit, signal, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class App implements OnInit {
  // Signal-based theme management
  readonly theme = signal<'light' | 'dark'>('light');

  constructor() {
    // Reactively apply theme to <html> element
    effect(() => {
      const t = this.theme();
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem('db-theme', t);
    });
  }

  ngOnInit(): void {
    // Restore saved theme or detect system preference
    const saved = localStorage.getItem('db-theme') as 'light' | 'dark' | null;
    if (saved) {
      this.theme.set(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme.set(prefersDark ? 'dark' : 'light');
    }
  }
}