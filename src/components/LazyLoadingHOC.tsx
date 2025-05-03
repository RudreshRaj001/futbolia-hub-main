import React, {
    lazy,
    Suspense,
    ReactNode,
    ComponentType,
    FC,
    useEffect,
    useState,
    memo,
  } from 'react';
  import TopBarProgress from 'react-topbar-progress-indicator';
  
  // Configure React TopBarProgress
  TopBarProgress.config({
    barColors: {
      "0": "#ed1909",
      "1.0": "#88e312"
    },
    shadowBlur: 5 // Reduced blur effect for better performance
  });
  
  type LazyImport<P> = () => Promise<{ default: ComponentType<P> }>;
  
  // Simple inline fallback for better performance
  const SimpleFallback = memo(() => (
    <div className="h-1 bg-primary animate-pulse fixed top-0 left-0 right-0 z-50"></div>
  ));
  
  // Preload components to reduce initial loading time
  const preloadedComponents = new Set<string>();
  export const preloadComponent = (importFunc: () => Promise<any>, componentId?: string): void => {
    const id = componentId || 
      importFunc.toString().match(/import\(['"](.+)['"]\)/)?.[1] || 
      Math.random().toString(36).substring(2, 9);
      
    if (!preloadedComponents.has(id)) {
      // Start loading but don't wait for result
      importFunc().catch(() => {
        // Silently fail preloading - component will load normally when needed
      });
      preloadedComponents.add(id);
    }
  };
  
  /**
   * HOC for lazy-loading a component with an optional fallback.
   * Ensures correct prop typing by casting the lazy component.
   * Optimized for better performance.
   *
   * @param importFunc - dynamic import function returning a component
   * @param fallback   - optional fallback element (default: SimpleFallback)
   * @param options    - additional options for lazy loading
   */
  function LazyLoadingHOC<P extends object>(
    importFunc: LazyImport<P>,
    fallback: ReactNode = null,
    options: { 
      componentName?: string;
      useLightFallback?: boolean;
      preload?: boolean;
    } = {}
  ): FC<P> {
    // Extract component name from import function for better debugging
    const componentName = options.componentName || 
      importFunc.toString().match(/import\(['"](.+)['"]\)/)?.[1]?.split('/').pop() || 
      'LazyComponent';
  
    // Preload if requested
    if (options.preload) {
      preloadComponent(importFunc, componentName);
    }
  
    // Cast the lazy-exotic component to a normal ComponentType<P>
    const LazyComponent = lazy(importFunc) as ComponentType<P>;
  
    const LazyWrapper: FC<P> = memo((props) => {
      const loadingFallback = fallback ?? 
        (options.useLightFallback !== false ? <SimpleFallback /> : <TopBarProgress />);
        
      return (
        <Suspense fallback={loadingFallback}>
          <LazyComponent {...props} />
        </Suspense>
      );
    });
  
    // Set display name for better debugging
    LazyWrapper.displayName = `Lazy(${componentName})`;
    
    return LazyWrapper;
  }
  
  export default LazyLoadingHOC;
  
  /**
   * Usage example:
   *
   * import LazyLoadingHOC, { preloadComponent } from '@/components/LazyLoadingHOC';
   *
   * // Preload important components on app init
   * preloadComponent(() => import('@/pages/Home'));
   *
   * const LazyDashboard = LazyLoadingHOC(() =>
   *   import('@/pages/Dashboard'),
   *   null,
   *   { preload: true, useLightFallback: true }
   * );
   *
   * function App() {
   *   return <LazyDashboard someProp={value} />;
   * }
   */
  