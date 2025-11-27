import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '@/components/common/Loading';
import Button from '@/components/ui/Button';

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
      return `${baseStyle} bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 hover:scale-110`;
  }
};

export default function SeatInspectionPage({ info, data }) {
  const { pathname } = useLocation();

  const fromVenue = pathname.startsWith('/admin/venues/');
  const fromEvent = pathname.startsWith('/admin/events/');

  const [mapData, setMapData] = useState(null);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    const loadMap = () => {
      try {
        const parsed = JSON.parse(JSON.stringify(data));
        setMapData(parsed);
        setScale(parsed.meta?.scale || 1);
      } catch (e) {
        console.error(e);
      }
    };
    loadMap();
  }, [data]);

  const handleZoom = (delta) => {
    setScale((prev) => Math.max(0.2, Math.min(3, prev + delta)));
  };

  if (!mapData) {
    return <Loading size="md" />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 overflow-hidden">
      <div className="h-16 bg-gray-800 flex items-center justify-between px-6 shadow-md z-50">
        <div className="flex items-center gap-4">
          {fromVenue && (
            <>
              <span>{info.name}</span>
              <span>{info.address}</span>
              <span>
                {info.city}, {info.country}
              </span>
              <span>{info.capacity}</span>
              <Button size="sm" children="Edit" wrapperClass="rounded-lg" />
            </>
          )}
        </div>

        <div className="flex gap-3 text-xs text-gray-300">
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

        <div className="flex bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => handleZoom(-0.1)}
            className="px-3 py-1 text-white hover:bg-gray-600 rounded"
          >
            -
          </button>
          <span className="px-2 py-1 text-gray-300 text-sm min-w-[3rem] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => handleZoom(0.1)}
            className="px-3 py-1 text-white hover:bg-gray-600 rounded"
          >
            +
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-auto relative cursor-grab active:cursor-grabbing bg-[#1a1c23]"
      >
        <div
          className="relative origin-top-left transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${scale})`,
            width: '2000px',
            height: '2000px',
          }}
        >
          {/* SAHNE (STAGE) */}
          <div
            className="absolute bg-gray-800 rounded-b-[40px] flex items-center justify-center text-gray-500 font-bold tracking-[0.5em] shadow-2xl border-b-4 border-gray-700"
            style={{
              left: mapData.stage.x,
              top: mapData.stage.y,
              width: mapData.stage.width,
              height: mapData.stage.height,
            }}
          >
            STAGE
          </div>

          {/* GRUPLAR */}
          {mapData.groups.map((group) => (
            <div
              key={group.id}
              className="absolute"
              style={{
                left: group.x,
                top: group.y,
              }}
            >
              <div className="absolute -top-6 w-full text-center text-gray-500 text-xs font-bold uppercase tracking-wider">
                {group.id}
              </div>

              {/* GRID */}
              <div className="flex flex-col gap-2">
                {group.grid.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex gap-2">
                    {/* Satır Numarası (Opsiyonel: Sol tarafa A, B, C yazmak için) */}
                    <div className="w-4 flex items-center justify-center text-gray-600 text-xs font-bold">
                      {row[0]?.id.charAt(0)}
                    </div>

                    {row.map((seat) => (
                      <div
                        key={seat.id}
                        className={getSeatStyle(seat)}
                        title={`Koltuk: ${seat.id}`}
                      >
                        {/* Seat Number */}
                        <span className="text-[9px]">
                          {seat.id.replace(/[A-Z]/, '')}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
