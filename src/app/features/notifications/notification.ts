import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  standalone: true,
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-header__title">Notifications</h1>
        <p class="page-header__subtitle">Welcome to the Notifications page</p>
      </div>
    </div>
    <div class="db-card">
      <p class="text-muted">Notifications feature — coming soon</p>
    </div>
  `,
})
export class Notifications {}