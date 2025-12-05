// UTILS
import { formatEventTime } from '@/utils/timeUtils.js';

// LOGO & ICONS
import calendarIcon from '@/assets/icons/calendar.svg';
import timeIcon from '@/assets/icons/time.svg';

export default function EventTimeBar({ time }) {
  const { hour, minute, ampm, day, month, year } = formatEventTime(time);

  return (
    <div className="h-16 flex items-center justify-between">
      <div className="flex items-center gap-4 pl-4 mr-4">
        <span className="flex gap-2">
          <img src={calendarIcon} alt="Calendar" />
          {day} {month} {year}
        </span>

        <span className="flex gap-2">
          <img src={timeIcon} alt="Time" />
          {hour}:{minute} {ampm}
        </span>
      </div>
    </div>
  );
}
