import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
import Advertisement from '@/components/ads/Advertisement';
import { PageTransition } from '@/utils/animations';
import TournamentsContent from '@/components/tournaments/TournamentsContent';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { fetchTeams } from '@/store/slices/teamSlice';

const TournamentPage: React.FC = () => {
  const { tournamentId, section } = useParams<{ tournamentId: string; section?: string }>();

  const dispatch = useAppDispatch();

  // ✅ Use typed selector for tournament data
  const combinedTournaments = useAppSelector((state: RootState) => state.tournaments.combinedTournaments);
  const currentYear = new Date().getFullYear();

  // ✅ Robust fallback handling for tournament data
  const tournament = combinedTournaments.find(t => String(t.id) === tournamentId); // Convert ID to string to match route param
  const tournamentName = tournament?.name || 'Torneos';
  const tournamentSeason = tournament?.season || currentYear;

  useEffect(() => {
    // ✅ Only fetch teams if valid tournamentId is present
    if (tournamentId && !isNaN(Number(tournamentId))) {
      dispatch(fetchTeams({ league: Number(tournamentId), season: tournamentSeason }));
    }
  }, [dispatch, tournamentId, tournamentSeason]); // ✅ Correct dependency array

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}

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

        {/* <Footer /> */}
      </div>
    </PageTransition>
  );
};

export default TournamentPage;
