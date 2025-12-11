import { Outlet } from 'react-router-dom';
import AdminNavbar from '@/features/auth/admin/components/AdminNavbar';

function AdminLayout() {
  return (
    <div className="w-screen min-h-screen flex relative custom-selection">
      <AdminNavbar />

      <main className="flex-1 ml-48 custom-selection">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
