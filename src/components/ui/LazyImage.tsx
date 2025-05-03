import React, { useState, useEffect, memo, useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { cn } from '@/lib/utils';
import { getWebPUrl, getOptimalImageSize } from '@/utils/imageOptimizer';

interface LazyImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  aspectRatio?: string;
  placeholderSrc?: string;
  priority?: boolean;
  isLCP?: boolean; // Flag for Largest Contentful Paint images
}

// Cache for preloaded images
const preloadedImages = new Set<string>();

// Function to preload an image
const preloadImage = (src: string): void => {
  if (!src || preloadedImages.has(src)) return;
  
  const img = new Image();
  img.src = src;
  preloadedImages.add(src);
};

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  aspectRatio,
  placeholderSrc = '/placeholder.svg',
  priority = false,
  isLCP = false,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width, height });
  
  // Use WebP format if available
  const optimizedSrc = getWebPUrl(src);
  
  // Handle Largest Contentful Paint optimization
  useEffect(() => {
    if (isLCP) {
      // Add fetchpriority attribute via DOM for LCP images
      const img = document.querySelector(`img[src="${optimizedSrc}"]`) as HTMLImageElement;
      if (img) {
        img.fetchPriority = 'high';
        img.loading = 'eager';
        
        // Add link preload in head for LCP image
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = optimizedSrc;
        link.as = 'image';
        document.head.appendChild(link);
      }
    }
  }, [optimizedSrc, isLCP]);
  
  // Calculate optimal dimensions if not provided
  useEffect(() => {
    if ((!width || !height) && containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const ratio = aspectRatio 
        ? Number(aspectRatio.split('/')[0]) / Number(aspectRatio.split('/')[1])
        : 16/9;
        
      const optimal = getOptimalImageSize(containerWidth, containerHeight, ratio);
      
      if (!dimensions.width || !dimensions.height) {
        setDimensions(optimal);
      }
    }
  }, [width, height, aspectRatio, dimensions]);
  
  // Preload image if priority flag is set
  useEffect(() => {
    if ((priority || isLCP) && optimizedSrc) {
      preloadImage(optimizedSrc);
    }
  }, [priority, optimizedSrc, isLCP]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        aspectRatio ? `aspect-${aspectRatio.replace('/', '-')}` : '',
        'overflow-hidden'
      )}
    >
      <LazyLoadImage
        src={hasError ? placeholderSrc : optimizedSrc}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        effect="blur"
        placeholderSrc={priority ? optimizedSrc : placeholderSrc}
        placeholder={<div className="bg-gray-200 dark:bg-gray-800 w-full h-full animate-pulse" />}
        afterLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        threshold={100}
        visibleByDefault={priority || isLCP}
        className={cn(
          'transition-all duration-300 object-cover w-full h-full',
          isLoaded ? 'opacity-100 scale-100' : 'opacity-40 scale-105',
          className
        )}
        {...props}
      />
    </div>
  );
};

// Export a memoized version of the component to prevent unnecessary re-renders
export default memo(LazyImage);

// Export a utility to preload images
export const preloadImages = (urls: string[]): void => {
  if (!urls || !Array.isArray(urls)) return;
  
  // Prioritize visible images first
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      urls.forEach(url => preloadImage(getWebPUrl(url)));
    }, { timeout: 2000 });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(() => {
      urls.forEach(url => preloadImage(getWebPUrl(url)));
    }, 1000);
  }
};
