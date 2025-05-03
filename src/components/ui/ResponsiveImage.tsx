import React, { memo } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  imgClassName?: string;
}

/**
 * ResponsiveImage component that uses picture element with multiple formats and sizes
 * It automatically handles different image formats and responsive sizes
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  className,
  priority = false,
  quality = 80,
  imgClassName,
}) => {
  // Calculate aspect ratio for maintaining dimensions
  const aspectRatio = (height / width) * 100;
  
  // Extract base path and extension from src
  const getImagePath = () => {
    // Regular image path
    if (src.startsWith('http')) {
      return { base: src, ext: src.split('.').pop() || 'jpg' };
    }
    
    // Local image path
    const parts = src.split('.');
    const ext = parts.pop() || 'jpg';
    const base = parts.join('.');
    return { base, ext };
  };
  
  const { base, ext } = getImagePath();
  
  // Check if the image is in the optimized directory
  const isOptimized = src.includes('/img/optimized/') || src.includes('/img/responsive/');
  
  // Generate srcSet for standard and next-gen formats
  const getSrcSet = (format: string) => {
    if (src.startsWith('http')) {
      // For remote images, we don't have different sizes
      return src;
    }
    
    // For local optimized images
    if (isOptimized) {
      const sizes = [320, 640, 768, 1024, 1280, 1536, 1920];
      const validSizes = sizes.filter(size => size <= width * 2);
      
      return validSizes
        .map(size => `/img/responsive/${base.split('/').pop()}-${size}.${format} ${size}w`)
        .join(', ');
    }
    
    // For local non-optimized images (fallback)
    return src;
  };
  
  return (
    <div 
      className={cn('relative overflow-hidden', className)}
      style={{ 
        paddingBottom: `${aspectRatio}%`,
        width: '100%',
      }}
    >
      <picture>
        {/* AVIF format for browsers that support it */}
        {isOptimized && (
          <source
            type="image/avif"
            srcSet={getSrcSet('avif')}
            sizes={sizes}
          />
        )}
        
        {/* WebP format as fallback */}
        {isOptimized && (
          <source
            type="image/webp"
            srcSet={getSrcSet('webp')}
            sizes={sizes}
          />
        )}
        
        {/* Original format as final fallback */}
        <img
          src={isOptimized ? `/img/optimized/${base.split('/').pop()}-optimized.${ext}` : src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          className={cn(
            'absolute inset-0 w-full h-full object-cover',
            imgClassName
          )}
        />
      </picture>
    </div>
  );
};

export default memo(ResponsiveImage); 