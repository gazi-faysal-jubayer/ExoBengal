'use client';

import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="mx-auto w-[500px] bg-gray-950 rounded-xl overflow-hidden drop-shadow-xl">
      {/* macOS Window Header */}
      <div className="bg-[#333] flex items-center p-[5px] text-white relative">
        {/* Window Control Buttons */}
        <div className="flex absolute left-3">
          <span className="h-3.5 w-3.5 bg-[#ff605c] rounded-full mr-2"></span>
          <span className="h-3.5 w-3.5 bg-[#ffbd44] rounded-full mr-2"></span>
          <span className="h-3.5 w-3.5 bg-[#00ca4e] rounded-full"></span>
        </div>
        {/* Header Title */}
        <div className="flex-1 text-center text-white">status</div>
      </div>
      
      {/* Terminal Content */}
      <div className="p-2.5 text-[#0f0]">
        <div>
          <span className="mr-2">Loading</span>
          <span className="animate-ping-delayed-1">.</span>
          <span className="animate-ping-delayed-2">.</span>
          <span className="animate-ping-delayed-3">.</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;