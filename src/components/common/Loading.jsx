import '@/assets/styles/Loading.css';

function Loading({ size = 'md', color = 'bg-blue-500' }) {
  const sizeConfig = {
    sm: { container: 'h-10 w-10 space-x-1.5', bar: 'w-1.5 h-8' },
    md: { container: 'h-14 w-14 space-x-2', bar: 'w-2 h-12' },
    lg: { container: 'h-20 w-16 space-x-2.5', bar: 'w-2.5 h-16' },
    xl: { container: 'h-28 w-20 space-x-3', bar: 'w-3 h-20' },
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
      className={`flex justify-between items-end ${sizeConfig[size].container}`}
    >
      {barAnimations.map((animationClass, index) => (
        <div
          key={index}
          className={`
            transform 
            ${sizeConfig[size].bar} 
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
