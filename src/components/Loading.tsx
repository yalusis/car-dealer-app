const Loading = () => (
    <div className="flex items-center justify-center h-screen">
      <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-blue-500" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
  
  export default Loading;