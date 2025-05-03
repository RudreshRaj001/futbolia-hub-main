import React, { useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
import { PageTransition } from '@/utils/animations';
import SEO from '@/utils/seo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import LazyImage from '@/components/ui/LazyImage';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AppDispatch, RootState } from '@/store';
import { fetchMatch } from '@/store/slices/matchSlice';

// ✅ Lazy-loaded components
const MatchEvents = lazy(() => import('./MatchEvents'));
const TeamLineup = lazy(() => import('./TeamLineup'));
const MatchStatistics = lazy(() => import('./MatchStatistics'));
// const AdSection = lazy(() => import('@/components/home/AdSections'));
import { AdSection } from '@/components/home/AdSections';

const MatchDetail: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { match, loading, error } = useSelector((state: RootState) => state.match);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (matchId) {
      dispatch(fetchMatch(matchId));
    }
  }, [matchId, dispatch]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
        duration: 5000,
      });
    }
  }, [error, toast]);

  if (loading || !match) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}
        <div className="flex-grow flex items-center justify-center">
          <div className="text-xl">Cargando...</div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }

  return (
    <PageTransition>
      <SEO 
        title={`${match.fixture?.league?.name} | ${match.teams?.home?.name} vs ${match.teams?.away?.name}`}
        description="Datos, estadísticas, y alineaciones del partido."
      />
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}
        <main className="flex-grow pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Match Header */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm mb-8">
              <div className="flex items-center justify-center mb-2">
                <Badge variant="outline" className="bg-primary/10">
                  {match.fixture?.league?.name}
                </Badge>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 mb-2">
                    <LazyImage 
                      src={match?.fixture.teams?.home?.logo} 
                      alt={match?.fixture.teams?.home?.name} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <h3 className="text-lg font-bold">{match?.fixture.teams?.home?.name}</h3>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold mb-1">
                    {match?.fixture.goals?.home} - {match?.fixture.goals?.away}
                  </div>
                  <Badge 
                    variant={match.fixture?.fixture?.status?.short === 'FT' ? 'default' : 'secondary'}
                    className="mb-2"
                  >
                    {match.fixture?.fixture?.status?.short}
                  </Badge>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(match.fixture?.fixture?.date).toLocaleDateString('es-ES', { 
                      day: 'numeric', month: 'long', year: 'numeric' 
                    })}
                  </div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 mb-2">
                    <LazyImage 
                      src={match.fixture?.teams?.away?.logo} 
                      alt={match.fixture?.teams?.away?.name} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <h3 className="text-lg font-bold">{match.fixture?.teams?.away?.name}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-sm">
                    {new Date(match.fixture?.fixture?.date).toLocaleDateString('es-ES', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-sm">
                    {new Date(match.fixture?.fixture?.date).toLocaleTimeString('es-ES', {
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-sm">{match.fixture?.fixture?.venue?.name}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="text-sm">Asistencia no disponible</span>
                </div>
              </div>
            </div>

            {/* Tabs for Events, Lineups, and Statistics */}
            <Tabs defaultValue="events" className="mt-8">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
                <TabsTrigger value="events">Eventos</TabsTrigger>
                <TabsTrigger value="lineups">Alineaciones</TabsTrigger>
                <TabsTrigger value="stats">Estadísticas</TabsTrigger>
              </TabsList>

              <TabsContent value="events">
                <Suspense fallback={<div className="text-center py-4">Cargando eventos...</div>}>
                  <MatchEvents events={match.events || []} />
                </Suspense>
              </TabsContent>

              <TabsContent value="lineups">
                <Suspense fallback={<div className="text-center py-4">Cargando alineaciones...</div>}>
                  <TeamLineup lineups={match.lineups || []} />
                </Suspense>
              </TabsContent>

              <TabsContent value="stats">
                <Suspense fallback={<div className="text-center py-4">Cargando estadísticas...</div>}>
                  <MatchStatistics statistics={match.statistics || []} />
                </Suspense>
              </TabsContent>
            </Tabs>

            {/* Ad Section */}
            <div className="my-8">
              <Suspense fallback={<div className="text-center">Cargando anuncio...</div>}>
                <AdSection position="middle" />
              </Suspense>
            </div>
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </PageTransition>
  );
};

export default MatchDetail;
