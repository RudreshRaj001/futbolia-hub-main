import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import ErrorMessage from "@/components/ui/ErrorMessage";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { fetchTopScorers, fetchTournaments } from "@/store/slices/tournamentsSlice";

const TopScorersPage: React.FC = () => {
  const dispatch = useAppDispatch();

  // Get tournaments and top scorers state from Redux
  const tournaments = useAppSelector((state) => state.tournaments.tournaments);
  const topScorers = useAppSelector((state) => state.tournaments.topScorers);
  const loading = useAppSelector((state) => state.tournaments.loading);
  const error = useAppSelector((state) => state.tournaments.error);

  // Local component state
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"goals" | "matches">("goals");
  const [selectedTournamentId, setSelectedTournamentId] = useState("242");
  const [visibleCount, setVisibleCount] = useState(10);

  // On mount, fetch tournaments if not already loaded.
  useEffect(() => {
    if (tournaments.length === 0) {
      dispatch(fetchTournaments());
    }
  }, [dispatch, tournaments.length]);

  const tournament = tournaments.find(t => t.id == selectedTournamentId);

  console.log("check tournament", selectedTournamentId, tournaments,tournament);

  // Whenever selected tournament changes, fetch its top scorers.
  useEffect(() => {
    // dispatch(fetchTopScorers(selectedTournamentId));
     dispatch(fetchTopScorers({ tournamentId:selectedTournamentId, season:tournament.season|| 2025 }));
  }, [dispatch, selectedTournamentId]);

  // Filter and sort the top scorers list according to search and sort criteria.
  const filteredScorers = useMemo(() => {
    const filtered = topScorers.filter((scorer) =>
      scorer.player.name.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.sort((a, b) => {
      const aStats = a.statistics[0];
      const bStats = b.statistics[0];
      return sortBy === "goals"
        ? bStats.goals.total - aStats.goals.total
        : bStats.games.appearences - aStats.games.appearences;
    });
  }, [topScorers, search, sortBy]);

  // Increase visible count when scrolling to the bottom
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight;
    if (bottom) {
      setVisibleCount((prev) => prev + 10);
    }
  };

  console.log("turnaments data ", topScorers);

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Buscar jugador:</label>
          <input
            type="text"
            placeholder="Nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Ordenar por:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "goals" | "matches")}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option value="goals">Goles</option>
            <option value="matches">Partidos</option>
          </select>

          <label className="text-sm font-medium">Torneo:</label>
          <select
            value={selectedTournamentId}
            onChange={(e) => setSelectedTournamentId(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            {tournaments.map((tournament) => (
              <option key={tournament.id} value={tournament.id}>
                {tournament.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <div
          onScroll={handleScroll}
          className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 max-h-[70vh] overflow-y-auto"
        >
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800/50 text-left uppercase font-medium text-gray-600 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Pos</th>
                <th className="px-4 py-3">Jugador</th>
                <th className="px-4 py-3">Equipo</th>
                <th className="px-4 py-3">Goles</th>
                <th className="px-4 py-3">Partidos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredScorers.slice(0, visibleCount).map((scorer, index) => {
                const stats = scorer.statistics[0];
                return (
                  <motion.tr
                    key={scorer.player.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"
                  >
                    <td className="px-4 py-3 font-semibold text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/jugadores/${scorer.player.id}`}
                        className="flex items-center space-x-2 hover:underline"
                      >
                        <img
                          src={scorer.player.photo}
                          alt={scorer.player.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span>{scorer.player.name}</span>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/equipos/${stats.team.id}`}
                        className="flex items-center space-x-2 hover:underline"
                      >
                        <img
                          src={stats.team.logo}
                          alt={stats.team.name}
                          className="w-5 h-5"
                        />
                        <span>{stats.team.name}</span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-bold">
                      {stats.goals.total}
                    </td>
                    <td className="px-4 py-3">
                      {stats.games.appearences}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TopScorersPage;
