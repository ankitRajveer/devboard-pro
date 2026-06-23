import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // ── Default redirect ──────────────────────────────────
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  // ── Auth routes (no shell, no guard) ─────────────────
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/auth-layout/auth-layout').then(
        (m) => m.AuthLayout
      ),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login').then((m) => m.Login),
        title: 'Login — DevBoard Pro',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register').then((m) => m.Register),
        title: 'Register — DevBoard Pro',
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },

  // ── Protected routes (shell layout + auth guard) ──────
  {
    path: '',
    loadComponent: () =>
      import('./layout/shell/shell').then((m) => m.Shell),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then((m) => m.Dashboard),
        title: 'Dashboard — DevBoard Pro',
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./features/projects/projects').then((m) => m.Projects),
        title: 'Projects — DevBoard Pro',
      },
      {
        path: 'tasks',
        loadComponent: () =>
          import('./features/tasks/task-board/task-board').then(
            (m) => m.TaskBoard
          ),
        title: 'Tasks — DevBoard Pro',
      },
      {
        path: 'tasks/:id',
        loadComponent: () =>
          import('./features/tasks/task-detail/task-detail').then(
            (m) => m.TaskDetail
          ),
        title: 'Task Detail — DevBoard Pro',
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./features/analytics/analytics').then((m) => m.Analytics),
        title: 'Analytics — DevBoard Pro',
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./features/notifications/notification').then(
            (m) => m.Notifications
          ),
        title: 'Notifications — DevBoard Pro',
      },
      {
        path: 'team',
        loadComponent: () =>
          import('./features/team/team').then((m) => m.Team),
        title: 'Team — DevBoard Pro',
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings').then((m) => m.Settings),
        title: 'Settings — DevBoard Pro',
      },
    ],
  },

  // ── Wildcard ──────────────────────────────────────────
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];