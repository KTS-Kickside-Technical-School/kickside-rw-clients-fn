import React from 'react';

const HomePageSkeletonLoader = React.memo(() => (
  <div className="w-full px-4 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse min-h-[80vh]">
    <div className="lg:col-span-2">
      <div className="w-full aspect-[16/9] bg-gray-700 rounded-xl" />
      <div className="mt-4 space-y-3">
        <div className="h-4 bg-gray-700 w-1/4 rounded" />
        <div className="h-6 bg-gray-700 w-3/4 rounded" />
        <div className="h-4 bg-gray-700 w-1/2 rounded" />
      </div>
    </div>

    <div className="lg:col-span-1 space-y-4 sm:space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="w-1/2 aspect-[4/3] bg-gray-700 rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-700 rounded w-full" />
            <div className="h-3 bg-gray-700 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>

    <div className="lg:col-span-3 pt-6">
      <div className="h-6 bg-gray-700 w-1/3 rounded mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="aspect-[5/3] bg-gray-700 rounded-lg" />
            <div className="h-4 bg-gray-700 rounded w-full" />
            <div className="h-3 bg-gray-700 rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  </div>
));

export default HomePageSkeletonLoader;
