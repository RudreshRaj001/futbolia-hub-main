import React, { useEffect, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PageTransition } from '@/utils/animations';
import { AdSection } from '@/components/home/AdSections';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
import SEO from '@/utils/seo';
import { useToast } from '@/hooks/use-toast';
import { fetchTeamById, clearTeamState } from '@/store/slices/teamSlice';
import { RootState, AppDispatch } from '@/store';
import Loader from '@/components/ui/Loader';

// ✅ Lazy-loaded heavy components
const TeamBanner = lazy(() => import('@/components/team-detail/TeamBanner'));
const TeamIconSlider = lazy(() => import('@/components/teams/TeamIconSlider'));
const TeamDetailTabs = lazy(() => import('@/pages/team-detail/components/TeamDetailTabs'));

const TeamDetailPage: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { team, loading, error, matches, standings } = useSelector((state: RootState) => state.teams);
  const { toast } = useToast();

  useEffect(() => {
    if (teamId) {
      dispatch(fetchTeamById(Number(teamId)));
    }

    return () => {
      dispatch(clearTeamState());
    };
  }, [teamId, dispatch]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [error, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}
        <div className="flex-grow flex items-center justify-center">
          <Loader />
        </div>
        {/* <Footer /> */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}
        <div className="flex-grow flex items-center justify-center">
          <div className="text-xl text-red-500">Error: {error}</div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}
        <div className="flex-grow flex items-center justify-center">
          <div className="text-xl">Equipo no encontrado</div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }

  const teamBanner = team.logo || `/lovable-uploads/default-banner.png`;

  return (
    <PageTransition>
      <SEO 
        title={`${team.name} - Estadísticas, Jugadores y Resultados | Pase y GOL`}
        description={`Toda la información sobre ${team.name}: plantilla, estadísticas, resultados, próximos partidos y posición en la tabla.`}
        keywords={`${team.name}, fútbol ecuatoriano, estadísticas ${team.name}, jugadores ${team.name}, resultados ${team.name}`}
        image={team.logo}
      />

      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}
        <main className="flex-grow pt-16">
          {/* ✅ Lazy-loaded TeamIconSlider */}
          <Suspense fallback={<div className="text-center py-4">Cargando equipos...</div>}>
            <TeamIconSlider 
              selectedTeamId={team.id} 
              onTeamSelect={(id) => navigate(`/equipos/${id}`)} 
            />
          </Suspense>

          {/* ✅ Lazy-loaded TeamBanner */}
          <Suspense fallback={<div className="text-center py-4">Cargando banner...</div>}>
            <TeamBanner team={team} teamBanner={teamBanner} />
          </Suspense>

          {/* ✅ Lazy-loaded TeamDetailTabs */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Suspense fallback={<div className="text-center py-6">Cargando contenido del equipo...</div>}>
              <TeamDetailTabs 
                team={team}
                teamNews={[]} // Optional: populate if news API added
                teamMatches={matches}
                standings={standings}
              />
            </Suspense>
          </div>

          <AdSection position="bottom" />
        </main>
        {/* <Footer /> */}
      </div>
    </PageTransition>
  );
};

export default TeamDetailPage;
