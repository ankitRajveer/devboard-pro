import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-header__title">Dashboard</h1>
        <p class="page-header__subtitle">Welcome to the Dashboard page</p>
      </div>
    </div>
    <div class="db-card">
      <p class="text-muted">Dashboard feature — coming soon</p>
    </div>
  `,
})
export class Dashboard {}