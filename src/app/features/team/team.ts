import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  standalone: true,
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-header__title">Team</h1>
        <p class="page-header__subtitle">Welcome to the Team page</p>
      </div>
    </div>
    <div class="db-card">
      <p class="text-muted">Team feature — coming soon</p>
    </div>
  `,
})
export class Team {}