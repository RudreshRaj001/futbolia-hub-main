
import React from 'react';
import PhaseTabs from '../PhaseTabs';
import GroupTabs from '../GroupTabs';
import MatchdaySelection from '../MatchdaySelection';
import MatchdayFixtures from '../MatchdayFixtures';
import { Tournament, TournamentPhase, TournamentGroup, Match } from '../types';

interface TournamentCalendarSectionProps {
  tournament: Tournament;
  selectedPhase: TournamentPhase;
  selectedGroup: TournamentGroup;
  selectedMatchday: number;
  filteredMatches: Match[];
  formattedPhases: { id: TournamentPhase; label: string }[];
  formattedGroups: { id: TournamentGroup; label: string }[];
  onPhaseChange: (phase: TournamentPhase) => void;
  onGroupChange: (group: TournamentGroup) => void;
  onMatchdayChange: (matchday: number) => void;
}

const TournamentCalendarSection: React.FC<any> = ({
  tournament,
  selectedPhase,
  selectedGroup,
  selectedMatchday,
  filteredMatches,
  formattedPhases,
  formattedGroups,
  onPhaseChange,
  onGroupChange,
  onMatchdayChange
}) => {


  console.log("check candrio data",  filteredMatches)
  return (
    <>
      {/* Phase Tabs - Only show if tournament has phases */}
      {tournament?.phases?.length > 0 && (
        <PhaseTabs 
          phases={formattedPhases}
          selectedPhase={selectedPhase}
          onPhaseChange={onPhaseChange}
        />
      )}
      
      {/* Group Tabs - Only shown for group phases and if tournament has groups */}
      {selectedPhase === 'fase-de-grupos' && tournament.groups.length > 0 && (
        <GroupTabs 
          groups={formattedGroups}
          selectedGroup={selectedGroup}
          onGroupChange={onGroupChange}
        />
      )}
      
      {/* Matchday Selection - Only show if tournament has matchdays */}
      {tournament?.matchdays.length > 0 && (
        <MatchdaySelection 
          matchdays={tournament.matchdays}
          selectedMatchday={selectedMatchday}
          onMatchdayChange={onMatchdayChange}
        />
      )}
      
      {/* Fixtures/Match Results */}
      <MatchdayFixtures matches={filteredMatches} />
      
      {/* Show message if no matches */}
      {filteredMatches.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No hay partidos disponibles para esta selección.
        </div>
      )}
    </>
  );
};

export default TournamentCalendarSection;
