const Shimmer = () => {
    return (
      <div className="max-w-5xl w-full px-3 pt-4">
        {/* Author and Date Placeholder */}
        <div className="flex items-center mb-4 text-gray-500">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="ml-2 w-24 h-4 bg-gray-200 rounded"></div>
          <div className="ml-2 w-2 h-2 bg-gray-200 rounded-full"></div>
          <div className="ml-2 w-20 h-4 bg-gray-200 rounded"></div>
        </div>
  
        {/* Title Placeholder */}
        <div className="mb-2 w-3/4 h-6 bg-gray-200 rounded"></div>
  
        {/* Content Placeholder */}
        <div className="mb-4 w-full h-4 bg-gray-200 rounded"></div>
        <div className="mb-4 w-11/12 h-4 bg-gray-200 rounded"></div>
        <div className="mb-4 w-10/12 h-4 bg-gray-200 rounded"></div>
  
        {/* Read Time Placeholder */}
        <div className="text-sm text-gray-500">
          <div className="w-24 h-3 bg-gray-200 rounded"></div>
        </div>
  
        {/* Divider Placeholder */}
        <div className="mt-4 bg-gray-200 h-1 w-full"></div>
      </div>
    );
  };
  
  export default Shimmer;