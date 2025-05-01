import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AnimatePresence } from 'framer-motion';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

// Lazy-loading HOC
import LazyLoadingHOC from '@/components/LazyLoadingHOC';
import Navbar from './components/layout/Navbar';
import Footer from "@/components/layout/Footer";

// Lazy-loaded page components
const Home = LazyLoadingHOC(() => import('./pages/Home'));
const SerieA = LazyLoadingHOC(() => import('./pages/SerieA'));
const SerieB = LazyLoadingHOC(() => import('./pages/SerieB'));
const NationalTeam = LazyLoadingHOC(() => import('./pages/NationalTeam'));
const Qualifiers = LazyLoadingHOC(() => import('./pages/Qualifiers'));
const Libertadores = LazyLoadingHOC(() => import('./pages/Libertadores'));
const Sudamericana = LazyLoadingHOC(() => import('./pages/Sudamericana'));
const International = LazyLoadingHOC(() => import('./pages/International'));
const Signings = LazyLoadingHOC(() => import('./pages/Signings'));
// const News = LazyLoadingHOC(() => import('./pages/News'));
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
// const SerieACalendar = LazyLoadingHOC(() => import('./pages/SerieACalendar'));
// const SerieBCalendar = LazyLoadingHOC(() => import('./pages/SerieBCalendar'));
const LibertadoresCalendar = LazyLoadingHOC(() => import('./pages/LibertadoresCalendar'));
const SudamericanaCalendar = LazyLoadingHOC(() => import('./pages/SudamericanaCalendar'));

// Tournament page component
const TournamentPage = LazyLoadingHOC(() => import('./pages/TournamentPage'));

// Football Dashboard
const FootballDashboard = LazyLoadingHOC(() => import('./pages/FootballDashboard'));

const queryClient = new QueryClient();

const App: React.FC = () => (
  <ReduxProvider store={store}>
    <Navbar />
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AnimatePresence mode="wait">
        <Toaster />
        <QueryClientProvider client={queryClient}>
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
            {/* <Route path="/noticias/:newsId" element={<News />} /> */}
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
        </QueryClientProvider>
      </AnimatePresence>
    </ThemeProvider>
    <Footer />
  </ReduxProvider>
);

export default App;
