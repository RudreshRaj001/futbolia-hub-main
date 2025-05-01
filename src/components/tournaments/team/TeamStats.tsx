
import React, { useState } from 'react';
import { TeamStats as TeamStatsType } from '../mockPlayersData';

interface TeamStatsProps {
  team: any;
  stats: TeamStatsType | null;
}

const TeamStats: React.FC<TeamStatsProps> = ({ team, stats }) => {
  const [activeTab, setActiveTab] = useState('partidos');
  
  // Categories for team stats
  const categories = [
    { id: 'partidos', name: 'PARTIDOS' },
    { id: 'goles', name: 'GOLES' },
    { id: 'disparos', name: 'DISPAROS' },
    { id: 'faltas', name: 'FALTAS' },
    { id: 'tarjetas', name: 'TARJETAS' },
    { id: 'fuera', name: 'FUERA DE JUEGO' },
    { id: 'asistencias', name: 'ASISTENCIAS' },
    { id: 'tiros', name: 'TIROS DE ESQUINA' }
  ];

  if (!stats) {
    return (
      <div className="p-4 text-center text-gray-500">
        No hay estadísticas disponibles para este equipo.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-900 text-white p-4 flex items-center justify-center">
        <h2 className="text-lg font-bold">RESUMEN COMPLETO DE EQUIPOS</h2>
      </div>
      
      <div className="bg-gray-100 border-b">
        <div className="flex flex-wrap">
          <div className="bg-gray-800 text-white py-2 px-4">
            TOP 3
          </div>
          {categories.map(category => (
            <button
              key={category.id}
              className={`py-2 px-4 font-medium text-sm ${activeTab === category.id ? 'bg-white' : 'bg-gray-200'}`}
              onClick={() => setActiveTab(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="bg-white p-4 border">
          <h3 className="text-center font-bold mb-4">GOLES</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium text-sm uppercase">{team.name}</span>
              </div>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div className="bg-blue-900 h-2.5 rounded-full" style={{ width: `${Math.min(100, stats.goals_for * 10)}%` }}></div>
                </div>
                <span className="font-bold">{stats.goals_for}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 border">
          <h3 className="text-center font-bold mb-4">DISPAROS</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium text-sm uppercase">{team.name}</span>
              </div>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div className="bg-blue-900 h-2.5 rounded-full" style={{ width: `${Math.min(100, stats.shots / 2)}%` }}></div>
                </div>
                <span className="font-bold">{stats.shots}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 border">
          <h3 className="text-center font-bold mb-4">ASISTENCIAS</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium text-sm uppercase">{team.name}</span>
              </div>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div className="bg-blue-900 h-2.5 rounded-full" style={{ width: `${Math.min(100, stats.shots / 5)}%` }}></div>
                </div>
                <span className="font-bold">{Math.floor(stats.shots / 5)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="bg-white p-4 border">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold mb-2">Resumen del Equipo</h3>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-1">Partidos jugados</td>
                    <td className="py-1 text-right font-bold">{stats.matches}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Goles a favor</td>
                    <td className="py-1 text-right font-bold">{stats.goals_for}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Goles en contra</td>
                    <td className="py-1 text-right font-bold">{stats.goals_against}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Diferencia de goles</td>
                    <td className="py-1 text-right font-bold">{stats.goals_for - stats.goals_against}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">Estadísticas Adicionales</h3>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-1">Posesión promedio</td>
                    <td className="py-1 text-right font-bold">{stats.possession}%</td>
                  </tr>
                  <tr>
                    <td className="py-1">Pases completados</td>
                    <td className="py-1 text-right font-bold">{stats.passes}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Tiros</td>
                    <td className="py-1 text-right font-bold">{stats.shots}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Tiros a puerta</td>
                    <td className="py-1 text-right font-bold">{stats.shotsOnTarget}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStats;
