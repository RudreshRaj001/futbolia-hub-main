import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TeamOverviewContent from './TeamOverviewContent';
import TeamPlayersContent from './TeamPlayersContent';
import TeamMatchesContent from './TeamMatchesContent';
import TeamStatistics from '@/components/team-detail/TeamStatistics';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPlayersByTeam } from '@/store/slices/playersSlice';

interface TeamDetailTabsProps {
  team: any;
  teamNews: any[];
  teamMatches: any[];
  standings: any[];
}

const TeamDetailTabs: React.FC<TeamDetailTabsProps> = ({
  team,
  teamNews,
  teamMatches,
  standings
}) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.players);
  const [activeTab, setActiveTab] = useState('overview');
  const [hasLoadedPlayers, setHasLoadedPlayers] = useState(false);

  const currentSeason = new Date().getFullYear();
  const currentLeagueId = team.currentLeagueId || 242;

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'players' && !hasLoadedPlayers) {
      dispatch(fetchPlayersByTeam(team.id));
      setHasLoadedPlayers(true);
    }
  };

  return (
    <Tabs defaultValue="overview" className="w-full" onValueChange={handleTabChange}>
      {/* Responsive Tabs */}
      <TabsList className="flex flex-wrap justify-center w-full gap-2 mb-6 px-2">
        <TabsTrigger
          value="overview"
          className="flex-1 min-w-[140px] text-sm px-4 py-2 text-center"
        >
          Vista General
        </TabsTrigger>
        <TabsTrigger
          value="players"
          className="flex-1 min-w-[140px] text-sm px-4 py-2 text-center"
        >
          Jugadores
        </TabsTrigger>
        <TabsTrigger
          value="matches"
          className="flex-1 min-w-[140px] text-sm px-4 py-2 text-center"
        >
          Partidos
        </TabsTrigger>
        <TabsTrigger
          value="stats"
          className="flex-1 min-w-[140px] text-sm px-4 py-2 text-center"
        >
          Estadísticas
        </TabsTrigger>
      </TabsList>

      {/* Add margin-top to each tab content so it doesn't touch tabs */}
      <TabsContent value="overview" className="mt-8 px-2">
        <TeamOverviewContent 
          teamNews={teamNews} 
          teamMatches={teamMatches} 
          team={team} 
          standings={standings} 
        />
      </TabsContent>

      <TabsContent value="players" className="mt-10 px-2">
        {activeTab === 'players' && (
          loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">Loading players...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500 dark:text-red-400">{error}</p>
            </div>
          ) : (
            <TeamPlayersContent team={team} />
          )
        )}
      </TabsContent>

      <TabsContent value="matches" className="mt-10 px-2">
        <TeamMatchesContent teamMatches={teamMatches} />
      </TabsContent>

      <TabsContent value="stats" className="mt-10 px-2">
        <TeamStatistics 
          teamId={team.id}
          season={currentSeason}
          leagueId={currentLeagueId}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TeamDetailTabs;
