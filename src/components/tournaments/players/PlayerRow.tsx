import React from 'react';
import { PlayerInfo } from '../types';

interface PlayerRowProps {
  player: PlayerInfo;
}

const PlayerRow: React.FC<PlayerRowProps> = ({ player }) => {
  // Format birthdate to display only year
  const birthYear = new Date(player.birthdate).getFullYear();
  
  return (
    <div className="grid grid-cols-5 py-2 px-2 hover:bg-gray-50 dark:hover:bg-gray-800">
      <div className="col-span-1 text-center">{player.id}</div>
      <div className="col-span-1">{player.name}</div>
      <div className="col-span-1">{player.birthdate} ({player.age} Años)</div>
      <div className="col-span-1">{player.nationality}</div>
      <div className="col-span-1 grid grid-cols-2">
        <div>{player.height}</div>
        <div>{player.weight}</div>
      </div>
    </div>
  );
};

export default PlayerRow;
