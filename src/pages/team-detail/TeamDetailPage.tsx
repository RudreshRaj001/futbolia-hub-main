import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PageTransition } from '@/utils/animations';
import { AdSection } from '@/components/home/AdSections';
import TeamIconSlider from '@/components/teams/TeamIconSlider';
import TeamDetailTabs from '@/pages/team-detail/components/TeamDetailTabs';
import TeamBanner from '@/components/team-detail/TeamBanner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/utils/seo';
import { useToast } from '@/hooks/use-toast';
import { fetchTeamById, clearTeamState } from '@/store/slices/teamSlice';
import { RootState, AppDispatch } from '@/store';
import Loader from '@/components/ui/Loader';




const TeamDetailPage: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { team, loading, error, matches, standings } = useSelector((state: RootState) => state.teams);
  const { toast } = useToast();

  // ✅ API call and cleanup
  useEffect(() => {
    // if (teamId && !loading && (!team || team.id !== Number(teamId))) {
      
      dispatch(fetchTeamById(Number(teamId)));
    // }
  
    // Cleanup on unmount
    return () => {
      
      dispatch(clearTeamState());
    };
  }, [teamId, dispatch]);

  // ✅ Display error using toast
  useEffect(() => {
    if (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [error, toast]);

  // ✅ Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader />
        </div>
        <Footer />
      </div>
    );
  }

  // ✅ Error State
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-xl text-red-500">Error: {error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  // ✅ No Data State
  if (!team) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-xl">Equipo no encontrado</div>
        </div>
        <Footer />
      </div>
    );
  }

  // ✅ Use team logo if no custom banner exists
  const teamBanner = team.logo || `/lovable-uploads/default-banner.png`;

  return (
    <PageTransition>
      {/* SEO Metadata */}
      <SEO 
        title={`${team.name} - Estadísticas, Jugadores y Resultados | Pase y GOL`}
        description={`Toda la información sobre ${team.name}: plantilla, estadísticas, resultados, próximos partidos y posición en la tabla.`}
        keywords={`${team.name}, fútbol ecuatoriano, estadísticas ${team.name}, jugadores ${team.name}, resultados ${team.name}`}
        image={team.logo}
      />
      
      {/* Page Layout */}
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-16">
          {/* Team Icons Slider */}
          <TeamIconSlider 
            selectedTeamId={team.id} 
            onTeamSelect={(id) => navigate(`/equipos/${id}`)} 
          />
          
          {/* Team Banner using team logo */}
          <TeamBanner team={team} teamBanner={teamBanner} />
          
          {/* Team Content Tabs - Pass API data */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <TeamDetailTabs 
              team={team}
              teamNews={[]} // Replace with actual API data if needed
              teamMatches={matches} 
              standings={standings} 
            />
          </div>
          
          {/* Bottom Ad Section */}
          <AdSection position="bottom" />
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default TeamDetailPage;
