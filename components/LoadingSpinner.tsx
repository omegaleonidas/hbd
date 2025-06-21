
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-300"></div>
      <p className="ml-3 text-purple-200 text-lg">Memuat...</p>
    </div>
  );
};
