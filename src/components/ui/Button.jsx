import { useNavigate } from 'react-router-dom';

function Button({
  children,
  onClick,
  to,
  className = '',
  variant = 'default',
  size = 'md',
  wrapperClass = 'default',
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
    else if (onClick) onClick();
  };

  const baseStyles =
    'font-semibold cursor-pointer transition-all ease-linear rounded-md border-none';

  const variants = {
    default: 'bg-black text-white',
  };

  const sizes = {
    sm: 'text-sm px-2 py-1',
    md: 'text-lg px-4 py-1',
    lg: 'text-2xl px-16 py-2',
  };
  return (
    <div
      className={`flex justify-center items-center p-0.5 bg-gradient-to-r from-sky-blue via-lavender via-fuchsia to-coral-red  ${wrapperClass}`}
    >
      <button
        onClick={handleClick}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
