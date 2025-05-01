
import React from 'react';
import { TournamentPhase, TournamentGroup } from './types';
import TeamGroupTable from './standings/TeamGroupTable';
import StandingsLegend from './standings/StandingsLegend';
import { formatGroupName } from './standings/formatHelpers';
import { useNavigate } from 'react-router-dom';

export interface StandingsTeam {
  position: number;
  name: string;
  logo: string;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  form?: string;         // Optional: present in your data
  group?: string;
  id: number;            // Required since team.id always exists
}


interface TournamentStandingsProps {
  teams: StandingsTeam[];
  selectedPhase: TournamentPhase;
  selectedGroup?: TournamentGroup;
  tournamentId: string;
  onTeamClick?: (teamId: string | number | undefined) => void;
}

const TournamentStandings: React.FC<TournamentStandingsProps> = ({
  teams,
  selectedPhase,
  selectedGroup,
  tournamentId,
  onTeamClick
}) => {
  const navigate = useNavigate();

  
  // Group teams by their group if needed
  const groupedTeams: Record<string, StandingsTeam[]> = {};
  
  // For group phase, organize teams by their groups
  if (selectedPhase === 'fase-de-grupos' && teams.some(team => team.group)) {
    teams.forEach(team => {
      const groupKey = team.group || 'Sin Grupo';
      if (!groupedTeams[groupKey]) {
        groupedTeams[groupKey] = [];
      }
      groupedTeams[groupKey].push(team);
    });
  } else {
    // For non-group phases, just use a single group
    groupedTeams['all'] = teams;
  }

  // Handle team click
  const handleTeamClick = (teamId: string | number | undefined) => {
   
    if (onTeamClick) {
      onTeamClick(teamId);
    } else {
      // If no onTeamClick provided, navigate to team detail page
      if (teamId) {
        navigate(`/equipos/${teamId}`);
      }
    }
  };

  return (
    <div className="tournament-standings">
      {Object.entries(groupedTeams).map(([groupName, groupTeams]) => (
        <TeamGroupTable 
          key={groupName}
          groupName={groupName}
          groupTeams={groupTeams}
          tournamentId={tournamentId}
          selectedPhase={selectedPhase}
          formatGroupName={formatGroupName}
          onTeamClick={handleTeamClick}
        />
      ))}
      
      <StandingsLegend 
        tournamentId={tournamentId}
        selectedPhase={selectedPhase}
      />
    </div>
  );
};

export default TournamentStandings;
