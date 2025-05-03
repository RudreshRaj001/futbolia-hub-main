import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchTopScorers, fetchTournaments } from "@/store/slices/tournamentsSlice";

// ✅ Lazy-loaded UI components
const LoadingSpinner = lazy(() => import("@/components/ui/LoadingSpinner"));
const ErrorMessage = lazy(() => import("@/components/ui/ErrorMessage"));

const TopScorersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector((state) => state.tournaments.tournaments);
  const topScorers = useAppSelector((state) => state.tournaments.topScorers);
  const loading = useAppSelector((state) => state.tournaments.loading);
  const error = useAppSelector((state) => state.tournaments.error);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"goals" | "matches">("goals");
  const [selectedTournamentId, setSelectedTournamentId] = useState("242");
  const [visibleCount, setVisibleCount] = useState(10);

  const selectedTournament = tournaments.find((t) => t.id == selectedTournamentId);

  useEffect(() => {
    if (tournaments.length === 0) {
      dispatch(fetchTournaments());
    }
  }, [dispatch, tournaments.length]);

  useEffect(() => {
    if (selectedTournamentId) {
      dispatch(
        fetchTopScorers({
          tournamentId: selectedTournamentId,
          season: selectedTournament?.season ?? 2025,
        })
      );
    }
  }, [dispatch, selectedTournamentId, selectedTournament?.season]);

  const filteredScorers = useMemo(() => {
    const query = search.toLowerCase();
    const filtered = topScorers.filter((s) =>
      s.player.name.toLowerCase().includes(query)
    );

    return filtered.sort((a, b) => {
      const aStats = a.statistics[0];
      const bStats = b.statistics[0];
      return sortBy === "goals"
        ? bStats.goals.total - aStats.goals.total
        : bStats.games.appearences - aStats.games.appearences;
    });
  }, [topScorers, search, sortBy]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setVisibleCount((prev) => prev + 10);
    }
  };

  return (
    <div className="py-8">
      {/* Controls */}
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
            {tournaments.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <Suspense fallback={<div className="text-center">Cargando...</div>}>
          <div className="flex justify-center py-10">
            <LoadingSpinner />
          </div>
        </Suspense>
      ) : error ? (
        <Suspense fallback={<div className="text-center text-red-500">Error</div>}>
          <ErrorMessage message={error} />
        </Suspense>
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
                    <td className="px-4 py-3 font-semibold text-center">{index + 1}</td>
                    <td className="px-4 py-3">
                      <Link to={`/jugadores/${scorer.player.id}`} className="flex items-center space-x-2 hover:underline">
                        <img src={scorer.player.photo} alt={scorer.player.name} className="w-6 h-6 rounded-full" />
                        <span>{scorer.player.name}</span>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/equipos/${stats.team.id}`} className="flex items-center space-x-2 hover:underline">
                        <img src={stats.team.logo} alt={stats.team.name} className="w-5 h-5" />
                        <span>{stats.team.name}</span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-bold">{stats.goals.total}</td>
                    <td className="px-4 py-3">{stats.games.appearences}</td>
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
