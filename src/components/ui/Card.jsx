function Card({ order, coverImage, title, performer, textStyle }) {
  return (
    <div className="flex justify-center items-center relative">
      <p
        className={`absolute text-[16rem] -left-16 translate-y-6 whitespace-nowrap ${textStyle}`}
      >
        {order}
      </p>
      <div
        className="
        group relative 
        w-36 h-48 sm:w-44 sm:h-56 md:w-52 md:h-64 
        rounded-xl overflow-hidden 
        cursor-pointer shadow-lg 
        transition-transform duration-300
        bg-neutral-900
      "
      >
        <div
          className="
          absolute inset-0 
          bg-cover bg-center 
          transition-transform duration-500 ease-out 
          group-hover:scale-110 group-hover:brightness-110
        "
          style={{ backgroundImage: `url(${coverImage})` }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
          <h3 className="text-sm sm:text-base md:text-lg font-bold truncate">
            {title}
          </h3>
          <p className="text-xs sm:text-sm opacity-80 truncate">{performer}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
