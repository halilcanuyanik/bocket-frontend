// REACT HOOKS
import { useState, useEffect, useRef } from 'react';

// COMPONENTS
import Loading from '@/components/common/Loading';

// UTILS
import { formatCurrency } from '@/utils/currencyUtils';

export default function SeatInspection({ venue, event, scale }) {
  const containerRef = useRef(null);
  const [seatMap, setSeatMap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const seatMapSource = event?.eventSeatMap ? 'event' : 'venue';

  useEffect(() => {
    setIsLoading(true);
    if (seatMapSource === 'event') {
      setSeatMap(event.eventSeatMap);
    } else if (seatMapSource === 'venue') {
      setSeatMap(venue.seatMap);
    }

    setIsLoading(false);
  }, [event, venue, seatMapSource]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loading size="md" color="bg-black" />
      </div>
    );
  }

  if (!seatMap) {
    return (
      <div className="p-6 text-center text-gray-500">Seat Map Not Found.</div>
    );
  }

  const { width: mapWidth, height: mapHeight } = calculateSeatMapSize(seatMap);

  return (
    <div className="relative flex flex-col flex-1 overflow-hidden">
      <div
        ref={containerRef}
        className="flex-1 min-h-screen overflow-auto relative cursor-grab active:cursor-grabbing bg-gray-100"
      >
        <div
          className="relative origin-top-left transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${scale})`,
            width: mapWidth,
            height: mapHeight,
          }}
        >
          <StageDisplay stage={seatMap.stage} />

          {seatMap.groups.map((group) => (
            <SeatGroup key={group.id} group={group} />
          ))}
        </div>
      </div>
    </div>
  );
}

function calculateSeatMapSize(seatMap) {
  if (!seatMap) return { width: 1000, height: 1000 };

  let maxX = seatMap.stage.x + seatMap.stage.width;
  let maxY = seatMap.stage.y + seatMap.stage.height;

  seatMap.groups.forEach((group) => {
    group.grid.forEach((row) => {
      row.forEach((seat) => {
        const seatRight = seat.x + 32;
        const seatBottom = seat.y + 32;
        if (seatRight > maxX) maxX = seatRight;
        if (seatBottom > maxY) maxY = seatBottom;
      });
    });
  });

  return { width: maxX, height: maxY };
}

function StageDisplay({ stage }) {
  return (
    <div
      className="absolute flex items-center justify-center bg-gray-800 text-white rounded-b-lg shadow-lg"
      style={{
        left: stage.x,
        top: stage.y,
        width: stage.width,
        height: stage.height,
      }}
    >
      STAGE
    </div>
  );
}

function SeatGroup({ group }) {
  return (
    <div className="absolute" style={{ left: group.x, top: group.y }}>
      <GroupLabel groupId={group.id} price={group?.price} />

      <div className="flex flex-col gap-2">
        {group.grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            <RowLabel firstSeatId={row[0]?.id} />

            {row.map((seat) => (
              <Seat key={seat.id} seat={seat} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function GroupLabel({ groupId, price }) {
  return (
    <div className="absolute -top-10 w-full text-center text-gray-500 text-xs font-bold uppercase tracking-wider">
      {groupId}
      {price && (
        <div className="font-bold text-md text-lively-orange">
          {price}
          {formatCurrency(event.pricing?.base)}
        </div>
      )}
    </div>
  );
}

function RowLabel({ firstSeatId }) {
  return (
    <div className="w-4 flex items-center justify-center text-gray-600 text-xs font-bold">
      {firstSeatId?.charAt(0)}
    </div>
  );
}

function Seat({ seat }) {
  return (
    <div
      className="w-8 h-8 m-1 rounded-t-lg text-[10px] flex items-center justify-center font-medium shadow-sm transition-all bg-indigo text-white cursor-pointer hover:bg-royal-blue hover:scale-110"
      title={`Seat: ${seat.id}`}
    >
      <span className="text-[9px]">{seat.id.replace(/[A-Z]/, '')}</span>
    </div>
  );
}
