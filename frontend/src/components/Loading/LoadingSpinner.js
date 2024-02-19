const LoadingSpinner = () => {
  return (
    <div className="flex justify-center  min-w-full h-full items-center bg-opacity-70">
      <div className="loading animation-loading-spinner animation-linear animation-infinite delay-1s" />
      <div className="loading animation-loading-spinner animation-linear animation-infinite delay-2s" />
      <div className="loading animation-loading-spinner animation-linear animation-infinite delay-3s" />
    </div>
  );
};

export default LoadingSpinner;
