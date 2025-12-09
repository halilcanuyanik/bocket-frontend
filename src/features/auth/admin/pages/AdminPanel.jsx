// REACT HOOKS
import { useState, useEffect } from 'react';

// COMPONENTS
import Loading from '@/components/common/Loading';

// API
import api from '@/lib/axiosClient';

export default function AdminPanel() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAdmin = async () => {
      try {
        const response = await api.get('/users/verify');
        setData(response.data.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getAdmin();
  }, []);

  return (
    <section className="flex-1 h-screen bg-gray-100 p-6">
      <div className="w-56 h-24 px-4 gap-4 bg-white rounded-lg shadow-md border-1 border-lively-orange flex items-center">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loading size="sm" color="bg-lively-orange" />
          </div>
        ) : (
          <>
            <div className="w-6 h-6 bg-lively-orange rounded-[50%] animate-pulse"></div>
            <div className="flex flex-col">
              <span className="text-sm text-black font-bold">{data.name}</span>
              <span className="text-xs text-gray-900 font-semibold">
                {data.email}
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
