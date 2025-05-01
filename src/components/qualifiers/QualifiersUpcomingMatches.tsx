import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchFixtures } from "@/store/slices/fixturesSlice";
import { Fixture } from "@/types/api";
import dayjs from "dayjs";

const QualifiersUpcomingMatches: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { fixtures, status, error } = useAppSelector((state) => state.fixtures);

  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchFixtures({ league: 242, season: 2025, status: "upcoming" }));
  }, [dispatch]);

  const nextMatch = () => {
    setCurrentMatchIndex((prev) => (prev + 1) % fixtures.length);
  };

  const prevMatch = () => {
    setCurrentMatchIndex(
      (prev) => (prev - 1 + fixtures.length) % fixtures.length
    );
  };

  const visibleMatches = fixtures.length
    ? [
        fixtures[currentMatchIndex],
        fixtures[(currentMatchIndex + 1) % fixtures.length],
      ]
    : [];

  if (status === "loading") return <div>Loading Matches...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="relative bg-white dark:bg-gray-900 rounded-md shadow-sm overflow-hidden">
      {fixtures.length > 0 && (
        <>
          <button
            onClick={prevMatch}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 p-2 text-white"
            aria-label="Previous match"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextMatch}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 p-2 text-white"
            aria-label="Next match"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <div className="flex">
        {visibleMatches.map((match: Fixture) => (
          <div
            key={match.fixture.id}
            className="w-1/2 p-4 flex flex-col items-center cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/partidos/${match.fixture.id}`)}
          >
            <div className="flex items-center justify-center mb-2">
              <div className="flex items-center flex-col mr-6">
                <img
                  src={match.teams.home.logo}
                  alt={match.teams.home.name}
                  className="w-8 h-8 mb-1"
                />
                <span className="text-sm font-medium">
                  {match.teams.home.name}
                </span>
              </div>
              <div className="mx-2 text-sm text-gray-600">
                {dayjs(match.fixture.date).format("DD/MM")}
              </div>
              <div className="flex items-center flex-col ml-6">
                <img
                  src={match.teams.away.logo}
                  alt={match.teams.away.name}
                  className="w-8 h-8 mb-1"
                />
                <span className="text-sm font-medium">
                  {match.teams.away.name}
                </span>
              </div>
            </div>
            <span className="text-xs font-medium text-gray-500">
              {dayjs(match.fixture.date).format("HH:mm")} HS
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QualifiersUpcomingMatches;
