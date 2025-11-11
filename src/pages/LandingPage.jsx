import { useState, useEffect } from 'react';
import HeroSection from '@/components/layout/HeroSection';
import Carousel from '@/components/ui/Carousel';
import api from '@/lib/axiosClient';

function LandingPage() {
  const [topFiveRated, setTopFiveRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [almostSoldOut, setAlmostSoldOut] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [topFiveRatedRes, upcomingRes, almostSoldOutRes] =
        await Promise.all([
          api.get('/shows/topFiveRated'),
          api.get('/shows/upcoming'),
          api.get('/shows/almostSoldOut'),
        ]);

      setTopFiveRated(
        topFiveRatedRes.data.data.map((s) => ({
          id: s._id,
          title: s.title,
          performer: s.performers?.[0]?.name,
          coverImage: s.coverImage,
          endpoint: `/shows/${s._id}`,
          type: 'show',
        }))
      );

      setUpcoming(
        upcomingRes.data.data.map((e) => ({
          id: e.show._id,
          title: e.show.title,
          performer: e.show.performers?.[0]?.name,
          coverImage: e.show.coverImage,
          endpoint: `/shows/events/${e._id}`,
          type: 'event',
        }))
      );

      setAlmostSoldOut(
        almostSoldOutRes.data.data.map((e) => ({
          id: e.show._id,
          title: e.show.title,
          performer: e.show.performers?.[0]?.name,
          coverImage: e.show.coverImage,
          endpoint: `/shows/events/${e._id}`,
          type: 'event',
        }))
      );
    };
    fetchData();
  }, []);

  return (
    <div className="w-screen min-h-screen custom-selection">
      <HeroSection />
      <Carousel
        label="TOP RATED EVENTS"
        events={topFiveRated}
        textStyle="hot-text"
      />
      <Carousel
        label="UPCOMING EVENTS"
        events={upcoming}
        textStyle="cool-text"
      />
      <Carousel
        label="ALMOST SOLD OUT"
        events={almostSoldOut}
        textStyle="warm-text"
      />
    </div>
  );
}

export default LandingPage;
