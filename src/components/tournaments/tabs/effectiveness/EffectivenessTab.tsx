import React from 'react';
import { PlayerDetails } from '../../mockTopScorersData';

interface EffectivenessTabProps {
  player: PlayerDetails;
}

const EffectivenessTab: React.FC<any> = ({ player }) => {
  const { goals = 0, stats } = player;
  const shots = stats?.shots || {};

  const totalShots = shots.total || 0;
  const onTarget = shots.onTarget || 0;
  const atPost = shots.atPost || 0;
  const outside = totalShots - (goals + onTarget + atPost); // fallback for "missed"

  const effectiveness = totalShots > 0 ? ((goals / totalShots) * 100).toFixed(2) : "0.00";
  const dashOffset = 100 - parseFloat(effectiveness); // For circular progress

  return (
    <div className="p-6">
      {/* Effectiveness Chart */}
      <div className="flex items-center justify-center mb-8">
        <div className="text-center">
          <div className="relative w-36 h-36">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {effectiveness}%
              </div>
            </div>
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#eee"
                strokeWidth="3"
                className="dark:stroke-gray-700"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#fde047"
                strokeWidth="3"
                strokeDasharray="100, 100"
                strokeDashoffset={dashOffset}
              />
            </svg>
          </div>
          <div className="mt-2 text-gray-500 dark:text-gray-300 text-sm">Efectividad</div>
        </div>
      </div>

      {/* Shot Stats Summary */}
      <div className="flex items-center justify-center gap-8">
        <div className="text-center">
          {/* <div className="flex items-end justify-center mb-1">
            <img
              src="/lovable-uploads/f98ce377-afbb-4ccf-95ba-aefeafdc0448.png"
              alt="Goal net"
              className="w-40 h-20 object-contain"
            />
          </div> */}

          <div className="flex justify-between">
            <div className="bg-green-400 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
              {goals}
            </div>
            <div className="bg-yellow-400 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
              {onTarget}
            </div>
            <div className="bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
              {atPost}
            </div>
            <div className="bg-red-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
              {outside}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1 mt-2">
            <div className="bg-gray-900 text-white text-xs p-1 rounded text-center">Goles</div>
            <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs p-1 rounded text-center">Al arco</div>
            <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs p-1 rounded text-center">Al palo</div>
            <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs p-1 rounded text-center">Afuera</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EffectivenessTab;
