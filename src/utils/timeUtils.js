export function formatEventTime(timeStr) {
  const date = new Date(timeStr);
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;

  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours24 >= 12 ? 'PM' : 'AM';

  const day = String(date.getDate()).padStart(2, '0');

  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();

  const year = date.getFullYear();

  const weekday = date
    .toLocaleString('en-US', { weekday: 'short' })
    .toUpperCase();

  return {
    hour: hours12,
    minute: minutes,
    ampm,
    day,
    month,
    year,
    weekday,
  };
}
