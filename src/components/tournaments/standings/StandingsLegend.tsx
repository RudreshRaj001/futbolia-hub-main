
import React from 'react';

interface StandingsLegendProps {
  tournamentId: string;
  selectedPhase: string;
}

const StandingsLegend: React.FC<StandingsLegendProps> = ({ tournamentId, selectedPhase }) => {
  if (!tournamentId) return null;

  return (
    <div className="p-4 bg-gray-100 text-xs">
      <div className="flex flex-wrap gap-4">
        {tournamentId === 'serieA' && (
          <>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
              <span>Clasificado a Copa Libertadores</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              <span>Zona de descenso</span>
            </div>
          </>
        )}
        {tournamentId === 'serieB' && (
          <>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span>Ascenso a Serie A</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              <span>Descenso a Segunda Categoría</span>
            </div>
          </>
        )}
        {(tournamentId === 'libertadores' || tournamentId === 'sudamericana') && selectedPhase === 'fase-de-grupos' && (
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            <span>Clasificado a octavos de final</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StandingsLegend;
