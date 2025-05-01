
import React from 'react';
import { Match } from '@/components/calendar/types';

interface MatchItemProps {
  match: Match;
}

const MatchItem: React.FC<MatchItemProps> = ({ match }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6">
            <img src={match.homeLogo} alt={match.homeTeam} className="w-full h-full object-contain" />
          </div>
          <span className="text-sm font-medium">{match.homeTeam}</span>
        </div>
        <div className="flex items-center justify-center px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md">
          <span className="text-sm font-bold">{match.homeScore}</span>
          <span className="mx-1">-</span>
          <span className="text-sm font-bold">{match.awayScore}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{match.awayTeam}</span>
          <div className="w-6 h-6">
            <img src={match.awayLogo} alt={match.awayTeam} className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
        <span>{match.time}</span>
        <span>{match.status}</span>
      </div>
    </div>
  );
};

export default MatchItem;
