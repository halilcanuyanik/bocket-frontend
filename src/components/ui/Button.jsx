import { useNavigate } from 'react-router-dom';

function Button({
  children,
  onClick,
  to,
  className = '',
  variant = 'default',
  size = 'md',
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  const baseStyles =
    'font-extrabold cursor-pointer transition-all ease-linear selection:bg-flame-red selection:text-white';

  const variants = {
    default:
      'bg-clip-text text-transparent bg-gradient-to-r from-deep-blue to-flame-red',
  };

  const sizes = {
    sm: 'text-sm px-2 py-1',
    md: 'text-lg px-4 py-2',
    lg: 'text-2xl px-6 py-3',
  };

  return (
    <button
      onClick={handleClick}
      className={` ${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
