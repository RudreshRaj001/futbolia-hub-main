import React from 'react';
import { PlayerInfo } from '../types';
import PlayerRow from './PlayerRow';

interface PositionGroupProps {
  title: string;
  players: PlayerInfo[];
}

const PositionGroup: React.FC<PositionGroupProps> = ({ title, players }) => {
  if (players.length === 0) return null;
  
  return (
    <div className="mb-4">
      {/* Position header */}
      <div className="bg-gray-900 text-white p-2">
        <span className="font-bold">{title}</span>
      </div>
      
      {/* Players list */}
      <div className="border-l border-r border-b">
        {players.map(player => (
          <PlayerRow key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};

export default PositionGroup;
