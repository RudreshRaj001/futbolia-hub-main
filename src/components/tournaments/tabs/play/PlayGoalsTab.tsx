
import React from 'react';
import { PlayerDetails } from '../../mockTopScorersData';

interface PlayGoalsTabProps {
  player: PlayerDetails;
}

const PlayGoalsTab: React.FC<PlayGoalsTabProps> = ({ player }) => {
  return (
    <div className="h-64 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md inline-block mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{player.playGoals}</div>
        <div className="text-gray-500 dark:text-gray-300">GOLES DE JUGADA</div>
      </div>
    </div>
  );
};

export default PlayGoalsTab;
