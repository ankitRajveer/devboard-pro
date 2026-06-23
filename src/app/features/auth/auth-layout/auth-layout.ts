import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="auth-layout">
      <div class="auth-layout__brand">
        <div class="auth-layout__logo">D</div>
        <h1 class="auth-layout__title">DevBoard Pro</h1>
        <p class="auth-layout__tagline">Project management for modern teams</p>
      </div>
      <div class="auth-layout__card">
        <router-outlet />
      </div>
    </div>
  `,
  styles: [`
    .auth-layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: var(--color-bg-subtle);
      padding: var(--space-6);
      gap: var(--space-6);

      &__brand {
        text-align: center;
      }

      &__logo {
        width: 52px;
        height: 52px;
        background: linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500));
        border-radius: var(--radius-xl);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        margin: 0 auto var(--space-4);
      }

      &__title {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-text-primary);
        letter-spacing: -0.025em;
      }

      &__tagline {
        font-size: var(--font-size-sm);
        color: var(--color-text-muted);
        margin-top: var(--space-1);
      }

      &__card {
        width: 100%;
        max-width: 420px;
        background-color: var(--color-card-bg);
        border: 1px solid var(--color-card-border);
        border-radius: var(--radius-2xl);
        box-shadow: var(--shadow-lg);
        padding: var(--space-8);
      }
    }
  `],
})
export class AuthLayout {}