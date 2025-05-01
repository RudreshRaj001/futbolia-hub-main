
import React from 'react';
import TournamentNews from '../TournamentNews';
import { Tournament } from '../types';

interface TournamentNewsSectionProps {
  tournament: Tournament;
  tournamentNews: any[];
}

const TournamentNewsSection: React.FC<TournamentNewsSectionProps> = ({ 
  tournament, 
  tournamentNews 
}) => {
  return (
    <TournamentNews 
      tournamentId={tournament.id}
      trounamentName={tournament.name}
    />
  );
};

export default TournamentNewsSection;
