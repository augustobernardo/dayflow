export interface DashboardUser {
  firstName: string;
  name: string;
  email: string;
  avatar: string;
}

export interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export interface MomentumDay {
  day: string;
  dayShort: string;
  value: number;
  isToday: boolean;
}

export const MOCK_USER: DashboardUser = {
  firstName: 'Alex',
  name: 'Alex',
  email: 'alex@dayflow.app',
  avatar: '',
};

export const MOCK_CALENDAR_DAYS: CalendarDay[] = [
  { date: 28, isCurrentMonth: false, isToday: false },
  { date: 29, isCurrentMonth: false, isToday: false },
  { date: 30, isCurrentMonth: false, isToday: false },
  { date: 1, isCurrentMonth: true, isToday: false },
  { date: 2, isCurrentMonth: true, isToday: false },
  { date: 3, isCurrentMonth: true, isToday: false },
  { date: 4, isCurrentMonth: true, isToday: false },
  { date: 5, isCurrentMonth: true, isToday: false },
  { date: 6, isCurrentMonth: true, isToday: false },
  { date: 7, isCurrentMonth: true, isToday: false },
  { date: 8, isCurrentMonth: true, isToday: false },
  { date: 9, isCurrentMonth: true, isToday: false },
  { date: 10, isCurrentMonth: true, isToday: false },
  { date: 11, isCurrentMonth: true, isToday: false },
  { date: 12, isCurrentMonth: true, isToday: false },
  { date: 13, isCurrentMonth: true, isToday: false },
  { date: 14, isCurrentMonth: true, isToday: false },
  { date: 15, isCurrentMonth: true, isToday: false },
  { date: 16, isCurrentMonth: true, isToday: false },
  { date: 17, isCurrentMonth: true, isToday: false },
  { date: 18, isCurrentMonth: true, isToday: false },
  { date: 19, isCurrentMonth: true, isToday: false },
  { date: 20, isCurrentMonth: true, isToday: false },
  { date: 21, isCurrentMonth: true, isToday: true },
  { date: 22, isCurrentMonth: true, isToday: false },
  { date: 23, isCurrentMonth: true, isToday: false },
  { date: 24, isCurrentMonth: true, isToday: false },
  { date: 25, isCurrentMonth: true, isToday: false },
  { date: 26, isCurrentMonth: true, isToday: false },
  { date: 27, isCurrentMonth: true, isToday: false },
  { date: 28, isCurrentMonth: true, isToday: false },
  { date: 29, isCurrentMonth: true, isToday: false },
  { date: 30, isCurrentMonth: true, isToday: false },
  { date: 31, isCurrentMonth: true, isToday: false },
  { date: 1, isCurrentMonth: false, isToday: false },
  { date: 2, isCurrentMonth: false, isToday: false },
  { date: 3, isCurrentMonth: false, isToday: false },
  { date: 4, isCurrentMonth: false, isToday: false },
  { date: 5, isCurrentMonth: false, isToday: false },
  { date: 6, isCurrentMonth: false, isToday: false },
  { date: 7, isCurrentMonth: false, isToday: false },
  { date: 8, isCurrentMonth: false, isToday: false },
];

export const MOCK_MOMENTUM: MomentumDay[] = [
  { day: 'Mon', dayShort: 'M', value: 85, isToday: false },
  { day: 'Tue', dayShort: 'T', value: 65, isToday: false },
  { day: 'Wed', dayShort: 'W', value: 92, isToday: false },
  { day: 'Thu', dayShort: 'T', value: 78, isToday: true },
  { day: 'Fri', dayShort: 'F', value: 0, isToday: false },
  { day: 'Sat', dayShort: 'S', value: 0, isToday: false },
  { day: 'Sun', dayShort: 'S', value: 0, isToday: false },
];

export const MOCK_STREAK = 12;

export const MOCK_CALENDAR_MONTH = 'May 2026';
