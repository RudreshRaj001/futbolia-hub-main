import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { fetchStandings } from '@/store/slices/standingsSlice';
import { useNavigate } from 'react-router-dom';

interface StandingsTableProps {
  leagueId: number;
  season: number;
}

const StandingsTable: React.FC<StandingsTableProps> = ({ leagueId, season }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { standings, status, error } = useAppSelector((state) => state.standings);

  useEffect(() => {
    dispatch(fetchStandings({ league: leagueId, season }));
  }, [dispatch, leagueId, season]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  // if (status === 'failed') {
  //   return <ErrorMessage message={error || 'Failed to load standings'} />;
  // }

  if (standings.length === 0 && status === 'succeeded') {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No hay estadísticas disponibles para este partido</p>
      </div>
    );
  }

  // Get the first standings data if available
  const standingsData = standings[0]?.league?.standings[0] || [];

  // Handle row click to navigate to /equipos/:teamId
  const handleRowClick = (teamId: number | string) => {
    navigate(`/equipos/${teamId}`);
  };

  return (
    <div className="container mx-auto p-4">
      {standings[0]?.league && (
        <div className="mb-4 flex items-center">
          <img 
            src={standings[0].league.logo || '/placeholder.svg'} 
            alt={standings[0].league.name} 
            className="w-10 h-10 mr-3" 
          />
          <div>
            <h2 className="text-2xl font-bold">{standings[0].league.name} - {standings[0].league.season}</h2>
            <div className="flex items-center mt-1">
              <img 
                src={standings[0].league.flag || '/placeholder.svg'} 
                alt={standings[0].league.country} 
                className="w-5 h-4 mr-2" 
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">{standings[0].league.country}</span>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">Pos</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-center">MP</TableHead>
              <TableHead className="text-center">W</TableHead>
              <TableHead className="text-center">D</TableHead>
              <TableHead className="text-center">L</TableHead>
              <TableHead className="text-center">GF</TableHead>
              <TableHead className="text-center">GA</TableHead>
              <TableHead className="text-center">GD</TableHead>
              <TableHead className="text-center">Pts</TableHead>
              <TableHead className="text-center w-24">Form</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standingsData.map((standing: any) => (
              <TableRow 
                key={standing.team.id}
                className="border-b border-gray-200 dark:border-gray-700 cursor-pointer"
                onClick={() => handleRowClick(standing.team.id)}
              >
                <TableCell className="text-center font-medium">{standing.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={standing.team.logo || '/placeholder.svg'} 
                      alt={standing.team.name} 
                      className="w-6 h-6" 
                    />
                    <span>{standing.team.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">{standing.all.played}</TableCell>
                <TableCell className="text-center">{standing.all.win}</TableCell>
                <TableCell className="text-center">{standing.all.draw}</TableCell>
                <TableCell className="text-center">{standing.all.lose}</TableCell>
                <TableCell className="text-center">{standing.all.goals.for}</TableCell>
                <TableCell className="text-center">{standing.all.goals.against}</TableCell>
                <TableCell className="text-center">{standing.goalsDiff}</TableCell>
                <TableCell className="text-center font-bold">{standing.points}</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center space-x-1">
                    {standing.form?.split('').map((result: string, index: number) => (
                      <span 
                        key={index}
                        className={`w-5 h-5 flex items-center justify-center text-xs font-medium rounded-sm ${
                          result === 'W' ? 'bg-green-500 text-white' : 
                          result === 'L' ? 'bg-red-500 text-white' : 
                          result === 'D' ? 'bg-gray-400 text-white' : 'bg-gray-200'
                        }`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StandingsTable;
