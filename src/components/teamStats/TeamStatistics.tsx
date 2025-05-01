
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTeamStats } from '../../store/slices/teamStatsSlice';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';

interface TeamStatisticsProps {
  teamId: number;
  leagueId: number;
  season: number;
}

const TeamStatistics: React.FC<TeamStatisticsProps> = ({ teamId, leagueId, season }) => {
  const dispatch = useAppDispatch();
  const { teamStats, status, error } = useAppSelector((state) => state.teamStats);

  useEffect(() => {
    // dispatch(fetchTeamStats({ team: teamId, league: leagueId, season }));
  }, [dispatch, teamId, leagueId, season]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return <ErrorMessage message={error || 'Failed to load team statistics'} />;
  }

  if (!teamStats) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No team statistics available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <img 
              src={teamStats.team.logo || '/placeholder.svg'} 
              alt={teamStats.team.name} 
              className="w-16 h-16 object-contain mr-4" 
            />
            <div>
              <h2 className="text-2xl font-bold">{teamStats.team.name}</h2>
              <div className="flex items-center mt-1">
                <img 
                  src={teamStats.league.logo || '/placeholder.svg'} 
                  alt={teamStats.league.name} 
                  className="w-6 h-6 mr-2" 
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {teamStats.league.name} - {teamStats.league.season}
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Recent Form</h3>
            <div className="flex space-x-1">
              {teamStats.form?.split('').map((result, index) => (
                <span 
                  key={index}
                  className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-md ${
                    result === 'W' ? 'bg-green-500 text-white' : 
                    result === 'L' ? 'bg-red-500 text-white' : 
                    result === 'D' ? 'bg-gray-400 text-white' : 'bg-gray-200'
                  }`}
                >
                  {result}
                </span>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Overall</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">{teamStats.fixtures.wins.total}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Wins</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-600 dark:text-gray-400">{teamStats.fixtures.draws.total}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Draws</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600 dark:text-red-400">{teamStats.fixtures.loses.total}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Losses</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Home</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">{teamStats.fixtures.wins.home}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Wins</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-600 dark:text-gray-400">{teamStats.fixtures.draws.home}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Draws</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600 dark:text-red-400">{teamStats.fixtures.loses.home}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Losses</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Away</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">{teamStats.fixtures.wins.away}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Wins</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-600 dark:text-gray-400">{teamStats.fixtures.draws.away}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Draws</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600 dark:text-red-400">{teamStats.fixtures.loses.away}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Losses</div>
                </div>
              </div>
            </div>
          </div>

          {/* Goals */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Goals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">Goals Scored</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-xl font-bold">{teamStats.goals.for.total.total}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{teamStats.goals.for.total.home}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Home</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{teamStats.goals.for.total.away}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Away</div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm">Avg. per match: {teamStats.goals.for.average.total}</div>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">Goals Conceded</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-xl font-bold">{teamStats.goals.against.total.total}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{teamStats.goals.against.total.home}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Home</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{teamStats.goals.against.total.away}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Away</div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm">Avg. per match: {teamStats.goals.against.average.total}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Sheets & Failed to Score */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Clean Sheets</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">{teamStats.clean_sheet.total}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">{teamStats.clean_sheet.home}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Home</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">{teamStats.clean_sheet.away}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Away</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Failed to Score</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600 dark:text-red-400">{teamStats.failed_to_score.total}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600 dark:text-red-400">{teamStats.failed_to_score.home}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Home</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600 dark:text-red-400">{teamStats.failed_to_score.away}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Away</div>
                </div>
              </div>
            </div>
          </div>

          {/* Lineups */}
          {teamStats.lineups && teamStats.lineups.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Most Used Formations</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {teamStats.lineups.map((lineup, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold">{lineup.formation}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {lineup.played} {lineup.played === 1 ? 'match' : 'matches'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamStatistics;
