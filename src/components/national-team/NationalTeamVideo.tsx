
import React from 'react';

const NationalTeamVideo: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-4">
        <h2 className="text-lg font-bold">Video of the day</h2>
      </div>
      
      <div className="p-4">
        <div className="aspect-video bg-gray-200 mb-3 rounded-md overflow-hidden">
          <img 
            src="/lovable-uploads/f97640bf-5b9b-4169-bf2a-ab1d2de70153.png" 
            alt="Video thumbnail" 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Ecuador returns to the Qualifiers: The start of a new era</h3>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
            <img 
              src="/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png" 
              alt="Podcast logo" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Sep 17 · Futbolecuador.com
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            
            <span className="text-sm text-gray-500 dark:text-gray-400">1:05:10</span>
          </div>
          
          <button className="p-2 rounded-full bg-primary text-white hover:bg-primary/90">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5v14l11-7z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NationalTeamVideo;
