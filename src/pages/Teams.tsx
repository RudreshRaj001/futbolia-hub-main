import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Advertisement from '@/components/ads/Advertisement';
import { PageTransition } from '@/utils/animations';
import TeamCard from '@/components/teams/TeamCard';
import { fetchTeams } from '@/store/slices/teamSlice';
import { fetchTournaments } from '@/store/slices/tournamentsSlice';
import { ApiTournament } from '@/store/slices/tournamentsSlice';

const Teams: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tournaments, loading: tourLoading, error: tourError } = useAppSelector(state => state.tournaments);
  const { teams, loading: teamLoading, error: teamError } = useAppSelector(state => state.teams);

  const [selectedTournament, setSelectedTournament] = useState<ApiTournament | null>(null);

  // Fetch tournaments on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchTournaments());
  }, [dispatch]);

  // When tournaments arrive, select default and fetch teams
  useEffect(() => {
    if (!tourLoading && tournaments.length) {
      const defaultT = tournaments.find(t => t.name.includes('Serie A')) || tournaments[0];
      setSelectedTournament(defaultT);
      dispatch(fetchTeams({ league: defaultT.id, season: Number(defaultT.season) }));
    }
  }, [dispatch, tourLoading, tournaments]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [idStr, seasonStr] = e.target.value.split('-');
    const id = Number(idStr);
    const season = Number(seasonStr);
    const tour = tournaments.find(t => t.id === id && Number(t.season) === season);
    if (tour) {
      setSelectedTournament(tour);
      dispatch(fetchTeams({ league: id, season }));
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">

          {/* Header and Dropdown */}
          <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-900 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-4">
                  Equipos
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
                  Selecciona torneo y consulta sus equipos.
                </p>
                <div className="mt-4">
                  {!tournaments.length && tourLoading && (
                    <p>Loading tournaments...</p>
                  )}
                  {tourError && !tournaments.length && (
                    <p className="text-red-500">Error: {tourError}</p>
                  )}
                  {tournaments.length > 0 && (
                    <select
                      value={selectedTournament ? `${selectedTournament.id}-${selectedTournament.season}` : ''}
                      onChange={handleSelectChange}
                      disabled={tourLoading}
                      className="border rounded p-2 text-base"
                    >
                      {tournaments.map(t => (
                        <option key={`${t.id}-${t.season}`} value={`${t.id}-${t.season}`}>
                          {t.name} - {t.season}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Banner Ad */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Advertisement size="banner" />
          </div>

          {/* Teams Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {(teamLoading) ? (
              <p className="text-center">Loading teams...</p>
            ) : teamError ? (
              <p className="text-center text-red-500">Error: {teamError}</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {teams.map(team => (
                    <TeamCard
                      key={team.id}
                      id={team.id}
                      name={team.name}
                      logo={team.logo}
                      city={team.city}
                      founded={team.founded}
                    />
                  ))}
                </div>
                <div className="lg:col-span-1">
                  <Advertisement size="sidebar" />
                </div>
              </div>
            )}
          </div>

        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Teams;
