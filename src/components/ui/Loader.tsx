import React from 'react';
import { IoFootball } from 'react-icons/io5';

interface LoaderProps {
  size?: number;
  text?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 48, 
  text = "Cargando...",
  fullScreen = false 
}) => {
  const content = (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="animate-[spin_2s_linear_infinite] hover:pause">
          <div className="animate-[bounce_1s_ease-in-out_infinite]">
            <IoFootball 
              size={size} 
              className="text-[#1E1E48] transform rotate-[30deg]" 
            />
          </div>
        </div>
        {/* Shadow effect */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/10 dark:bg-white/10 rounded-full blur-sm animate-[scale_1s_ease-in-out_infinite]" />
      </div>
      {text && (
        <div className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-4">
          {text}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      {content}
    </div>
  );
};

export default Loader; 