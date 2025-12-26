export default function Modal({ isOpen, onClose, children, type = 'warning' }) {
  if (!isOpen) return null;

  const getBorderColor = () => {
    if (type === 'danger') return 'border-red-500';
    if (type === 'info') return 'border-yellow-500';
    return 'border-institutional-500';
  };

  const getBackgroundColor = () => {
    if (type === 'danger') return 'bg-red-100';
    if (type === 'info') return 'bg-yellow-100';
    return 'bg-institutional-100';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
      <div
        className={`relative max-w-lg w-full ${getBackgroundColor()} border-4 ${getBorderColor()} rounded-lg shadow-2xl animate-scaleIn`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {children}
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-institutional-700 hover:text-institutional-900 transition-colors"
          aria-label="Close"
        >
          ×
        </button>

        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full bg-institutional-600 hover:bg-institutional-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
