
import React from 'react';

interface TeamStatsContentProps {
  team: any;
  stats: any;
}

const TeamStatsContent: React.FC<TeamStatsContentProps> = ({
  team,
  stats
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-bold mb-4">Estadísticas del Equipo</h3>
      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Partidos</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Jugados:</span>
                <span className="font-medium">{stats.matches}</span>
              </li>
              <li className="flex justify-between">
                <span>Ganados:</span>
                <span className="font-medium text-green-600">{stats.matches_wins}</span>
              </li>
              <li className="flex justify-between">
                <span>Empatados:</span>
                <span className="font-medium text-amber-600">{stats.matches_draws}</span>
              </li>
              <li className="flex justify-between">
                <span>Perdidos:</span>
                <span className="font-medium text-red-600">{stats.matches_losses}</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Goles</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>A favor:</span>
                <span className="font-medium">{stats.goals_for}</span>
              </li>
              <li className="flex justify-between">
                <span>En contra:</span>
                <span className="font-medium">{stats.goals_against}</span>
              </li>
              <li className="flex justify-between">
                <span>Diferencia:</span>
                <span className={`font-medium ${stats.goals_for - stats.goals_against > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.goals_for - stats.goals_against}
                </span>
              </li>
              <li className="flex justify-between">
                <span>Promedio por partido:</span>
                <span className="font-medium">{(stats.goals_for / stats.matches).toFixed(2)}</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Rendimiento</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>% Victorias:</span>
                <span className="font-medium">
                  {((stats.matches_wins / stats.matches) * 100).toFixed(1)}%
                </span>
              </li>
              <li className="flex justify-between">
                <span>% Efectividad:</span>
                <span className="font-medium">
                  {(((stats.matches_wins * 3 + stats.matches_draws) / (stats.matches * 3)) * 100).toFixed(1)}%
                </span>
              </li>
              <li className="flex justify-between">
                <span>Racha actual:</span>
                <span className="font-medium">{stats.current_form || 'WWDL'}</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          No hay estadísticas disponibles para este equipo.
        </div>
      )}
    </div>
  );
};

export default TeamStatsContent;
