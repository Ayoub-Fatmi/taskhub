type ErrorDisplayProps = {
  error: string | Error;
  onRetry?: () => void;
};

export const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => (
  <div className={`h-[calc(100vh-3rem)] flex justify-center items-center `}>
    <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700">
      <div className="flex flex-col items-center text-center">
        <div className="mb-5 p-4 bg-red-50 dark:bg-red-900/20 rounded-full animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-red-500 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Something went wrong
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {typeof error === 'string' ? error : error.message}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  </div>
);