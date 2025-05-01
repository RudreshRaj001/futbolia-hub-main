import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

interface TeamStanding {
  position: number;
  name: string;
  played: number;
  points: number;
  goalDiff: number;
  logo: string;
  id: number; // Make sure each team has an 'id' property for the URL
}

interface StandingsTableProps {
  standings: TeamStanding[];
}

const StandingsTable: React.FC<StandingsTableProps> = ({ standings }) => {

  console.log("first render StandingsTable", standings);

  return (
    <div className="p-2">
      <div className="mt-2 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="py-2 text-left pl-2">Pos</th>
              <th className="py-2 text-left">Equipo</th>
              <th className="py-2 text-center">PJ</th>
              <th className="py-2 text-center">Pts.</th>
              <th className="py-2 text-center">GD</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team) => (
              <tr
                key={team.position}
                className="border-t border-gray-100 dark:border-gray-700"
              >
                <td className="py-2 pl-2">{team.position}</td>
                <td className="py-2">
                  <Link
                    to={`/equipos/${team.id}`} // Navigate to the team's page
                    className="flex items-center space-x-2"
                  >
                    <span className="w-5 h-5 flex-shrink-0">
                      <img
                        src={team.logo || 'https://via.placeholder.com/20'}
                        alt={team.name}
                        className="w-5 h-5 object-contain"
                      />
                    </span>
                    <span className="truncate max-w-[100px] sm:max-w-[120px]">
                      {team.name}
                    </span>
                  </Link>
                </td>
                <td className="py-2 text-center">{team.played}</td>
                <td className="py-2 text-center">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                      team.position <= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {team.points}
                  </span>
                </td>
                <td className="py-2 text-center">{team.goalDiff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StandingsTable;
