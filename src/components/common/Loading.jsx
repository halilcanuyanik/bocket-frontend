export default function Loading({
  size = 'md',
  color = 'bg-sky-blue',
  className = '',
}) {
  const sizes = {
    sm: { container: 'h-7 w-8 space-x-1', bar: 'w-1 h-5' },
    md: { container: 'h-10 w-12 space-x-1.5', bar: 'w-1.5 h-8' },
    lg: { container: 'h-14 w-14 space-x-2', bar: 'w-2 h-10' },
    xl: { container: 'h-18 w-18 space-x-2.5', bar: 'w-2.5 h-14' },
  };

  const barAnimations = [
    'animate-quiet-wave',
    'animate-normal-wave',
    'animate-quiet-wave',
    'animate-loud-wave',
    'animate-quiet-wave',
  ];

  return (
    <div
      className={`flex justify-between items-center ${sizes[size].container} ${className}`}
    >
      {barAnimations.map((animationClass, index) => (
        <div
          key={index}
          className={`
            transform 
            ${sizes[size].bar} 
            ${color}
            rounded-full 
            transform-origin-bottom 
            ${animationClass}
          `}
        />
      ))}
    </div>
  );
}
