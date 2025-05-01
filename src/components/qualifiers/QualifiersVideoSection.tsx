
import React from 'react';
import { Play } from 'lucide-react';

const QualifiersVideoSection: React.FC = () => {
  return (
    <div className="bg-white rounded-md overflow-hidden shadow-sm">
      <div className="bg-gray-900 text-white p-4">
        <h2 className="text-lg font-bold">Video of the day</h2>
      </div>
      
      <div className="relative">
        <img 
          src="https://via.placeholder.com/400x225?text=Video+Preview" 
          alt="Video Preview" 
          className="w-full h-auto"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/50 rounded-full w-12 h-12 flex items-center justify-center">
            <Play className="text-white" fill="white" />
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold mb-2">Ecuador's Journey to the 2026 World Cup</h3>
        <p className="text-sm text-gray-600">Watch the highlights of Ecuador's qualifying campaign so far.</p>
        
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md">
          <div className="text-center">
            <p className="font-bold text-lg">1XBET</p>
            <p className="text-sm mb-2">120% BONUS FOR YOUR FIRST DEPOSIT!</p>
            <p className="text-sm mb-2">GET YOUR 33 000 INR!</p>
            <button className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold mt-2">
              GET YOUR BONUS
            </button>
          </div>
        </div>
        
        <div className="mt-4 bg-gray-100 p-3 rounded-md">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
              <img 
                src="https://via.placeholder.com/40?text=F" 
                alt="Podcast" 
                className="w-8 h-8"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Ecuador de vuelta a las Eliminatorias: El inicio de la era Beccace</p>
              <p className="text-xs text-gray-500">ecuafutbol.com ¦Lo mejor del fútbol ecuatoriano</p>
              <button className="flex items-center text-xs mt-1">
                <span className="mr-1">Save on Spotify</span>
              </button>
            </div>
          </div>
          
          <div className="mt-2 flex items-center">
            <div className="flex-grow">
              <div className="h-1 bg-gray-300 rounded-full">
                <div className="h-1 bg-gray-600 rounded-full w-1/3"></div>
              </div>
            </div>
            <span className="ml-2 text-xs">1:05:10</span>
            <button className="ml-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
              <Play size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualifiersVideoSection;
