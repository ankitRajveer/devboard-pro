import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, Sidebar, Header],
  templateUrl: './shell.html',
  styleUrls: ['./shell.scss'],
})
export class Shell {
  readonly themeService = inject(ThemeService);

  readonly sidebarCollapsed = signal(false);
  readonly sidebarOpen      = signal(false);

  toggleSidebar(): void {
    this.sidebarCollapsed.update((v) => !v);
  }

  toggleMobileSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }
}