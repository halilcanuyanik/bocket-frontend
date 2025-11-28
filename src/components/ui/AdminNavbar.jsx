import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';

function AdminNavbar() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-16 px-6 flex justify-between items-center">
      <div className="flex gap-4">
        <button
          className="admin-navbar-button after:hidden"
          onClick={() => navigate('/admin')}
        >
          Panel
        </button>
        <button
          className="admin-navbar-button after:hidden"
          onClick={() => navigate('/admin/events')}
        >
          Events
        </button>
        <button
          className="admin-navbar-button after:hidden"
          onClick={() => navigate('/admin/venues')}
        >
          Venues
        </button>
        <button
          className="admin-navbar-button after:hidden"
          onClick={() => navigate('/admin/performers')}
        >
          Performers
        </button>
        <button
          className="admin-navbar-button after:hidden"
          onClick={() => navigate('/admin/users')}
        >
          Users
        </button>
      </div>
      <div className="flex items-center">
        <Button children="Log Out" to="/logout" wrapperClass="rounded-md" />
      </div>
    </div>
  );
}

export default AdminNavbar;
