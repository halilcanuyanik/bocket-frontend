import Card from '@/components/ui/Card';
import Loading from '@/components/common/Loading';

export default function Carousel({ label, textStyle, events = [] }) {
  return (
    <div className="min-h-80 flex flex-col items-center gap-6 py-8 px-6 border-[1]">
      <p className={`text-center font-semibold ${textStyle}`}>{label}</p>
      <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
        <div className="flex gap-16 mx-12">
          {events.length > 0 ? (
            events.map((e, i) => (
              <Card
                key={e._id}
                id={e._id}
                order={i + 1}
                coverImage={e.show.coverImage}
                title={e.show.title}
                performer={e.show.performers?.[0].name}
                textStyle={textStyle}
              />
            ))
          ) : (
            <div className="w-full flex justify-center">
              <Loading size="lg" color="bg-coral-red" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
