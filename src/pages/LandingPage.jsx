import HeroSection from '@/components/layout/HeroSection';
import Carousel from '@/components/ui/Carousel';

function LandingPage() {
  return (
    <div className="w-screen min-h-screen">
      <HeroSection />
      <Carousel label="UPCOMING EVENTS" />
    </div>
  );
}

export default LandingPage;
