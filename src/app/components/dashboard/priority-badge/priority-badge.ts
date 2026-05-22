import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

export type Priority = 'high' | 'medium' | 'low';

@Component({
  selector: 'app-priority-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[attr.aria-label]': 'label()',
  },
  templateUrl: './priority-badge.html',
  styleUrl: './priority-badge.scss',
})
export class PriorityBadgeComponent {
  priority = input.required<Priority>();

  protected classes = computed(() => `priority-badge priority-${this.priority()}`);

  protected label = computed(() => {
    const labels: Record<Priority, string> = {
      high: $localize`:@@priority.high:High`,
      medium: $localize`:@@priority.medium:Medium`,
      low: $localize`:@@priority.low:Low`,
    };
    return `${labels[this.priority()]} ${$localize`:@@common.priority:priority`}`;
  });
}
