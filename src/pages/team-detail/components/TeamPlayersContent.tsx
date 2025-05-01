import React from 'react';
import { PlayerInfo } from '@/components/tournaments/types';
import PlayersList from '@/components/tournaments/players/PlayersList';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Loader from '@/components/ui/Loader';


interface TeamPlayersContentProps {
  team: {
    id: number;
    name: string;
    logo: string;
  };
}

const TeamPlayersContent: React.FC<TeamPlayersContentProps> = ({ team }) => {
  const { players, loading, error } = useSelector((state: RootState) => state.players);

  if (loading) {
    return <Loader text="Cargando jugadores..." />;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      <PlayersList 
        players={players || []}
        teamLogo={team?.logo || ''}
        teamName={team?.name || ''}
      />
    </div>
  );
};

export default TeamPlayersContent;
