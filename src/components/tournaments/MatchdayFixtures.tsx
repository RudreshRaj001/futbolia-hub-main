import React from 'react';
import { Match } from './types';
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface MatchdayFixturesProps {
  matches: Match[];
}

const MatchdayFixtures: React.FC<any> = ({ matches }) => {
  // Group matches by date
  const matchesByDate: Record<string, any> = {};

  matches.forEach(match => {
    const dateKey = format(new Date(match.date), 'yyyy-MM-dd');
    if (!matchesByDate[dateKey]) {
      matchesByDate[dateKey] = [];
    }
    matchesByDate[dateKey].push(match);
  });

  const dateKeys = Object.keys(matchesByDate).sort();
  const navigate = useNavigate();

  const handleRowClick = (id: number | string) => {
    navigate(`/partidos/${id}`);
  };

  return (
    <div>
      {dateKeys.map(dateKey => (
        <div key={dateKey} className="mb-4">
          <div className="bg-gray-900 text-white p-2 uppercase text-sm font-bold">
            FECHA {matchesByDate[dateKey][0].matchday}
          </div>
          <Table>
            <TableBody>
              {matchesByDate[dateKey].map((match) => (
                <TableRow
                  key={match.id}
                  className="border-b border-gray-200 dark:border-gray-700 cursor-pointer"
                  onClick={() => handleRowClick(match.id)}
                >
                  {/* Home Team */}
                  <TableCell className="p-3 w-1/3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{match.homeTeam.name}</span>
                      <img
                        src={match.homeTeam.logo}
                        alt={match.homeTeam.name}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </TableCell>

                  {/* Center Cell with Time or Score */}
                  <TableCell className="p-3 text-center w-1/3">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center mb-1">
                        {match.status.toLowerCase() === "match finished" ? (
                          <>
                            <span className={`w-8 h-8 flex items-center justify-center rounded-full ${match.homeTeam.score > match.awayTeam.score ? 'bg-blue-600 text-white' : 'bg-gray-500 text-white'}`}>
                              {match.homeTeam.score}
                            </span>
                            <span className="mx-1">-</span>
                            <span className={`w-8 h-8 flex items-center justify-center rounded-full ${match.awayTeam.score > match.homeTeam.score ? 'bg-blue-600 text-white' : 'bg-gray-500 text-white'}`}>
                              {match.awayTeam.score}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm">{format(new Date(match.date), 'HH:mm')} hrs.</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {format(new Date(match.date), 'dd-M-yyyy')}
                      </div>
                      {match.status.toLowerCase() === "match finished" && (
                        <div className="text-xs font-medium mt-1 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                          FINALIZADO
                        </div>
                      )}
                    </div>
                  </TableCell>

                  {/* Away Team */}
                  <TableCell className="p-3 w-1/3">
                    <div className="flex items-center justify-between">
                      <img
                        src={match.awayTeam?.logo}
                        alt={match.awayTeam?.name}
                        className="w-8 h-8 object-contain"
                      />
                      <span className="text-sm font-medium">{match.awayTeam.name}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default MatchdayFixtures;
