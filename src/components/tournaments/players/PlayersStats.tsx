
import React, { useState } from 'react';
import { PlayerInfo } from '../types';
import { playerStats } from '../mockPlayersData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PlayersStatsProps {
  players: PlayerInfo[];
  teamName: string;
  teamLogo: string;
}

const PlayersStats: React.FC<PlayersStatsProps> = ({ players, teamName, teamLogo }) => {
  const [activeTab, setActiveTab] = useState('goles');
  
  // Categories for player stats
  const categories = [
    { id: 'goles', name: 'GOLES' },
    { id: 'disparos', name: 'DISPAROS' },
    { id: 'asistencias', name: 'ASISTENCIAS' },
    { id: 'faltas', name: 'FALTAS' },
    { id: 'tarjetas', name: 'TARJETAS' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-900 text-white p-4 flex items-center justify-center">
        <h2 className="text-lg font-bold">RESUMEN COMPLETO DE JUGADORES</h2>
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
      
      <div className="p-4">
        {activeTab === 'goles' && (
          <div className="bg-white p-4 border">
            <h3 className="text-center font-bold mb-4">GOLES</h3>
            <div className="space-y-4">
              {players
                .filter(player => playerStats[player.id]?.goals > 0)
                .sort((a, b) => (playerStats[b.id]?.goals || 0) - (playerStats[a.id]?.goals || 0))
                .slice(0, 3)
                .map((player, idx) => (
                  <div key={player.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium text-sm">{player.name}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-blue-900 h-2.5 rounded-full" style={{ width: `${Math.min(100, (playerStats[player.id]?.goals || 0) * 25)}%` }}></div>
                      </div>
                      <span className="font-bold">{playerStats[player.id]?.goals || 0}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        {activeTab === 'disparos' && (
          <div className="bg-white p-4 border">
            <h3 className="text-center font-bold mb-4">DISPAROS</h3>
            <div className="space-y-4">
              {players
                .filter(player => playerStats[player.id]?.shots > 0)
                .sort((a, b) => (playerStats[b.id]?.shots || 0) - (playerStats[a.id]?.shots || 0))
                .slice(0, 3)
                .map((player, idx) => (
                  <div key={player.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium text-sm">{player.name}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-blue-900 h-2.5 rounded-full" style={{ width: `${Math.min(100, (playerStats[player.id]?.shots || 0) * 5)}%` }}></div>
                      </div>
                      <span className="font-bold">{playerStats[player.id]?.shots || 0}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        {activeTab === 'asistencias' && (
          <div className="bg-white p-4 border">
            <h3 className="text-center font-bold mb-4">ASISTENCIAS</h3>
            <div className="space-y-4">
              {players
                .filter(player => playerStats[player.id]?.assists > 0)
                .sort((a, b) => (playerStats[b.id]?.assists || 0) - (playerStats[a.id]?.assists || 0))
                .slice(0, 3)
                .map((player, idx) => (
                  <div key={player.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium text-sm">{player.name}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-blue-900 h-2.5 rounded-full" style={{ width: `${Math.min(100, (playerStats[player.id]?.assists || 0) * 20)}%` }}></div>
                      </div>
                      <span className="font-bold">{playerStats[player.id]?.assists || 0}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        {activeTab === 'faltas' && (
          <div className="bg-white p-4 border">
            <h3 className="text-center font-bold mb-4">FALTAS</h3>
            <div className="space-y-4">
              {players
                .filter(player => playerStats[player.id]?.yellowCards > 0)
                .sort((a, b) => (playerStats[b.id]?.yellowCards || 0) - (playerStats[a.id]?.yellowCards || 0))
                .slice(0, 3)
                .map((player, idx) => (
                  <div key={player.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium text-sm">{player.name}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-blue-900 h-2.5 rounded-full" style={{ width: `${Math.min(100, (playerStats[player.id]?.yellowCards || 0) * 30)}%` }}></div>
                      </div>
                      <span className="font-bold">{playerStats[player.id]?.yellowCards || 0}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        {activeTab === 'tarjetas' && (
          <div className="bg-white p-4 border">
            <h3 className="text-center font-bold mb-4">TARJETAS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border p-3">
                <h4 className="font-medium text-center mb-2 text-yellow-500">AMARILLAS</h4>
                <div className="space-y-3">
                  {players
                    .filter(player => playerStats[player.id]?.yellowCards > 0)
                    .sort((a, b) => (playerStats[b.id]?.yellowCards || 0) - (playerStats[a.id]?.yellowCards || 0))
                    .slice(0, 3)
                    .map((player, idx) => (
                      <div key={player.id} className="flex items-center justify-between">
                        <span className="text-sm">{player.name}</span>
                        <span className="font-bold">{playerStats[player.id]?.yellowCards || 0}</span>
                      </div>
                    ))}
                </div>
              </div>
              
              <div className="border p-3">
                <h4 className="font-medium text-center mb-2 text-red-500">ROJAS</h4>
                <div className="space-y-3">
                  {players
                    .filter(player => playerStats[player.id]?.redCards > 0)
                    .sort((a, b) => (playerStats[b.id]?.redCards || 0) - (playerStats[a.id]?.redCards || 0))
                    .slice(0, 3)
                    .map((player, idx) => (
                      <div key={player.id} className="flex items-center justify-between">
                        <span className="text-sm">{player.name}</span>
                        <span className="font-bold">{playerStats[player.id]?.redCards || 0}</span>
                      </div>
                    ))}
                  
                  {players.filter(player => playerStats[player.id]?.redCards > 0).length === 0 && (
                    <div className="text-center text-gray-500 py-2">
                      No hay tarjetas rojas
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersStats;
