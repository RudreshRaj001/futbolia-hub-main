import React, { useState, lazy, Suspense } from 'react'; // ✅ Added lazy + Suspense for dynamic import
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// ✅ Lazy load heavy components to improve initial load time
const LeaguesList = lazy(() => import('../components/leagues/LeaguesList'));
const StandingsTable = lazy(() => import('../components/standings/StandingsTable'));
const FixturesList = lazy(() => import('../components/fixtures/FixturesList'));
const TeamStatistics = lazy(() => import('../components/teamStats/TeamStatistics'));
const PlayersList = lazy(() => import('../components/players/PlayersList'));

const FootballDashboard: React.FC = () => {
  // ✅ Defined static demo values for a specific team and season
  const [values] = useState({
    leagueId: 140,     // Ecuador Serie A
    season: 2023,
    teamId: 1064,      // LDU Quito
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* ✅ Header Section */}
      <header className="bg-primary text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Football API Dashboard</h1>
          <p className="mt-2">Powered by Football API with Redux Toolkit</p>
        </div>
      </header>

      {/* ✅ Tabs Container */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="leagues" className="mb-8">
          <TabsList className="grid grid-cols-5 w-full mb-6">
            <TabsTrigger value="leagues">Leagues</TabsTrigger>
            <TabsTrigger value="standings">Standings</TabsTrigger>
            <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
            <TabsTrigger value="teamStats">Team Stats</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
          </TabsList>

          {/* ✅ Wrapped lazy components in Suspense for fallback loading state */}
          <Suspense fallback={<div className="text-center py-6">Loading...</div>}>
            <TabsContent value="leagues">
              <LeaguesList />
            </TabsContent>

            <TabsContent value="standings">
              <StandingsTable leagueId={values.leagueId} season={values.season} />
            </TabsContent>

            <TabsContent value="fixtures">
              <FixturesList leagueId={values.leagueId} season={values.season} />
            </TabsContent>

            <TabsContent value="teamStats">
              <TeamStatistics 
                teamId={values.teamId} 
                leagueId={values.leagueId} 
                season={values.season} 
              />
            </TabsContent>

            <TabsContent value="players">
              <PlayersList teamId={values.teamId} season={values.season} />
            </TabsContent>
          </Suspense>
        </Tabs>
      </main>
    </div>
  );
};

export default FootballDashboard;
