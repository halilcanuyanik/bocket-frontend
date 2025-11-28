export default function ZoomControl({ scale, onZoom }) {
  return (
    <div className="flex h-8 bg-gray-300 rounded-lg p-1 mr-4">
      <button
        onClick={() => onZoom(-0.1)}
        className="px-3 py-1 text-black hover:text-white hover:bg-gray-400 rounded cursor-pointer flex justify-center items-center"
      >
        -
      </button>
      <span className="px-2 py-1 text-black text-sm min-w-[3rem] text-center">
        {Math.round(scale * 100)}%
      </span>
      <button
        onClick={() => onZoom(0.1)}
        className="px-3 py-1 text-black hover:text-white hover:bg-gray-400 rounded cursor-pointer flex justify-center items-center"
      >
        +
      </button>
    </div>
  );
}
