/**
 * Utility functions for image optimization
 */

// Map to track which images have been loaded
const loadedImages = new Map<string, boolean>();

/**
 * Get optimal image dimensions based on container size
 * This helps with proper image sizing
 */
export const getOptimalImageSize = (
  containerWidth: number, 
  containerHeight: number, 
  aspectRatio = 16/9
): { width: number; height: number } => {
  // Round to nearest 100px for better CDN caching
  const width = Math.ceil(containerWidth / 100) * 100;
  const height = aspectRatio ? Math.round(width / aspectRatio) : containerHeight;
  
  return { width, height };
};

/**
 * Convert image URL to WebP format if supported
 * This handles next-gen format conversion
 */
export const getWebPUrl = (url: string): string => {
  if (!url) return url;
  
  // Skip if already webp
  if (url.endsWith('.webp')) return url;
  
  // Skip SVGs and GIFs
  if (url.endsWith('.svg') || url.endsWith('.gif')) return url;
  
  // For URLs containing query parameters
  if (url.includes('?')) {
    return `${url}&format=webp`;
  }
  
  // Basic URL transformation
  return `${url.split('.').slice(0, -1).join('.')}.webp`;
};

/**
 * Intersection Observer to lazy load images
 */
export const setupLazyImageObserver = (): IntersectionObserver => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const dataSrc = img.getAttribute('data-src');
          
          if (dataSrc && !loadedImages.has(dataSrc)) {
            img.src = dataSrc;
            loadedImages.set(dataSrc, true);
            img.classList.add('loaded');
          }
        }
      });
    },
    { 
      rootMargin: '200px 0px',
      threshold: 0.01
    }
  );
};

/**
 * Preload critical images (like LCP candidates)
 */
export const preloadCriticalImages = (urls: string[]): void => {
  if (!urls || !Array.isArray(urls) || !urls.length) return;
  
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
};

/**
 * Apply width and height to all images to prevent layout shifts
 */
export const applyImageDimensions = (): void => {
  setTimeout(() => {
    document.querySelectorAll('img:not([width]):not([height])').forEach((img: HTMLImageElement) => {
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        img.setAttribute('width', img.naturalWidth.toString());
        img.setAttribute('height', img.naturalHeight.toString());
      }
    });
  }, 1000);
};

/**
 * Initialize all image optimizations
 */
export const initImageOptimizations = (): void => {
  // Set up lazy loading for images
  const observer = setupLazyImageObserver();
  
  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach(img => {
    observer.observe(img);
  });
  
  // Apply dimensions to prevent layout shifts
  applyImageDimensions();
}; 