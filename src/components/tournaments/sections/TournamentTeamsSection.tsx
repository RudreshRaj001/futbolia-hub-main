import React from "react";
import TeamIconSlider from "@/components/teams/TeamIconSlider";
import { Tournament } from "../types";
import TournamentNewsSection from "./TournamentNewsSection";

interface TournamentTeamsSectionProps {
  selectedTeamId: number | null;
  onTeamSelect: (teamId: number) => void;
  selectedTeam: any | null;
  selectedTournament: Tournament;
  tournamentNews: any[];
}

const TournamentTeamsSection: React.FC<TournamentTeamsSectionProps> = ({
  selectedTeamId,
  onTeamSelect,
  selectedTeam,
  selectedTournament,
  tournamentNews,
}) => {
  return (
    <div>
      {/* Team Icon Slider */}
      <TeamIconSlider onTeamSelect={onTeamSelect} selectedTeamId={selectedTeamId} />
      <div className="p-8 text-center text-gray-500">
          Selecciona un equipo para ver su información.
        </div>

        <TournamentNewsSection
        tournament={selectedTournament}
        tournamentNews={tournamentNews}
      />
      
      {/* Team Details */}
      {/* {selectedTeam ? (
        <div className="p-4">
          <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="w-24 h-24 bg-white rounded-full p-2 flex items-center justify-center mb-4 shadow-md">
              <img 
                src={selectedTeam.logo} 
                alt={selectedTeam.name} 
                className="w-20 h-20 object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">{selectedTeam.name}</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center mb-4">
              <p>Ciudad: {selectedTeam.city}</p>
              <p>Fundado en: {selectedTeam.founded}</p>
              <p>Estadio: {selectedTeam.stadium || "Estadio Principal"}</p>
            </div>
            
            <h3 className="text-lg font-semibold mt-4 mb-2">Plantilla</h3>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 w-full">
              <div className="p-3 bg-blue-900 text-white font-bold">
                Arqueros
              </div>
              <div className="p-4">
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Información de arqueros estará disponible pronto.
                </p>
              </div>
              
              <div className="p-3 bg-blue-900 text-white font-bold">
                Defensores
              </div>
              <div className="p-4">
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Información de defensores estará disponible pronto.
                </p>
              </div>
              
              <div className="p-3 bg-blue-900 text-white font-bold">
                Volantes
              </div>
              <div className="p-4">
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Información de volantes estará disponible pronto.
                </p>
              </div>
              
              <div className="p-3 bg-blue-900 text-white font-bold">
                Delanteros
              </div>
              <div className="p-4">
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Información de delanteros estará disponible pronto.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          Selecciona un equipo para ver su información.
        </div>
      )} */}
    </div>
  );
};

export default TournamentTeamsSection;
