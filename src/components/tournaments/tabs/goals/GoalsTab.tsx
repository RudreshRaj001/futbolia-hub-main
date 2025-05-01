
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { PlayerDetails } from '../../mockTopScorersData';

interface GoalsTabProps {
  player: PlayerDetails;
}

const GoalsTab: React.FC<GoalsTabProps> = ({ player }) => {
  return (
    <>
      <div className="p-4 md:p-6 bg-gray-100 dark:bg-gray-800 flex justify-center items-center">
        <div className="text-center">
          <div className="bg-gray-900 dark:bg-gray-700 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">{player.goals}</div>
          <div className="text-sm text-gray-500 dark:text-gray-300">GOLES</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="border dark:border-gray-700 rounded-md overflow-hidden">
          <div className="bg-gray-900 text-white p-2 md:p-3 text-center font-bold text-sm md:text-base">
            PARTIDOS JUGADOS
          </div>
          <div className="p-3 md:p-4 bg-white dark:bg-gray-900">
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 mb-3 md:mb-4">
              <div className="h-full bg-primary" style={{ width: '100%' }}></div>
            </div>
            <div className="flex justify-between text-xs md:text-sm">
              <div className="flex items-center">
                <div className="bg-red-600 text-white px-1 md:px-2 py-1 text-xs rounded mr-1 md:mr-2">
                  {player.matches.starting}
                </div>
                <span className="text-gray-900 dark:text-gray-300">TITULAR</span>
              </div>
              <div className="flex">
                <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-xs md:text-sm mr-1 text-gray-900 dark:text-white">
                  {player.matches.total}
                </div>
                <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-900 text-white text-xs md:text-sm">
                  {player.matches.total}
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-red-600 text-white px-1 md:px-2 py-1 text-xs rounded mr-1 md:mr-2">
                  {player.matches.substitute}
                </div>
                <span className="text-gray-900 dark:text-gray-300">SUPLENTE</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border dark:border-gray-700 rounded-md overflow-hidden">
          <div className="bg-gray-900 text-white p-2 md:p-3 text-center font-bold text-sm md:text-base">
            MINUTOS JUGADOS
          </div>
          <div className="p-3 md:p-4 bg-white dark:bg-gray-900">
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 mb-3 md:mb-4">
              <div className="h-full bg-primary" style={{ width: '100%' }}></div>
            </div>
            <div className="flex justify-between text-xs md:text-sm">
              <div className="flex items-center">
                <div className="bg-red-600 text-white px-1 md:px-2 py-1 text-xs rounded mr-1 md:mr-2">
                  {player.minutes.starting}
                </div>
                <span className="text-gray-900 dark:text-gray-300">TITULAR</span>
              </div>
              <div className="flex items-center justify-center w-8 md:w-10 h-5 md:h-6 rounded bg-gray-900 text-white text-xs md:text-sm">
                {player.minutes.total}
              </div>
              <div className="flex items-center">
                <div className="bg-red-600 text-white px-1 md:px-2 py-1 text-xs rounded mr-1 md:mr-2">
                  {player.minutes.substitute}
                </div>
                <span className="text-gray-900 dark:text-gray-300">SUPLENTE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border dark:border-gray-700 rounded-md overflow-hidden mx-4 mb-4">
        <div className="bg-gray-900 text-white p-2 md:p-3 text-center font-bold text-sm md:text-base">
          INCIDENCIAS
        </div>
        <div className="p-3 md:p-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-white dark:bg-gray-900">
          <div>
            <div className="flex justify-between text-xs md:text-sm mb-1">
              <span className="text-gray-900 dark:text-gray-300">DISPAROS</span>
              <div className="flex">
                <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-xs md:text-sm mr-1 text-gray-900 dark:text-white">
                  {player.stats.shots.total}
                </div>
                <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-900 text-white text-xs md:text-sm">
                  {player.stats.shots.onTarget}
                </div>
              </div>
            </div>
            <Progress value={18} className="h-2 mb-4 md:mb-6" />
            
            <div className="flex justify-between text-xs md:text-sm mb-1">
              <span className="text-gray-900 dark:text-gray-300">FALTAS</span>
              <div className="flex">
                <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-xs md:text-sm mr-1 text-gray-900 dark:text-white">
                  {player.stats.fouls.committed}
                </div>
                <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-900 text-white text-xs md:text-sm">
                  {player.stats.fouls.received}
                </div>
              </div>
            </div>
            <Progress value={7} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-xs md:text-sm mb-1">
              <span className="text-gray-900 dark:text-gray-300">TIROS DE ESQUINA</span>
              <div className="flex">
                <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-xs md:text-sm mr-1 text-gray-900 dark:text-white">
                  {player.stats.corners.total}
                </div>
                <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-900 text-white text-xs md:text-sm">
                  {player.stats.corners.executed}
                </div>
              </div>
            </div>
            <Progress value={0} className="h-2 mb-4 md:mb-6" />
            
            <div className="flex justify-between text-xs md:text-sm mb-1">
              <span className="text-gray-900 dark:text-gray-300">ASISTENCIAS</span>
              <div className="flex">
                <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-xs md:text-sm mr-1 text-gray-900 dark:text-white">
                  {player.stats.assists.total}
                </div>
                <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-900 text-white text-xs md:text-sm">
                  {player.stats.assists.received}
                </div>
              </div>
            </div>
            <Progress value={28} className="h-2" />
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalsTab;
