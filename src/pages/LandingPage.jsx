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
        topFiveRatedRes.data.data.map((e) => ({
          id: e._id,
          title: e.title,
          performer: e.performers?.[0]?.name,
          coverImage: e.coverImage,
          endpoint: `/shows/${e._id}`,
          type: 'show',
        }))
      );

      setUpcoming(
        upcomingRes.data.data.map((i) => ({
          id: i.show._id,
          title: i.show.title,
          performer: i.show.performers?.[0]?.name,
          coverImage: i.show.coverImage,
          endpoint: `/shows/events/${i._id}`,
          type: 'event',
        }))
      );

      setAlmostSoldOut(
        almostSoldOutRes.data.data.map((i) => ({
          id: i.show._id,
          title: i.show.title,
          performer: i.show.performers?.[0]?.name,
          coverImage: i.show.coverImage,
          endpoint: `/shows/events/${i._id}`,
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
