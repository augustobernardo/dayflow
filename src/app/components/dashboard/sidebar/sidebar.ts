import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideLayoutDashboard,
  LucideCheckCheck,
  LucideFolderKanban,
  LucideSettings,
  LucidePlus,
  LucideHelpCircle,
  LucideLogOut,
  LucideUserCircle,
  LucideChevronLeft,
} from '@lucide/angular';
import { UserData } from '../../../core/models/user.model';

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    LucideLayoutDashboard,
    LucideCheckCheck,
    LucideFolderKanban,
    LucideSettings,
    LucidePlus,
    LucideHelpCircle,
    LucideLogOut,
    LucideUserCircle,
    LucideChevronLeft,
  ],
  host: {
    class: 'app-sidebar',
    '[class.collapsed]': 'collapsed()',
    '[class.mobile-open]': 'mobileOpen()',
    '[attr.aria-label]': '"Main navigation"',
  },
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class AppSidebarComponent {
  user = input.required<UserData>();
  collapsed = input(false);
  mobileOpen = input(false);

  navigate = output<string>();
  toggleCollapse = output<void>();
  newTask = output<void>();
  logout = output<void>();

  protected readonly appName = $localize`:@@common.appName:DayFlow`;
}
