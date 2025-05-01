import React from "react";
import LazyImage from "@/components/ui/LazyImage";

const VideoOfTheDay: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow">
      <div className="bg-primary text-white p-3">
        <h2 className="font-bold font-display">Video of the day</h2>
      </div>
      <div className="p-4">
        <div className="relative pb-[56.25%] overflow-hidden rounded">
          <LazyImage
            src="https://via.placeholder.com/640x360?text=Video+Thumbnail"
            alt="Video del día"
            aspectRatio="16/9"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <h3 className="font-bold mt-3">
          Los goles de la fecha 10 del campeonato ecuatoriano
        </h3>
      </div>
    </div>
  );
};

export default VideoOfTheDay;
