
import React from 'react';
import { cn } from '@/lib/utils';

export interface MatchCardProps {
  homeTeam: {
    name: string;
    code: string;
    score?: number;
    logo: string;
  };
  awayTeam: {
    name: string;
    code: string;
    score?: number;
    logo: string;
  };
  matchTime?: string;
  matchDate?: string;
  isFinished?: boolean;
  isLive?: boolean;
  tournament?: string;
  onHomeTeamClick?: () => void;
  onAwayTeamClick?: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({
  homeTeam,
  awayTeam,
  matchTime,
  matchDate,
  isFinished = false,
  isLive = false,
  tournament,
  onHomeTeamClick,
  onAwayTeamClick
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden h-full">
      {/* Tournament Name */}
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-300 font-medium truncate block">
          {tournament || "Liga Pro Serie A"}
        </span>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Match Status */}
        <div className="flex justify-between items-center mb-4">
          <div className={cn(
            "px-2 py-1 text-xs font-semibold rounded-full",
            isFinished 
              ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300" 
              : isLive 
                ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
          )}>
            {isFinished ? "Finalizado" : isLive ? "EN VIVO" : matchTime || "Próximamente"}
          </div>
          
          {!isFinished && !isLive && (
  <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
    {matchDate ? matchDate : "Fecha no disponible"}
  </div>
)}
        </div>

        {/* Teams */}
        <div className="flex justify-between items-center">
          {/* Home Team */}
          <div 
            className="flex flex-col items-center w-2/5 cursor-pointer"
            onClick={onHomeTeamClick}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <img 
                src={homeTeam.logo} 
                alt={homeTeam.name} 
                className="max-w-full max-h-full" 
              />
            </div>
            <div className="text-sm font-medium text-center">{homeTeam.name}</div>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center w-1/5">
            {(isFinished || isLive) && (
              <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 min-w-[60px]">
                <span className="text-xl font-bold">{homeTeam.score || 0}</span>
                <span className="mx-1 text-gray-400">-</span>
                <span className="text-xl font-bold">{awayTeam.score || 0}</span>
              </div>
            )}
            {(!isFinished && !isLive) && (
              <div className="flex items-center justify-center rounded-lg px-4 py-2">
                <span className="text-xl font-bold">VS</span>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div 
            className="flex flex-col items-center w-2/5 cursor-pointer"
            onClick={onAwayTeamClick}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <img 
                src={awayTeam.logo} 
                alt={awayTeam.name} 
                className="max-w-full max-h-full" 
              />
            </div>
            <div className="text-sm font-medium text-center">{awayTeam.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
