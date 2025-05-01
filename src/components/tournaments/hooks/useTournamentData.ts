import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TournamentSection, Tournament, Team, TournamentGroup, TournamentPhase } from '../types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchTournaments,
  fetchTournamentStandings,
  fetchTopScorers,
  fetchMatchesByMatchday
} from '@/store/slices/tournamentsSlice';

// Dummy player and team data – replace with API logic if needed
const dummyTeam: Team = {
  id: 1,
  name: 'Sample FC',
  logo: '/logos/sample.png',
  country: 'Ecuador',
};

export const useTournamentData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tournamentId,section } = useParams<{ tournamentId: string,section:string }>();
  const dispatch = useAppDispatch();
  const combinedTournaments = useAppSelector(state => state.tournaments.combinedTournaments);
  const tournaments = combinedTournaments;
  const standings = useAppSelector(state => state.tournaments.standings);
  const topScorers = useAppSelector(state => state.tournaments.topScorers);
  const matches = useAppSelector(state => state.tournaments.matches);
  const loading = useAppSelector(state => state.tournaments.loading);
  const error = useAppSelector(state => state.tournaments.error);

  // ✅ Local state
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [selectedSection, setSelectedSection] = useState<TournamentSection>('posiciones');
  const [selectedMatchday, setSelectedMatchday] = useState<number>(1);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // Optional: Set formatted groups and phases if required
  const formattedPhases = [{ id: 'fase-inicial' as TournamentPhase, label: 'Fase Inicial' }];
  const formattedGroups = [{ id: 'grupo-a' as TournamentGroup, label: 'Grupo A' }];
  // Dummy filtered matches
  const filteredMatches = matches.filter(match => {
    const matchdayStr = match.matchday || '';
    const matchdayNum = parseInt(matchdayStr.match(/\d+$/)?.[0] || '', 10);
    return matchdayNum === selectedMatchday;
  });
  
  

  // Optional: Tournament news stub
  const tournamentNews = [
    {
      id: 1,
      title: 'Big win for Sample FC',
      content: 'Sample FC secured a thrilling 3-2 victory over rivals.',
      date: new Date().toISOString(),
    }
  ];

  useEffect(() => {
    dispatch(fetchTournaments());
   
  }, []);

  useEffect(() => {
  if(section){
    setSelectedSection(section as TournamentSection);
  }
    
  }, [section]);

// Transform ApiTournament into Tournament
useEffect(() => {
  if (tournamentId && tournaments.length > 0) {
    const tournament = tournaments.find(t => t.id.toLowerCase() === tournamentId.toLowerCase());
    if (tournament) {
      setSelectedTournament(tournament);
    }
  }
}, [tournamentId, tournaments]);

  useEffect(() => {

    
    if (selectedTournament) {
      // dispatch(fetchTournamentStandings(selectedTournament?.id.toString()));
      dispatch(fetchTournamentStandings({ tournamentId: selectedTournament?.id.toString(), season: selectedTournament.season|| 2025 }));
      
     
      dispatch(fetchTopScorers({ tournamentId: selectedTournament?.id.toString(), season: selectedTournament.season || 2025 }));
      // dispatch(fetchMatchesByMatchday({ tournamentId: "31", matchday: 1, season: 2026 }));

      dispatch(fetchMatchesByMatchday({
        tournamentId: selectedTournament?.id.toString(),
        matchday: selectedMatchday,season: selectedTournament.season || 2025
      }));

      
    }
  }, [selectedTournament, selectedMatchday]);

  // ✅ Handlers
  const handleTournamentChange = (tournament: Tournament) => {
   
    setSelectedTournament(tournament);
    setSelectedTeamId(null); // Reset team selection
    navigate(`/torneos/${tournament.id}`);
  };

  const handleSectionChange = (section: TournamentSection) => {
    setSelectedSection(section);
    setSelectedTeamId(null); // Reset team selection
  };

  const handleTeamSelect = (teamId: number) => {
    setSelectedTeamId(teamId);
  
    const found = standings.find(t => t.teamId === teamId);
    if (found) {
      setSelectedTeam({
        id: teamId,
        name: found.teamName || 'Unknown Team',
        logo: found.teamLogo || '',
        country: selectedTournament?.country || 'Unknown',
      });
    } else {
      setSelectedTeam(dummyTeam);
    }
  };
  

  return {
    tournaments,
    selectedTournament,
    selectedSection,
    selectedPhase: 'regular', // mock placeholder
    selectedGroup: 'A',        // mock placeholder
    selectedMatchday,
    filteredMatches,
    selectedTeamId,
    standings,
    topScorers,
    matches,
    tournamentNews,
    selectedTeam,
    teamPlayers: [], // placeholder
    formattedPhases,
    formattedGroups,
    handleTournamentChange,
    handleSectionChange,
    handleTeamSelect,
    setSelectedPhase: () => {}, // stub
    setSelectedGroup: () => {}, // stub
    setSelectedMatchday,
    setSelectedTeamId,
    loading,
    error,
  };
};
