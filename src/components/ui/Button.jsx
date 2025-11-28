import { useNavigate } from 'react-router-dom';
import Loading from '@/components/common/Loading';

function Button({
  wrapperClass = '',
  className = '',
  type = 'submit',
  size = 'md',
  onClick,
  children,
  to,
  disabled = false,
  loading = false,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (loading || disabled) return;
    if (to) navigate(to);
    else if (onClick) onClick();
  };

  const baseStyles = `font-semibold cursor-pointer hover:bg-gray-900 transition-all ease-linear rounded-md border-none ${
    disabled || loading
      ? 'bg-gray-900 cursor-not-allowed'
      : 'bg-black text-white'
  }`;

  const sizes = {
    sm: 'text-sm px-3 py-0.5',
    md: 'text-base px-4 py-1',
    lg: 'text-lg px-6 py-2',
    responsive: `
     sm:text-sm sm:px-3 sm:py-0.5
     md:text-base md:px-4 md:py-1
     lg:text-lg lg:px-6 lg:py-2
    `,
  };

  return (
    <div
      className={`inline-flex justify-center items-center p-0.5 bg-gradient-to-r from-sky-blue via-lavender via-fuchsia to-coral-red custom-selection rounded-md ${wrapperClass}`}
    >
      <button
        onClick={handleClick}
        className={`${baseStyles} ${sizes[size]} ${className}`}
        disabled={disabled || loading}
      >
        {loading ? <Loading size="sm" /> : children}
      </button>
    </div>
  );
}

export default Button;
