import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchTeamStatistics } from '@/store/slices/teamStatisticsSlice';
import Loader from '../ui/Loader';

interface TeamStatisticsProps {
  teamId: number;
  season: number;
  leagueId: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center justify-center">
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{title}</h3>
    <p className="text-2xl font-bold text-primary">{value}</p>
  </div>
);

const TeamStatistics: React.FC<TeamStatisticsProps> = ({ teamId, season, leagueId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.teamStatistics);
  const stats = data?.[teamId];

  console.log("first render team statistics", teamId, season, leagueId, data);

  useEffect(() => {
    if (teamId && season && leagueId) {
      dispatch(fetchTeamStatistics({ teamId, season, leagueId }));
    }
  }, [teamId, season, leagueId, dispatch]);

  if (loading) {
    return <Loader text="Cargando estadísticas..." />;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 text-gray-500">
        No hay estadísticas disponibles para este equipo.
      </div>
    );
  }

  // Calculate win percentage
  const totalMatches = stats?.matches || 0;
  const winPercentage = totalMatches > 0 
    ? Math.round((stats?.matches_wins / totalMatches) * 100) 
    : 0;

  return (
    <div className="p-6">
      {/* Season Summary */}
      {(stats?.matches > 0 || stats?.matches_wins > 0 || winPercentage > 0) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Resumen de la Temporada
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats?.matches > 0 && (
              <StatCard 
                title="Partidos Jugados" 
                value={stats.matches} 
              />
            )}
            {stats?.matches_wins > 0 && (
              <StatCard 
                title="Victorias" 
                value={stats.matches_wins} 
              />
            )}
            {winPercentage > 0 && (
              <StatCard 
                title="Porcentaje de Victoria" 
                value={`${winPercentage}%`} 
              />
            )}
          </div>
        </div>
      )}

      {/* Goals Stats */}
      {(stats?.goals_for > 0 || stats?.goals_against > 0 || (stats?.goals_for || 0) - (stats?.goals_against || 0) !== 0) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Estadísticas de Goles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats?.goals_for > 0 && (
              <StatCard 
                title="Goles a Favor" 
                value={stats.goals_for} 
              />
            )}
            {stats?.goals_against > 0 && (
              <StatCard 
                title="Goles en Contra" 
                value={stats.goals_against} 
              />
            )}
            {(stats?.goals_for || 0) - (stats?.goals_against || 0) !== 0 && (
              <StatCard 
                title="Diferencia de Goles" 
                value={(stats?.goals_for || 0) - (stats?.goals_against || 0)} 
              />
            )}
            {stats?.matches > 0 && stats?.goals_for > 0 && (
              <StatCard 
                title="Promedio de Goles" 
                value={(stats.goals_for / stats.matches).toFixed(2)} 
              />
            )}
          </div>
        </div>
      )}

      {/* Performance Stats */}
      {(stats?.possession > 0 || stats?.shots > 0 || stats?.shotsOnTarget > 0) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Rendimiento
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats?.possession > 0 && (
              <StatCard 
                title="Posesión Promedio" 
                value={`${stats?.possession || 0}%`} 
              />
            )}
            {stats?.shots > 0 && (
              <StatCard 
                title="Tiros Totales" 
                value={stats?.shots || 0} 
              />
            )}
            {stats?.shotsOnTarget > 0 && (
              <StatCard 
                title="Tiros al Arco" 
                value={stats?.shotsOnTarget || 0} 
              />
            )}
            {stats?.shots > 0 && stats?.shotsOnTarget > 0 && (
              <StatCard 
                title="Precisión de Tiros" 
                value={`${Math.round((stats?.shotsOnTarget / stats?.shots) * 100)}%`} 
              />
            )}
          </div>
        </div>
      )}

      {/* Additional Stats */}
      {(stats?.passes > 0 || stats?.corners > 0 || stats?.matches_draws > 0 || stats?.matches_losses > 0) && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Estadísticas Adicionales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats?.passes > 0 && (
              <StatCard 
                title="Pases Completados" 
                value={stats?.passes || 0} 
              />
            )}
            {stats?.corners > 0 && (
              <StatCard 
                title="Tiros de Esquina" 
                value={stats?.corners || 0} 
              />
            )}
            {stats?.matches_draws > 0 && (
              <StatCard 
                title="Empates" 
                value={stats?.matches_draws || 0} 
              />
            )}
            {stats?.matches_losses > 0 && (
              <StatCard 
                title="Derrotas" 
                value={stats?.matches_losses || 0} 
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamStatistics;
