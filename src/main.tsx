import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Import Analytics component
import { Analytics } from '@vercel/analytics/react';

// Simple performance monitoring function
const reportWebVitals = (metric: any) => {
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.log(`Performance: ${metric.name}`, metric);
  }
};

// Create root and render app
createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* Inject Vercel's analytics script */}
    <Analytics />
  </>
);
