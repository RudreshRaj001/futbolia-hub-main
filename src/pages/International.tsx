import React, { useEffect, useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import InternationalHeader from "@/components/international/InternationalHeader";
import Advertisement from "@/components/ads/Advertisement";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTournaments, fetchTournamentStandings } from "@/store/slices/tournamentsSlice";
import { fetchNews } from "@/store/slices/newsSlice";
import { useIsMobile } from "@/hooks/use-mobile";

// ✅ Lazy-loaded components
const InternationalNewsList = lazy(() => import("@/components/international/InternationalNewsList"));
const InternationalVideoSection = lazy(() => import("@/components/international/InternationalVideoSection"));
const FixtureCalendar = lazy(() => import("@/components/calendar/FixtureCalendar"));
const StandingsTable = lazy(() => import("@/components/abroad/StandingsTable"));

const International: React.FC = () => {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector((state) => state.tournaments.tournaments);
  const standings = useAppSelector((state) => state.tournaments.standings);
  const { news } = useAppSelector((state) => state.news);

  const [activeTab, setActiveTab] = useState<string>("242");
  const [season, setSeason] = useState<number>(2025);
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchNews({ search: "abroad" }));
    dispatch(fetchTournaments());
  }, [dispatch]);

  useEffect(() => {
    if (activeTab) {
      dispatch(fetchTournamentStandings({ tournamentId: activeTab, season }));
    }
  }, [activeTab, season, dispatch]);

  const mappedStandings = standings.map((team) => ({
    position: team.position,
    name: team.team.name,
    logo: team.team.logo,
    played: team.played,
    points: team.points,
    goalDiff: team.goalsDiff,
    id: team.team.id,
  }));

  return (
    <main className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Main content */}
        <div className="lg:col-span-2">
          <InternationalHeader />
          <Suspense fallback={<div>Loading news...</div>}>
            <InternationalNewsList />
          </Suspense>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Suspense fallback={<div>Loading video...</div>}>
            <InternationalVideoSection />
          </Suspense>

          <Advertisement size="sidebar" />

          <Suspense fallback={<div>Loading calendar...</div>}>
            <FixtureCalendar className="h-full" />
          </Suspense>

          {/* Standings Table */}
          <div className="card">
            <div className="card-header">
              <h3 className="font-bold text-xl">Standings</h3>
            </div>
            <div className="card-content p-0">
              <div className="flex space-x-2 py-2 overflow-x-auto scrollbar-hide">
                {tournaments.map((tournament) => (
                  <button
                    key={tournament.id}
                    onClick={() => {
                      setActiveTab(tournament.id.toString());
                      setSeason(tournament.season);
                    }}
                    className={`${
                      activeTab === tournament.id.toString()
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-800"
                    } px-3 py-1.5 rounded-full text-xs whitespace-nowrap`}
                  >
                    {tournament.name}
                  </button>
                ))}
              </div>
              <Suspense fallback={<div>Loading standings...</div>}>
                <StandingsTable standings={mappedStandings} />
              </Suspense>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default International;
