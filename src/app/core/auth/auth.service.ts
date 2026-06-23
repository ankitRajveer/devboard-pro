import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = '/api/v1/auth';

  // ── Private state signals ─────────────────────────────
  private readonly _user    = signal<User | null>(null);
  private readonly _token   = signal<string | null>(null);
  private readonly _loading = signal(false);

  // ── Public computed signals ───────────────────────────
  readonly user      = this._user.asReadonly();
  readonly token     = this._token.asReadonly();
  readonly loading   = this._loading.asReadonly();
  readonly isLoggedIn = computed(() => !!this._token());
  readonly userInitials = computed(() => {
    const u = this._user();
    if (!u) return '';
    return u.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  });

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.restoreSession();
  }

  login(email: string, password: string) {
    this._loading.set(true);
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap({
          next: (res) => this.setSession(res),
          error: () => this._loading.set(false),
          complete: () => this._loading.set(false),
        })
      );
  }

  logout(): void {
    this._user.set(null);
    this._token.set(null);
    localStorage.removeItem('db-token');
    localStorage.removeItem('db-user');
    this.router.navigate(['/auth/login']);
  }

  private setSession(res: AuthResponse): void {
    this._token.set(res.token);
    this._user.set(res.user);
    localStorage.setItem('db-token', res.token);
    localStorage.setItem('db-user', JSON.stringify(res.user));
  }

  private restoreSession(): void {
    const token = localStorage.getItem('db-token');
    const user  = localStorage.getItem('db-user');
    if (token && user) {
      this._token.set(token);
      this._user.set(JSON.parse(user));
    }
  }
}