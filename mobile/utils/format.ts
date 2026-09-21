export function formatVND(value: number): string {
  return new Intl.NumberFormat('vi-VN').format(value) + 'd';
}

export function greetingByHour(hour: number): string {
  if (hour < 11) return 'Good morning';
  if (hour < 14) return 'Good afternoon';
  if (hour < 18) return 'Good evening';
  return 'Good night';
}
