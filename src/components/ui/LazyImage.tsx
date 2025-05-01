
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  aspectRatio?: string;
  placeholderSrc?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  aspectRatio,
  placeholderSrc = '/placeholder.svg',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  return (
    <div className={cn(
      aspectRatio ? `aspect-${aspectRatio.replace('/', '-')}` : '',
      'overflow-hidden'
    )}>
      <LazyLoadImage
        src={hasError ? placeholderSrc : src}
        alt={alt}
        width={width}
        height={height}
        effect="blur"
        placeholder={<div className="bg-gray-200 dark:bg-gray-800 w-full h-full animate-pulse" />}
        afterLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn(
          'transition-all duration-500 object-cover w-full h-full',
          isLoaded ? 'opacity-100 scale-100' : 'opacity-40 scale-105',
          className
        )}
        {...props}
      />
    </div>
  );
};

export default LazyImage;
