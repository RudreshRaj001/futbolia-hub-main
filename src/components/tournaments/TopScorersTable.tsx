import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TopScorer } from './mockTopScorersData';

interface TopScorersTableProps {
  scorers: TopScorer[];
}

const TopScorersTable: React.FC<any> = ({ scorers }) => {
  const navigate = useNavigate();

  // Determine which columns have any valid data
  const showTeam = scorers.some(s => !!s.statistics[0].team.name);
  const showGoals = scorers.some(s => s.statistics[0].goals.total != null);
  const showShots = scorers.some(s => s.statistics[0].shots.total != null);
  const showPosition = scorers.some(s => !!s.statistics[0].games.position);
  const showRating = scorers.some(s => !!s.statistics[0].games.rating);
  const showPenalty = scorers.some(s => s.statistics[0].penalty.scored != null);

  const handlePlayerClick = (playerId: number) => {
    navigate(`/jugadores/${playerId}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-900 text-white">
            <TableRow>
              <TableHead className="text-white w-1/3">Jugador</TableHead>
              {showTeam && <TableHead className="text-white w-1/5">Equipo</TableHead>}
              {showGoals && <TableHead className="text-white text-center">Goles</TableHead>}
              {showShots && <TableHead className="text-white text-center">Tiros</TableHead>}
              {showPosition && <TableHead className="text-white text-center">Posición</TableHead>}
              {showRating && <TableHead className="text-white text-center">Calificación</TableHead>}
              {showPenalty && <TableHead className="text-white text-center">Penal</TableHead>}
            </TableRow>
          </TableHeader>

          <TableBody>
            {scorers.map(scorer => (
              <TableRow
                key={scorer.player.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => handlePlayerClick(scorer.player.id)}
              >
                {/* Player column */}
                <TableCell className="font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center space-x-2">
                    {scorer.player.photo && (
                      <img
                        src={scorer.player.photo}
                        alt={scorer.player.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    <span>{scorer.player.name}</span>
                  </div>
                </TableCell>

                {/* Team column */}
                {showTeam && (
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    <div className="flex items-center space-x-2">
                      {scorer.statistics[0].team.logo && (
                        <img
                          src={scorer.statistics[0].team.logo}
                          alt={scorer.statistics[0].team.name}
                          className="w-6 h-6"
                        />
                      )}
                      <span>{scorer.statistics[0].team.name}</span>
                    </div>
                  </TableCell>
                )}

                {/* Goals */}
                {showGoals && (
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-900 dark:bg-gray-700 text-white rounded-full font-bold text-sm">
                      {scorer.statistics[0].goals.total ?? '-'}
                    </span>
                  </TableCell>
                )}

                {/* Shots */}
                {showShots && (
                  <TableCell className="text-center text-gray-800 dark:text-gray-200">
                    {scorer.statistics[0].shots.total ?? '-'}
                  </TableCell>
                )}

                {/* Position */}
                {showPosition && (
                  <TableCell className="text-center text-gray-800 dark:text-gray-200">
                    {scorer.statistics[0].games.position ?? '-'}
                  </TableCell>
                )}

                {/* Rating */}
                {showRating && (
                  <TableCell className="text-center text-gray-800 dark:text-gray-200">
                    {scorer.statistics[0].games.rating
                      ? parseFloat(scorer.statistics[0].games.rating).toFixed(2)
                      : '-'}
                  </TableCell>
                )}

                {/* Penalties */}
                {showPenalty && (
                  <TableCell className="text-center text-gray-800 dark:text-gray-200">
                    {scorer.statistics[0].penalty.scored ?? '-'}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TopScorersTable;
