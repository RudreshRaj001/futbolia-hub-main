
import React from 'react';
import { PlayerInfo } from '../../types';

interface ScorersTabProps {
  team: any;
  players: PlayerInfo[];
}

const ScorersTab: React.FC<ScorersTabProps> = ({ team, players }) => {
  return (
    <div className="p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Goleadores de {team.name}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pos</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Jugador</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Goles</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Partidos</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Promedio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {players.slice(0, 5).map((player, index) => (
                <tr key={player.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{index + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{player.name}</td>
                  <td className="px-4 py-3 text-sm text-center font-bold text-gray-900 dark:text-white">{8 - index}</td>
                  <td className="px-4 py-3 text-sm text-center hidden sm:table-cell text-gray-900 dark:text-gray-300">15</td>
                  <td className="px-4 py-3 text-sm text-center hidden sm:table-cell text-gray-900 dark:text-gray-300">{((8 - index) / 15).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScorersTab;
