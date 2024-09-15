import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"></div>
        <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-t-4 border-b-4 border-pink-500 animate-ping"></div>
        <div className="absolute top-0 left-0 w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-30 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
