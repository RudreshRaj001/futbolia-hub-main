import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import MatchCarousel from './cards/MatchCarousel';
// import { teams } from '@/data/teams';
import { RootState } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFixtures } from '@/store/slices/fixturesSlice';
import { AppDispatch } from '@/store';
import { Fixture } from '@/types/api';
import { MatchCardProps } from './cards/MatchCard';
import { useNavigate } from 'react-router-dom';
import { setLeagueInfo } from '@/store/slices/leagueInfoSlice';

interface MatchCardsProps {
  className?: string;
}

const MatchCards: React.FC<MatchCardsProps> = ({ className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const tournaments = useSelector((state: RootState) => state.tournaments.tournaments);
  const fixtures = useSelector((state: RootState) => state.fixtures.fixtures);
  const fixturesStatus = useSelector((state: RootState) => state.fixtures.status);
  const teams = useSelector((state: RootState) => state.teams.teams);

  const [selectedLeagueId, setSelectedLeagueId] = useState<string>("242");

  // Fetch fixtures when a league is selected
  useEffect(() => {
    if (selectedLeagueId) {
      const selectedTournament = tournaments.find(t => t.id.toString() === selectedLeagueId);
      if (selectedTournament) {
        dispatch(fetchFixtures({
          league: Number(selectedTournament.id),
          season: Number(selectedTournament.season),
          status: "upcoming"
        }));
  
        // ✅ Dispatch league info
        dispatch(setLeagueInfo({
          leagueId: selectedTournament.id,
          leagueName: selectedTournament.name,
          season: selectedTournament.season,
        }));
      }
    }
  }, [selectedLeagueId]);

  const handleTeamClick = (teamId: number) => {
    console.log("handle team claick ..",teamId)
    const team = teams.find(t => t.id === teamId);

    if (team) {
      navigate(`/equipos/${team.id}`);
    }
  };

  // Convert fetched fixtures to MatchCardProps format
  const matchesWithHandlers: MatchCardProps[] = fixtures?.map((f: Fixture) => {
    const matchDateObj = new Date(f.fixture.date);
    
    console.log("chekc fix",f)
    return {
      homeTeam: {
        name: f.teams.home.name,
        code: "", // Optional: team code mapping
        score: f.goals.home ?? undefined,
        logo: f.teams.home.logo,
      },
      awayTeam: {
        name: f.teams.away.name,
        code: "",
        score: f.goals.away ?? undefined,
        logo: f.teams.away.logo,
      },
      matchTime: matchDateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      matchDate: matchDateObj.toLocaleDateString('es-EC', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      isFinished: f.fixture.status.short === "FT",
      tournament: f.league.name,
      onHomeTeamClick: () => handleTeamClick(f.teams.home.id),
      onAwayTeamClick: () => handleTeamClick(f.teams.away.id),
    };
  });

  return (
    <section className={cn("w-full py-8", className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold">Partidos Destacados</h2>
        <div className="flex space-x-1">
          <select
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-sm px-2 py-1"
            value={selectedLeagueId}
            onChange={(e) => setSelectedLeagueId(e.target.value)}
          >
            
            {tournaments.map((tournament) => (
              <option key={tournament.id} value={tournament.id.toString()}>
                {tournament.country} - {tournament.name} {tournament.season}
              </option>
            ))}
          </select>
        </div>
      </div>

      <MatchCarousel matches={matchesWithHandlers} />
    </section>
  );
};

export default MatchCards;
