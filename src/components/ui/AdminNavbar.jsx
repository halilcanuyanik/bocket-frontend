import { useLocation, useNavigate } from 'react-router-dom';

function AdminNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isDashboard = pathname === '/dashboard' || '/dashboard/venues';
  const isVenueDetail = pathname.startsWith('/dashboard/venues/');

  return (
    <div className="w-screen flex justify-between px-6 items-center shadow-md h-16">
      <div className="flex gap-4">
        {isDashboard && (
          <>
            <button data-badge={7} className="dashboard-navbar-button">
              Announcements
            </button>
            <button data-badge={23} className="dashboard-navbar-button">
              Events
            </button>
            <button
              className="dashboard-navbar-button after:hidden"
              onClick={() => navigate('/dashboard/venues')}
            >
              Venues
            </button>
            <button className="dashboard-navbar-button after:hidden">
              Performers
            </button>
            <button className="dashboard-navbar-button after:hidden">
              Users
            </button>
          </>
        )}
      </div>
      <div className="flex items-center">
        {isDashboard && (
          <button
            className="bg-black text-white font-semibold hover:bg-black/80 cursor-pointer px-6 py-1.5 rounded-md"
            onClick={() => navigate('/logout')}
          >
            Log Out
          </button>
        )}
        {isVenueDetail && (
          <button className="bg-black text-white font-semibold hover:bg-black/80 cursor-pointer px-6 py-1.5 rounded-md">
            Go Back
          </button>
        )}
      </div>
    </div>
  );
}

export default AdminNavbar;
