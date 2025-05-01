import React from 'react';
import { Link } from 'react-router-dom';

interface Match {
  id: number;
  homeTeam: string;
  homeTeamLogo: string;
  awayTeam: string;
  awayTeamLogo: string;
  date: string;
  status: string;
  score: string;
  competition: string;
  round: string;
  venue: string;
  city: string;
  referee: string;
  elapsedMinutes: number;
  statusLong: string;
  periods: {
    first: number;
    second: number;
  };
}

interface TeamMatchesProps {
  teamMatches: Match[];
}

const TeamMatches: React.FC<TeamMatchesProps> = ({ teamMatches }) => {
  return (
    <section className="mb-10 mt-8">
      <h2 className="text-2xl font-bold font-display mb-4">
        Partidos Recientes y Próximos
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamMatches.map((match) => (
          <Link key={match.id} to={`/partidos/${match.id}`}>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-800 cursor-pointer hover:shadow-md transition">
              <div className="text-sm text-gray-500 mb-2">
                {match.date ? new Date(match.date).toLocaleString() : 'Fecha no disponible'}
              </div>
              <div className="text-sm text-gray-500 mb-2">
                {match.competition} - {match.round}
              </div>
              <div className="text-sm text-gray-500 mb-2">
                Venue: {match.venue}, {match.city}
              </div>
              <div className="text-sm text-gray-500 mb-2">
                Referee: {match.referee || 'N/A'}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={match.homeTeamLogo} alt={match.homeTeam} className="w-8 h-8" />
                  <span className="font-semibold">{match.homeTeam}</span>
                </div>
                <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md font-bold">
                  {match.status === 'FT' || match.status === 'PEN' || match.status === 'AET'
                    ? match.score
                    : 'vs'}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{match.awayTeam}</span>
                  <img src={match.awayTeamLogo} alt={match.awayTeam} className="w-8 h-8" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Status: {match.statusLong} ({match.status})
              </div>
              {match.status === 'AET' && (
                <div className="mt-2 text-sm text-gray-500">
                  Extra Time Elapsed: {match.elapsedMinutes} Minutes
                </div>
              )}
              <div className="mt-2 text-sm text-gray-500">
                Periods: First Half -{" "}
                {match.periods.first
                  ? new Date(match.periods.first * 1000).toLocaleTimeString()
                  : 'N/A'}{" "}
                | Second Half -{" "}
                {match.periods.second
                  ? new Date(match.periods.second * 1000).toLocaleTimeString()
                  : 'N/A'}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TeamMatches;
