// CUSTOM HOOKS
import { useLandingEvents } from '@/hooks/useLandingEvents';

// COMPONENTS
import HeroSection from '@/components/ui/HeroSection';
import SearchSection from '@/components/ui/SearchSection';
import Carousel from '@/components/ui/Carousel';
import Footer from '@/components/ui/Footer';

export default function LandingPage() {
  const { topRated, upcoming, almostSoldOut, isLoading, error } =
    useLandingEvents();

  return (
    <div className="w-screen min-h-screen custom-selection">
      <HeroSection />
      <SearchSection />
      <Carousel
        label="TOP RATED EVENTS"
        events={topRated}
        textStyle="hot-text"
        isLoading={isLoading}
        error={error}
      />
      <Carousel
        label="UPCOMING EVENTS"
        events={upcoming}
        textStyle="cool-text"
        isLoading={isLoading}
        error={error}
      />
      <Carousel
        label="ALMOST SOLD OUT EVENTS"
        events={almostSoldOut}
        textStyle="warm-text"
        isLoading={isLoading}
        error={error}
      />
      <Footer />
    </div>
  );
}
