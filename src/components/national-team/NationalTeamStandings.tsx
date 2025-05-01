import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchStandings } from "@/store/slices/standingsSlice"; // Adjust path if needed

// Define the TeamStanding interface based on the real data from the API.
interface TeamStanding {
  position: number;
  name: string;
  logo: string;
  played: number;
  points: number;
  goalDifference: number;
}

// Category definitions
const categories = [
  { id: "ligapro-b", name: "LigaPro Series B 2025" },
  { id: "ligapro-a", name: "LigaPro Serie A 2025" },
  { id: "qualifiers", name: "2026 Qualifiers" },
];

// Map each category to league & season parameters for the API request.
const categoryLeagueMap: Record<string, { league: number; season: number }> = {
  "ligapro-b": { league: 243, season: 2025 },
  "ligapro-a": { league: 242, season: 2025 },
  qualifiers: { league: 11, season: 2024 },
};

const NationalTeamStandings: React.FC = () => {
  const dispatch = useAppDispatch();
  const [activeCategory, setActiveCategory] = useState<string>("ligapro-b");

  // Retrieve standings state from Redux.
  const { standings, status, error } = useAppSelector(
    (state) => state.standings
  );

  // Whenever the active category changes, dispatch the fetchStandings thunk.
  useEffect(() => {
    const { league, season } = categoryLeagueMap[activeCategory];
    dispatch(fetchStandings({ league, season }));
  }, [dispatch, activeCategory]);

  // Extract team standings from the fetched data.
  // Your API returns a StandingsState with an array of StandingLeague objects.
  // Assuming the API returns one league in the standings array, and within that, a nested array for standings,
  // we map the first inner array.
  const teamStandings: TeamStanding[] =
    standings.length > 0 && standings[0].league.standings.length > 0
      ? standings[0].league.standings[0].map((team) => ({
          position: team.rank,
          name: team.team.name,
          logo: team.team.logo,
          played: team.all.played,
          points: team.points,
          goalDifference: team.goalsDiff,
        }))
      : [];

  return (
    <div className="bg-white rounded-md overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4">
        <h2 className="text-lg font-bold">Standings</h2>
      </div>

      {/* Category Tabs */}
      <div className="bg-gray-100 p-2 flex space-x-2 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "py-2 px-4 text-sm font-medium rounded-md whitespace-nowrap",
              activeCategory === category.id
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Standings Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-xs text-gray-500 uppercase">
              <th className="py-3 px-4 text-left w-1/12">#</th>
              <th className="py-3 px-4 text-left w-6/12">Equipo</th>
              <th className="py-3 px-4 text-center w-1/12">PJ</th>
              <th className="py-3 px-4 text-center w-1/12">Pts.</th>
              <th className="py-3 px-4 text-center w-1/12">GD</th>
            </tr>
          </thead>
          <tbody>
            {teamStandings?.map((team) => (
              <tr key={team.position} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{team.position}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="w-6 h-6 mr-3"
                    />
                    <span className="font-medium text-sm">{team.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">{team.played}</td>
                <td className="py-3 px-4 text-center">
                  <span className="font-bold text-white bg-gray-800 px-2 py-1 rounded-full text-xs">
                    {team.points}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">{team.goalDifference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {status === "loading" && (
        <div className="p-4 text-center text-gray-700">Loading standings…</div>
      )}
      {status === "failed" && (
        <div className="p-4 text-center text-red-600">Error: {error}</div>
      )}
    </div>
  );
};

export default NationalTeamStandings;
