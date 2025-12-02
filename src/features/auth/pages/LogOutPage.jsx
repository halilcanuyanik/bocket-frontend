// REACT HOOKS
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// COMPONENTS
import Loading from '@/components/common/Loading';

// API
import { logout } from '@/features/auth/api/authService';

// LOGO & ICONS
import logo from '@/assets/images/logo-tr-lit.png';

export default function LogOutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      await logout();
      navigate('/');
    };

    handleLogout();
  }, [navigate]);

  return (
    <section className="h-screen w-screen flex justify-center items-center bg-gray-900">
      <div className="flex flex-col gap-8 items-center">
        <img src={logo} className="h-32" />
        <Loading size="md" />
      </div>
    </section>
  );
}
