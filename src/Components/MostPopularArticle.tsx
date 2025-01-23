import React from 'react';

const MostPopular: React.FC = () => {
  return (
    <div className="bg-green-600 rounded-lg p-4  mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Most Popular</h1>
        
      </div>
      <ul className="list-none">
        <li className="flex items-center mb-2">
          <span className="inline-block w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
          <span>Facebook, Nvidia ask US Supreme Court to spare them from securities fraud suits</span>
        </li>
        <li className="flex items-center mb-2">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          <span>Facebook, Nvidia ask US Supreme Court to spare them from securities fraud suits</span>
        </li>
        <li className="flex items-center mb-2">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          <span>Facebook, Nvidia ask US Supreme Court to spare them from securities fraud suits</span>
        </li>
        <li className="flex items-center mb-2">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          <span>Facebook, Nvidia ask US Supreme Court to spare them from securities fraud suits</span>
        </li>
        
      </ul>
    </div>
  );
};

export default MostPopular;