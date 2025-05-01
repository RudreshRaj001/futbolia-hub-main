
import React, { useState } from 'react';
import { getTopScorersByTournament, type TopScorer, type PlayerDetails } from './mockTopScorersData';
import TopScorersTable from './TopScorersTable';
import PlayerDetailsDialog from './PlayerDetailsDialog';
import { useAppSelector } from '@/store/hooks';

interface TournamentTopScorersProps {
  tournamentId: string;
  tournamentSeason?: number;
}

const TournamentTopScorers: React.FC<TournamentTopScorersProps> = ({ tournamentId ,tournamentSeason}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerDetails | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const topScorers = useAppSelector(state => state.tournaments.topScorers);

  // const topScorers = getTopScorersByTournament(tournamentId);

 
  console.log("check states",topScorers)
  const handlePlayerClick = (playerId: number) => {
    const playerData = topScorers.find((p: any) => p.player.id === playerId);
  
    if (!playerData || !Array.isArray(playerData.statistics) || playerData.statistics.length === 0) {
      console.warn('Player data or statistics missing for player ID:', playerId);
      return;
    }
  
    const stat = playerData.statistics[0];

   
  
    const playerDetails: PlayerDetails = {
      id: playerData.player.id,
      photo:playerData.player.photo,
      name: playerData.player.name,
      team: stat.team.name,
      teamLogo: stat.team.logo,
      goals: stat.goals.total || 0,
      playGoals: stat.goals.total || 0,
      headGoals: 0,
      freeKickGoals: 0,
      penaltyGoals: stat.penalty?.scored || 0,
      position: stat.games.position || "Unknown",
      birthDate: playerData.player.birth?.date ?? "N/A",
      age: playerData.player.age,
      nationality: playerData.player.nationality,
      weight: playerData.player.weight,
      height: playerData.player.height,
      matches: {
        total: stat.games.appearences || 0,
        starting: stat.games.lineups || 0,
        substitute: stat.substitutes?.in || 0
      },
      minutes: {
        total: stat.games.minutes || 0,
        starting: stat.games.minutes || 0,
        substitute: 0
      },
      stats: {
        shots: {
          total: stat.shots?.total || 0,
          onTarget: stat.shots?.on || 0,
          atPost: 0,
          inArea: 0,
          outsideArea: 0
        },
        corners: {
          total: 0,
          executed: 0
        },
        assists: {
          total: stat.goals?.assists || 0,
          received: 0
        },
        fouls: {
          committed: stat.fouls?.committed || 0,
          received: stat.fouls?.drawn || 0
        }
      }
    };
  
    setSelectedPlayer(playerDetails);
    setIsDialogOpen(true);
  };
  
  

  return (
    <>
      <TopScorersTable scorers={topScorers} onPlayerClick={handlePlayerClick} />
      <PlayerDetailsDialog 
        player={selectedPlayer} 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </>
  );
};

export default TournamentTopScorers;
