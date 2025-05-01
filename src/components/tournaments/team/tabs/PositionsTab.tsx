
import React from 'react';
import { teams } from '@/data/teams';

interface PositionsTabProps {
  team: any;
}

const PositionsTab: React.FC<PositionsTabProps> = ({ team }) => {

  
  return (
    <div className="p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pos</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Equipo</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">PJ</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">G</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">E</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">P</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((position) => {
                const isCurrentTeam = position === 3; // Assuming team is in 3rd place
                return (
                  <tr key={position} className={isCurrentTeam ? "bg-primary/10" : ""}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{position}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium flex items-center gap-2">
                      <img 
                        src={isCurrentTeam ? team.logo : teams[position % teams.length].logo} 
                        alt="Team Logo" 
                        className="w-5 h-5 object-contain" 
                      />
                      {isCurrentTeam ? team.name : teams[position % teams.length].name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center">15</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{10 - Math.floor(position/2)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{Math.floor(position/3)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{Math.floor(position/3)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-center">{33 - (position * 3)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PositionsTab;
