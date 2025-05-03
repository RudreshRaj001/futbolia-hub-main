import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Import the Analytics component
import { Analytics } from '@vercel/analytics/react';
import { sendWebVitalsToAnalytics } from './utils/webVitals';
import { initImageOptimizations, applyImageDimensions } from './utils/imageOptimizer';

// Initialize web vitals reporting
sendWebVitalsToAnalytics();

// Use React 18's new concurrent features
const root = createRoot(document.getElementById('root')!);

// Create a lightweight version of the app for faster initial load
const renderApp = () => {
  root.render(
    <>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* Inject Vercel's analytics script */}
      <Analytics />
    </>
  );
};

// Execute the app rendering
renderApp();

// Initialize image optimizations after app renders
window.addEventListener('load', () => {
  // Initialize image optimizations
  initImageOptimizations();
  
  // Apply dimensions to images to prevent layout shifts
  setTimeout(applyImageDimensions, 1000);
  
  // Report any layout shifts for debugging
  if (process.env.NODE_ENV === 'development') {
    let cumulativeLayoutShift = 0;
    
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          cumulativeLayoutShift += entry.value;
          console.log(`Layout shift: ${entry.value}, Total: ${cumulativeLayoutShift}`);
        }
      }
    }).observe({ type: 'layout-shift', buffered: true });
  }
});

// Register service worker for better performance
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
