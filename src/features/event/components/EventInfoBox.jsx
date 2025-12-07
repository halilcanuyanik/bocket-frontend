// UTILS
import { formatEventTime } from '@/utils/timeUtils.js';

// LOGO & ICONS
import calendarIcon from '@/assets/icons/calendar.svg';
import timeIcon from '@/assets/icons/time.svg';

export default function EventInfoBox({ title, performer, time }) {
  const { hour, minute, ampm, day, month, year } = formatEventTime(time);

  return (
    <div className="absolute top-16 left-4 pl-4 bg-white rounded-md shadow-lg border-2 border-[#888] w-64 h-48 flex truncate items-center justify-between z-50">
      <div className="flex flex-col gap-4">
        <span className="text-md text-black">{title}</span>

        <span className="font-bold text-md text-black">@{performer}</span>

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
