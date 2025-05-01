
import React from 'react';
import { PlayerDetails } from '../../mockTopScorersData';

interface HeadGoalsTabProps {
  player: PlayerDetails;
}

const HeadGoalsTab: React.FC<HeadGoalsTabProps> = ({ player }) => {
  return (
    <div className="h-64 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md inline-block mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{player.headGoals}</div>
        <div className="text-gray-500 dark:text-gray-300">GOLES DE CABEZA</div>
      </div>
    </div>
  );
};

export default HeadGoalsTab;
