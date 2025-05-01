import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TeamCard from '@/components/teams/TeamCard';
import Advertisement from '@/components/ads/Advertisement';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTopScorers } from '@/store/slices/tournamentsSlice';
import LoadingSpinner from '../ui/LoadingSpinner';

interface Team {
  id: number;
  name: string;
  logo: string;
  city?: string;
  founded?: number;
}

interface TeamsScorersSectionProps {
  teams: Team[];
}

const TeamsScorersSection: React.FC<TeamsScorersSectionProps> = ({ teams }) => {
  const topScorers = useAppSelector((state) => state.tournaments.topScorers);
  const loading = useAppSelector((state) => state.tournaments.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
   
        dispatch(fetchTopScorers({ tournamentId: "242", season: 2025 }));
    
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-8">
      <div className="lg:col-span-2">
        {/* Teams Section */}
        <section className="w-full pb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold">Equipos</h2>
            <Link 
              to="/equipos" 
              className="text-sm text-primary hover:underline flex items-center"
            >
              Ver todos
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teams.slice(0, 4).map((team, index) => (
              <TeamCard 
                key={team.id} 
                id={team.id} 
                name={team.name} 
                logo={team.logo} 
                city={team.city} 
                founded={team.founded} 
                index={index} 
              />
            ))}
          </div>
        </section>

        {/* Top Scorers Section */}
        <section className="w-full py-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold">Goleadores</h2>
            <Link
              to="/goleadores"
              className="text-sm text-primary hover:underline flex items-center"
            >
              Ver todos
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800/50 text-left">
                  <tr className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <th className="px-4 py-3">Pos</th>
                    <th className="px-4 py-3">Jugador</th>
                    <th className="px-4 py-3">Equipo</th>
                    <th className="px-4 py-3">Goles</th>
                    <th className="px-4 py-3 hidden sm:table-cell">Partidos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        <LoadingSpinner />
                      </td>
                    </tr>
                  ) : (
                    topScorers.slice(0, 5).map((scorer, index) => {
                      const team = scorer.statistics[0].team;
                      const stats = scorer.statistics[0];
                      return (
                        <motion.tr
                          key={scorer.player.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          <td className="px-4 py-3 text-sm font-medium">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-xs">
                              {index + 1}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Link
                              to={`/jugadores/${scorer.player.id}`}
                              title={scorer.player.name}
                              className="flex items-center hover:underline"
                            >
                              <img
                                src={scorer.player.photo}
                                alt={scorer.player.name}
                                className="w-6 h-6 rounded-full mr-2"
                              />
                              <span className="text-sm font-medium truncate max-w-[150px]">
                                {scorer.player.name}
                              </span>
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <Link
                              to={`/equipos/${team.id}`}
                              title={team.name}
                              className="flex items-center space-x-2 hover:underline"
                            >
                              <img
                                src={team.logo}
                                alt={team.name}
                                className="w-5 h-5"
                              />
                              <span className="truncate max-w-[130px]">{team.name}</span>
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-sm font-bold">{stats.goals.total}</td>
                          <td className="px-4 py-3 text-sm hidden sm:table-cell">
                            {stats.games.appearences}
                          </td>
                        </motion.tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {/* Sidebar Advertisement */}
      <div className="space-y-6">
        <Advertisement size="sidebar" />
        <Advertisement size="sidebar" className="hidden md:block" />
      </div>
    </div>
  );
};

export default TeamsScorersSection;
