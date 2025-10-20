import HeroSection from '@/components/layout/HeroSection';
import Carousel from '@/components/ui/Carousel';

function LandingPage() {
  return (
    <div className="w-screen min-h-[100vh]">
      <HeroSection />
      <Carousel />
    </div>
  );
}

export default LandingPage;
