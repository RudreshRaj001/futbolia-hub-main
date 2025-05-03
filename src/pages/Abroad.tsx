import React, { useEffect, useState, lazy, Suspense } from 'react';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
import Advertisement from '@/components/ads/Advertisement';
import { PageTransition } from '@/utils/animations';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchNews } from '@/store/slices/newsSlice';
import { fetchTournaments, fetchTournamentStandings } from '@/store/slices/tournamentsSlice';

// ✅ Lazy-loaded components for performance
const NewsList = lazy(() => import('@/components/abroad/NewsList'));
const VideoSection = lazy(() => import('@/components/abroad/VideoSection'));
const FixtureCalendar = lazy(() => import('@/components/calendar/FixtureCalendar'));
const StandingsTable = lazy(() => import('@/components/abroad/StandingsTable'));

const Abroad: React.FC = () => {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector((state) => state.tournaments.tournaments);
  const standings = useAppSelector((state) => state.tournaments.standings);
  const { news, status, error } = useAppSelector((state) => state.news);
  const [activeTab, setActiveTab] = useState<string>('242');
  const [season, setSeason] = useState<number>(2025);

  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchNews({ search: "abroad" }));
    dispatch(fetchTournaments());
  }, [dispatch]);

  useEffect(() => {
    if (activeTab && season) {
      dispatch(fetchTournamentStandings({ tournamentId: activeTab, season }));
    }
  }, [activeTab, season, dispatch]);

  const mappedStandings = standings.map((team) => ({
    position: team.position,
    name: team.team.name,
    logo: team.team.logo,
    played: team.played,
    points: team.points,
    goalDiff: team.goalsDiff,
    id: team.team.id,
  }));

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}

        <main className="flex-grow pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Advertisement size="banner" />
          </div>

          <div className="bg-primary text-white py-3 mb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-xl sm:text-2xl font-bold">Abroad</h1>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* Main Content */}
              <div className="lg:col-span-3">
                {status === "loading" && <p className="text-gray-500">Loading news...</p>}
                {status === "failed" && <p className="text-red-500">Error: {error}</p>}
                {status === "succeeded" && (
                  <Suspense fallback={<div>Cargando noticias...</div>}>
                    <NewsList news={news} />
                  </Suspense>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <Suspense fallback={<div>Loading video...</div>}>
                  <VideoSection
                    imageUrl="/lovable-uploads/dcb5d46b-94a1-45fa-905c-3fdc4939949d.png"
                    title="Video of the day"
                  />
                </Suspense>

                {!isMobile && (
                  <Card>
                    <CardContent className="p-0">
                      <Suspense fallback={<div className="p-4">Loading calendar...</div>}>
                        <FixtureCalendar className="h-full" />
                      </Suspense>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader className="bg-gray-800 text-white py-3 px-4">
                    <h3 className="font-bold">Tabla de posiciones</h3>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex space-x-2 py-2 overflow-x-auto scrollbar-hide">
                      {tournaments.map((tournament) => (
                        <button
                          key={tournament.id}
                          onClick={() => {
                            setActiveTab(tournament.id.toString());
                            setSeason(tournament.season);
                          }}
                          className={`${
                            activeTab === tournament.id.toString()
                              ? 'bg-primary text-white'
                              : 'bg-gray-200 text-gray-800'
                          } px-3 py-1.5 rounded-full text-xs whitespace-nowrap`}
                        >
                          {tournament.name}
                        </button>
                      ))}
                    </div>
                    <Suspense fallback={<div className="p-4">Loading standings...</div>}>
                      <StandingsTable standings={mappedStandings} />
                    </Suspense>
                  </CardContent>
                </Card>

                <Advertisement size="sidebar" />
              </div>
            </div>
          </div>
        </main>

        {/* <Footer /> */}
      </div>
    </PageTransition>
  );
};

export default Abroad;
