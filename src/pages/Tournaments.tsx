import React, { lazy, Suspense } from 'react';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
import { PageTransition } from '@/utils/animations';

// ✅ Lazy-loaded components
const Advertisement = lazy(() => import('@/components/ads/Advertisement'));
const TournamentsContent = lazy(() => import('@/components/tournaments/TournamentsContent'));

const Tournaments: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}
        <main className="flex-grow pt-20">
          {/* Page Header */}
          <div className="w-full bg-primary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <h1 className="text-2xl font-bold font-display">Torneos</h1>
            </div>
          </div>

          {/* Banner Ad */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Suspense fallback={<div className="text-center">Cargando anuncio...</div>}>
              <Advertisement size="banner" />
            </Suspense>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 gap-6">
              <Suspense fallback={<div className="text-center">Cargando torneos...</div>}>
                <TournamentsContent />
              </Suspense>
            </div>
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </PageTransition>
  );
};

export default Tournaments;
