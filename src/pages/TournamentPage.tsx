import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Advertisement from '@/components/ads/Advertisement';
import { PageTransition } from '@/utils/animations';
import TournamentsContent from '@/components/tournaments/TournamentsContent';
import { reverseRouteMap } from '@/utils/tournamentRoutes';
// import { mockTournaments } from '@/components/tournaments/mockData';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { fetchTeams } from '@/store/slices/teamSlice';

const TournamentPage: React.FC = () => {
  const { tournamentId, section } = useParams<{ tournamentId: string; section?: string }>();
  // const { teams, loading, error } = useSelector((state: RootState) => state.teams);
  
  // Get tournaments from Redux store with fallback to mock data
  const combinedTournaments = useAppSelector((state: RootState) => state.tournaments.combinedTournaments);

  const dispatch = useAppDispatch();
  // Get the tournament name from the ID for display
  // const internalId = tournamentId ? reverseRouteMap[tournamentId] : '';
  const currentYear = new Date().getFullYear();

  
  
  // First try to find by numeric ID in combined tournaments, then try with internal ID
  const tournament = combinedTournaments.find(t => t.id === tournamentId);
  const tournamentName = tournament?.name || 'Torneos';
  const tournamentSeason = tournament?.season || currentYear;

 
  useEffect(() => {
    // if (!teams.length) {
     
      dispatch(fetchTeams({ league: +tournamentId ||242, season: tournamentSeason }));
      // }
    }, [dispatch,tournamentId]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-20">
          {/* Page Header */}
          <div className="w-full bg-primary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <h1 className="text-2xl font-bold font-display">{tournamentName}</h1>
            </div>
          </div>

          {/* Banner Ad */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Advertisement size="banner" />
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 gap-6">
              <TournamentsContent />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default TournamentPage;
