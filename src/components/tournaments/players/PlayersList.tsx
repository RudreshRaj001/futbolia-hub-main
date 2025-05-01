import React from 'react';
import { PlayerInfo } from '../types';
import PositionGroup from './PositionGroup';

interface PlayersListProps {
  players: PlayerInfo[];
  teamLogo: string;
  teamName: string;
}

const PlayersList: React.FC<PlayersListProps> = ({ 
  players = [], 
  teamLogo = '', 
  teamName = '' 
}) => {
  // Ensure players is an array before filtering
  const playersList = Array.isArray(players) ? players : [];

  // Group players by position
  const goalkeepers = playersList.filter(p => p?.position === "GK");
  const defenders = playersList.filter(p => p?.position === "DF");
  const midfielders = playersList.filter(p => p?.position === "MF");
  const forwards = playersList.filter(p => p?.position === "FW");
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Player detail section header with team logo and name */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-center">
        {teamLogo && (
          <img 
            src={teamLogo} 
            alt={teamName} 
            className="w-6 h-6 mr-2 object-contain"
          />
        )}
        <span className="font-bold">{teamName?.toUpperCase() || 'EQUIPO'}</span>
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-5 bg-gray-100 dark:bg-gray-800 text-sm font-semibold p-2">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-1">Nombre</div>
        <div className="col-span-1">Fecha Nac.</div>
        <div className="col-span-1">País</div>
        <div className="col-span-1 grid grid-cols-2">
          <div>Alt.</div>
          <div>Peso</div>
        </div>
      </div>

      {playersList.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No hay jugadores disponibles.
        </div>
      ) : (
        <div className="divide-y">
          <PositionGroup title="Arqueros" players={goalkeepers} />
          <PositionGroup title="Defensores" players={defenders} />
          <PositionGroup title="Volantes" players={midfielders} />
          <PositionGroup title="Delanteros" players={forwards} />
        </div>
      )}
    </div>
  );
};

export default PlayersList;
