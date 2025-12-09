// REACT HOOKS
import { useState, useEffect, useRef } from 'react';

import { useParams } from 'react-router-dom';

// COMPONENTS
import Loading from '@/components/common/Loading';
import ZoomControl from '@/components/ui/ZoomControl';

// API
import api from '@/lib/axiosClient';

// UTILS
import { formatCurrency } from '@/utils/CurrencyFormatter';

export default function SeatPricingPage() {
  const { id } = useParams();

  const containerRef = useRef(null);

  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setLoading(true);
    let rawMap = null;

    rawMap = JSON.parse(JSON.stringify(event.eventSeatMap));

    rawMap.groups = rawMap.groups.map((g) => {
      const finalPrice = g.price ?? event?.pricing?.base ?? null;
      return {
        ...g,
        price: finalPrice ?? '',
        basePrice: event?.pricing?.base ?? '',
        currency: event?.pricing?.currency ?? 'USD',
      };
    });

    setMapData(rawMap);
    setScale(rawMap.meta?.scale || 1);

    setLoading(false);
  }, [id]);

  const handleZoom = (delta) => {
    setScale((prev) => Math.max(0.2, Math.min(3, prev + delta)));
  };

  const handlePriceChange = (groupId, field, value) => {
    setMapData((prev) => ({
      ...prev,
      groups: prev.groups.map((g) =>
        g.id === groupId ? { ...g, [field]: value } : g
      ),
    }));
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
      <ZoomControl scale={scale} onZoom={handleZoom} />
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
              <div className="absolute -top-28 w-full text-center text-gray-500 text-xs font-bold uppercase tracking-wider">
                {group.id}

                <div className="mt-1 flex flex-col gap-1 items-center">
                  <input
                    type="number"
                    value={group.price}
                    onChange={(e) =>
                      handlePriceChange(group.id, 'price', e.target.value)
                    }
                    className="w-16 text-center border rounded px-1 py-0.5"
                    placeholder="Price"
                  />
                  <input
                    type="number"
                    value={group.basePrice}
                    onChange={(e) =>
                      handlePriceChange(group.id, 'basePrice', e.target.value)
                    }
                    className="w-16 text-center border rounded px-1 py-0.5"
                    placeholder="Base"
                  />
                  <input
                    type="text"
                    value={group.currency}
                    onChange={(e) =>
                      handlePriceChange(group.id, 'currency', e.target.value)
                    }
                    className="w-16 text-center border rounded px-1 py-0.5"
                    placeholder="Currency"
                  />
                  <button
                    disabled={updating}
                    className="mt-1 bg-lively-orange text-white px-2 py-1 rounded text-xs"
                  >
                    Save
                  </button>
                </div>
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
