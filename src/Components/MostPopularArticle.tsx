import React from 'react';
import { BsGraphUpArrow } from "react-icons/bs";


const MostPopular: React.FC = () => {
  return (
    <>
    <div className="bg-[#14D163]  p-4  mt-8">
    <div className="flex justify-between items-center mb-4 text-white">
  <div className="flex flex-col items-start">
    <h1 className="text-3xl font-bold">Most</h1>
    <h1 className="text-3xl font-bold">Popular</h1>
  </div>
  <BsGraphUpArrow className="text-5xl text-blue-700 w-10" />
</div>


      <ul className="list-none">
        <li className="flex items-center mb-2 border-b-2 border-b-[#D8D8D8] border-b-slate">
          <span className="inline-block  w-4 h-2 bg-white lg:-mt-10 -mt-6 mr-2"></span>
          <span>Facebook, Nvidia ask US Supreme Court to spare them from securities fraud suits</span>
          
        </li> <li className="flex items-center mb-2 border-b-2 border-b-[#D8D8D8] border-b-slate">
          <span className="inline-block  w-4 h-2 bg-white lg:-mt-10 -mt-6 mr-2"></span>
          <span>Facebook, Nvidia ask US Supreme Court to spare them from securities fraud suits</span>
          
        </li> <li className="flex items-center mb-2 border-b-2 border-b-[#D8D8D8] border-b-slate">
          <span className="inline-block  w-4 h-2 bg-white lg:-mt-10 -mt-6 mr-2"></span>
          <span>Facebook, Nvidia ask US Supreme Court to spare them from securities fraud suits</span>
          
        </li> <li className="flex items-center mb-2 border-b-2 border-b-[#D8D8D8] border-b-slate">
          <span className="inline-block  w-4 h-2 bg-white lg:-mt-10 -mt-6 mr-2"></span>
          <span>Facebook, Nvidia ask US Supreme Court to spare them from securities fraud suits</span>
          
        </li>
        
      </ul>
    </div>
    
    </>
  );
};

export default MostPopular;