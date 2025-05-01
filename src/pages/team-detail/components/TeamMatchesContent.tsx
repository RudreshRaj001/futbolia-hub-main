import React from 'react';
import { Match } from '@/store/slices/leaguesSlice';
import { formatDate } from '@/utils';

interface TeamMatchesContentProps {
  teamMatches: Match[];
}

const TeamMatchesContent: React.FC<TeamMatchesContentProps> = ({ teamMatches }) => {
  if (!teamMatches || teamMatches.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No hay partidos disponibles.
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-4">
        {teamMatches.map((match, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Match Teams and Score */}
              <div className="flex flex-col sm:flex-row items-center sm:space-x-6 w-full sm:w-auto">
                {/* Home Team */}
                <div className="flex items-center justify-end sm:justify-start w-full sm:w-auto">
                  <span className="font-semibold text-sm sm:text-base">{match.homeTeam}</span>
                  {match.homeTeamLogo && (
                    <img
                      src={match.homeTeamLogo}
                      alt={match.homeTeam}
                      className="w-6 h-6 sm:w-8 sm:h-8 object-contain ml-2"
                    />
                  )}
                </div>

                {/* Score or Time */}
                <div className="text-center my-2 sm:my-0 px-2 sm:px-4 font-bold text-sm sm:text-base">
                  {match.status === 'FINISHED' ? (
                    <span className="text-gray-800 dark:text-gray-200">{match.score}</span>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400 text-xs">{formatDate(match.date)}</span>
                  )}
                </div>

                {/* Away Team */}
                <div className="flex items-center justify-start w-full sm:w-auto">
                  {match.awayTeamLogo && (
                    <img
                      src={match.awayTeamLogo}
                      alt={match.awayTeam}
                      className="w-6 h-6 sm:w-8 sm:h-8 object-contain mr-2"
                    />
                  )}
                  <span className="font-semibold text-sm sm:text-base">{match.awayTeam}</span>
                </div>
              </div>

              {/* Match Info */}
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center sm:text-right">
                <div>{match.competition}</div>
                <div>{match.venue}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMatchesContent;
