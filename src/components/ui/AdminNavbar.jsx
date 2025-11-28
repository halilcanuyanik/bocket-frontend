import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@/components/ui/Button';

function AdminNavbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const links = [
    { label: 'Panel', path: '/admin' },
    { label: 'Events', path: '/admin/events' },
    { label: 'Venues', path: '/admin/venues' },
    { label: 'Performers', path: '/admin/performers' },
    { label: 'Users', path: '/admin/users' },
  ];

  return (
    <div className="w-screen h-16 px-6 flex justify-between items-center">
      <div className="flex gap-4">
        {links.map((link) => {
          const isActive = pathname === link.path;

          return (
            <button
              key={link.path}
              className={`admin-navbar-button after:hidden ${
                isActive ? 'text-lively-orange font-semibold' : ''
              }`}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center">
        <Button children="Log Out" to="/logout" wrapperClass="rounded-md" />
      </div>
    </div>
  );
}

export default AdminNavbar;
