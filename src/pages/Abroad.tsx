import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Advertisement from '@/components/ads/Advertisement';
import { PageTransition } from '@/utils/animations';
import FixtureCalendar from '@/components/calendar/FixtureCalendar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import NewsList from '@/components/abroad/NewsList';
import VideoSection from '@/components/abroad/VideoSection';
import StandingsTable from '@/components/abroad/StandingsTable';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchNews } from '@/store/slices/newsSlice';
import { fetchTournaments, fetchTournamentStandings } from '@/store/slices/tournamentsSlice';

const Abroad: React.FC = () => {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector((state) => state.tournaments.tournaments);
  const standings = useAppSelector((state) => state.tournaments.standings);
  const { news, status, error } = useAppSelector((state) => state.news);
  const [activeTab, setActiveTab] = useState<string>('242'); // Default tab (Liga Pro Serie A)
  const [season, setSeason] = useState<any>(2025); // Default season

  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchNews({ search: "abroad" }));
    dispatch(fetchTournaments());
  }, [dispatch]);

  useEffect(() => {
    if (activeTab) {
       dispatch(fetchTournamentStandings({ tournamentId: activeTab, season: season }))
    }
  }, [activeTab, dispatch]);

  // Map the API standings data to the expected TeamStanding format
  const mappedStandings = standings.map((team) => ({
    position: team.position,
    name: team.team.name,
    logo: team.team.logo,
    played: team.played,
    points: team.points,
    goalDiff: team.goalsDiff ,
    id: team.team.id,
  }));

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow pt-20">
          {/* Banner Ad */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Advertisement size="banner" />
          </div>

          {/* Page Header */}
          <div className="bg-primary text-white py-3 mb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-xl sm:text-2xl font-bold">Abroad</h1>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Content - 3/4 width on desktop */}
              <div className="lg:col-span-3">
                {status === "loading" && <p className="text-gray-500">Loading news...</p>}
                {status === "failed" && <p className="text-red-500">Error: {error}</p>}
                {status === "succeeded" && <NewsList news={news} />}
              </div>

              {/* Sidebar - 1/4 width on desktop */}
              <div className="lg:col-span-1 space-y-6">
                {/* Video Section */}
                <VideoSection
                  imageUrl="/lovable-uploads/dcb5d46b-94a1-45fa-905c-3fdc4939949d.png"
                  title="Video of the day"
                />

                {!isMobile && (
                  <Card>
                    {/* <CardHeader className="bg-gray-800 text-white py-3 px-4">
                      <h3 className="font-bold">Calendar</h3>
                    </CardHeader> */}
                    <CardContent className="p-0">
                    <FixtureCalendar className="h-full" />
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
                          onClick={() =>{
                            setActiveTab(tournament.id.toString())
                            setSeason(tournament.season); // Update the season based on the selected tournament
                          } }
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
                    <StandingsTable standings={mappedStandings} />
                  </CardContent>
                </Card>

                <Advertisement size="sidebar" />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Abroad;
