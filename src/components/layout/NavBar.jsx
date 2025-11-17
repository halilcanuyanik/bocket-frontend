import { useState } from 'react';
import logo from '@/assets/images/logo-bw-tr-lit.png';
import menuIcon from '@/assets/icons/menu.svg';
import closeIcon from '@/assets/icons/close.svg';
import Menu from '@/components/layout/Menu';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative px-4 w-screen h-16 bg-black flex justify-between items-center">
      <div
        className="w-12 h-12 flex justify-center items-center rounded-[50%]"
        onClick={handleClick}
      >
        <img className="h-6" src={isOpen ? closeIcon : menuIcon} />
      </div>
      <img src={logo} className="h-12" />
      {isOpen && <Menu />}
    </div>
  );
}

export default NavBar;
