
import React from 'react';
import LazyImage from '@/components/ui/LazyImage';

interface VideoSectionProps {
  imageUrl: string;
  title?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({ imageUrl, title = "Video of the day" }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="p-4 bg-gray-800 text-white font-bold">
        {title}
      </div>
      <div className="aspect-video relative">
        <LazyImage 
          src={imageUrl} 
          alt="Video Preview" 
          aspectRatio="16/9"
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/50 text-white px-4 py-2 rounded text-sm">
            Continue watching
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
