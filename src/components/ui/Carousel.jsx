// REACT ROUTER HOOKS
import { useNavigate } from 'react-router-dom';

// COMPONENTS
import Card from '@/components/ui/Card';
import Loading from '@/components/common/Loading';

const LOADER_COLOR_MAP = {
  'hot-text': 'bg-coral-red',
  'warm-text': 'bg-bright-violet',
  'cool-text': 'bg-royal-blue',
};

export default function Carousel({
  label,
  textStyle,
  events,
  isLoading,
  error,
}) {
  const navigate = useNavigate();

  return (
    <section className="min-h-80 flex flex-col items-center gap-6 py-8 px-6 border-[1]">
      <p className={`text-center font-semibold ${textStyle}`}>{label}</p>

      <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
        <div className="flex gap-16 mx-12">
          {isLoading && (
            <div className="w-full min-h-64 flex items-center justify-center">
              <Loading size="md" color={LOADER_COLOR_MAP[textStyle]} />
            </div>
          )}

          {!isLoading && error && (
            <div className="w-full min-h-64 flex items-center justify-center text-gray-200">
              Something went wrong.
            </div>
          )}

          {!isLoading &&
            !error &&
            events.map((e, i) => (
              <Card
                key={e._id}
                order={i + 1}
                coverImage={e.show.coverImage}
                title={e.show.title}
                performer={e.show.performers?.[0]?.name}
                textStyle={textStyle}
                onClick={() => navigate(`/event-details/${e._id}`)}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
