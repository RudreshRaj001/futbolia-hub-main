import React, { useState, memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  aspectRatio?: string;
  placeholderSrc?: string;
  priority?: boolean;
  srcSet?: string;
  sizes?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  aspectRatio,
  placeholderSrc = '/placeholder.svg',
  priority = false,
  srcSet,
  sizes,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Generate default srcSet if not provided but width is known
  const generatedSrcSet = !srcSet && width && src.startsWith('http') 
    ? `${src} ${width}w, ${src} ${width * 2}w` 
    : srcSet;

  return (
    <div 
      className={cn(
        aspectRatio ? `aspect-${aspectRatio.replace('/', '-')}` : '',
        'overflow-hidden'
      )}
      style={{
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
      }}
    >
      {priority ? (
        <img
          src={hasError ? placeholderSrc : src}
          alt={alt}
          width={width}
          height={height}
          srcSet={generatedSrcSet}
          sizes={sizes}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            'transition-all duration-300 object-cover w-full h-full',
            isLoaded ? 'opacity-100 scale-100' : 'opacity-40 scale-105',
            className
          )}
          {...props}
        />
      ) : (
        <LazyLoadImage
          src={hasError ? placeholderSrc : src}
          alt={alt}
          width={width}
          height={height}
          effect="blur"
          threshold={300}
          srcSet={generatedSrcSet}
          sizes={sizes}
          placeholder={<div className="bg-gray-200 dark:bg-gray-800 w-full h-full animate-pulse" />}
          afterLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            'transition-all duration-300 object-cover w-full h-full',
            isLoaded ? 'opacity-100 scale-100' : 'opacity-40 scale-105',
            className
          )}
          {...props}
        />
      )}
    </div>
  );
};

export default memo(LazyImage);
