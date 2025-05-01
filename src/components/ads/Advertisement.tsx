
import React from 'react';
import { cn } from '@/lib/utils';

interface AdvertisementProps {
  size?: 'sidebar' | 'banner' | 'inline';
  className?: string;
}

const Advertisement: React.FC<AdvertisementProps> = ({ 
  size = 'sidebar',
  className
}) => {
  return (
    <div className={cn(
      "bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden text-center border border-gray-200 dark:border-gray-700",
      size === 'sidebar' ? "w-full" : 
      size === 'banner' ? "w-full max-w-7xl mx-auto" :
      "w-full", // inline size
      className
    )}>
      <div className="p-1 bg-gray-200 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400">
        Publicidad
      </div>
      <div className={cn(
        "flex items-center justify-center bg-white/50 dark:bg-gray-800/50",
        size === 'sidebar' ? "h-[250px] md:h-[600px]" : 
        size === 'banner' ? "h-[90px] md:h-[120px]" :
        "h-[90px]" // inline size
      )}>
        <img 
          src={size === 'sidebar' 
            ? "https://via.placeholder.com/300x600?text=Advertisement" 
            : size === 'banner'
            ? "https://via.placeholder.com/728x90?text=Advertisement"
            : "https://via.placeholder.com/468x60?text=Advertisement"
          } 
          alt="Advertisement" 
          className="max-w-full max-h-full" 
        />
      </div>
    </div>
  );
};

export default Advertisement;
