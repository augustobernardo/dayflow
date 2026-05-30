import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { LucideBell, LucideMenu, LucideX } from '@lucide/angular';

type GreetingKey = 'morning' | 'afternoon' | 'evening';

@Component({
  selector: 'app-topbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideBell, LucideMenu, LucideX],
  host: {
    'class': 'app-topbar',
  },
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class AppTopbarComponent {
  userName = input.required<string>();
  currentDate = input.required<string>();
  sidebarOpen = input(false);

  menuToggle = output<void>();

  protected get greeting(): string {
    const hour = new Date().getHours();
    let key: GreetingKey;
    if (hour < 12) key = 'morning';
    else if (hour < 18) key = 'afternoon';
    else key = 'evening';

    const greetings: Record<GreetingKey, string> = {
      morning: $localize`:@@topbar.greeting.morning:Good Morning`,
      afternoon: $localize`:@@topbar.greeting.afternoon:Good Afternoon`,
      evening: $localize`:@@topbar.greeting.evening:Good Evening`,
    };

    return `${greetings[key]}, ${this.userName()}`;
  }

  protected readonly subtitleText = $localize`:@@topbar.subtitle:Here's your productivity overview for today.`;
}
