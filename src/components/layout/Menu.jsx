import { useNavigate } from 'react-router-dom';
import { menuOptions } from '@/config/menuOptions';

function Menu() {
  const navigate = useNavigate();

  return (
    <div className="absolute top-12 sm:top-16 md:top-20 left-0 w-[50vw] sm:w-[40vw] h-screen shadow-2xl bg-white z-50 flex flex-col text-xl bg-gradient-to-b font-semibold">
      {menuOptions.map((item) => (
        <button
          key={item.path}
          className="h-16 w-full flex items-center pl-6 gap-4 hover:bg-[#f1f3f5] text-left cursor-pointer"
          onClick={() => navigate(item.path)}
        >
          <img
            className="w-6 h-6"
            src={item.optionIcon}
            alt={item.optionName}
          />
          <span>{item.optionName}</span>
        </button>
      ))}
    </div>
  );
}

export default Menu;
