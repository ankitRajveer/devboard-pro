import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-header__title">Projects</h1>
        <p class="page-header__subtitle">Welcome to the Projects page</p>
      </div>
    </div>
    <div class="db-card">
      <p class="text-muted">Projects feature — coming soon</p>
    </div>
  `,
})
export class Projects {}