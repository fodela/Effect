const LoadingSpinner = () => {
  return (
    <div className="flex justify-center absolute min-w-full h-full items-center bg-black bg-opacity-70">
      <div className="w-6 h-6 rounded-full bg-gray-300 m-2 animation-loading-spinner animation-linear animation-infinite delay-1s" />
      <div className="w-6 h-6 rounded-full bg-gray-300 m-2 animation-loading-spinner animation-linear animation-infinite delay-2s" />
      <div className="w-6 h-6 rounded-full bg-gray-300 m-2 animation-loading-spinner animation-linear animation-infinite delay-3s" />
    </div>
  );
};

export default LoadingSpinner;
