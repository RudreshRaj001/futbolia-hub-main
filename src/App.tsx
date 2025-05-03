import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AnimatePresence } from 'framer-motion';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

// Lazy-loading HOC
import LazyLoadingHOC, { preloadComponent } from '@/components/LazyLoadingHOC';
import Navbar from './components/layout/Navbar';
import Footer from "@/components/layout/Footer";

// Simple loading component for route transitions
const RouteChangeLoader = () => <div className="h-1 bg-primary animate-pulse fixed top-0 left-0 right-0 z-50"></div>;

// Preload critical components for faster initial load
preloadComponent(() => import('./pages/Home'));
preloadComponent(() => import('@/components/home/FeaturedAllNews'));
preloadComponent(() => import('@/components/calendar/CalendarPage'));

// Group components by section for better code-splitting
const HomePageComponents = {
  Home: LazyLoadingHOC(() => import('./pages/Home'), null, { preload: true }),
  FeaturedAllNews: LazyLoadingHOC(() => import('@/components/home/FeaturedAllNews'), null, { preload: true }),
  InformationPage: LazyLoadingHOC(() => import('./pages/InformationPage'), null, { useLightFallback: true }),
};

// League components
const LeagueComponents = {  
  SerieA: LazyLoadingHOC(() => import('./pages/SerieA'), null, { useLightFallback: true }),
  SerieB: LazyLoadingHOC(() => import('./pages/SerieB'), null, { useLightFallback: true }),
  Standings: LazyLoadingHOC(() => import('./pages/Standings'), null, { useLightFallback: true }),
  TopScorersPage: LazyLoadingHOC(() => import('./pages/TopScorersPage'), null, { useLightFallback: true }),
};

// Cup components
const CupComponents = {
  Libertadores: LazyLoadingHOC(() => import('./pages/Libertadores'), null, { useLightFallback: true }),
  Sudamericana: LazyLoadingHOC(() => import('./pages/Sudamericana'), null, { useLightFallback: true }),
  Tournaments: LazyLoadingHOC(() => import('./pages/Tournaments'), null, { useLightFallback: true }),
  TournamentPage: LazyLoadingHOC(() => import('./pages/TournamentPage'), null, { useLightFallback: true }),
  LibertadoresCalendar: LazyLoadingHOC(() => import('./pages/LibertadoresCalendar'), null, { useLightFallback: true }),
  SudamericanaCalendar: LazyLoadingHOC(() => import('./pages/SudamericanaCalendar'), null, { useLightFallback: true }),
};

// International components
const InternationalComponents = {
  NationalTeam: LazyLoadingHOC(() => import('./pages/NationalTeam'), null, { useLightFallback: true }),
  Qualifiers: LazyLoadingHOC(() => import('./pages/Qualifiers'), null, { useLightFallback: true }),
  International: LazyLoadingHOC(() => import('./pages/International'), null, { useLightFallback: true }),
  Abroad: LazyLoadingHOC(() => import('./pages/Abroad'), null, { useLightFallback: true }),
};

// Detail components
const DetailComponents = {
  Noticias: LazyLoadingHOC(() => import('@/components/noticias/Noticias'), null, { useLightFallback: true }),
  TeamDetailPage: LazyLoadingHOC(() => import('./pages/team-detail/TeamDetailPage'), null, { useLightFallback: true }),
  PlayerDetail: LazyLoadingHOC(() => import('./pages/PlayerDetail'), null, { useLightFallback: true }),
  MatchDetail: LazyLoadingHOC(() => import('./pages/MatchDetail'), null, { useLightFallback: true }),
};

// Other components
const OtherComponents = {
  Signings: LazyLoadingHOC(() => import('./pages/Signings'), null, { useLightFallback: true }),
  Teams: LazyLoadingHOC(() => import('./pages/Teams'), null, { useLightFallback: true }),
  CalendarPage: LazyLoadingHOC(() => import('@/components/calendar/CalendarPage'), null, { preload: true }),
  FootballDashboard: LazyLoadingHOC(() => import('./pages/FootballDashboard'), null, { useLightFallback: true }),
  NotFound: LazyLoadingHOC(() => import('./pages/NotFound'), null, { useLightFallback: true }),
};

// Create a new QueryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 600000, // 10 minutes
      cacheTime: 900000, // 15 minutes
      retry: 1, // Reduce retries to improve performance
      refetchOnReconnect: false // Disable refetching on reconnect
    },
  },
});

// Route change observer
const RouteChangeObserver = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Prefetch data for next likely routes based on current route
    const prefetchRouteData = async () => {
      const currentPath = location.pathname;
      
      // Preload related components based on current route
      if (currentPath === '/' || currentPath === '/home') {
        preloadComponent(() => import('./pages/SerieA'));
        preloadComponent(() => import('@/components/noticias/Noticias'));
      }
      else if (currentPath.includes('/serie-a')) {
        preloadComponent(() => import('./pages/Standings'));
        preloadComponent(() => import('./pages/TopScorersPage'));
      }
    };
    
    // Start prefetching without blocking
    prefetchRouteData();
  }, [location]);
  
  return null;
};

const App: React.FC = () => (
  <ReduxProvider store={store}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Navbar />
      <Suspense fallback={<RouteChangeLoader />}>
        <AnimatePresence mode="wait">
          <Toaster />
          <QueryClientProvider client={queryClient}>
            <RouteChangeObserver />
            <Routes>
              <Route path="/" element={<HomePageComponents.Home />} />
              <Route path="/home" element={<HomePageComponents.Home />} />
              <Route path="/serie-a" element={<LeagueComponents.SerieA />} />
              <Route
                path="/calendario"
                element={
                  <OtherComponents.CalendarPage
                    title="Liga Pro"
                    defaultCompetition="Liga Pro"
                    competitions={['Liga Pro','Serie B','Libertadores','Sudamericana']}
                  />
                }
              />
              <Route path="/serie-b" element={<LeagueComponents.SerieB />} />
              <Route path="/seleccion" element={<InternationalComponents.NationalTeam />} />
              <Route path="/eliminatorias" element={<InternationalComponents.Qualifiers />} />
              <Route path="/libertadores" element={<CupComponents.Libertadores />} />
              <Route path="/libertadores/calendario" element={<CupComponents.LibertadoresCalendar />} />
              <Route path="/sudamericana" element={<CupComponents.Sudamericana />} />
              <Route path="/sudamericana/calendario" element={<CupComponents.SudamericanaCalendar />} />
              <Route path="/internacional" element={<InternationalComponents.International />} />
              <Route path="/fichajes" element={<OtherComponents.Signings />} />
              <Route path="/noticias" element={<HomePageComponents.FeaturedAllNews />} />
              <Route path="/noticias/slug/:newsSlug" element={<DetailComponents.Noticias />} />
              <Route path="/extranjero" element={<InternationalComponents.Abroad />} />
              <Route path="/equipos" element={<OtherComponents.Teams />} />
              <Route path="/equipos/:teamId" element={<DetailComponents.TeamDetailPage />} />
              <Route path="/jugadores/:playerId" element={<DetailComponents.PlayerDetail />} />
              <Route path="/partidos/:matchId" element={<DetailComponents.MatchDetail />} />
              <Route path="/copas" element={<CupComponents.Tournaments />} />
              <Route path="/posiciones" element={<LeagueComponents.Standings />} />
              <Route path="/goleadores" element={<LeagueComponents.TopScorersPage />} />
              <Route path="/informacion" element={<HomePageComponents.InformationPage />} />
              <Route path="/informacion/:page" element={<HomePageComponents.InformationPage />} />
              <Route path="/nosotros" element={<HomePageComponents.InformationPage pageId="nosotros" />} />
              <Route path="/contacto" element={<HomePageComponents.InformationPage pageId="contacto" />} />
              <Route path="/privacidad" element={<HomePageComponents.InformationPage pageId="privacidad" />} />
              <Route path="/terminos" element={<HomePageComponents.InformationPage pageId="terminos" />} />
              <Route path="/publicidad" element={<HomePageComponents.InformationPage pageId="publicidad" />} />
              <Route path="/torneos" element={<CupComponents.Tournaments />} />
              <Route path="/torneos/:tournamentId" element={<CupComponents.TournamentPage />} />
              <Route path="/torneos/:tournamentId/:section" element={<CupComponents.TournamentPage />} />
              <Route path="/football" element={<OtherComponents.FootballDashboard />} />
              <Route path="*" element={<OtherComponents.NotFound />} />
            </Routes>
          </QueryClientProvider>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </ThemeProvider>
  </ReduxProvider>
);

export default App;
