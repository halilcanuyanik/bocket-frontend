import { useNavigate } from 'react-router-dom';
import Loading from '@/components/common/Loading';

function Button({
  wrapperClass = '',
  className = '',
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

  const baseStyles = `font-semibold cursor-pointer transition-all ease-linear rounded-md border-none ${
    disabled || loading
      ? 'bg-gray-900 cursor-not-allowed'
      : 'bg-black text-white'
  }`;

  const sizes = {
    sm: 'text-sm px-2 py-1',
    md: 'text-lg px-4 py-1',
    lg: 'text-xl px-8 py-2',
  };
  return (
    <div
      className={`flex justify-center items-center p-0.5 bg-gradient-to-r from-sky-blue via-lavender via-fuchsia to-coral-red custom-selection ${wrapperClass}`}
    >
      <button
        onClick={handleClick}
        className={`${baseStyles} ${sizes[size]} ${className}`}
        disabled={disabled || loading}
      >
        {loading ? <Loading /> : children}
      </button>
    </div>
  );
}

export default Button;
