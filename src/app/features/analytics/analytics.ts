import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics',
  standalone: true,
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-header__title">Analytics</h1>
        <p class="page-header__subtitle">Welcome to the Analytics page</p>
      </div>
    </div>
    <div class="db-card">
      <p class="text-muted">Analytics feature — coming soon</p>
    </div>
  `,
})
export class Analytics {}