import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="register">
      <h2 class="register__heading">Create account</h2>
      <p class="register__sub">Start managing projects today</p>

      <div class="form-group">
        <label class="form-label">Full name <span class="required">*</span></label>
        <input class="form-control" type="text" placeholder="Ankit Sharma" [(ngModel)]="name" />
      </div>

      <div class="form-group">
        <label class="form-label">Email <span class="required">*</span></label>
        <input class="form-control" type="email" placeholder="you@company.com" [(ngModel)]="email" />
      </div>

      <div class="form-group">
        <label class="form-label">Password <span class="required">*</span></label>
        <input class="form-control" type="password" placeholder="Min. 8 characters" [(ngModel)]="password" />
      </div>

      <button class="btn btn--primary w-100 mt-2">Create account</button>

      <p class="register__login">
        Already have an account? <a routerLink="/auth/login">Sign in</a>
      </p>
    </div>
  `,
  styles: [`
    .register {
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
      &__login {
        text-align: center;
        font-size: var(--font-size-sm);
        color: var(--color-text-muted);
        margin-top: var(--space-5);
        a { color: var(--color-text-brand); font-weight: var(--font-weight-medium); }
      }
    }
  `],
})
export class Register {
  name     = signal('');
  email    = signal('');
  password = signal('');
}