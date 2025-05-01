
import React from 'react';

const VideoSection: React.FC = () => {
  return (
    <div className="bg-white shadow-sm rounded-md overflow-hidden">
      <div className="bg-primary text-white p-4">
        <h3 className="font-bold text-lg">Video of the day</h3>
      </div>
      
      <div className="p-4">
        <div className="aspect-video bg-gray-200 relative">
          {/* Placeholder for video */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-gray-800 ml-1"></div>
            </div>
          </div>
        </div>
        
        <h4 className="font-medium text-gray-800 mt-3 mb-1">Top 10 Liga Pro signings of 2025</h4>
        <p className="text-sm text-gray-600">Watch the most exciting transfers for the upcoming season</p>
      </div>
    </div>
  );
};

export default VideoSection;
