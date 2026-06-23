import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, Sidebar, Header],
  template: `
    <div
      class="app-shell"
      [class.sidebar-collapsed]="sidebarCollapsed()"
    >
      <!-- Sidebar -->
      <aside class="app-sidebar" [class.open]="sidebarOpen()">
        <app-sidebar
          [collapsed]="sidebarCollapsed()"
          (toggleCollapse)="toggleSidebar()"
        />
      </aside>

      <!-- Header -->
      <header class="app-header">
        <app-header
          (menuClick)="toggleMobileSidebar()"
          (themeToggle)="themeService.toggle()"
          [isDark]="themeService.isDark()"
        />
      </header>

      <!-- Main content -->
      <main class="app-main">
        <div class="page-container">
          <router-outlet />
        </div>
      </main>

      <!-- Mobile overlay -->
      @if (sidebarOpen()) {
        <div
          class="sidebar-overlay"
          (click)="sidebarOpen.set(false)"
        ></div>
      }
    </div>
  `,
  styles: [`
    .sidebar-overlay {
      display: none;

      @media (max-width: 768px) {
        display: block;
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: calc(var(--z-sidebar) - 1);
      }
    }
  `],
})
export class Shell {
  readonly themeService = inject(ThemeService);

  readonly sidebarCollapsed = signal(false);
  readonly sidebarOpen      = signal(false);

  toggleSidebar(): void {
    this.sidebarCollapsed.update((v) => !v);
  }

  toggleMobileSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }
}