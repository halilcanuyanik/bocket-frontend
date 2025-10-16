import { useNavigate } from 'react-router-dom';

function Button({
  children,
  onClick,
  to,
  className = '',
  variant = 'default',
  size = 'md',
  wrapperClass = '',
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
    else if (onClick) onClick();
  };

  const baseStyles =
    'font-semibold cursor-pointer transition-all ease-linear selection:bg-flame-red selection:text-white';

  const variants = {
    default: 'bg-black text-white shadow-[2px_2px_3px_#000000b4]',
  };

  const sizes = {
    sm: 'text-sm px-2 py-1',
    md: 'text-lg px-4 py-2',
    lg: 'text-2xl px-6 py-3',
  };

  return (
    <div
      className={`${wrapperClass} p-0.5 rounded-lg bg-gradient-to-r from-deep-blue to-flame-red`}
    >
      <button
        onClick={handleClick}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} rounded-lg border-none ${className}`}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
