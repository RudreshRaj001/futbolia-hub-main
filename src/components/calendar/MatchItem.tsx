import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Match } from './types';
import { format } from 'date-fns';

interface MatchItemProps {
  match: Match;
}

// Memoize the component to prevent re-renders when props haven't changed
const MatchItem = memo(({ match }: MatchItemProps) => {
  const {
    id,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    homeLogo,
    awayLogo,
    status,
    time,
    date
  } = match;

  // Determine status-based styles
  const getStatusStyle = () => {
    switch (status) {
      case 'FINALIZADO':
        return 'bg-gray-100 text-gray-500';
      case 'LIVE':
        return 'bg-green-100 text-green-700 animate-pulse';
      case 'UPCOMING':
      default:
        return 'bg-blue-50 text-blue-500';
    }
  };

  const formattedDate = format(new Date(date), 'dd/MM/yyyy');

  return (
    <Link 
      to={`/partidos/${id}`}
      className="group flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</span>
        <span className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${getStatusStyle()}`}>
          {status === 'UPCOMING' ? time : status}
        </span>
      </div>
      
      <div className="flex items-center justify-center flex-grow mx-2">
        <div className="flex items-center justify-end flex-1">
          <span className="font-medium text-sm mr-2 text-right">{homeTeam}</span>
          <img 
            src={homeLogo} 
            alt={homeTeam} 
            className="w-6 h-6 object-contain" 
            width={24} 
            height={24}
            loading="lazy"
          />
        </div>
        
        <div className="flex items-center justify-center mx-3 min-w-[50px]">
          <span className="font-bold text-center">
            {status === 'UPCOMING' ? 'vs' : `${homeScore} - ${awayScore}`}
          </span>
        </div>
        
        <div className="flex items-center justify-start flex-1">
          <img 
            src={awayLogo} 
            alt={awayTeam} 
            className="w-6 h-6 object-contain" 
            width={24} 
            height={24}
            loading="lazy"
          />
          <span className="font-medium text-sm ml-2 text-left">{awayTeam}</span>
        </div>
      </div>
    </Link>
  );
});

// Add display name for better debugging
MatchItem.displayName = 'MatchItem';

export default MatchItem;
