import { useState, useEffect } from 'react';
import HeroSection from '@/components/layout/HeroSection';
import Carousel from '@/components/ui/Carousel';
import api from '@/lib/axiosClient';

function LandingPage() {
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [almostSoldOut, setAlmostSoldOut] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [ratedRes, upcomingRes, soldOutRes] = await Promise.all([
        api.get('/events/topFiveRatedEvents'),
        api.get('/events/upcomingEvents'),
        api.get('/events/almostSoldOut'),
      ]);

      setTopRated(
        ratedRes.data.data.map((e) => ({
          id: e._id,
          title: e.title,
          performer: e.performers?.[0]?.name,
          coverImage: e.coverImage,
          endpoint: `/events/${e._id}`,
          type: 'event',
        }))
      );

      setUpcoming(
        upcomingRes.data.data.map((i) => ({
          id: i.event._id,
          title: i.event.title,
          performer: i.event.performers?.[0]?.name,
          coverImage: i.event.coverImage,
          endpoint: `/events/instances/${i._id}`,
          type: 'instance',
        }))
      );

      setAlmostSoldOut(
        soldOutRes.data.data.map((i) => ({
          id: i.event._id,
          title: i.event.title,
          performer: i.event.performers?.[0]?.name,
          coverImage: i.event.coverImage,
          endpoint: `/events/instances/${i._id}`,
          type: 'instance',
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
        events={topRated}
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
