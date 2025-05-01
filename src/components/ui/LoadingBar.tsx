
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

const LoadingBar: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show and start progress when location changes
    setIsVisible(true);
    setProgress(10);

    const timers = [
      setTimeout(() => setProgress(30), 100),
      setTimeout(() => setProgress(50), 200),
      setTimeout(() => setProgress(70), 300),
      setTimeout(() => setProgress(90), 400),
      setTimeout(() => {
        setProgress(100);
        // Hide the bar after animation completes
        setTimeout(() => {
          setIsVisible(false);
          setProgress(0);
        }, 500);
      }, 600)
    ];

    // Cleanup timers on unmount or when location changes again
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [location]);

  if (!isVisible && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <Progress 
        value={progress} 
        className="h-1.5 w-full bg-gray-200 dark:bg-gray-800"
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)',
          animation: isVisible ? 'progress-bar-stripes 1s linear infinite' : 'none'
        }}
      />
    </div>
  );
};

export default LoadingBar;
