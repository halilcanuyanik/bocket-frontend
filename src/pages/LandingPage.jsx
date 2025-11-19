import { useState, useEffect } from 'react';
import HeroSection from '@/components/layout/HeroSection';
import SearchSection from '@/components/layout/SearchSection';
import Carousel from '@/components/ui/Carousel';
import api from '@/lib/axiosClient';

function LandingPage() {
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [almostSoldOut, setAlmostSoldOut] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const topRatedRes = await api.get('/shows/topRated');
        setTopRated(topRatedRes.data.data);

        const upcomingRes = await api.get('/shows/upcoming');
        setUpcoming(upcomingRes.data.data);

        const almostSoldOutRes = await api.get('/shows/almostSoldOut');
        setAlmostSoldOut(almostSoldOutRes.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    getEvents();
  }, []);

  return (
    <div className="w-screen min-h-screen custom-selection">
      <HeroSection />
      <SearchSection />
      <Carousel
        label="TOP RATED EVENTS"
        events={topRated}
        textStyle="hot-text"
      />
      <Carousel
        label="UPCOMING EVENTS"
        events={upcoming}
        textStyle="cool-text"
      />
      <Carousel
        label="ALMOST SOLD OUT EVENTS"
        events={almostSoldOut}
        textStyle="warm-text"
      />
    </div>
  );
}

export default LandingPage;
