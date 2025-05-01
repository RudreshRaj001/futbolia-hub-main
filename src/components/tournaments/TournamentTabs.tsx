import React from "react";
import { cn } from "@/lib/utils";
import { Tournament } from "./types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { tournamentRoutes } from "@/utils/tournamentRoutes";

interface TournamentTabsProps {
  tournaments: Tournament[];
  selectedTournament: Tournament | null;
  onTournamentChange: (tournament: Tournament) => void;
}

const TournamentTabs: React.FC<TournamentTabsProps> = ({
  tournaments,
  selectedTournament,
  onTournamentChange,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTournamentSelection = (tournament: Tournament) => {
    onTournamentChange(tournament);

    const currentPath = location.pathname;
    const section = currentPath.includes("/posiciones")
      ? "posiciones"
      : currentPath.includes("/goleadores")
      ? "goleadores"
      : currentPath.includes("/equipos")
      ? "equipos"
      : currentPath.includes("/noticias")
      ? "noticias"
      : currentPath.includes("/planteles")
      ? "planteles"
      : "";

    let routePath = tournamentRoutes[tournament.id];
    if (!routePath) {
      routePath = tournament.id
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    }
    const basePath = `/torneos/${routePath}`;
    const newPath = section ? `${basePath}/${section}` : basePath;
    navigate(newPath);
  };

  if (!selectedTournament) return null; // <- SAFEGUARD: Prevent rendering if null

  const desktopTabs = (
    <div className="hidden md:flex space-x-1 min-w-max overflow-x-auto">
      {tournaments?.map((tournament) => (
        <button
          key={tournament.id}
          onClick={() => handleTournamentSelection(tournament)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap",
            selectedTournament && selectedTournament.id === tournament.id
              ? "bg-blue-800 text-white"
              : "bg-gray-700 text-gray-200 hover:bg-gray-600"
          )}
        >
          {tournament.name}
        </button>
      ))}
    </div>
  );

  const mobileDropdown = (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap bg-blue-800 text-white flex items-center justify-between">
          <span>{selectedTournament?.name || "Selecciona torneo"}</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px] bg-white dark:bg-gray-800 z-50">
          {tournaments.map((tournament) => (
            <DropdownMenuItem
              key={tournament.id}
              onClick={() => handleTournamentSelection(tournament)}
              className={cn(
                "cursor-pointer",
                selectedTournament &&
                  selectedTournament.id === tournament.id &&
                  "bg-blue-100 dark:bg-blue-900"
              )}
            >
              {tournament.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <div className="overflow-x-auto bg-gray-800 p-2">
      {mobileDropdown}
      {desktopTabs}
    </div>
  );
};

export default TournamentTabs;
