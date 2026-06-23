import { Component, input } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  templateUrl: './task-detail.html',
})
export class TaskDetail {
  readonly id = input<string>('');
}