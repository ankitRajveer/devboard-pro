import { Component, input } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-header__title">Task #{{ id() }}</h1>
        <p class="page-header__subtitle">Task detail view</p>
      </div>
    </div>
    <div class="db-card">
      <p class="text-muted">🚧 Task detail coming soon...</p>
    </div>
  `,
})
export class TaskDetail {
  readonly id = input<string>('');
}