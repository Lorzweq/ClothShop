import React from 'react';

const UnderDevelopment = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4">Page Under Development</h2>
        <p className="text-lg">This page is currently under development. Please check back later.</p>
      </div>
    </div>
  );
};

export default UnderDevelopment;