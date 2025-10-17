function Snackbar({ open, message, severity, onClose }) {
  if (!open) return null;

  const severityClasses = {
    info: 'bg-gradient-to-r from-blue-500 to-blue-700',
    success: 'bg-gradient-to-r from-green-500 to-green-700',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-700',
    error: 'bg-gradient-to-r from-red-500 to-red-700',
  };

  const baseClasses = severityClasses[severity] || severityClasses.info;

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg text-white font-semibold transition-opacity duration-300 z-50 ${baseClasses}`}
      role="alert"
    >
      <div className="flex items-center justify-between">
        <p className="mr-4">{message}</p>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 focus:outline-none ml-2 cursor-pointer"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default Snackbar;
