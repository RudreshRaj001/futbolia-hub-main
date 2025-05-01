
import React, { useState } from 'react';
import LeaguesList from '../components/leagues/LeaguesList';
import StandingsTable from '../components/standings/StandingsTable';
import FixturesList from '../components/fixtures/FixturesList';
import TeamStatistics from '../components/teamStats/TeamStatistics';
import PlayersList from '../components/players/PlayersList';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const FootballDashboard: React.FC = () => {
  // Define default values for demo purposes
  const [values] = useState({
    leagueId: 140, // Ecuador Serie A
    season: 2023,
    teamId: 1064, // LDU Quito
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-primary text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Football API Dashboard</h1>
          <p className="mt-2">Powered by Football API with Redux Toolkit</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="leagues" className="mb-8">
          <TabsList className="grid grid-cols-5 w-full mb-6">
            <TabsTrigger value="leagues">Leagues</TabsTrigger>
            <TabsTrigger value="standings">Standings</TabsTrigger>
            <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
            <TabsTrigger value="teamStats">Team Stats</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
          </TabsList>

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
        </Tabs>
      </main>
    </div>
  );
};

export default FootballDashboard;
