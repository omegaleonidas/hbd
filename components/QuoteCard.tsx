
import React from 'react';
import { PurpleHeartIcon } from './Icons';

interface QuoteCardProps {
  quote: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
  return (
    <div className="bg-purple-600/50 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-purple-500/70 transform hover:scale-105 transition-transform duration-300 ease-out">
      <p className="text-md text-gray-100 italic flex items-start">
        <PurpleHeartIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-pink-400" />
        <span>"{quote}"</span>
      </p>
    </div>
  );
};
