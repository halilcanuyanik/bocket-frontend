import HeroSection from '@/components/layout/HeroSection';
import Carousel from '@/components/ui/Carousel';

function LandingPage() {
  return (
    <div className="w-screen min-h-screen">
      <HeroSection />
      <Carousel
        label="UPCOMING EVENTS"
        endpoint="/events?limit=10"
        textStyle="cool-text"
      />
      <Carousel
        label="TOP RATED EVENTS"
        endpoint="/events/topFiveRatedEvents"
        textStyle="hot-text"
      />
    </div>
  );
}

export default LandingPage;
