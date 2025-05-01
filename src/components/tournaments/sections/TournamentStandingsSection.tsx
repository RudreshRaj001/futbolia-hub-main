import React from "react";
import PhaseTabs from "../PhaseTabs";
import TournamentStandings, { StandingsTeam } from "../TournamentStandings";
import {
  Tournament,
  TournamentPhase,
  TournamentGroup,
  TeamStanding,
} from "../types";
import TeamDetailSection from "./TeamDetailSection";
import { useNavigate } from "react-router-dom";

interface TournamentStandingsSectionProps {
  tournament: Tournament | null;
  selectedPhase: TournamentPhase;
  selectedGroup: TournamentGroup;
  standings: TeamStanding[];
  formattedPhases: { id: TournamentPhase; label: string }[];
  onPhaseChange: (phase: TournamentPhase) => void;
  onTeamSelect: (teamId: number) => void;
}

const TournamentStandingsSection: React.FC<any> = ({
  tournament,
  selectedPhase,
  selectedGroup,
  standings,
  formattedPhases,
  onPhaseChange,
  onTeamSelect,
}) => {
  const navigate = useNavigate();

  if (!tournament) return null;

  // Convert TeamStanding[] to StandingsTeam[]
  const formattedStandings: any[] = standings?.map((team) => ({
    position: team?.position,
    name: team?.team?.name || "", // Access nested team object
    logo: team?.team?.logo || "",
    points: team?.points,
    played: team?.played,
    won: team?.won,
    drawn: team?.drawn,
    lost: team?.lost,
    goalsFor: team?.goalsFor,
    goalsAgainst: team?.goalsAgainst,
    goalDifference: team?.goalsDiff, // Use correct field name
    group: team?.group,
    id: team?.team?.id, // Access nested id
  }));
  // Handle team click
  const handleTeamClick = (teamId: string | number | undefined) => {
    const parsedId = typeof teamId === "string" ? parseInt(teamId, 10) : teamId;
    if (parsedId && !isNaN(parsedId)) {
      // onTeamSelect(parsedId);
      navigate(`/equipos/${teamId}`);
    }
   
  };

  return (
    <>
      {/* Phase Tabs */}
      {formattedPhases?.length > 0 ? (
        <PhaseTabs
          phases={formattedPhases}
          selectedPhase={selectedPhase}
          onPhaseChange={onPhaseChange}
        />
      ) : (
        <p className="text-red-500">No Phases Found</p>
      )}

      {/* Standings */}
      <div className="p-4">
        <TournamentStandings
          teams={formattedStandings}
          selectedPhase={selectedPhase}
          selectedGroup={selectedGroup}
          tournamentId={tournament.id}
          onTeamClick={handleTeamClick}
        />
      </div>
    </>
  );
};

export default TournamentStandingsSection;
