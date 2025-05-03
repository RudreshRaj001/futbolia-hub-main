import React, { useEffect, lazy, Suspense, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AnimatePresence } from 'framer-motion';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

// Layouts - these are critical for initial render
import Navbar from './components/layout/Navbar';
import Footer from "@/components/layout/Footer";

// Lazy-loading HOC
import LazyLoadingHOC from '@/components/LazyLoadingHOC';
import { preloadCriticalImages } from '@/utils/imageOptimizer';

// Create a more efficient queryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
    },
  },
});

// Throttle concurrent updates for better performance
// Uses React 18 features to prioritize critical rendering
const throttleConcurrentOperations = (ms = 5) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

// Lazy-loaded page components with prefetch option
const Home = LazyLoadingHOC(() => import('./pages/Home'), null, true); // Prefetch home component
const SerieA = LazyLoadingHOC(() => import('./pages/SerieA'));
const SerieB = LazyLoadingHOC(() => import('./pages/SerieB'));
const NationalTeam = LazyLoadingHOC(() => import('./pages/NationalTeam'));
const Qualifiers = LazyLoadingHOC(() => import('./pages/Qualifiers'));
const Libertadores = LazyLoadingHOC(() => import('./pages/Libertadores'));
const Sudamericana = LazyLoadingHOC(() => import('./pages/Sudamericana'));
const International = LazyLoadingHOC(() => import('./pages/International'));
const Signings = LazyLoadingHOC(() => import('./pages/Signings'));
const Noticias = LazyLoadingHOC(() => import('@/components/noticias/Noticias'));
const FeaturedAllNews = LazyLoadingHOC(() => import('@/components/home/FeaturedAllNews'));
const Abroad = LazyLoadingHOC(() => import('./pages/Abroad'));
const Teams = LazyLoadingHOC(() => import('./pages/Teams'));
const TeamDetailPage = LazyLoadingHOC(() => import('./pages/team-detail/TeamDetailPage'));
const PlayerDetail = LazyLoadingHOC(() => import('./pages/PlayerDetail'));
const MatchDetail = LazyLoadingHOC(() => import('./pages/MatchDetail'));
const Tournaments = LazyLoadingHOC(() => import('./pages/Tournaments'));
const Standings = LazyLoadingHOC(() => import('./pages/Standings'));
const TopScorersPage = LazyLoadingHOC(() => import('./pages/TopScorersPage'));
const InformationPage = LazyLoadingHOC(() => import('./pages/InformationPage'));
const NotFound = LazyLoadingHOC(() => import('./pages/NotFound'));

// Calendar pages
const CalendarPage = LazyLoadingHOC(() => import('@/components/calendar/CalendarPage'));
const LibertadoresCalendar = LazyLoadingHOC(() => import('./pages/LibertadoresCalendar'));
const SudamericanaCalendar = LazyLoadingHOC(() => import('./pages/SudamericanaCalendar'));

// Tournament page component
const TournamentPage = LazyLoadingHOC(() => import('./pages/TournamentPage'));

// Football Dashboard
const FootballDashboard = LazyLoadingHOC(() => import('./pages/FootballDashboard'));

// Prefetch detector component to preload routes based on navigation
const PrefetchDetector: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // When user navigates to a specific section, preload related pages
    const path = location.pathname;
    
    // Preload based on current path
    if (path === '/') {
      // When on home, preload most common navigation targets
      LazyLoadingHOC.preload(() => import('./pages/SerieA'));
      LazyLoadingHOC.preload(() => import('@/components/home/FeaturedAllNews'));
      
      // Preload critical images for home page
      preloadCriticalImages([
        '/logo192.png',
        // Add other critical images here
      ]);
    } else if (path.includes('/serie-a')) {
      // Preload related Serie A content
      LazyLoadingHOC.preload(() => import('./pages/Standings'));
      LazyLoadingHOC.preload(() => import('./pages/TopScorersPage'));
    } else if (path.includes('/equipos')) {
      // Preload team details when browsing teams
      LazyLoadingHOC.preload(() => import('./pages/team-detail/TeamDetailPage'));
    } else if (path.includes('/noticias')) {
      // Preload news content
      LazyLoadingHOC.preload(() => import('@/components/noticias/Noticias'));
    }
    
    // Schedule work during idle times
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        // Preload secondary elements during idle time
        if (path === '/') {
          LazyLoadingHOC.preload(() => import('./pages/Tournaments'));
        }
      }, { timeout: 2000 });
    }
  }, [location]);
  
  return null;
};

// Component to delay non-critical UI until after main content is loaded
const DelayedUIComponent: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Delay rendering of non-critical UI
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!visible) {
    return null;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Mark app as fully loaded and remove loading indicator
    window.addEventListener('load', () => {
      throttleConcurrentOperations().then(() => setIsLoaded(true));
      document.querySelector('.app-loading')?.remove();
    });
    
    // Monitor for long tasks that might cause jank
    if (process.env.NODE_ENV === 'development') {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // Long task threshold
            console.warn(`Long task detected: ${entry.duration}ms`);
          }
        }
      });
      
      observer.observe({ entryTypes: ['longtask'] });
      return () => observer.disconnect();
    }
  }, []);
  
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Navbar />
          <PrefetchDetector />
          <AnimatePresence mode="wait">
            <Toaster />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/serie-a" element={<SerieA />} />
              <Route
                path="/calendario"
                element={
                  <CalendarPage
                    title="Liga Pro"
                    defaultCompetition="Liga Pro"
                    competitions={['Liga Pro','Serie B','Libertadores','Sudamericana']}
                  />
                }
              />
              <Route path="/serie-b" element={<SerieB />} />
              <Route path="/seleccion" element={<NationalTeam />} />
              <Route path="/eliminatorias" element={<Qualifiers />} />
              <Route path="/libertadores" element={<Libertadores />} />
              <Route path="/libertadores/calendario" element={<LibertadoresCalendar />} />
              <Route path="/sudamericana" element={<Sudamericana />} />
              <Route path="/sudamericana/calendario" element={<SudamericanaCalendar />} />
              <Route path="/internacional" element={<International />} />
              <Route path="/fichajes" element={<Signings />} />
              <Route path="/noticias" element={<FeaturedAllNews />} />
              <Route path="/noticias/slug/:newsSlug" element={<Noticias />} />
              <Route path="/extranjero" element={<Abroad />} />
              <Route path="/equipos" element={<Teams />} />
              <Route path="/equipos/:teamId" element={<TeamDetailPage />} />
              <Route path="/jugadores/:playerId" element={<PlayerDetail />} />
              <Route path="/partidos/:matchId" element={<MatchDetail />} />
              <Route path="/copas" element={<Tournaments />} />
              <Route path="/posiciones" element={<Standings />} />
              <Route path="/goleadores" element={<TopScorersPage />} />
              <Route path="/informacion" element={<InformationPage />} />
              <Route path="/informacion/:page" element={<InformationPage />} />
              <Route path="/nosotros" element={<InformationPage pageId="nosotros" />} />
              <Route path="/contacto" element={<InformationPage pageId="contacto" />} />
              <Route path="/privacidad" element={<InformationPage pageId="privacidad" />} />
              <Route path="/terminos" element={<InformationPage pageId="terminos" />} />
              <Route path="/publicidad" element={<InformationPage pageId="publicidad" />} />
              <Route path="/torneos" element={<Tournaments />} />
              <Route path="/torneos/:tournamentId" element={<TournamentPage />} />
              <Route path="/torneos/:tournamentId/:section" element={<TournamentPage />} />
              <Route path="/football" element={<FootballDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
          <DelayedUIComponent>
            <Footer />
          </DelayedUIComponent>
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default App;
