import '@/assets/styles/Loading.css';

function Loading({ size = 'md', color = 'bg-blue-500' }) {
  const sizes = {
    sm: { container: 'h-8 w-10 space-x-1.5', bar: 'w-1.5 h-6' },
    md: { container: 'h-12 w-14 space-x-2', bar: 'w-2 h-10' },
    lg: { container: 'h-16 w-16 space-x-2.5', bar: 'w-2.5 h-12' },
    xl: { container: 'h-20 w-20 space-x-3', bar: 'w-3 h-16' },
  };

  const barAnimations = [
    'animate-quiet-wave',
    'animate-normal-wave',
    'animate-quiet-wave',
    'animate-loud-wave',
    'animate-quiet-wave',
  ];

  return (
    <div className={`flex justify-between items-end ${sizes[size].container}`}>
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

export default Loading;
