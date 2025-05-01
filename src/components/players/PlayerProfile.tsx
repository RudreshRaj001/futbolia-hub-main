
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Flag, 
  Ruler, 
  Weight, 
  Calendar, 
  ShirtIcon, 
  Trophy, 
  Activity 
} from "lucide-react";
import LazyImage from '@/components/ui/LazyImage';

interface PlayerProfileProps {
  player: any;
  statistics?: any;
}

const PlayerProfile: React.FC<PlayerProfileProps> = ({ player, statistics }) => {
  // Format birthdate
  const formatBirthDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Calculate age
  const calculateAge = (birthDateString: string) => {
    if (!birthDateString) return 'N/A';
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="w-full">
      {/* Player Info Card */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
              <LazyImage
                src={player.photo || '/placeholder.svg'}
                alt={player.name || 'Player Photo'}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <CardTitle className="text-2xl">{player.name || 'Player Name'}</CardTitle>
                <Badge variant="secondary">{player.position || 'Position'}</Badge>
              </div>
              <CardDescription>
                {player.team?.name || 'Team Name'}
              </CardDescription>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
                <div className="flex items-center gap-1 text-sm">
                  <Flag className="h-4 w-4" />
                  <span>{player.nationality || 'Nationality'}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Ruler className="h-4 w-4" />
                  <span>{player.height || 'N/A'} cm</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Weight className="h-4 w-4" />
                  <span>{player.weight || 'N/A'} kg</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{calculateAge(player.birth?.date) || 'N/A'} años</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <ShirtIcon className="h-4 w-4" />
                  <span>{player.number || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Información Personal</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Nombre completo:</span>
                  <span className="font-medium">{player.name || 'N/A'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Fecha de nacimiento:</span>
                  <span className="font-medium">{formatBirthDate(player.birth?.date) || 'N/A'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Lugar de nacimiento:</span>
                  <span className="font-medium">{player.birth?.place || 'N/A'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Nacionalidad:</span>
                  <span className="font-medium">{player.nationality || 'N/A'}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Estadísticas Clave</h3>
              {statistics ? (
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Minutos jugados</span>
                      <span className="text-sm font-medium">{statistics.minutes || 0}</span>
                    </div>
                    <Progress value={statistics.minutes ? Math.min(statistics.minutes / 900 * 100, 100) : 0} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Goles</span>
                      <span className="text-sm font-medium">{statistics.goals?.total || 0}</span>
                    </div>
                    <Progress value={statistics.goals?.total ? Math.min(statistics.goals.total / 10 * 100, 100) : 0} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Asistencias</span>
                      <span className="text-sm font-medium">{statistics.goals?.assists || 0}</span>
                    </div>
                    <Progress value={statistics.goals?.assists ? Math.min(statistics.goals.assists / 10 * 100, 100) : 0} className="h-2" />
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No hay estadísticas disponibles
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        {statistics && (
          <CardFooter className="border-t pt-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Goles</div>
                <div className="font-semibold">{statistics.goals?.total || 0}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Asistencias</div>
                <div className="font-semibold">{statistics.goals?.assists || 0}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 flex items-center justify-center text-yellow-500 font-bold">T</div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Tarjetas</div>
                <div className="font-semibold">
                  {statistics.cards?.yellow || 0}🟨 {statistics.cards?.red || 0}🟥
                </div>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default PlayerProfile;
