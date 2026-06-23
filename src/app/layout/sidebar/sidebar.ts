import { Component, input, output, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="sidebar" [class.collapsed]="collapsed()">

      <!-- Logo -->
      <a class="sidebar__logo" routerLink="/dashboard">
        <div class="sidebar__logo-icon">D</div>
        <span class="sidebar__logo-text">DevBoard Pro</span>
      </a>

      <!-- Navigation -->
      <div class="sidebar__nav">
        @for (section of navSections; track section.title) {
          <div class="sidebar__section">
            <p class="sidebar__section-title">{{ section.title }}</p>

            @for (item of section.items; track item.route) {
              <a
                class="sidebar__nav-item"
                [routerLink]="item.route"
                routerLinkActive="active"
              >
                <i class="bi {{ item.icon }} sidebar__nav-item__icon"></i>
                <span class="sidebar__nav-item__label">{{ item.label }}</span>
                @if (item.badge) {
                  <span class="sidebar__nav-item__badge">{{ item.badge }}</span>
                }
              </a>
            }
          </div>
        }
      </div>

      <!-- Footer / User -->
      <div class="sidebar__footer">
        <!-- Collapse toggle -->
        <button
          class="sidebar__nav-item"
          (click)="toggleCollapse.emit()"
          style="margin-bottom: var(--space-2)"
        >
          <i
            class="bi sidebar__nav-item__icon"
            [class.bi-layout-sidebar]="!collapsed()"
            [class.bi-layout-sidebar-reverse]="collapsed()"
          ></i>
          <span class="sidebar__nav-item__label">Collapse</span>
        </button>

        <!-- User info -->
        <div class="sidebar__user">
          <div class="sidebar__user-avatar">
            {{ authService.userInitials() }}
          </div>
          <div>
            <p class="sidebar__user-name">{{ authService.user()?.name }}</p>
            <p class="sidebar__user-role">{{ authService.user()?.role }}</p>
          </div>
        </div>
      </div>
    </nav>
  `,
})
export class Sidebar {
  // Signals API
  readonly collapsed      = input<boolean>(false);
  readonly toggleCollapse = output<void>();

  readonly authService = inject(AuthService);

  readonly navSections: NavSection[] = [
    {
      title: 'Main',
      items: [
        { label: 'Dashboard',     icon: 'bi-grid-1x2',       route: '/dashboard' },
        { label: 'Projects',      icon: 'bi-folder2-open',   route: '/projects' },
        { label: 'Tasks',         icon: 'bi-kanban',         route: '/tasks' },
        { label: 'Analytics',     icon: 'bi-bar-chart-line', route: '/analytics' },
      ],
    },
    {
      title: 'Workspace',
      items: [
        { label: 'Team',          icon: 'bi-people',         route: '/team' },
        { label: 'Notifications', icon: 'bi-bell',           route: '/notifications', badge: 3 },
        { label: 'Settings',      icon: 'bi-gear',           route: '/settings' },
      ],
    },
  ];
}