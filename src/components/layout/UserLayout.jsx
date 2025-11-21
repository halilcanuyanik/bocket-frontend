import { Outlet } from 'react-router-dom';
import UserNavbar from '@/components/ui/UserNavbar';

function UserLayout() {
  return (
    <div className="w-screen min-h-screen bg-black custom-selection">
      <UserNavbar />
      <Outlet />
    </div>
  );
}

export default UserLayout;
