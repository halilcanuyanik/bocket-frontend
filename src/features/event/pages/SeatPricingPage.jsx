// REACT HOOKS
import { useState, useEffect, useRef, useMemo } from 'react';

// REACT ROUTER HOOKS
import { useParams, useNavigate } from 'react-router-dom';

// COMPONENTS
import Loading from '@/components/common/Loading';
import ZoomControl from '@/components/ui/ZoomControl';

// APIs
import api from '@/lib/axiosClient';

// LOGO & ICONS
import dateIcon from '@/assets/icons/event.svg';
import timeIcon from '@/assets/icons/time.svg';
import performerIcon from '@/assets/icons/performer.svg';

// UTILS
import { formatEventTime } from '@/utils/timeUtils';

export default function SeatPricingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const containerRef = useRef(null);

  const [event, setEvent] = useState(null);
  const [seatMap, setSeatMap] = useState(null);
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [groupPrices, setGroupPrices] = useState({});

  const basePrice = event?.pricing?.base || 0;

  const formattedTime = event?.startTime
    ? formatEventTime(event.startTime)
    : null;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);

        const response = await api.get(`/shows/events/${id}`);
        const eventData = response.data.data;

        setEvent(eventData);

        const seatMap = eventData?.eventSeatMap;
        setSeatMap(seatMap);

        const initialScale = seatMap?.meta?.scale || 1;
        setScale(initialScale);

        if (seatMap?.groups) {
          const initialPrices = {};
          seatMap.groups.forEach((group) => {
            initialPrices[group.id] = group.price ?? eventData.pricing?.base;
          });
          setGroupPrices(initialPrices);
        }
      } catch (err) {
        console.error('Fetch event failed', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const hasInvalidPrice = useMemo(() => {
    return Object.values(groupPrices).some(
      (price) => Number(price) < Number(basePrice),
    );
  }, [groupPrices, basePrice]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
        <Loading size="md" color="bg-black" />
      </div>
    );
  }

  if (!seatMap) {
    return (
      <div className="w-screen h-screen bg-gray-100 flex items-center justify-center text-gray-500">
        Seat Map Not Found.
      </div>
    );
  }

  const { width, height } = calculateSeatMapSize(seatMap);

  const handlePriceChange = (groupId, value) => {
    setGroupPrices((prev) => ({
      ...prev,
      [groupId]: value,
    }));
  };

  const handleSave = () => {
    const payload = seatMap.groups.map((group) => ({
      groupId: group.id,
      price: Number(groupPrices[group.id]),
    }));

    console.log('SAVE PRICING PAYLOAD', payload);
  };

  const handleZoom = (delta) => {
    setScale((prev) => Math.max(0.2, Math.min(3, prev + delta)));
  };

  return (
    <section className="flex-1 h-screen bg-gray-100 flex flex-col overflow-hidden select-none">
      <div className="h-[64px] px-4 z-1 flex items-center gap-4">
        <span className="text-sm text-black text-center">
          {event.show.title}
        </span>

        <div className="flex gap-2 items-center">
          <img src={dateIcon} className="w-6 h-6" />
          <span className="text-sm">
            {formattedTime.day} {formattedTime.month} {formattedTime.year}
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <img src={timeIcon} className="w-6 h-6" />
          <span className="text-sm">
            {formattedTime.hour}:{formattedTime.minute} {formattedTime.ampm}
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <img src={performerIcon} className="w-6 h-6" />
          <span className="text-sm">{event.show.performers[0].name}</span>
        </div>

        <div className="flex-1" />

        <ZoomControl scale={scale} onZoom={handleZoom} />
        <button
          className="px-3 py-1 text-sm text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-sm transition cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={hasInvalidPrice}
          className={`px-3 py-1 text-sm border rounded-sm transition 
  ${
    hasInvalidPrice
      ? 'bg-gray-300 text-gray-600 border-gray-300 cursor-not-allowed'
      : 'text-green-700 bg-green-700/30 hover:bg-green-700/40 border-green-700 cursor-pointer'
  }`}
        >
          Save Pricing
        </button>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-auto relative bg-gray-100 cursor-grab active:cursor-grabbing"
      >
        <div
          className="relative origin-top-left transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${scale})`,
            width,
            height,
          }}
        >
          <StageDisplay stage={seatMap.stage} />

          {seatMap.groups.map((group) => (
            <SeatGroup
              key={group.id}
              group={group}
              price={groupPrices[group.id]}
              basePrice={basePrice}
              onPriceChange={handlePriceChange}
            />
          ))}
        </div>
      </div>
    </section>
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

function SeatGroup({ group, price, basePrice, onPriceChange }) {
  const isInvalid = Number(price) < Number(basePrice);

  return (
    <div className="absolute" style={{ left: group.x, top: group.y }}>
      <GroupLabel
        groupId={group.id}
        price={price}
        isInvalid={isInvalid}
        onChange={(value) => onPriceChange(group.id, value)}
      />

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

function GroupLabel({ groupId, price, isInvalid, onChange }) {
  return (
    <div className="absolute -top-10 w-full text-center">
      <div className="text-gray-500 text-xs font-bold uppercase tracking-wider">
        {groupId}
      </div>

      <input
        type="number"
        value={price}
        onChange={(e) => onChange(e.target.value)}
        className={`w-24 text-center text-sm font-bold rounded border px-2 py-0.5
          ${
            isInvalid
              ? 'border-red-500 text-red-600 bg-red-50'
              : 'border-gray-300'
          }`}
      />
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
      className="w-8 h-8 m-1 rounded-t-lg text-[10px] flex items-center justify-center font-medium shadow-sm
        bg-indigo text-white cursor-pointer hover:bg-royal-blue hover:scale-110 transition"
      title={`Seat: ${seat.id}`}
    >
      <span className="text-[9px]">{seat.id.replace(/[A-Z]/, '')}</span>
    </div>
  );
}
