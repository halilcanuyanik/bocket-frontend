// REACT ROUTER HOOKS
import { useNavigate, useLocation } from 'react-router-dom';

// COMPONENTS
import Button from '@/components/ui/Button';

// LOGO & ICONS
import logo from '@/assets/images/logo-tr-lit.png';

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

  const isActive = (path) => {
    if (path === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="w-screen h-16 px-6 flex justify-between items-center">
      <div className="flex gap-4">
        <img className="h-8 self-center" src={logo} />
        {links.map((link) => {
          return (
            <button
              key={link.path}
              className={`admin-navbar-button after:hidden ${
                isActive(link.path)
                  ? 'text-lively-orange font-semibold border-b-2 border-orange-500'
                  : ''
              }`}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center">
        <Button children="Log Out" to="/logout" />
      </div>
    </div>
  );
}

export default AdminNavbar;
