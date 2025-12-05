// REACT HOOKS
import { useState, useEffect, useRef } from 'react';

// COMPONENTS
import Loading from '@/components/common/Loading';
import ZoomControl from '@/components/ui/ZoomControl';

export default function SeatInspectionPage({ venue }) {
  const containerRef = useRef(null);

  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setLoading(true);

    if (!venue?.seatMap) {
      setMapData(null);
      setLoading(false);
      return;
    }

    const parsed = JSON.parse(JSON.stringify(venue.seatMap));
    setMapData(parsed);
    setScale(parsed.meta?.scale || 1);

    setLoading(false);
  }, [venue]);

  const handleZoom = (delta) => {
    setScale((prev) => Math.max(0.2, Math.min(3, prev + delta)));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading size="md" color="bg-black" />
      </div>
    );
  }

  if (!mapData) {
    return (
      <div className="p-6 text-center text-gray-500">Seat Map Not Found.</div>
    );
  }

  return (
    <div className="relative flex flex-col flex-1 overflow-hidden">
      <div className="absolute left-[calc(50%)] z-20">
        <ZoomControl scale={scale} onZoom={handleZoom} />
      </div>

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
                        className="w-8 h-8 m-1 rounded-t-lg text-[10px] flex items-center justify-center font-medium shadow-sm transition-all bg-indigo text-white cursor-pointer hover:bg-royal-blue hover:scale-110"
                        title={`Seat: ${seat.id}`}
                      >
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
