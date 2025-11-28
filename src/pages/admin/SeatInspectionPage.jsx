import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '@/components/common/Loading';
import Button from '@/components/ui/Button';
import { formatCurrency } from '@/utils/CurrencyFormatter';
import api from '@/lib/axiosClient';
import VenueInfoBar from '@/components/ui/VenueInfoBar';
import ZoomControl from '@/components/ui/ZoomControl';

const getSeatStyle = (seat) => {
  const baseStyle =
    'w-8 h-8 m-1 rounded-t-lg text-[10px] flex items-center justify-center font-medium shadow-sm transition-all';

  switch (seat.status) {
    case 'occupied':
      return `${baseStyle} bg-gray-300 text-gray-500 cursor-not-allowed`;
    case 'selected':
      return `${baseStyle} bg-green-500 text-white cursor-pointer ring-2 ring-green-300`;
    case 'vip':
      return `${baseStyle} bg-yellow-500 text-white cursor-pointer hover:bg-yellow-600`;
    default:
      return `${baseStyle} bg-indigo text-white cursor-pointer hover:bg-royal-blue hover:scale-110`;
  }
};

export default function SeatInspectionPage({
  event = {},
  venue = {},
  seatMap = {},
}) {
  const { pathname } = useLocation();

  const fromVenue = pathname.startsWith('/admin/venues/');
  const fromEvent = pathname.startsWith('/admin/events/');

  const [mapData, setMapData] = useState(null);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [groupPrices, setGroupPrices] = useState({});

  useEffect(() => {
    if (fromEvent && seatMap) {
      const parsed = JSON.parse(JSON.stringify(seatMap));

      const initialPrices = {};
      parsed.groups.forEach((g) => {
        initialPrices[g.id] = g.price || event.pricing.base || 0;
      });

      setGroupPrices(initialPrices);
      setMapData(parsed);
      setScale(parsed.meta?.scale || 1);
    } else if (fromVenue && seatMap) {
      const parsed = JSON.parse(JSON.stringify(seatMap));
      setMapData(parsed);
      setScale(parsed.meta?.scale || 1);
    }
  }, [seatMap]);

  const handleZoom = (delta) => {
    setScale((prev) => Math.max(0.2, Math.min(3, prev + delta)));
  };

  if (!mapData) {
    return <Loading size="md" color="bg-black" />;
  }

  const handleEditButton = async () => {
    if (!isEditMode) {
      setIsEditMode(true);
      return;
    }

    const updated = {
      ...mapData,
      groups: mapData.groups.map((g) => ({
        ...g,
        price: groupPrices[g.id],
      })),
    };

    try {
      const token = localStorage.getItem('accessToken');
      const response = await api.patch(
        `/shows/events/${event._id}`,
        {
          showId: event.show._id,
          venueId: event.venue._id,
          eventSeatMap: updated,
          startTime: event.startTime,
          endTime: event.endTime,
          pricing: {
            base: event.pricing?.base,
            currency: event.pricing?.currency,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.error(err);
    }

    setMapData(updated);
    setIsEditMode(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {fromVenue && (
        <div className="flex items-center">
          <VenueInfoBar venue={venue} />
          <ZoomControl scale={scale} onZoom={handleZoom} />
          <Button size="sm" children="Edit" wrapperClass="self-center"></Button>
        </div>
      )}
      {fromEvent && (
        <div className="flex items-center">
          <VenueInfoBar venue={event.venue} />
          <ZoomControl scale={scale} onZoom={handleZoom} />
          <Button size="sm" wrapperClass="mr-4" onClick={handleEditButton}>
            {isEditMode ? 'Save Changes' : 'Edit'}
          </Button>
          <div className="flex gap-3 text-xs text-black font-semibold">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-indigo-600 rounded-sm"></div> Blocked
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-300 rounded-sm"></div> Taken
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div> VIP
            </div>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto relative cursor-grab active:cursor-grabbing bg-gray-100"
      >
        <div
          className="relative origin-top-left transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${scale})`,
            width: '2000px',
            height: '2000px',
          }}
        >
          <div
            className="absolute bg-gray-300 rounded-b-[40px] flex items-center justify-center text-gray-500 font-bold tracking-[0.5em] shadow-2xl border-b-4 border-gray-700"
            style={{
              left: mapData.stage.x,
              top: mapData.stage.y,
              width: mapData.stage.width,
              height: mapData.stage.height,
            }}
          >
            STAGE
          </div>

          {mapData.groups.map((group) => (
            <div
              key={group.id}
              className="absolute"
              style={{ left: group.x, top: group.y }}
            >
              <div className="absolute -top-6 w-full text-center text-gray-500 text-xs font-bold uppercase tracking-wider">
                {group.id}
              </div>

              <div className="flex flex-col gap-2">
                {group.grid.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex gap-2">
                    <div className="w-4 flex items-center justify-center text-gray-600 text-xs font-bold">
                      {row[0]?.id.charAt(0)}
                    </div>

                    {row.map((seat) => (
                      <div
                        key={seat.id}
                        className={getSeatStyle(seat)}
                        title={`Koltuk: ${seat.id}`}
                      >
                        <span className="text-[9px]">
                          {seat.id.replace(/[A-Z]/, '')}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {fromEvent && (
                <div className="w-full text-center text-gray-500 py-2 text-xs font-bold uppercase tracking-wider">
                  {!isEditMode ? (
                    <>
                      {formatCurrency(event.pricing.currency)}
                      {group.price ?? event.pricing.base}
                    </>
                  ) : (
                    <input
                      type="number"
                      value={groupPrices[group.id]}
                      onChange={(e) =>
                        setGroupPrices((prev) => ({
                          ...prev,
                          [group.id]: Number(e.target.value),
                        }))
                      }
                      className="bg-gray-700 text-white text-xs px-2 py-1 rounded w-20 text-center"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
