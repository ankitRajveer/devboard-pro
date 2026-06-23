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
  templateUrl: './sidebar.html',
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