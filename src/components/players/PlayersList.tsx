import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import { fetchPlayersByTeam } from '@/store/slices/playersSlice';


interface PlayersListProps {
  teamId: number;
  season: number;
}

const PlayersList: React.FC<PlayersListProps> = ({ teamId, season }) => {
  const dispatch = useAppDispatch();
  const { players, loading, error } = useAppSelector((state) => state.players);
  const [activePosition, setActivePosition] = useState<string>('all');

  useEffect(() => {
    dispatch(fetchPlayersByTeam(teamId));
  }, [dispatch, teamId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error || 'Failed to load players'} />;
  }

  if (players.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No players data available.</p>
      </div>
    );
  }

  const positions = [...new Set(players.map(player => player.position).filter(Boolean))];

  const filteredPlayers = players.filter(player =>
    activePosition === 'all' || player.position === activePosition
  );

  const positionOrder = { GK: 1, DF: 2, MF: 3, FW: 4 };
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    const posA = positionOrder[a.position as keyof typeof positionOrder] || 0;
    const posB = positionOrder[b.position as keyof typeof positionOrder] || 0;

    if (posA !== posB) return posA - posB;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Team Players</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActivePosition('all')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activePosition === 'all'
              ? 'bg-primary text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          All
        </button>
        {positions.map(position => (
          <button
            key={position}
            onClick={() => setActivePosition(position)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activePosition === position
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {position}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedPlayers.map((player) => (
          <div key={player.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden flex flex-col">
            <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
              <img
                src={player.photo || '/placeholder.svg'}
                alt={player.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                <h3 className="font-bold text-lg truncate">{player.name}</h3>
                <div className="flex items-center text-sm">
                  <span className="mr-3">#{player.number || 'N/A'}</span>
                  <span className="px-2 py-0.5 bg-primary rounded-full text-white text-xs">
                    {player.position || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 flex-grow">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-gray-500 dark:text-gray-400">Age:</span><span className="ml-1 font-medium">{player.age}</span></div>
                <div><span className="text-gray-500 dark:text-gray-400">Height:</span><span className="ml-1 font-medium">{player.height || 'N/A'}</span></div>
                <div><span className="text-gray-500 dark:text-gray-400">Weight:</span><span className="ml-1 font-medium">{player.weight || 'N/A'}</span></div>
                <div><span className="text-gray-500 dark:text-gray-400">Country:</span><span className="ml-1 font-medium">{player.nationality}</span></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlayers.length === 0 && (
        <p className="text-center py-8 text-gray-500 dark:text-gray-400">
          No players found for the selected position.
        </p>
      )}
    </div>
  );
};

export default PlayersList;
