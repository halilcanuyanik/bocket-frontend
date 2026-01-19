export default function ZoomControl({ wrapperClass, scale, onZoom }) {
  return (
    <div
      className={`${wrapperClass} w-24 h-8 bg-gray-200 rounded-lg flex items-center`}
    >
      <button
        className="px-2 py-0.5 hover:text-white cursor-pointer"
        onClick={() => onZoom(-0.1)}
      >
        -
      </button>
      <span className="text-black text-sm min-w-[3rem] text-center">
        {Math.round(scale * 100)}%
      </span>
      <button
        className="px-2 py-0.5 hover:text-white cursor-pointer"
        onClick={() => onZoom(0.1)}
      >
        +
      </button>
    </div>
  );
}
