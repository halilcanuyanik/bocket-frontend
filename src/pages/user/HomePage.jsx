import { useState, useEffect } from 'react';
import api from '@/lib/axiosClient';
import img from '@/assets/images/home-splash.png';

function HomePage() {
  const [user, setUser] = useState({ name: '', email: '' });
  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await api.get('/users/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, []);

  return (
    <div className="w-full overflow-hidden lg:h-[600px] relative flex justify-center">
      <img
        src={img}
        alt="splash-image"
        className="h-full object-cover object-center pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:hidden"></div>
      <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,1)_70%)] pointer-events-none hidden lg:block"></div>
      <p className="absolute top-6 font-semibold text-center text-shadow-xl text-3xl text-purple-100">
        Hello <span className="warm-text">{user.name}</span>
      </p>
    </div>
  );
}

export default HomePage;
