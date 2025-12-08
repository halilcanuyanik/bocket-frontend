// REACT ROUTER HOOKS
import { Outlet } from 'react-router-dom';

// COMPONENTS
import UserNavbar from '@/features/auth/user/components/UserNavbar';

function UserLayout() {
  return (
    <div className="w-screen min-h-screen bg-black custom-selection">
      <UserNavbar />
      <Outlet />
    </div>
  );
}

export default UserLayout;
