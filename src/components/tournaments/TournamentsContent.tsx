import React, { useState, useEffect } from "react";
import TournamentTabs from "./TournamentTabs";
import SectionTabs from "./SectionTabs";
import { useTournamentData } from "./hooks/useTournamentData";
import TournamentNewsSection from "./sections/TournamentNewsSection";
import TournamentCalendarSection from "./sections/TournamentCalendarSection";
import TournamentStandingsSection from "./sections/TournamentStandingsSection";
import TournamentTopScorersSection from "./sections/TournamentTopScorersSection";
import TournamentTeamsSection from "./sections/TournamentTeamsSection";
import { Loader2, AlertCircle } from "lucide-react";

const TournamentsContent: React.FC = () => {
  const [showTimeout, setShowTimeout] = useState(false);
  
  const {
    tournaments,
    selectedTournament,
    selectedSection,
    selectedPhase,
    selectedGroup,
    selectedMatchday,
    filteredMatches,
    selectedTeamId,
    tournamentNews,
    standings,
    selectedTeam,
    teamPlayers,
    formattedPhases,
    formattedGroups,
    handleTournamentChange,
    handleSectionChange,
    handleTeamSelect,
    setSelectedPhase,
    setSelectedGroup,
    setSelectedMatchday,
    setSelectedTeamId,
    loading,
    error,
  } = useTournamentData();



  useEffect(() => {
    if (loading) {
      const timeoutId = setTimeout(() => {
        setShowTimeout(true);
      }, 8000);

      return () => clearTimeout(timeoutId);
    } else {
      setShowTimeout(false);
    }
  }, [loading]);

  const handleTeamClick = (teamId: string | number | undefined) => {
    handleTeamSelect(Number(teamId));
    handleSectionChange("equipos");
  };

  // Force showing content if timeout occurred
  const shouldShowContent = !loading || showTimeout;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="p-4 bg-gray-900 text-white font-bold text-lg">
        Torneos
      </div>

      <div className="overflow-x-auto">
        {/* Tournament Selection Tabs */}
        <TournamentTabs
          tournaments={tournaments}
          selectedTournament={selectedTournament}
          onTournamentChange={handleTournamentChange}
        />
      </div>

      <div className="overflow-x-auto">
        {/* Section Tabs (Noticias, Calendario, Posiciones, etc.) */}
        <SectionTabs
          selectedSection={selectedSection}
          onSectionChange={handleSectionChange}
        />
      </div>

      {loading && !showTimeout ? (
        <div className="flex flex-col justify-center items-center p-12">
          <div className="flex items-center mb-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <span className="ml-2 text-lg">Cargando datos del torneo...</span>
          </div>
          <p className="text-sm text-gray-500">
            Si esto tarda demasiado, se mostrarán datos de muestra
          </p>
        </div>
      ) : (
        <>
          {/* Show error if any */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-300 p-4 mb-4 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Error al cargar datos</p>
                <p className="text-sm">{error}</p>
                <p className="text-xs mt-1">Mostrando datos de ejemplo</p>
              </div>
            </div>
          )}

          {/* If News section is selected */}
          {selectedSection === "noticias" && (
            <TournamentNewsSection
              tournament={selectedTournament}
              tournamentNews={tournamentNews}
            />
          )}

          {/* If Calendar section is selected */}
          {selectedSection === "calendario" && (
            <TournamentCalendarSection
              tournament={selectedTournament}
              selectedPhase={selectedPhase}
              selectedGroup={selectedGroup}
              selectedMatchday={selectedMatchday}
              filteredMatches={filteredMatches}
              formattedPhases={formattedPhases}
              formattedGroups={formattedGroups}
              onPhaseChange={setSelectedPhase}
              onGroupChange={setSelectedGroup}
              onMatchdayChange={setSelectedMatchday}
            />
          )}

          {/* If Positions section is selected */}
          {selectedSection === "posiciones" && !selectedTeamId && (
            <TournamentStandingsSection
              tournament={selectedTournament}
              selectedPhase={selectedPhase}
              selectedGroup={selectedGroup}
              standings={standings}
              formattedPhases={formattedPhases}
              onPhaseChange={setSelectedPhase}
              onTeamSelect={handleTeamClick}
            />
          )}

          {/* If Top Scorers section is selected */}
          {selectedSection === "goleadores" && !selectedTeamId && (
            <TournamentTopScorersSection tournament={selectedTournament} />
          )}

          {/* If Teams section is selected */}
          {selectedSection === "equipos" && !selectedTeamId && (
            <TournamentTeamsSection
              selectedTournament={selectedTournament}
              tournamentNews={tournamentNews}
              selectedTeamId={selectedTeamId}
              onTeamSelect={handleTeamSelect}
              selectedTeam={selectedTeam}
            />
          )}

          {/* {selectedSection === 'comparativa' && !selectedTeamId && (
             <TeamCompare />
          )} */}

          {/* Team Detail View - show when a team is selected */}
          {/* {(selectedTeamId && selectedTeam) && (
            <TeamDetailSection 
              team={selectedTeam}
              tournamentName={selectedTournament.name}
              onBack={() => setSelectedTeamId(null)}
              isOpen={!!selectedTeamId}
            />
          )} */}
        </>
      )}
    </div>
  );
};

export default TournamentsContent;
