import React, {
    lazy,
    Suspense,
    ReactNode,
    ComponentType,
    FC,
    useEffect,
    useState,
  } from 'react';
  import TopBarProgress from 'react-topbar-progress-indicator';
  
  // Configure React TopBarProgress
  TopBarProgress.config({
    barColors: {
      "0": "#ed1909",
      "1.0": "#88e312"
    },
    shadowBlur: 10
  });
  
  type LazyImport<P> = () => Promise<{ default: ComponentType<P> }>;
  
  // Prefetch cache to track which components have been prefetched
  const prefetchCache = new Set<string>();
  
  /**
   * HOC for lazy-loading a component with an optional fallback.
   * Ensures correct prop typing by casting the lazy component.
   *
   * @param importFunc - dynamic import function returning a component
   * @param fallback   - optional fallback element (default: TopBarProgress)
   * @param prefetch   - whether to prefetch the component on idle
   */
  function LazyLoadingHOC<P extends object>(
    importFunc: LazyImport<P>,
    fallback: ReactNode = null,
    prefetch: boolean = false
  ): FC<P> {
    // Create unique identifier for this import function
    const importFuncString = importFunc.toString();
  
    // Cast the lazy-exotic component to a normal ComponentType<P>
    const LazyComponent = lazy(() => {
      // Add timeout to catch slow-loading components
      const loadPromise = importFunc();
      
      return Promise.race([
        loadPromise,
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Component load timeout')), 10000)
        )
      ]).then(module => {
        return module;
      }).catch(error => {
        console.error('Failed to load component:', error);
        // Return a minimal component to avoid crashing the app
        return { default: (() => <div>Failed to load component</div>) as unknown as ComponentType<P> };
      });
    }) as ComponentType<P>;
  
    const LazyWrapper: FC<P> = (props) => {
      // If prefetch is enabled, trigger prefetch when component mounts
      useEffect(() => {
        if (prefetch && !prefetchCache.has(importFuncString)) {
          // Mark as prefetched
          prefetchCache.add(importFuncString);
          
          // Prefetch using requestIdleCallback if available
          const prefetchComponent = () => {
            importFunc().catch(err => 
              console.warn('Failed to prefetch component:', err)
            );
          };
          
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(prefetchComponent, { timeout: 2000 });
          } else {
            // Fallback to setTimeout with a delay
            setTimeout(prefetchComponent, 1000);
          }
        }
      }, []);
      
      return (
        <Suspense fallback={fallback ?? <TopBarProgress />}>
          <LazyComponent {...props} />
        </Suspense>
      );
    };
  
    return LazyWrapper;
  }
  
  // Helper function to preload a component on demand
  LazyLoadingHOC.preload = (importFunc: () => Promise<any>): void => {
    importFunc().catch(err => console.warn('Failed to preload component:', err));
  };
  
  export default LazyLoadingHOC;
  
  /**
   * Usage example:
   *
   * import LazyLoadingHOC from '@/components/LazyLoadingHOC';
   *
   * const LazyDashboard = LazyLoadingHOC(() =>
   *   import('@/pages/Dashboard')
   * );
   *
   * function App() {
   *   return <LazyDashboard someProp={value} />;
   * }
   */
  