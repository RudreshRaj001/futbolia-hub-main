import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
import InternationalHeader from "@/components/international/InternationalHeader";
import InternationalNewsList from "@/components/international/InternationalNewsList";
import InternationalVideoSection from "@/components/international/InternationalVideoSection";
import InternationalCalendar from "@/components/international/InternationalCalendar";
import Advertisement from "@/components/ads/Advertisement";
import { useAppDispatch, useAppSelector } from "@/store/hooks"; // Assuming you use Redux for state management
import { fetchTournaments, fetchTournamentStandings } from "@/store/slices/tournamentsSlice";
import StandingsTable from "@/components/abroad/StandingsTable"; // Import StandingsTable component
import { useIsMobile } from "@/hooks/use-mobile";
import { fetchNews } from "@/store/slices/newsSlice";
import FixtureCalendar from "@/components/calendar/FixtureCalendar";

const International = () => {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector((state) => state.tournaments.tournaments); // Fetch tournaments from Redux store
  const standings = useAppSelector((state) => state.tournaments.standings); // Fetch standings from Redux store
  const { news, status, error } = useAppSelector((state) => state.news);
  const [activeTab, setActiveTab] = useState<string>('242'); // Default to the first tournament
   const[season, setSeason] = useState<any>(2025);

  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchNews({ search: "abroad" }));
    dispatch(fetchTournaments()); // Fetch tournaments data
  }, [dispatch]);

  useEffect(() => {
    if (activeTab) {
      dispatch(fetchTournamentStandings({ tournamentId: activeTab, season: season })) // Fetch standings based on the selected tournament
    }
  }, [activeTab, dispatch]);

  // Map the API standings data to match the TeamStanding format
  const mappedStandings = standings.map((team) => ({
    position: team.position,
    name: team.team.name,
    logo: team.team.logo,
    played: team.played,
    points: team.points,
    goalDiff: team.goalsDiff ,
    id: team.team.id,
  }));

  return (
    <>
      {/* <Navbar /> */}
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Main content area - News list */}
          <div className="lg:col-span-2">
            <InternationalHeader />
            <InternationalNewsList />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <InternationalVideoSection />
            <Advertisement size="sidebar" />
            {/* <InternationalCalendar /> */}
            <FixtureCalendar className="h-full" />
            
            {/* Standings Table */}
            <div className="card">
              <div className="card-header">
                <h3 className="font-bold text-xl">Standings</h3>
              </div>
              <div className="card-content p-0">
                {/* Add tournament selection if needed */}
                <div className="flex space-x-2 py-2 overflow-x-auto scrollbar-hide">
                  {tournaments.map((tournament) => (
                    <button
                      key={tournament.id}
                      onClick={() =>{
                        setActiveTab(tournament.id.toString())
                        setSeason(tournament.season)
                      } }
                      className={`${
                        activeTab === tournament.id.toString()
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-800'
                      } px-3 py-1.5 rounded-full text-xs whitespace-nowrap`}
                    >
                      {tournament.name}
                    </button>
                  ))}
                </div>

                {/* Pass mapped standings to StandingsTable */}
                <StandingsTable standings={mappedStandings} />
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default International;
