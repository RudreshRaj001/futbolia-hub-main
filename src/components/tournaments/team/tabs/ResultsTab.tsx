
import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { matches } from '@/data/matches';

interface ResultsTabProps {
  team: any;
}

const ResultsTab: React.FC<ResultsTabProps> = ({ team }) => {
  // Filter matches for this team (both home and away)
  const teamMatches = matches
    .filter(match => match.homeTeam === team.name || match.awayTeam === team.name)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date descending (most recent first)
    .slice(0, 5); // Get only the 5 most recent matches

  const getResultStyle = (match: any) => {
    if (match.status !== 'completed') return 'bg-gray-100 dark:bg-gray-700'; // Not played yet
    
    const isHomeTeam = match.homeTeam === team.name;
    const teamScore = isHomeTeam ? match.homeScore : match.awayScore;
    const opponentScore = isHomeTeam ? match.awayScore : match.homeScore;
    
    if (teamScore > opponentScore) return 'bg-green-100 dark:bg-green-800/40 text-green-800 dark:text-green-300'; // Win
    if (teamScore < opponentScore) return 'bg-red-100 dark:bg-red-800/40 text-red-800 dark:text-red-300'; // Loss
    return 'bg-yellow-100 dark:bg-yellow-800/40 text-yellow-800 dark:text-yellow-300'; // Draw
  };

  const getResultText = (match: any) => {
    if (match.status !== 'completed') return 'vs';
    
    const isHomeTeam = match.homeTeam === team.name;
    const teamScore = isHomeTeam ? match.homeScore : match.awayScore;
    const opponentScore = isHomeTeam ? match.awayScore : match.homeScore;
    
    if (teamScore > opponentScore) return 'Victoria';
    if (teamScore < opponentScore) return 'Derrota';
    return 'Empate';
  };

  return (
    <div className="p-4">
      <div className="max-w-xl mx-auto p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Últimos 5 Resultados</h3>
        
        {teamMatches.length > 0 ? (
          <div className="space-y-3">
            {teamMatches.map((match, index) => {
              const isHomeTeam = match.homeTeam === team.name;
              const opponentTeam = isHomeTeam ? match.awayTeam : match.homeTeam;
              const matchDate = new Date(match.date);
              
              return (
                <div key={match.id} className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="text-xs text-gray-500 mb-1">
                    {match.competition} - {match.matchday}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6">
                        <img src={team.logo} alt={team.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="font-medium">{team.name}</span>
                    </div>
                    
                    <div className={`px-2 py-1 rounded font-bold text-sm ${getResultStyle(match)}`}>
                      {match.status === 'completed' ? 
                        `${match.homeScore} - ${match.awayScore}` : 
                        'vs'
                      }
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{opponentTeam}</span>
                      <div className="w-6 h-6">
                        {/* We don't have opponent logos in the matches data, so we'll leave this empty for now */}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-xs text-gray-500">
                      {format(matchDate, "dd 'de' MMMM, yyyy", { locale: es })}
                    </div>
                    {match.status === 'completed' && (
                      <div className="text-xs font-medium">
                        {getResultText(match)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            No se encontraron partidos recientes para este equipo.
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsTab;
