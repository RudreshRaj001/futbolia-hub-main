import React, {
    lazy,
    Suspense,
    ReactNode,
    ComponentType,
    FC,
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
  
  /**
   * HOC for lazy-loading a component with an optional fallback.
   * Ensures correct prop typing by casting the lazy component.
   *
   * @param importFunc - dynamic import function returning a component
   * @param fallback   - optional fallback element (default: TopBarProgress)
   */
  function LazyLoadingHOC<P extends object>(
    importFunc: LazyImport<P>,
    fallback: ReactNode = null
  ): FC<P> {
    // Cast the lazy-exotic component to a normal ComponentType<P>
    const LazyComponent = lazy(importFunc) as ComponentType<P>;
  
    const LazyWrapper: FC<P> = (props) => (
      <Suspense fallback={fallback ?? <TopBarProgress />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  
    return LazyWrapper;
  }
  
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
  