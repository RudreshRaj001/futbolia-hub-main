import React, { useState, useEffect, lazy, Suspense } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
import { PageTransition } from '@/utils/animations';
import { competitions } from '@/data';
import { cn } from '@/lib/utils';

// ✅ Lazy-loaded components
const StandingsTable = lazy(() => import('@/components/standings/StandingsTable'));
const Advertisement = lazy(() => import('@/components/ads/Advertisement'));

const Standings: React.FC = () => {
  const [selectedLeagueId, setSelectedLeagueId] = useState<number>(242); // Default to Serie A
  const [selectedCompetitionName, setSelectedCompetitionName] = useState<string>('Serie A');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTabClick = (leagueId: number, competitionName: string) => {
    setSelectedLeagueId(leagueId);
    setSelectedCompetitionName(competitionName);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}
        <main className="flex-grow pt-20">
          {/* Header */}
          <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-900 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-4">
                Tabla de Posiciones - {selectedCompetitionName}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Consulta la clasificación actualizada de la {selectedCompetitionName}.
              </p>
            </div>
          </section>

          {/* Banner Ad */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Suspense fallback={<div className="text-center">Cargando anuncio...</div>}>
              <Advertisement size="banner" />
            </Suspense>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                {/* Competition Tabs */}
                <div className="mb-8 overflow-x-auto">
                  <div className="flex space-x-2 pb-2 min-w-max">
                    {competitions.map((competition) => (
                      <div
                        key={competition.id}
                        onClick={() => handleTabClick(competition.id, competition.name)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors",
                          selectedLeagueId === competition.id
                            ? "bg-primary text-white"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        )}
                      >
                        {competition.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Standings Table */}
                <Suspense fallback={<div className="text-center">Cargando tabla de posiciones...</div>}>
                  <StandingsTable leagueId={selectedLeagueId} season={2025} />
                </Suspense>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Suspense fallback={<div className="text-center">Cargando anuncio...</div>}>
                  <Advertisement size="sidebar" />
                </Suspense>
              </div>
            </div>
          </div>
        </main>

        {/* <Footer /> */}
      </div>
    </PageTransition>
  );
};

export default Standings;
