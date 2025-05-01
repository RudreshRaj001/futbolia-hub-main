import React from 'react';
import { cn } from '@/lib/utils';
import { StandingsTeam } from '../TournamentStandings';

interface TeamRowProps {
  team: StandingsTeam;
  highlightTop?: number;
  highlightBottom?: number;
  hasGroup?: boolean;
  onTeamClick?: (teamId: string | number | undefined) => void;
}

const TeamRow: React.FC<TeamRowProps> = ({ 
  team, 
  highlightTop = 4, 
  highlightBottom = -1,
  hasGroup = false,
  onTeamClick
}) => {
  const isTopTeam = team.position <= highlightTop;
  const isBottomTeam = highlightBottom > 0 && team.position >= highlightBottom;
  
  const handleClick = () => {
    
    if (onTeamClick && team.id) {
      onTeamClick(team.id);
    }
  };

  return (
    <tr 
      className={cn(
        "hover:bg-gray-100 dark:hover:bg-gray-800/40 transition-colors cursor-pointer",
        isTopTeam && "bg-green-50 dark:bg-green-900/20",
        isBottomTeam && "bg-red-50 dark:bg-red-900/20"
      )}
      onClick={handleClick}
    >
      <td className="px-3 py-2 text-center whitespace-nowrap">
        <div className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mx-auto",
          "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
          isTopTeam && "bg-green-500 text-white",
          isBottomTeam && "bg-red-500 text-white"
        )}>
          {team.position}
        </div>
      </td>
      
      <td className="px-3 py-2">
        <div className="flex items-center space-x-2">
          {team.logo && (
            <div className="w-6 h-6 flex-shrink-0">
              <img 
                src={team.logo} 
                alt={team.name} 
                className="w-6 h-6 object-contain"
              />
            </div>
          )}
          <span className="font-medium text-sm">{team.name}</span>
        </div>
      </td>
      
      <td className="px-3 py-2 text-center">
        <div className={cn(
          "w-6 h-6 rounded-full mx-auto flex items-center justify-center text-xs font-bold",
          "bg-blue-900 text-white"
        )}>
          {team.points}
        </div>
      </td>
      
      <td className="px-3 py-2 text-center">{team.played}</td>
      <td className="px-3 py-2 text-center">{team.won}</td>
      <td className="px-3 py-2 text-center">{team.drawn}</td>
      <td className="px-3 py-2 text-center">{team.lost}</td>
      <td className="px-3 py-2 text-center">{team.goalsFor}</td>
      <td className="px-3 py-2 text-center">{team.goalsAgainst}</td>
      <td className="px-3 py-2 text-center font-medium">
        {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
      </td>
    </tr>
  );
};

export default TeamRow;
