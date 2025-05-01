
import React from 'react';
import { cn } from '@/lib/utils';

interface QualifiersCompareSectionProps {
  type: 'equipment' | 'players';
}

const QualifiersCompareSection: React.FC<QualifiersCompareSectionProps> = ({ type }) => {
  return (
    <div className="bg-white rounded-md overflow-hidden shadow-sm">
      <div className="bg-gray-900 text-white p-4">
        <h2 className="text-lg font-bold">Compare {type}</h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden mb-3">
              <img 
                src="https://via.placeholder.com/200?text=Player" 
                alt="Player 1" 
                className="w-full h-full object-cover" 
              />
            </div>
            <p className="text-xs text-center text-gray-600 uppercase mb-1">
              {type === 'players' ? 'POSICIÓN' : 'NOMBRE DEL EQUIPO'}
            </p>
            <div className={cn(
              "w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center mb-3",
              type === 'players' ? 'bg-gray-50' : ''
            )}></div>
            <button className="bg-gray-900 text-white px-4 py-2 rounded text-sm font-medium w-full">
              {type === 'players' ? 'CAMBIAR JUGADOR' : 'ELEGIR EQUIPO'}
            </button>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden mb-3">
              <img 
                src="https://via.placeholder.com/200?text=Player" 
                alt="Player 2" 
                className="w-full h-full object-cover" 
              />
            </div>
            <p className="text-xs text-center text-gray-600 uppercase mb-1">
              {type === 'players' ? 'POSICIÓN' : 'NOMBRE DEL EQUIPO'}
            </p>
            <div className={cn(
              "w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center mb-3",
              type === 'players' ? 'bg-gray-50' : ''
            )}></div>
            <button className="bg-gray-900 text-white px-4 py-2 rounded text-sm font-medium w-full">
              {type === 'players' ? 'CAMBIAR JUGADOR' : 'ELEGIR EQUIPO'}
            </button>
          </div>
        </div>
        
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            VS
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default QualifiersCompareSection;
