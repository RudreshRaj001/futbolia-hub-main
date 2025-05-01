
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchLeagues } from '../../store/slices/leaguesSlice';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';

const LeaguesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { leagues, status, error } = useAppSelector((state) => state.leagues);

  useEffect(() => {
    if (status === 'idle') {
      // dispatch(fetchLeagues());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return <ErrorMessage message={error || 'Failed to load leagues'} />;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Football Leagues</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {leagues.map((leagueData) => (
          <div 
            key={`${leagueData.league.id}-${leagueData.league.name}`}
            className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
          >
            <div className="p-4 flex items-center space-x-4">
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src={leagueData.league.logo || '/placeholder.svg'}
                  alt={leagueData.league.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">{leagueData.league.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <img 
                    src={leagueData.country.flag || '/placeholder.svg'}
                    alt={leagueData.country.name} 
                    className="w-5 h-4 object-cover"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {leagueData.country.name}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Type: {leagueData.league.type}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-3">
              <h4 className="text-sm font-semibold mb-2">Seasons</h4>
              <div className="flex flex-wrap gap-2">
                {leagueData.seasons.slice(-3).map((season) => (
                  <span 
                    key={season.year}
                    className={`text-xs px-2 py-1 rounded ${
                      season.current 
                        ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' 
                        : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                    }`}
                  >
                    {season.year} {season.current ? '(Current)' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {leagues.length === 0 && status === 'succeeded' && (
        <p className="text-center py-8 text-gray-500 dark:text-gray-400">
          No leagues found for the selected country.
        </p>
      )}
    </div>
  );
};

export default LeaguesList;
