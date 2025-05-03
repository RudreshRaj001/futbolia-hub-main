import React, { useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
import { PageTransition } from '@/utils/animations';
import SEO from '@/utils/seo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPlayerById } from '@/store/slices/playersSlice';

// ✅ Lazy-loaded components
const PlayerProfile = lazy(() => import('@/components/players/PlayerProfile'));
// const AdSection = lazy(() => import('@/components/home/AdSections'));
import { AdSection } from '@/components/home/AdSections';
const PerformanceStats = lazy(() => import('@/components/players/PlayerStats'));
const CareerTimeline = lazy(() => import('@/components/players/PlayerCareer'));


const PlayerDetail: React.FC = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const dispatch = useAppDispatch();
  const { selectedPlayer, loading } = useAppSelector((state) => state.players);
  const { toast } = useToast();
  const playerStats = selectedPlayer?.statistics || null;

  const careerData = [
    { team: 'Santos', period: '2023 - Actualidad', description: 'Jugador clave para Santos en la liga brasileña.' },
    { team: 'Paris Saint-Germain', period: '2017 - 2023', description: 'Convirtió múltiples goles y ganó títulos en Francia.' },
    { team: 'Barcelona', period: '2013 - 2017', description: 'Parte del tridente histórico MSN con Messi y Suárez.' },
    { team: 'Santos', period: '2009 - 2013', description: 'Se dio a conocer como joven promesa del fútbol brasileño.' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (playerId) {
      dispatch(fetchPlayerById(Number(playerId))).then((res) => {
        if ('payload' in res && res.payload?.name) {
          toast({
            title: 'Datos del jugador cargados',
            description: `Visualizando perfil de ${res.payload.name}`,
            duration: 3000
          });
        }
      });
    }
  }, [playerId, dispatch, toast]);

  return (
    <PageTransition>
      <SEO
        title={`${selectedPlayer?.name || 'Jugador'} - Perfil y Estadísticas | Pase y GOL`}
        description={`Estadísticas, rendimiento y trayectoria de ${selectedPlayer?.name}, jugador de ${selectedPlayer?.team?.name}.`}
        keywords={`${selectedPlayer?.name}, ${selectedPlayer?.team?.name}, fútbol ecuatoriano, estadísticas jugadores`}
        image={selectedPlayer?.photo}
      />

      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}

        <main className="flex-grow pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {selectedPlayer && (
              <>
                {/* ✅ PlayerProfile lazy-loaded */}
                <Suspense fallback={<div className="text-center">Cargando perfil del jugador...</div>}>
                  <PlayerProfile player={selectedPlayer} statistics={playerStats} />
                </Suspense>

                {/* ✅ Middle AdSection lazy-loaded */}
                <div className="my-8">
                  <Suspense fallback={<div className="text-center">Cargando anuncio...</div>}>
                    <AdSection position="middle" />
                  </Suspense>
                </div>

                <Tabs defaultValue="stats" className="mt-8">
                  <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
                    <TabsTrigger value="stats">Estadísticas</TabsTrigger>
                    <TabsTrigger value="career">Trayectoria</TabsTrigger>
                    <TabsTrigger value="media">Multimedia</TabsTrigger>
                  </TabsList>

                  {/* ✅ Stats tab */}
                  <TabsContent value="stats" className="mt-4">
                    <Suspense fallback={<div className="text-center">Cargando estadísticas...</div>}>
                      <PerformanceStats statistics={playerStats} />
                    </Suspense>
                  </TabsContent>

                  {/* ✅ Career tab */}
                  <TabsContent value="career">
                    <Suspense fallback={<div className="text-center">Cargando trayectoria...</div>}>
                      <CareerTimeline career={careerData} />
                    </Suspense>
                  </TabsContent>

                  {/* Placeholder tab */}
                  <TabsContent value="media">
                    <div className="text-center py-12 text-gray-500">
                      Contenido multimedia será añadido próximamente
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </main>

        {/* <Footer /> */}
      </div>
    </PageTransition>
  );
};

export default PlayerDetail;
