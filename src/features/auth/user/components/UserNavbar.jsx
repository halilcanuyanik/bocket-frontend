// REACT HOOKS
import { useState } from 'react';

// COMPONENTS
import Menu from '@/features/auth/user/components/Menu';

// LOGO & ICONS
import logo from '@/assets/images/logo-bw-tr-lit.png';
import menuIcon from '@/assets/icons/menu.svg';
import closeIcon from '@/assets/icons/close.svg';

export default function UserNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative px-4 w-screen h-12 sm:h-16 md:h-20 bg-black flex justify-between items-center">
      <img
        className="h-6 sm:h-8 md:h-10"
        src={isOpen ? closeIcon : menuIcon}
        onClick={handleClick}
      />
      <img src={logo} className="py-1.5 h-full" />
      {isOpen && <Menu />}
    </div>
  );
}
