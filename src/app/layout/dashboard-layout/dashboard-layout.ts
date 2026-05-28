import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppSidebarComponent } from '../../components/dashboard/sidebar/sidebar';
import { AppTopbarComponent } from '../../components/dashboard/topbar/topbar';
import { TaskStore } from '../../core/stores/task.store';
import { AuthService } from '../../services/auth.service';
import type { UserData } from '../../core/models/user.model';

@Component({
  selector: 'app-dashboard-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, AppSidebarComponent, AppTopbarComponent],
  host: {
    class: 'dashboard-layout',
    '[class.sidebar-open]': 'sidebarOpen()',
    '[style.--sidebar-width.px]': 'sidebarWidth()',
  },
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayout {
  private taskStore = inject(TaskStore);

  protected sidebarOpen = signal(false);
  protected sidebarCollapsed = signal(false);

  private _authService = inject(AuthService);

  protected sidebarWidth = computed(() => (this.sidebarCollapsed() ? 68 : 240));

  protected currentUser = this._authService.currentUser() as UserData;

  protected currentDate = computed(() => {
    const now = new Date();
    return now.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  });

  protected toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  protected closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  protected handleNavigate(route: string): void {
    // TODO: Implement navigation or tracking
    console.log('Navigate to:', route);
  }

  protected handleNewTask(): void {
    this.taskStore.openCreateDialog();
  }

  protected handleLogout(): void {
    // TODO: Implement logout via AuthService
    console.log('Logout requested');

    this._authService.logout();
  }
}
