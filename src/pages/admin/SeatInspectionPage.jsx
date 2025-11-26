export default function SeatInspection({ data }) {
  const SeatStatus = {
    available: 'available',
    taken: 'taken',
    blocked: 'blocked',
  };

  const seatColor = (seat) => {
    if (seat.isSelected) return '#E04B57';
    if (seat.status === SeatStatus.available) return '#2C3186';
    if (seat.status === SeatStatus.taken) return 'gray';
    return 'black';
  };

  return (
    <div className="w-full h-full relative overflow-hidden touch-none">
      <div
        className="absolute top-0 left-0 pointer-none:"
        style={{
          transformOrigin: '0 0',
          //   transform: `scale(${scale})`,
          zIndex: 0,
        }}
      >
        <div
          className="absolute flex items-center justify-center font-bold text-white bg-gray-400 rounded-sm text-2xl"
          style={{
            left: data.stage.x,
            top: data.stage.y,
            width: data.stage.width,
            height: data.stage.height,
            userSelect: 'none',
          }}
        >
          STAGE
        </div>

        {data.groups.map((g) => (
          <div
            key={g.id}
            className={`absolute bg-gray-200 p-1 rounded-md border-indigo`}
            style={{
              left: g.x,
              top: g.y,
            }}
          >
            {g.grid.map((row, ri) => (
              <div key={ri} className="flex items-center">
                {row.map((seat, ci) => (
                  <div
                    key={ci}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="w-10 h-10 m-1 rounded-md flex items-center justify-center text-white text-xl select-none cursor-pointer"
                    style={{ backgroundColor: seatColor(seat) }}
                  >
                    {seat.id}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
