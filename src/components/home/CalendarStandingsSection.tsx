import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import FixtureCalendar from '@/components/calendar/FixtureCalendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/store/hooks'; // Redux hooks
import { fetchTournaments, fetchTournamentStandings } from '@/store/slices/tournamentsSlice'; // Redux actions
import StandingsTable from '../abroad/StandingsTable';

const CalendarStandingsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector((state) => state.tournaments.tournaments); // Fetch tournaments from Redux store
  const standings = useAppSelector((state) => state.tournaments.standings); // Fetch standings from Redux store
  const [activeTab, setActiveTab] = useState<string>('242'); // Default to first tournament (e.g., Liga Pro Serie A)
  const[season, setSeason] = useState<any>(2025); // Default season

  useEffect(() => {
    dispatch(fetchTournaments()); // Fetch tournaments data
  }, [dispatch]);

  useEffect(() => {
    if (activeTab) {
      dispatch(fetchTournamentStandings({ tournamentId: activeTab, season: season })); // Fetch standings based on the selected tournament
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-8">
      {/* Calendar Column */}
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold flex items-center">
            <Calendar className="mr-2 h-6 w-6" />
            Calendario
          </h2>
          <Link
            to="/calendario"
            className="text-sm text-primary hover:underline flex items-center"
          >
            Ver calendario completo
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </Link>
        </div>
        <FixtureCalendar className="h-full" />
      </div>

      {/* Standings Column */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
            Posiciones
          </h2>
          <Link
            to="/posiciones"
            className="text-sm text-primary hover:underline flex items-center"
          >
            Ver tabla completa
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </Link>
        </div>

        {/* Tournament Tabs */}
        <div className="flex space-x-2 py-2 overflow-x-auto max-w-full scrollbar-visible">
          {tournaments.map((tournament) => (
            <button
              key={tournament.id}
              onClick={() =>{
                setActiveTab(tournament.id.toString())
                setSeason(tournament.season); // Update the season based on the selected tournament
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

        {/* Standings Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              {tournaments.find((t) => t.id.toString() === activeTab)?.name || 'Serie A 2025'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Use the dynamic StandingsTable with mappedStandings */}
            <StandingsTable standings={mappedStandings} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarStandingsSection;
