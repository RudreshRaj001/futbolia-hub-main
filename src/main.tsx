import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

// 1️⃣ Import the Analytics component
import { Analytics } from '@vercel/analytics/react';

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* 2️⃣ Inject Vercel’s analytics script */}
    <Analytics  />
  </>
);
