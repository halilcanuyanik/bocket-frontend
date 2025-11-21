import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/features/Auth/api/authService';
import Loading from '@/components/common/Loading';
import logo from '@/assets/images/logo-tr-lit.png';

function LogOutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <section className="h-screen w-screen flex justify-center items-center bg-gray-900">
      <div className="flex flex-col gap-8 items-center">
        <img src={logo} className="h-32" />
        <Loading size="xl" />
      </div>
    </section>
  );
}

export default LogOutPage;
