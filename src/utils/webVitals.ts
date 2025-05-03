import type { Metric } from 'web-vitals';

// Function to report web vitals
const reportWebVitals = (onPerfEntry?: (metric: Metric) => void): void => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry); // Cumulative Layout Shift
      onFID(onPerfEntry); // First Input Delay 
      onFCP(onPerfEntry); // First Contentful Paint
      onLCP(onPerfEntry); // Largest Contentful Paint
      onTTFB(onPerfEntry); // Time to First Byte
    });
  }
};

export default reportWebVitals;

// Helper to log vitals to console during development
export const logWebVitals = (): void => {
  if (process.env.NODE_ENV === 'development') {
    reportWebVitals(console.log);
  }
};

// Helper to send vitals to analytics
export const sendWebVitalsToAnalytics = (): void => {
  reportWebVitals((metric) => {
    // Example implementation - replace with your analytics service
    const body = {
      name: metric.name,
      value: metric.value,
      delta: metric.delta,
      id: metric.id,
    };

    // Send to your analytics service
    if (window.navigator.sendBeacon) {
      window.navigator.sendBeacon('/api/analytics', JSON.stringify(body));
    } else {
      fetch('/api/analytics', {
        body: JSON.stringify(body),
        method: 'POST',
        keepalive: true,
      });
    }
  });
}; 