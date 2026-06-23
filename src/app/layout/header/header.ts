import { Component, input, output, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="app-header__left">
      <!-- Mobile menu toggle -->
      <button class="app-header__toggle" (click)="menuClick.emit()">
        <i class="bi bi-list"></i>
      </button>

      <!-- Search -->
      <div class="app-header__search">
        <i class="bi bi-search app-header__search-icon"></i>
        <input
          class="app-header__search-input"
          type="text"
          placeholder="Search projects, tasks..."
          [(value)]="searchQuery"
        />
      </div>
    </div>

    <div class="app-header__right">
      <!-- Theme toggle -->
      <button
        class="app-header__theme-toggle"
        (click)="themeToggle.emit()"
        [title]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        <i class="bi" [class.bi-sun]="isDark()" [class.bi-moon]="!isDark()"></i>
      </button>

      <!-- Notifications -->
      <a
        class="app-header__icon-btn app-header__icon-btn--badge"
        routerLink="/notifications"
      >
        <i class="bi bi-bell"></i>
      </a>

      <!-- Avatar / user menu -->
      <div class="app-header__avatar" (click)="toggleUserMenu()">
        {{ authService.userInitials() }}
      </div>

      <!-- User dropdown -->
      @if (userMenuOpen()) {
        <div class="user-menu">
          <div class="user-menu__header">
            <p class="user-menu__name">{{ authService.user()?.name }}</p>
            <p class="user-menu__email">{{ authService.user()?.email }}</p>
          </div>
          <div class="user-menu__divider"></div>
          <a class="user-menu__item" routerLink="/settings" (click)="userMenuOpen.set(false)">
            <i class="bi bi-gear"></i> Settings
          </a>
          <button class="user-menu__item user-menu__item--danger" (click)="logout()">
            <i class="bi bi-box-arrow-right"></i> Sign out
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }

    .user-menu {
      position: absolute;
      top: calc(var(--header-height) - 8px);
      right: var(--space-6);
      width: 220px;
      background-color: var(--color-card-bg);
      border: 1px solid var(--color-card-border);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xl);
      z-index: var(--z-dropdown);
      overflow: hidden;

      &__header {
        padding: var(--space-4);
      }

      &__name {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-primary);
      }

      &__email {
        font-size: var(--font-size-xs);
        color: var(--color-text-muted);
        margin-top: 2px;
      }

      &__divider {
        height: 1px;
        background-color: var(--color-border-default);
      }

      &__item {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-3) var(--space-4);
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        text-decoration: none;
        cursor: pointer;
        border: none;
        background: none;
        width: 100%;
        text-align: left;
        transition: background-color var(--transition-fast);

        &:hover {
          background-color: var(--color-bg-muted);
          color: var(--color-text-primary);
        }

        &--danger {
          color: var(--color-danger-600);
          &:hover { background-color: var(--color-danger-50); }
        }
      }
    }
  `],
})
export class Header {
  // Signals API
  readonly isDark      = input<boolean>(false);
  readonly menuClick   = output<void>();
  readonly themeToggle = output<void>();

  readonly authService = inject(AuthService);

  readonly searchQuery  = signal('');
  readonly userMenuOpen = signal(false);

  toggleUserMenu(): void {
    this.userMenuOpen.update((v) => !v);
  }

  logout(): void {
    this.userMenuOpen.set(false);
    this.authService.logout();
  }
}