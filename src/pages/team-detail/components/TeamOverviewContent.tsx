import React from 'react';
import { Team } from '@/store/slices/teamSlice';
import { Match, Standing } from '@/store/slices/leaguesSlice';
import TeamNews from '@/components/team-detail/TeamNews';
import TeamMatches from '@/components/team-detail/TeamMatches';
import TeamStandings from '@/components/team-detail/TeamStandings';
import { AdSection } from '@/components/home/AdSections';

interface TeamOverviewContentProps {
  team: Team;
  teamNews: any[];
  teamMatches: Match[];
  standings: Standing[];
}

const TeamOverviewContent: React.FC<TeamOverviewContentProps> = ({
  team,
  teamNews,
  teamMatches,
  standings,
}) => {
  return (
    <div className="space-y-8 p-4">
      {/* Team Info Section */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold mb-4">Información del Equipo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Nombre:</span> {team.name}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Fundado:</span> {team.founded || 'N/A'}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Estadio:</span> {team.venue || 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Ciudad:</span> {team.city || 'N/A'}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold">País:</span> {team.country || 'N/A'}
            </p>
          </div>
        </div>
      </section>

      {/* Recent Matches Section */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold mb-4">Últimos Partidos</h2>
        {teamMatches && teamMatches.length > 0 ? (
          <div className="space-y-4">
            {teamMatches.slice(0, 5).map((match, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded"
              >
                <span>{match.homeTeam} vs {match.awayTeam}</span>
                <span className="font-semibold">{match.score || 'Próximo'}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay partidos recientes disponibles.</p>
        )}
      </section>

      {/* Team News Section */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold mb-4">Noticias del Equipo</h2>
        {teamNews && teamNews.length > 0 ? (
          <div className="space-y-4">
            {teamNews.slice(0, 3).map((news, index) => (
              <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                <h3 className="font-semibold mb-2">{news.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{news.summary}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay noticias disponibles.</p>
        )}
      </section>

      {/* Ad Banner */}
      <AdSection position="middle" />
      
      {/* Recent and Upcoming Matches */}
      <TeamMatches teamMatches={teamMatches} />
      
      {/* Team Stats or Standings */}
      <TeamStandings team={team} standings={standings} />
    </div>
  );
};

export default TeamOverviewContent;
