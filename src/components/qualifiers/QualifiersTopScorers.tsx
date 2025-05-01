import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTopScorers } from '@/store/slices/tournamentsSlice';
import { useNavigate } from 'react-router-dom';

const QualifiersTopScorers: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { topScorers: apiScorers, loading, error } = useAppSelector(
    (state) => state.tournaments
  );

  // Dynamically obtain the current season (year)
  const currentSeason = new Date().getFullYear();

  // Extract league name from the first scorer's statistics (if available)
  const leagueName =
    apiScorers && apiScorers.length > 0
      ? apiScorers[0].statistics[0]?.league?.name || ''
      : '';

  useEffect(() => {
    // Replace '242' with your tournament ID if needed.
    // dispatch(fetchTopScorers('242'));
    dispatch(fetchTopScorers({ tournamentId: "242", season: 2025 }));
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error || 'Failed to load top scorers'} />;
  }

  if (!apiScorers || apiScorers.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-sm p-4 text-center">
        <h2 className="text-xl font-bold">
          {currentSeason} {leagueName} Top Scorers
        </h2>
        <p className="text-gray-500 dark:text-gray-300">
          No top scorers available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-sm">
      <div className="bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold">
          {currentSeason} {leagueName} Top Scorers
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-100 dark:bg-gray-700">
            <TableRow>
              <TableHead className="w-1/2 text-gray-700 dark:text-gray-200">
                Jugador
              </TableHead>
              <TableHead className="text-center text-gray-700 dark:text-gray-200">
                Equipo
              </TableHead>
              <TableHead className="text-center text-gray-700 dark:text-gray-200">
                Goles
              </TableHead>
              <TableHead className="text-center text-gray-700 dark:text-gray-200">
                Shots On
              </TableHead>
              <TableHead className="text-center text-gray-700 dark:text-gray-200">
                Assists
              </TableHead>
              <TableHead className="text-center text-gray-700 dark:text-gray-200">
                Key Passes
              </TableHead>
              <TableHead className="text-center text-gray-700 dark:text-gray-200">
                Rating
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiScorers.map((scorer) => {
              const player = scorer.player;
              const stats = scorer.statistics[0]; // assuming one statistics entry per player
              const team = stats.team;
              const goals = stats.goals.total;
              const shotsOn = stats.shots.on;
              const assists = stats.goals.assists;
              const keyPasses = stats.passes.key;
              const rating = stats.games.rating;

              return (
                <TableRow key={player.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  {/* Player cell: click to navigate to /jugadores/:playerId */}
                  <TableCell
                    className="flex items-center space-x-2 text-gray-900 dark:text-white cursor-pointer"
                    onClick={() => navigate(`/jugadores/${player.id}`)}
                  >
                    <img
                      src={player.photo || '/placeholder.svg'}
                      alt={player.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span>{player.name}</span>
                  </TableCell>

                  {/* Team cell: click to navigate to /equipos/:teamId */}
                  <TableCell
                    className="text-center cursor-pointer"
                    onClick={() => navigate(`/equipos/${team.id}`)}
                  >
                    <div className="flex items-center justify-center">
                      <img
                        src={team.logo || '/placeholder.svg'}
                        alt={team.name}
                        className="w-6 h-6 object-contain"
                      />
                      <span className="ml-2">{team.name}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-900 dark:bg-gray-700 text-white rounded-full font-bold text-sm">
                      {goals}
                    </span>
                  </TableCell>
                  <TableCell className="text-center text-gray-800 dark:text-gray-200">
                    {shotsOn}
                  </TableCell>
                  <TableCell className="text-center text-gray-800 dark:text-gray-200">
                    {assists}
                  </TableCell>
                  <TableCell className="text-center text-gray-800 dark:text-gray-200">
                    {keyPasses}
                  </TableCell>
                  <TableCell className="text-center text-gray-800 dark:text-gray-200">
                    {rating}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default QualifiersTopScorers;
