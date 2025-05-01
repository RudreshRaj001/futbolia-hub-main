import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PageTransition } from "@/utils/animations";
import { AdSection } from "@/components/home/AdSections";
import NationalTeamHeader from "@/components/national-team/NationalTeamHeader";
import NationalTeamNews from "@/components/national-team/NationalTeamNews";
import NationalTeamVideo from "@/components/national-team/NationalTeamVideo";
import NationalTeamStandings from "@/components/national-team/NationalTeamStandings";
import NationalTeamCalendar from "@/components/national-team/NationalTeamCalendar";
import LatestNationalTeamNews from "@/components/national-team/LatestNationalTeamNews";
import OlderNationalTeamNews from "@/components/national-team/OlderNationalTeamNews";
import { useAppDispatch, useAppSelector } from "@/store/hooks"; // Assuming you use Redux for state management
import {
  fetchTournaments,
  fetchTournamentStandings,
} from "@/store/slices/tournamentsSlice"; // Redux actions
import StandingsTable from "@/components/abroad/StandingsTable";
import CalendarStandingsSection from "@/components/home/CalendarStandingsSection";
import FixtureCalendar from "@/components/calendar/FixtureCalendar";

const NationalTeam: React.FC = () => {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector((state) => state.tournaments.tournaments); // Fetch tournaments from Redux store
  const standings = useAppSelector((state) => state.tournaments.standings); // Fetch standings from Redux store
  const [activeTab, setActiveTab] = useState<string>("242"); // Default to the first tournament (e.g., Liga Pro)
  const [season, setSeason] = useState<any>(2025); // Default season

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchTournaments()); // Fetch tournaments data
  }, [dispatch]);

  useEffect(() => {
    if (activeTab) {
      // dispatch(fetchTournamentStandings(activeTab)); // Fetch standings based on the selected tournament
      dispatch(fetchTournamentStandings({ tournamentId: activeTab, season: season }))
    }
  }, [activeTab, dispatch]);

  // Map the API standings data to match the TeamStanding format
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
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow pt-20">
          {/* Top Banner Advertisement */}
          <div className="w-full bg-gray-100 py-4">
            <div className="max-w-7xl mx-auto px-4">
              <div className="bg-blue-900 text-white p-4 rounded-md">
                <img
                  src="https://via.placeholder.com/960x120?text=Advertisement"
                  alt="Advertisement"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-gray-900 text-white p-4 rounded-md mb-6">
              <h1 className="text-2xl font-bold">National Team</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area (2/3 width on desktop) */}
              <div className="lg:col-span-2 space-y-8">
                {/* Featured News */}
                <NationalTeamNews />

                {/* Latest News */}
                {/* <LatestNationalTeamNews /> */}

                {/* Older News */}
                {/* <OlderNationalTeamNews /> */}

                {/* Middle Ad Section */}
                <AdSection position="middle" />
              </div>

              {/* Sidebar Area (1/3 width on desktop) */}
              <div className="space-y-8">
                {/* Ad section */}
                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="bg-white rounded-md overflow-hidden">
                    <img
                      src="https://via.placeholder.com/300x250"
                      alt="Advertisement"
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Video of the day section */}
                <NationalTeamVideo />

                {/* Calendar section */}
                {/* <NationalTeamCalendar /> */}

                {/* Two Column Layout for Calendar and Standings */}
                <FixtureCalendar className="h-full" />

                {/* Standings section */}
                <div className="bg-gray-900 text-white p-4">
                  <h2 className="text-lg font-bold">Standings</h2>
                </div>

                {/* Tournament Tabs */}
                <div className="flex space-x-2 py-2 overflow-x-auto scrollbar-hide">
                  {tournaments.map((tournament) => (
                    <button
                      key={tournament.id}
                      onClick={() =>{
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

                {/* Use the dynamic StandingsTable */}
                <StandingsTable standings={mappedStandings} />

                {/* Advertisement */}
                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="bg-white rounded-md overflow-hidden">
                    <img
                      src="https://via.placeholder.com/300x250"
                      alt="Advertisement"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Banner Advertisement */}
          <AdSection position="bottom" />
        </main>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default NationalTeam;
