
import React from 'react';
import TournamentTopScorers from '../TournamentTopScorers';
import { Tournament } from '../types';

interface TournamentTopScorersSectionProps {
  tournament: Tournament;
}

const TournamentTopScorersSection: React.FC<TournamentTopScorersSectionProps> = ({
  tournament
}) => {
  console.log("tournament", tournament)
  return (
    <div className="p-4">
      <TournamentTopScorers 
        tournamentId={tournament?.id}
        tournamentSeason={tournament?.season}
      />
    </div>
  );
};

export default TournamentTopScorersSection;
