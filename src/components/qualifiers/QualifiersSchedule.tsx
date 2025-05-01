import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom"; // 👈 React Router
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchFixtures } from "@/store/slices/fixturesSlice";
import { Fixture } from "@/types/api";

interface Match {
  id: number;
  homeTeam: string;
  homeTeamId: number;
  homeFlag: string;
  awayTeam: string;
  awayTeamId: number;
  awayFlag: string;
  date: string;
  time: string;
  day: string;
}

const transformFixtureToMatch = (fixture: Fixture): Match => {
  const { date } = fixture.fixture;
  return {
    id: fixture.fixture.id,
    homeTeam: fixture.teams.home.name,
    homeTeamId: fixture.teams.home.id,
    homeFlag: fixture.teams.home.logo,
    awayTeam: fixture.teams.away.name,
    awayTeamId: fixture.teams.away.id,
    awayFlag: fixture.teams.away.logo,
    date: dayjs(date).format("DD-MM-YYYY"),
    time: dayjs(date).format("HH:mm") + " hs.",
    day: dayjs(date).format("dddd").toUpperCase(),
  };
};

const FIXTURES_PER_PAGE = 5;
const TOTAL_PAGES = 18;

const QualifiersSchedule: React.FC = () => {
  const dispatch = useAppDispatch();
  const { fixtures, status, error } = useAppSelector((state) => state.fixtures);
  const navigate = useNavigate(); // 👈 For navigation

  const season = new Date().getFullYear();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchFixtures({ league: 11, season, status: "upcoming" }));
  }, [dispatch, season]);

  const allMatches: Match[] =
    fixtures && fixtures.length > 0
      ? fixtures.map(transformFixtureToMatch)
      : [];

  const sortedMatches = allMatches.sort((a, b) => {
    const dateA = dayjs(a.date, "DD-MM-YYYY");
    const dateB = dayjs(b.date, "DD-MM-YYYY");
    return dateA.valueOf() - dateB.valueOf();
  });

  const startIndex = (currentPage - 1) * FIXTURES_PER_PAGE;
  const endIndex = startIndex + FIXTURES_PER_PAGE;
  const currentPageMatches = sortedMatches.slice(startIndex, endIndex);

  if (status === "loading") return <div>Loading fixtures...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-sm">
      <div className="bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold">{season} Qualifiers Schedule</h2>
      </div>

      <Tabs defaultValue="regular" className="w-full">
        <div className="bg-gray-800 dark:bg-gray-900 text-white">
          <TabsList className="w-full rounded-none h-auto p-0">
            <TabsTrigger
              value="regular"
              className="flex-1 rounded-none px-4 py-2 text-sm
                data-[state=active]:bg-blue-700 data-[state=active]:text-white 
                dark:data-[state=active]:bg-blue-600"
            >
              Temporada Regular
            </TabsTrigger>
            <TabsTrigger
              value="repechaje"
              className="flex-1 rounded-none px-4 py-2 text-sm 
                data-[state=active]:bg-blue-700 data-[state=active]:text-white 
                dark:data-[state=active]:bg-blue-600"
            >
              Repechaje
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="regular" className="mt-0">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 text-center">
            <div className="flex justify-center flex-wrap gap-2">
              {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => (
                <div
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center 
                    cursor-pointer rounded-sm text-sm font-semibold
                    ${
                      page === currentPage
                        ? "bg-gray-900 text-white dark:bg-blue-700"
                        : "bg-white dark:bg-gray-800 border dark:border-gray-600 text-gray-700 dark:text-gray-300"
                    }`}
                >
                  {page}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 text-center bg-gray-900 text-white mb-4">
            FECHA {currentPage}
          </div>

          <div className="p-4 space-y-4">
            {currentPageMatches.length > 0 ? (
              currentPageMatches.map((match) => (
                <div
                  key={match.id}
                  className="border-b border-gray-200 dark:border-gray-600 pb-4"
                >
                  <div className="grid grid-cols-12 items-center text-gray-800 dark:text-gray-200">
                    <div
                      className="col-span-4 text-right pr-4 cursor-pointer hover:underline"
                      onClick={() => navigate(`/equipos/${match.homeTeamId}`)}
                    >
                      {match.homeTeam}
                    </div>
                    <div className="col-span-1 text-center text-2xl">
                      <img
                        src={match.homeFlag}
                        alt={match.homeTeam}
                        className="w-6 h-6 inline-block"
                      />
                    </div>
                    <div className="col-span-2 text-center">|</div>
                    <div className="col-span-1 text-center text-2xl">
                      <img
                        src={match.awayFlag}
                        alt={match.awayTeam}
                        className="w-6 h-6 inline-block"
                      />
                    </div>
                    <div
                      className="col-span-4 text-left pl-4 cursor-pointer hover:underline"
                      onClick={() => navigate(`/equipos/${match.awayTeamId}`)}
                    >
                      {match.awayTeam}
                    </div>
                  </div>

                  <div className="grid grid-cols-12 items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="col-span-4 text-right pr-4">{match.date}</div>
                    <div className="col-span-4 text-center">{match.time}</div>
                    <div className="col-span-4 text-left pl-4 font-bold">{match.day}</div>
                  </div>

                  <div className="flex justify-center mt-2">
                    <span className="text-2xl text-gray-700 dark:text-gray-300">+</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-700 dark:text-gray-300">
                No fixtures available on FECHA {currentPage}.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent
          value="repechaje"
          className="p-4 text-center text-gray-700 dark:text-gray-300"
        >
          <p>No repechaje matches scheduled yet</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QualifiersSchedule;
