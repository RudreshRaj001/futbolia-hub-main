
import React from 'react';
import { StandingsTeam } from '../TournamentStandings';
import { TournamentPhase } from '../types';
import TeamRow from './TeamRow';

interface TeamGroupTableProps {
  groupName: string;
  groupTeams: StandingsTeam[];
  selectedPhase: TournamentPhase;
  tournamentId: string;
  formatGroupName?: (name: string) => string;
  onTeamClick?: (teamId: string | undefined) => void;
}

const TeamGroupTable: React.FC<TeamGroupTableProps> = ({ 
  groupName, 
  groupTeams,
  selectedPhase,
  tournamentId,
  formatGroupName,
  onTeamClick
}) => {
  // Sort teams by position
  const sortedTeams = [...groupTeams].sort((a, b) => a.position - b.position);
  
  // Format group name if formatter is provided
  const formattedGroupName = formatGroupName ? formatGroupName(groupName) : groupName;
  
  // Should we show the group header?
  const showGroupHeader = groupName !== 'all';
  
  return (
    <div className="mb-6">
      {showGroupHeader && (
        <div className="bg-gray-800 text-white p-2 rounded-t-md">
          <h3 className="font-bold">{formattedGroupName}</h3>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400">
            <tr>
              <th className="px-3 py-2 text-center">N°</th>
              <th className="px-3 py-2">Equipo</th>
              <th className="px-3 py-2 text-center">Pts.</th>
              <th className="px-3 py-2 text-center">PJ</th>
              <th className="px-3 py-2 text-center">PG</th>
              <th className="px-3 py-2 text-center">PE</th>
              <th className="px-3 py-2 text-center">PP</th>
              <th className="px-3 py-2 text-center">GF</th>
              <th className="px-3 py-2 text-center">GC</th>
              <th className="px-3 py-2 text-center">Dif</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {sortedTeams?.map((team) => (
              <TeamRow 
                key={`${team.name}-${team.position}`} 
                team={team}
                onTeamClick={onTeamClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamGroupTable;
