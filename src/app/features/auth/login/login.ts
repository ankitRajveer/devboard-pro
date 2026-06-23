import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="login">
      <h2 class="login__heading">Welcome back</h2>
      <p class="login__sub">Sign in to your account</p>

      @if (error()) {
        <div class="alert-error">
          <i class="bi bi-exclamation-circle"></i>
          {{ error() }}
        </div>
      }

      <div class="form-group">
        <label class="form-label">Email <span class="required">*</span></label>
        <input
          class="form-control"
          type="email"
          placeholder="you@company.com"
          [(ngModel)]="email"
          autocomplete="email"
        />
      </div>

      <div class="form-group">
        <label class="form-label">Password <span class="required">*</span></label>
        <div class="password-field">
          <input
            class="form-control"
            [type]="showPassword() ? 'text' : 'password'"
            placeholder="••••••••"
            [(ngModel)]="password"
            autocomplete="current-password"
          />
          <button
            class="password-field__toggle"
            type="button"
            (click)="showPassword.update(v => !v)"
          >
            <i class="bi" [class.bi-eye]="!showPassword()" [class.bi-eye-slash]="showPassword()"></i>
          </button>
        </div>
      </div>

      <div class="login__options">
        <label class="checkbox-label">
          <input type="checkbox" [(ngModel)]="rememberMe" />
          Remember me
        </label>
        <a class="login__forgot" href="#">Forgot password?</a>
      </div>

      <button
        class="btn btn--primary w-100 mt-3"
        [disabled]="loading()"
        (click)="onLogin()"
      >
        @if (loading()) {
          <span class="spinner"></span> Signing in...
        } @else {
          Sign in
        }
      </button>

      <p class="login__register">
        Don't have an account?
        <a routerLink="/auth/register">Create one</a>
      </p>
    </div>
  `,
  styles: [`
    .login {
      &__heading {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-text-primary);
        margin-bottom: var(--space-1);
      }
      &__sub {
        font-size: var(--font-size-sm);
        color: var(--color-text-muted);
        margin-bottom: var(--space-6);
      }
      &__options {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: calc(var(--space-2) * -1);
      }
      &__forgot {
        font-size: var(--font-size-sm);
        color: var(--color-text-brand);
      }
      &__register {
        text-align: center;
        font-size: var(--font-size-sm);
        color: var(--color-text-muted);
        margin-top: var(--space-5);
        a { color: var(--color-text-brand); font-weight: var(--font-weight-medium); }
      }
    }

    .alert-error {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-3) var(--space-4);
      background-color: var(--color-danger-50);
      border: 1px solid var(--color-danger-500);
      border-radius: var(--radius-lg);
      color: var(--color-danger-700);
      font-size: var(--font-size-sm);
      margin-bottom: var(--space-4);
    }

    .password-field {
      position: relative;
      &__toggle {
        position: absolute;
        right: var(--space-3);
        top: 50%;
        transform: translateY(-50%);
        color: var(--color-text-muted);
        background: none;
        border: none;
        cursor: pointer;
        font-size: var(--font-size-base);
        padding: 0;
        &:hover { color: var(--color-text-primary); }
      }
      input { padding-right: var(--space-10); }
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      cursor: pointer;
    }

    .spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      display: inline-block;
    }

    @keyframes spin { to { transform: rotate(360deg); } }
  `],
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router      = inject(Router);

  // Form signals
  email        = signal('');
  password     = signal('');
  rememberMe   = signal(false);
  showPassword = signal(false);
  loading      = signal(false);
  error        = signal('');

  onLogin(): void {
    if (!this.email() || !this.password()) {
      this.error.set('Please fill in all fields.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.authService.login(this.email(), this.password()).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.error.set(err?.error?.message ?? 'Invalid email or password.');
        this.loading.set(false);
      },
    });
  }
}