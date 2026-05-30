# Dashboard Refactor & Task CRUD Plan

## Issues Fixed
1. **Sidebar Collapse** — `margin-left` not updating when sidebar collapses
2. **Priority Badges** — inconsistent colors, hardcoded hex values
3. **Task Completion** — not updating UI state reactively
4. **"New Task" Button** — `+` character in text instead of icon-only
5. **Task CRUD** — full frontend implementation with signal-based store

## Architecture
```
core/models/task.model.ts          # Task interface, DTOs
core/stores/task.store.ts          # Signal-based task state
features/tasks/services/           # Stubbed API service
features/tasks/components/
  task-dialog/                     # Modal (create/edit)
  task-form/                       # Reusable form
```

## Implementation Order
1. task.model.ts
2. task.service.ts (stubbed)
3. task.store.ts
4. Sidebar collapse fix
5. Priority badge fix
6. "New Task" button fix
7. TaskItem edit/delete
8. Wire PendingTasksCard to store
9. TaskForm component
10. TaskDialog component
11. Wire "New Task" button to dialog
12. Wire edit to dialog
13. Delete confirmation
14. i18n keys
15. Build verification
