import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '@/components/common/Loading';
import { formatCurrency } from '@/utils/CurrencyFormatter';
import api from '@/lib/axiosClient';
import socket from '@/lib/socket';

export default function SeatSelectionPage() {
  const { id: eventId } = useParams();
  const containerRef = useRef(null);

  const [eventData, setEventData] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [lockedSeatsMap, setLockedSeatsMap] = useState({});

  const [mySelectedSeatIds, setMySelectedSeatIds] = useState([]);

  const mySelectedSeatIdsRef = useRef([]);

  useEffect(() => {
    mySelectedSeatIdsRef.current = mySelectedSeatIds;
  }, [mySelectedSeatIds]);

  useEffect(() => {
    let isMounted = true;
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/shows/events/${eventId}`);
        if (isMounted) {
          setEventData(response.data.data);
          setZoomScale(response.data.data?.meta?.scale || 1);
        }
      } catch (err) {
        console.error('Event data fetch error:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    if (eventId) fetchEvent();
    return () => {
      isMounted = false;
    };
  }, [eventId]);

  useEffect(() => {
    if (!eventId) return;

    const handleInitialLocks = ({ locks }) => {
      const initialMap = {};
      locks.forEach((lock) => {
        initialMap[lock.seatId] = {
          lockedBy: lock.lockedBy,
          expiresAt: lock.expiresAt,
        };
      });
      setLockedSeatsMap(initialMap);
    };

    const handleSeatLocked = ({ seatId, lockedBy, expiresAt }) => {
      setLockedSeatsMap((prev) => ({
        ...prev,
        [seatId]: { lockedBy, expiresAt },
      }));
    };

    const handleSeatUnlocked = ({ seatId }) => {
      setLockedSeatsMap((prev) => {
        const updated = { ...prev };
        delete updated[seatId];
        return updated;
      });
    };

    const handleLockFailed = ({ seatId }) => {
      setMySelectedSeatIds((prev) => prev.filter((id) => id !== seatId));
      alert('This seat is currently unavailable.');
    };

    if (!socket.connected) socket.connect();

    socket.emit('join_event_room', eventId);

    socket.emit('request_initial_locks', { eventId });

    socket.on('initial_locks', handleInitialLocks);
    socket.on('seat_locked', handleSeatLocked);
    socket.on('seat_unlocked', handleSeatUnlocked);
    socket.on('seat_lock_failed', handleLockFailed);

    return () => {
      socket.emit('leave_event_room', eventId);

      if (mySelectedSeatIdsRef.current.length > 0) {
        mySelectedSeatIdsRef.current.forEach((seatId) => {
          socket.emit('unlock_seat', { eventId, seatId });
        });
      }

      socket.off('initial_locks', handleInitialLocks);
      socket.off('seat_locked', handleSeatLocked);
      socket.off('seat_unlocked', handleSeatUnlocked);
      socket.off('seat_lock_failed', handleLockFailed);
    };
  }, [eventId]);

  const handleSeatInteraction = useCallback(
    (seatId) => {
      const isAlreadySelected = mySelectedSeatIds.includes(seatId);

      console.log(lockedSeatsMap);

      const isLockedBySomeoneElse =
        lockedSeatsMap[seatId] && !isAlreadySelected;

      if (isLockedBySomeoneElse) return;

      if (isAlreadySelected) {
        socket.emit('unlock_seat', { eventId, seatId });
        setMySelectedSeatIds((prev) => prev.filter((id) => id !== seatId));
      } else {
        socket.emit('lock_seat', { eventId, seatId });
        setMySelectedSeatIds((prev) => [...prev, seatId]);
      }
    },
    [eventId, lockedSeatsMap, mySelectedSeatIds]
  );

  const mapDimensions = useMemo(() => {
    return calculateSeatMapSize(eventData?.eventSeatMap);
  }, [eventData]);

  if (isLoading) return <Loading />;
  if (!eventData?.eventSeatMap) return <div>Seat Map Not Found.</div>;

  return (
    <div className="relative flex flex-col flex-1 overflow-hidden">
      <div
        ref={containerRef}
        className="flex-1 min-h-screen overflow-auto relative cursor-grab active:cursor-grabbing bg-gray-50"
      >
        <div
          className="relative origin-top-left transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${zoomScale})`,
            width: mapDimensions.width,
            height: mapDimensions.height,
          }}
        >
          <Stage stage={eventData.eventSeatMap.stage} />

          {eventData.eventSeatMap.groups.map((group) => (
            <SeatSection
              key={group.id}
              group={group}
              currency={eventData.pricing.currency}
              lockedSeatsMap={lockedSeatsMap}
              mySelectedSeatIds={mySelectedSeatIds}
              onSeatClick={handleSeatInteraction}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const SeatSection = ({
  group,
  currency,
  lockedSeatsMap,
  mySelectedSeatIds,
  onSeatClick,
}) => {
  return (
    <div className="absolute" style={{ left: group.x, top: group.y }}>
      <div className="mb-2 text-center text-xs font-bold text-gray-500">
        {group.price && (
          <span className="text-orange-600">
            {formatCurrency(currency)}
            {group.price}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {group.grid.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex gap-2">
            <RowLabel label={row[0]?.id?.charAt(0)} />
            {row.map((seat) => {
              const uniqueSeatId = `${group.id}${seat.id}`;

              const isMySelection = mySelectedSeatIds.includes(uniqueSeatId);
              const isLocked = !!lockedSeatsMap[uniqueSeatId];

              const isLockedByOther = isLocked && !isMySelection;

              return (
                <SeatItem
                  key={uniqueSeatId}
                  seatLabel={seat.id.replace(/[A-Z]/, '')}
                  status={
                    isMySelection
                      ? 'selected'
                      : isLockedByOther
                      ? 'locked'
                      : 'available'
                  }
                  onClick={() => onSeatClick(uniqueSeatId)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const Stage = ({ stage }) => (
  <div
    className="absolute bg-gray-300 rounded-b-[40px] flex items-center justify-center text-gray-600 font-bold tracking-[0.5em] shadow-lg border-b-4 border-gray-400"
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

const RowLabel = ({ label }) => (
  <div className="w-4 flex items-center justify-center text-gray-400 text-[10px] font-bold">
    {label}
  </div>
);

const SeatItem = ({ seatLabel, status, onClick }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'locked':
        return 'bg-gray-300 text-gray-500 cursor-not-allowed';
      case 'selected':
        return 'bg-green-500 text-white shadow-md scale-110 ring-2 ring-green-300 cursor-pointer';
      case 'available':
      default:
        return 'bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer hover:scale-110 shadow-sm';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={status === 'locked'}
      className={`
        w-8 h-8 rounded-t-lg text-[10px] font-medium
        flex items-center justify-center
        transition-all duration-200
        ${getStatusStyles()}
      `}
    >
      {seatLabel}
    </button>
  );
};

function calculateSeatMapSize(seatMap) {
  if (!seatMap) return { width: 1000, height: 1000 };

  let maxX = (seatMap.stage.x || 0) + (seatMap.stage.width || 0);
  let maxY = (seatMap.stage.y || 0) + (seatMap.stage.height || 0);

  seatMap.groups.forEach((group) => {
    group.grid.forEach((row) => {
      row.forEach((seat) => {
        const seatRight = (seat.x || 0) + 40;
        const seatBottom = (seat.y || 0) + 40;
        if (seatRight > maxX) maxX = seatRight;
        if (seatBottom > maxY) maxY = seatBottom;
      });
    });
  });

  return { width: maxX + 100, height: maxY + 100 };
}
