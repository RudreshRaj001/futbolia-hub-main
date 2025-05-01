// TeamLineup.tsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LazyImage from '@/components/ui/LazyImage';

interface LineupProps {
  lineups: any[]; // Expects an array of lineup objects
}

const TeamLineup: React.FC<LineupProps> = ({ lineups }) => {
  if (!lineups || lineups.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No hay datos de alineación disponibles para este partido
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-8">
      {lineups.map((lineup, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 mr-2">
                  <LazyImage 
                    src={lineup.team?.logo || '/placeholder.png'} 
                    alt={lineup.team?.name || 'Team'} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span>{lineup.team?.name}</span>
              </div>
              <div className="mt-2 md:mt-0">
                <CardDescription>Formación: {lineup.formation}</CardDescription>
              </div>
            </CardTitle>
            {lineup.coach && (
              <div className="flex items-center mt-2">
                <div className="w-8 h-8 mr-2">
                  <LazyImage 
                    src={lineup.coach?.photo || '/coach-placeholder.png'} 
                    alt={lineup.coach?.name || 'Coach'} 
                    className="w-full h-full object-contain rounded-full" 
                  />
                </div>
                <span className="text-sm font-medium">{lineup.coach?.name}</span>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {/* Start XI */}
            <div>
              <h4 className="text-sm font-medium mb-2">Titulares</h4>
              {lineup.startXI && lineup.startXI.length > 0 ? (
                lineup.startXI.map((playerObj: any, idx: number) => (
                  <div 
                    key={idx} 
                    className="flex items-center p-2 border-b border-gray-100 dark:border-gray-800"
                  >
                    <div className="w-6 text-center font-medium mr-2">
                      {playerObj.player?.number}
                    </div>
                    <div className="flex-1">{playerObj.player?.name}</div>
                    <div className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {playerObj.player?.pos}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm">No titulares disponibles.</p>
              )}
            </div>
            {/* Substitutes */}
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Suplentes</h4>
              {lineup.substitutes && lineup.substitutes.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {lineup.substitutes.map((sub: any, idx: number) => (
                    <div key={idx} className="text-sm">
                      {sub.player?.number}. {sub.player?.name}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm">No hay suplentes disponibles.</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TeamLineup;
