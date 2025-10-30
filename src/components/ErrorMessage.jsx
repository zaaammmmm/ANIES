import { useState } from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center">
        <div className="text-6xl mb-4 text-red-500">
          <span className="material-symbols-outlined">error_outline</span>
        </div>
        <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
          Terjadi Kesalahan
        </h3>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 max-w-md">
          {message || 'Maaf, terjadi kesalahan saat memuat data. Silakan coba lagi.'}
        </p>
        {onRetry && (
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isRetrying ? (
              <>
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Memuat ulang...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">refresh</span>
                Coba Lagi
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
