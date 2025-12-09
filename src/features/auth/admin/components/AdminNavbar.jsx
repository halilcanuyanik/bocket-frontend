import { useNavigate, useLocation } from 'react-router-dom';

// LOGO & ICONS
import logo from '@/assets/images/logo-b-tr-lit.png';
import panelIcon from '@/assets/icons/panel.svg';
import showIcon from '@/assets/icons/show.svg';
import eventIcon from '@/assets/icons/event.svg';
import venueIcon from '@/assets/icons/venue.svg';
import performerIcon from '@/assets/icons/performer.svg';
import userIcon from '@/assets/icons/user.svg';
import settingsIcon from '@/assets/icons/settings.svg';
import logoutIcon from '@/assets/icons/logout.svg';

function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: 'Panel', icon: panelIcon },
    { path: '/admin/shows', label: 'Shows', icon: showIcon },
    { path: '/admin/events', label: 'Events', icon: eventIcon },
    { path: '/admin/venues', label: 'Venues', icon: venueIcon },
    { path: '/admin/performers', label: 'Performers', icon: performerIcon },
    { path: '/admin/users', label: 'Users', icon: userIcon },
  ];

  const bottomItems = [
    { path: '/admin/settings', label: 'Settings', icon: settingsIcon },
    { path: '/logout', label: 'Logout', icon: logoutIcon },
  ];

  const getLinkClasses = (path) =>
    `h-8 px-4 w-full rounded-md flex space-x-4 items-center cursor-pointer ${
      location.pathname === path ? 'bg-gray-300' : 'hover:bg-gray-300'
    }`;

  return (
    <section className="w-48 h-screen bg-gray-200 grid grid-rows-[2fr_7.5fr_1.5fr] custom-selection">
      <div className="w-full h-full flex items-center justify-center cusor-not-allowed">
        <img src={logo} className="w-16" />
      </div>

      <div className="w-full h-full p-4 flex flex-col space-y-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li
              key={item.path}
              className={getLinkClasses(item.path)}
              onClick={() => navigate(item.path)}
            >
              <img src={item.icon} className="w-6 h-6" />
              <span className="text-xs text-black">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full h-full p-4 flex flex-col space-y-4">
        <ul className="space-y-2">
          {bottomItems.map((item) => (
            <li
              key={item.path}
              className={getLinkClasses(item.path)}
              onClick={() => navigate(item.path)}
            >
              <img src={item.icon} className="w-6 h-6" />
              <span className="text-xs text-black">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AdminNavbar;
