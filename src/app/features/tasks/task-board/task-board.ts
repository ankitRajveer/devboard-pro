import { Component } from '@angular/core';

@Component({
  selector: 'app-task-board',
  standalone: true,
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-header__title">Tasks</h1>
        <p class="page-header__subtitle">Kanban board</p>
      </div>
    </div>
    <div class="db-card">
      <p class="text-muted">🚧 Task board coming soon...</p>
    </div>
  `,
})
export class TaskBoard {}