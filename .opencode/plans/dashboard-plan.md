# Dashboard Implementation Plan

## Architecture
```
Route: /dashboard
├── DashboardLayout (shell)
│   ├── AppSidebar        ← fixed left (desktop) / off-canvas drawer (mobile)
│   ├── AppTopbar         ← greeting, date, notifications, mobile menu toggle
│   └── <router-outlet>
│       └── DashboardPage ← grid of cards
│           ├── StatsCard (Tasks Completed)
│           ├── PendingTasksCard
│           │   └── TaskItem (× N)
│           │       └── PriorityBadge
│           ├── CalendarWidget
│           ├── StreakCard
│           └── MomentumChart
```

## Components
| Component | Selector | File |
|-----------|----------|------|
| DashboardLayout | app-dashboard-layout | layout/dashboard-layout/ |
| AppSidebar | app-sidebar | components/dashboard/sidebar/ |
| AppTopbar | app-topbar | components/dashboard/topbar/ |
| DashboardPage | page-dashboard | pages/dashboard/ |
| StatsCard | app-stats-card | components/dashboard/stats-card/ |
| PendingTasksCard | app-pending-tasks-card | components/dashboard/pending-tasks-card/ |
| TaskItem | app-task-item | components/dashboard/task-item/ |
| PriorityBadge | app-priority-badge | components/dashboard/priority-badge/ |
| CalendarWidget | app-calendar-widget | components/dashboard/calendar-widget/ |
| StreakCard | app-streak-card | components/dashboard/streak-card/ |
| MomentumChart | app-momentum-chart | components/dashboard/momentum-chart/ |

## Route
```typescript
{
  path: 'dashboard',
  loadComponent: () => import('./layout/dashboard-layout/dashboard-layout').then(m => m.DashboardLayout),
  children: [
    { path: '', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardPage) },
  ],
}
```

## i18n Namespace
`dashboard.*`, `sidebar.*`, `topbar.*`

## Animations
- Card entrance: staggered fadeInUp
- Sidebar: translateX slide + backdrop fade
- Chart bars: CSS keyframe width animation
- Hover states: CSS transitions
