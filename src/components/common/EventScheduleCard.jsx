import { formatEventTime } from '@/utils/timeUtils';

export default function EventScheduleCard({ date = new Date() }) {
  const { hour, minute, ampm, day, month, year, weekday } =
    formatEventTime(date);

  return (
    <div
      className="
        w-full max-w-md 
        h-32 md:h-40 
        bg-white rounded-sm overflow-hidden 
        grid grid-cols-2 font-[Lexend] 
        relative
      "
    >
      <div
        className="
          absolute left-0 top-1/2 -translate-y-1/2 
          w-3 h-6 md:w-4 md:h-8 
          bg-inherit rounded-r-full
        "
      />

      {/* <div className="absolute h-full w-6 left-[calc(50%-12px)] border-x-2 border-dashed border-white"></div> */}

      <div
        className="
          absolute right-0 top-1/2 -translate-y-1/2 
          w-3 h-6 md:w-4 md:h-8 
          bg-inherit rounded-l-full
        "
      />

      <div className="w-full h-full bg-gradient-to-r from-pastel-gold to-lively-orange flex flex-col justify-center items-center">
        <div className="flex items-end">
          <span className="text-5xl md:text-7xl text-lively-orange opacity-90">
            {hour}
          </span>
          <span className="text-4xl md:text-6xl text-lively-orange opacity-100">
            :{minute}
          </span>
        </div>

        <span className="text-lg md:text-xl text-pastel-gold opacity-60">
          {ampm}
        </span>
      </div>

      <div className="w-full h-full px-3 md:px-6 bg-gradient-to-r from-fuchsia to-bright-violet text-white flex flex-col justify-center">
        <div className="flex items-end gap-1 md:gap-2">
          <span className="text-3xl md:text-5xl">{day}</span>
          <span className="text-lg md:text-xl">{month}</span>
        </div>

        <span className="text-3xl md:text-5xl self-center">{year}</span>
        <span className="text-3xl md:text-5xl self-end">{weekday}</span>
      </div>
    </div>
  );
}
