
import React from 'react';

interface TeamStandingsProps {
  team: any;
  standings: any[];
}



const TeamStandings: React.FC<TeamStandingsProps> = ({ team, standings }) => {

  console.log("check standing", standings,team);
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold font-display mb-4">Posición en la Tabla</h2>
      
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
              {standings.slice(0, 8).map((item) => (
                <tr key={item.position} className={team.name === item.team ? "bg-primary/10" : ""}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{item.position}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{item.team}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{item.played}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{item.won}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{item.drawn}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{item.lost}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-center">{item.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TeamStandings;
