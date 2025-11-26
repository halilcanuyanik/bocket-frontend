import { useLocation, useNavigate } from 'react-router-dom';

function AdminNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isAdmin = pathname === '/admin' || '/admin/venues';

  return (
    <div className="w-screen flex justify-between px-6 items-center h-16">
      <div className="flex gap-4">
        {isAdmin && (
          <>
            <button data-badge={7} className="admin-navbar-button">
              Announcements
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
          </>
        )}
      </div>
      <div className="flex items-center">
        {isAdmin && (
          <button
            className="bg-black text-white font-semibold hover:bg-black/80 cursor-pointer px-6 py-1.5 rounded-md"
            onClick={() => navigate('/logout')}
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}

export default AdminNavbar;
