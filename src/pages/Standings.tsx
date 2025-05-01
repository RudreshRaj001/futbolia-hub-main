import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
import StandingsTable from '@/components/standings/StandingsTable';
import Advertisement from '@/components/ads/Advertisement';
import { PageTransition } from '@/utils/animations';
import { competitions } from '@/data';
import { cn } from '@/lib/utils';

const Standings: React.FC = () => {
  const [selectedLeagueId, setSelectedLeagueId] = useState<number>(242); // Default to Serie A
  const [selectedCompetitionName, setSelectedCompetitionName] = useState<string>("Serie A");

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Function to handle tab click
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-4">
                  Tabla de Posiciones - {selectedCompetitionName}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
                  Consulta la clasificación actualizada de la {selectedCompetitionName}.
                </p>
              </div>
            </div>
          </section>

          {/* Banner Ad */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Advertisement size="banner" />
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                {/* Competition Tabs */}
                <div className="mb-8 overflow-x-auto">
                  <div className="flex space-x-2 pb-2 min-w-max">
                    {competitions.map((competition, index) => (
                      <div
                        key={competition.id}
                        onClick={() => handleTabClick(competition.id, competition.name)} // Handle tab click
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
                <StandingsTable leagueId={selectedLeagueId} season={2025} />
              </div>
              
              {/* Sidebar - 1/4 width on desktop */}
              <div className="lg:col-span-1">
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

export default Standings;
