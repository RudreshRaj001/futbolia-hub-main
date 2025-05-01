
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import PlayersList from '../players/PlayersList';
import PlayersStats from '../players/PlayersStats';
import TeamStats from '../team/TeamStats';
import TeamCompare from '../team/TeamCompare';
import { PlayerInfo } from '../types';
import { TeamStats as TeamStatsType } from '../mockPlayersData';
import TabsList from './tabs/TabsList';
import ResultsTab from './tabs/ResultsTab';
import PositionsTab from './tabs/PositionsTab';
import ScorersTab from './tabs/ScorersTab';

interface TeamDetailTabsProps {
  team: any;
  players: PlayerInfo[];
  stats: TeamStatsType | null;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TeamDetailTabs: React.FC<TeamDetailTabsProps> = ({ 
  team, 
  players, 
  stats,
  activeTab,
  onTabChange
}) => {
  return (
    <Tabs defaultValue={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList activeTab={activeTab} />

      <TabsContent value="planteles" className="p-0">
        <PlayersList 
          players={players} 
          teamLogo={team.logo} 
          teamName={team.name} 
        />
      </TabsContent>
      
      <TabsContent value="jugadores" className="p-0">
        <PlayersStats
          players={players}
          teamName={team.name}
          teamLogo={team.logo}
        />
      </TabsContent>
      
      <TabsContent value="equipos" className="p-0">
        <TeamStats
          team={team}
          stats={stats}
        />
      </TabsContent>
      
      <TabsContent value="comparativa" className="p-0">
        <TeamCompare />
      </TabsContent>
      
      <TabsContent value="resultados">
        <ResultsTab team={team} />
      </TabsContent>
      
      <TabsContent value="posiciones">
        <PositionsTab team={team} />
      </TabsContent>
      
      <TabsContent value="goleadores">
        <ScorersTab team={team} players={players} />
      </TabsContent>
    </Tabs>
  );
};

export default TeamDetailTabs;
