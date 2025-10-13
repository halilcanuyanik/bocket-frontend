function Loading() {
  const barAnimations = [
    'animate-quiet-wave',
    'animate-normal-wave',
    'animate-quiet-wave',
    'animate-loud-wave',
    'animate-quiet-wave',
  ];

  return (
    <div className="flex justify-between items-center h-8 space-x-0.5 w-6">
      {barAnimations.map((animationClass, index) => (
        <div
          key={index}
          className={`
            transform scale-y-40 h-full w-0.5 
            bg-flame-red
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
