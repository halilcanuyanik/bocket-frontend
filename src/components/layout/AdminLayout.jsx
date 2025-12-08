import { Outlet } from 'react-router-dom';
import AdminNavbar from '@/features/auth/admin/components/AdminNavbar';

function AdminLayout() {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <AdminNavbar />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
