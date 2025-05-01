// MatchEvents.tsx
import React from 'react';

interface EventProps {
  events: any[];
}

const MatchEvents: React.FC<EventProps> = ({ events }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Eventos del partido</h3>
      
      <div className="relative border-l-2 border-gray-200 dark:border-gray-800 pl-5 ml-4 space-y-6">
        {events.map((event, index) => (
          <div key={index} className="relative">
            <div className={`absolute w-4 h-4 rounded-full -left-[23px] top-1 ${
              event.type === 'Goal'
                ? 'bg-green-500'
                : event.type === 'Card'
                  ? event.detail === 'Yellow Card'
                    ? 'bg-yellow-400'
                    : 'bg-red-500'
                  : event.type === 'Substitution'
                    ? 'bg-blue-500'
                    : 'bg-gray-400'
            }`}></div>
            
            <div className="flex items-start">
              <div className="min-w-[40px] text-sm font-medium">
                {event.time && event.time.elapsed ? `${event.time.elapsed}'` : ''}
              </div>
              <div>
                <div className="font-medium flex items-center">
                  {event.type === 'Goal' && '⚽ '}
                  {event.type === 'Card' && (event.detail === 'Yellow Card' ? '🟨 ' : '🟥 ')}
                  {event.type === 'Substitution' && '🔄 '}
                  {/* Render team and player names (not the objects) */}
                  {event.team && event.team.name} - {event.player && event.player.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {event.type === 'Goal' && (event.detail || 'Gol')}
                  {event.type === 'Card' && event.detail}
                  {event.type === 'Substitution' && `Sale: ${event.assist ? event.assist.name : 'Jugador'}`}
                  {event.type === 'Var' && 'Revisión VAR'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {events.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No hay eventos registrados para este partido
        </div>
      )}
    </div>
  );
};

export default MatchEvents;
