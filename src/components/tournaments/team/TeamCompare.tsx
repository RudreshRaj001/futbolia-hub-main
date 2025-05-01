import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchTeamStatistics } from '@/store/slices/teamStatisticsSlice';

const TeamCompare: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [team1Id, setTeam1Id] = useState<number | null>(null);
  const [team2Id, setTeam2Id] = useState<number | null>(null);
  const [leagueId] = useState<number>(242); // Premier League default
  const [season] = useState<number>(2025); // Default season

  const { teams, loading, error } = useSelector((state: RootState) => state.teams);
  const statistics = useSelector((state: RootState) => state.teamStatistics.data);

  const team1Stats = team1Id !== null ? statistics?.[team1Id] : null;
  const team2Stats = team2Id !== null ? statistics?.[team2Id] : null;

  useEffect(() => {
    if (team1Id !== null) {
      dispatch(fetchTeamStatistics({ teamId: team1Id, season, leagueId }));
    }
  }, [team1Id]);

  useEffect(() => {
    if (team2Id !== null) {
      dispatch(fetchTeamStatistics({ teamId: team2Id, season, leagueId }));
    }
  }, [team2Id]);

  const renderTeamSelector = (
    teamNum: number,
    teamId: number | null,
    setTeam: (id: number) => void
  ) => (
    <div className="w-full md:w-1/2 flex flex-col items-center">
      <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 rounded-full overflow-hidden mb-3">
        {teamId ? (
          <img
            src={teams.find(t => t.id === teamId)?.logo || ''}
            alt="Team Logo"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-500">VS</span>
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold mb-3 text-center">
        {teamId ? teams.find(t => t.id === teamId)?.name : 'NOMBRE DEL EQUIPO'}
      </h3>
      <select
        className="bg-white text-gray-800 py-2 px-4 rounded text-sm border w-full md:w-32" // Width adjusted with rem
        onChange={(e) => {
          const id = parseInt(e.target.value);
          if (!isNaN(id)) setTeam(id);
        }}
        value={teamId ?? ''}
      >
        <option value="">Seleccionar equipo</option>
        {teams?.map(team => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-900 text-white p-4 flex items-center justify-center">
        <h2 className="text-lg font-bold">COMPARATIVA</h2>
      </div>

      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="team-selector">{renderTeamSelector(1, team1Id, setTeam1Id)}</div>
          <div className="vs-text text-4xl font-bold my-4 md:my-0">VS</div>
          <div className="team-selector">{renderTeamSelector(2, team2Id, setTeam2Id)}</div>
        </div>

        {team1Stats && team2Stats && (
          <div className="mt-8 border-t pt-4">
            <h3 className="text-xl font-bold mb-4 text-center">Comparativa de Estadísticas</h3>
            <div className="space-y-4">
              {["goals", "conceded", "possession", "shots", "corners", "foulsCommitted", "yellowCards", "redCards"].map(stat => (
                <div className="grid grid-cols-3 items-center" key={stat}>
                  <div className="text-right pr-2 font-medium">{team1Stats?.[stat]}</div>
                  <div className="text-center text-sm text-gray-600">
                    {stat.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </div>
                  <div className="pl-2 font-medium">{team2Stats?.[stat]}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(loading || error) && (
          <div className="mt-4 text-center text-sm text-red-500">
            {loading ? 'Cargando estadísticas...' : error}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCompare;
