import { useNavigate } from 'react-router-dom';
import Loading from '@/components/common/Loading';

export default function Button({
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

  const handleClick = (e) => {
    if (disabled || loading) return;
    if (to) navigate(to);
    else if (onClick) onClick(e);
  };

  const sizeClasses = {
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
    responsive: `
      sm:text-sm sm:px-3 sm:py-1
      md:text-base md:px-4 md:py-2
      lg:text-lg lg:px-6 lg:py-3
    `,
  };

  const buttonBase = `
    font-semibold
    rounded-md
    border-none
    transition-all
    duration-150
    ease-linear
    ${
      disabled || loading
        ? 'bg-gray-800 cursor-not-allowed'
        : 'bg-black text-white hover:bg-gray-900'
    }
  `;

  return (
    <div
      className={`
        inline-flex 
        w-fit
        p-[2px]
        rounded-md
        bg-gradient-to-r
        from-sky-blue
        via-lavender
        via-fuchsia
        to-coral-red
        ${wrapperClass}
      `}
    >
      <button
        type={type}
        disabled={disabled || loading}
        onClick={handleClick}
        className={`${buttonBase} ${sizeClasses[size]} ${className}`}
      >
        {loading ? <Loading size="sm" /> : children}
      </button>
    </div>
  );
}
