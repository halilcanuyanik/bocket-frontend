// REACT HOOKS
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

// COMPONENTS
import Loading from '@/components/common/Loading';

// UTILS
import { formatCurrency } from '@/utils/CurrencyFormatter';

// APIs
import api from '@/lib/axiosClient';

export default function SeatInspectionPage() {
  const { id } = useParams();

  const containerRef = useRef(null);
  const [event, setEvent] = useState(null);
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getEvent = async () => {
      try {
        const response = await api.get(`/shows/events/${id}`);
        setEvent(response.data.data);
        setScale(response.data.data?.meta?.scale);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getEvent();
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loading size="md" color="bg-black" />
      </div>
    );
  }

  if (!event.eventSeatMap) {
    return (
      <div className="p-6 text-center text-gray-500">Seat Map Not Found.</div>
    );
  }

  const { width: mapWidth, height: mapHeight } = calculateSeatMapSize(
    event.eventSeatMap
  );

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
          <StageDisplay stage={event.eventSeatMap.stage} />

          {event.eventSeatMap.groups.map((group) => (
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
      className="absolute bg-gray-300 rounded-b-[40px] flex items-center justify-center text-gray-500 font-bold tracking-[0.5em] shadow-2xl border-b-4 border-gray-700"
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
