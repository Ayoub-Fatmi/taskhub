type ErrorDisplayProps = {
    error: string;
    onRetry: () => void;
  };
  
  export const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => (
    <div className="h-screen flex justify-center items-center">
      <div className="text-red-500 text-center">
        <p>Error: {error}</p>
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    </div>
  );