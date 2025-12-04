import { formatEventTime } from '@/utils/timeUtils';

export default function EventScheduleCard({ date = new Date() }) {
  const { hour, minute, ampm, day, month, year, weekday } =
    formatEventTime(date);

  return (
    <div className="w-144 h-48 bg-white rounded-sm overflow-hidden grid grid-cols-2 font-[Lexend] relative">
      <div
        className="
          absolute left-0 top-1/2 -translate-y-1/2 
          w-6 h-12 bg-inherit
          rounded-r-full
        "
      />

      <div
        className="
          absolute right-0 top-1/2 -translate-y-1/2 
          w-6 h-12 bg-inherit
          rounded-l-full
        "
      />

      <div className=" w-full h-full bg-gradient-to-r from-pastel-gold to-lively-orange flex flex-col justify-center items-center">
        <div className="flex items-end">
          <span className=" text-9xl text-lively-orange opacity-90">
            {hour}
          </span>
          <span className="text-7xl text-lively-orange opacity-100">
            :{minute}
          </span>
        </div>

        <span className="text-3xl text-pastel-gold opacity-60">{ampm}</span>
      </div>
      <div className="w-full h-full px-6 bg-gradient-to-r from-fuchsia to-bright-violet text-white flex flex-col justify-center">
        <div className="flex items-end gap-2">
          <span className="text-6xl">{day}</span>
          <span className="text-2xl">{month}</span>
        </div>
        <span className="text-6xl self-center">{year}</span>
        <span className="text-6xl self-end">{weekday}</span>
      </div>
    </div>
  );
}
