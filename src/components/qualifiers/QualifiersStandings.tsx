import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchStandings } from "@/store/slices/standingsSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

// Define the flat TeamStanding type for the table.
interface TeamStanding {
  position: number;
  team: { id: number; name: string; logo: string };
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

// Define the StandingTeam type as returned from the API.
interface StandingTeam {
  rank: number;
  team: { id: number; name: string; logo: string };
  points: number;
  goalsDiff: number;
  form: string;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: { for: number; against: number };
  };
}

// Helper function to transform a StandingTeam into a flat TeamStanding.
const transformTeam = (team: StandingTeam): TeamStanding => ({
  position: team.rank,
  team: {
    id: team.team.id,
    name: team.team.name,
    logo: team.team.logo,
  },
  points: team.points,
  played: team.all.played,
  won: team.all.win,
  drawn: team.all.draw,
  lost: team.all.lose,
  goalsFor: team.all.goals.for,
  goalsAgainst: team.all.goals.against,
  goalDifference: team.goalsDiff,
});

const QualifiersStandings: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { standings, status, error } = useAppSelector(
    (state) => state.standings
  );

  // Calculate the qualification season as current year - 1.
  const season = new Date().getFullYear() - 1;
  // Calculate the World Cup year as qualification season + 2 (adjust if needed).
  const worldCupYear = season + 2;

  useEffect(() => {
    // Fetch standings data with league id "11" and the computed season.
    dispatch(fetchStandings({ league: 11, season }));
  }, [dispatch, season]);

  // Retrieve the league name dynamically from standings if available.
  const leagueName =
    standings.length > 0 && standings[0].league
      ? standings[0].league.name
      : "";

  // Convert the nested standings data into a flat array of TeamStanding.
  const teams: TeamStanding[] =
    standings.length > 0 &&
    standings[0].league &&
    standings[0].league.standings.length > 0
      ? standings[0].league.standings[0].map(transformTeam)
      : [];

  if (status === "loading") return <div>Loading Standings...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-sm">
      <div className="bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold">
          {season} Qualifiers Standings{" "}
          {leagueName && `( for league - ${leagueName} )`}
        </h2>
      </div>

      <Table>
        <TableHeader className="bg-gray-100 dark:bg-gray-700">
          <TableRow>
            <TableHead className="w-12 text-gray-700 dark:text-gray-200">N°</TableHead>
            <TableHead>Equipo</TableHead>
            <TableHead className="text-center w-16 text-gray-700 dark:text-gray-200">PTS.</TableHead>
            <TableHead className="text-center w-12 text-gray-700 dark:text-gray-200">PJ</TableHead>
            <TableHead className="text-center w-12 text-gray-700 dark:text-gray-200">Pg</TableHead>
            <TableHead className="text-center w-12 text-gray-700 dark:text-gray-200">Pe</TableHead>
            <TableHead className="text-center w-12 text-gray-700 dark:text-gray-200">Pp</TableHead>
            <TableHead className="text-center w-12 text-gray-700 dark:text-gray-200">Gf</TableHead>
            <TableHead className="text-center w-12 text-gray-700 dark:text-gray-200">Gc</TableHead>
            <TableHead className="text-center w-12 text-gray-700 dark:text-gray-200">DF</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams?.map((team) => (
            <TableRow
              key={team.position}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              // On click, navigate to /equipos/:teamId
              onClick={() => navigate(`/equipos/${team.team.id}`)}
            >
              <TableCell className="text-gray-900 dark:text-white font-bold text-center">
                {team.position}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <img
                    src={team.team.logo}
                    alt={team.team.name}
                    className="w-6 h-6 mr-2"
                  />
                  <span>{team.team.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-900 text-white rounded-full font-bold">
                  {team.points}
                </span>
              </TableCell>
              <TableCell className="text-center text-gray-800 dark:text-gray-200">
                {team.played}
              </TableCell>
              <TableCell className="text-center text-gray-800 dark:text-gray-200">
                {team.won}
              </TableCell>
              <TableCell className="text-center text-gray-800 dark:text-gray-200">
                {team.drawn}
              </TableCell>
              <TableCell className="text-center text-gray-800 dark:text-gray-200">
                {team.lost}
              </TableCell>
              <TableCell className="text-center text-gray-800 dark:text-gray-200">
                {team.goalsFor}
              </TableCell>
              <TableCell className="text-center text-gray-800 dark:text-gray-200">
                {team.goalsAgainst}
              </TableCell>
              <TableCell className="text-center text-gray-800 dark:text-gray-200">
                {team.goalDifference}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="p-4 bg-gray-100 dark:bg-gray-800 text-sm">
        {/* Dynamically show the World Cup year (season + 2 in this example) */}
        <p className="mb-1">(1) - Clasificación directa al Mundial FIFA {worldCupYear}</p>
      </div>
    </div>
  );
};

export default QualifiersStandings;
