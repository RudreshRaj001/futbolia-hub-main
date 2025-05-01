import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
import { PageTransition } from '@/utils/animations';
import SEO from '@/utils/seo';
import PlayerProfile from '@/components/players/PlayerProfile';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { AdSection } from '@/components/home/AdSections';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPlayerById } from '@/store/slices/playersSlice';

const CareerTimeline = ({ career }: { career: any[] }) => {
  return (
    <div className="mt-4 space-y-4">
      <h3 className="text-lg font-semibold">Trayectoria</h3>
      <div className="relative border-l-2 border-gray-200 dark:border-gray-800 pl-6 ml-4 space-y-6">
        {career.map((item, index) => (
          <div key={index} className="relative">
            <div className="absolute w-4 h-4 bg-primary rounded-full -left-[25px] top-1"></div>
            <div className="mb-1 text-lg font-semibold">{item.team}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{item.period}</div>
            <div className="mt-1">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PerformanceStats = ({ statistics }: { statistics: any }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-3">Partidos</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Titular</span>
            <span className="font-medium">{statistics?.games?.lineups}</span>
          </div>
          <div className="flex justify-between">
            <span>Suplente</span>
            <span className="font-medium">{statistics?.games?.appearences - statistics?.games?.lineups}</span>
          </div>
          <div className="flex justify-between">
            <span>Minutos</span>
            <span className="font-medium">{statistics?.games?.minutes}</span>
          </div>
          <div className="flex justify-between">
            <span>Valoración</span>
            <span className="font-medium">{Number(statistics?.games?.rating)?.toFixed(1)}</span>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-3">Ataque</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Goles</span>
            <span className="font-medium">{statistics?.goals?.total}</span>
          </div>
          <div className="flex justify-between">
            <span>Asistencias</span>
            <span className="font-medium">{statistics?.goals?.assists}</span>
          </div>
          <div className="flex justify-between">
            <span>Disparos</span>
            <span className="font-medium">{statistics?.shots?.total}</span>
          </div>
          <div className="flex justify-between">
            <span>A puerta</span>
            <span className="font-medium">{statistics?.shots?.on}</span>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-3">Pases</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Total</span>
            <span className="font-medium">{statistics?.passes?.total}</span>
          </div>
          <div className="flex justify-between">
            <span>Clave</span>
            <span className="font-medium">{statistics?.passes?.key}</span>
          </div>
          <div className="flex justify-between">
            <span>Precisión</span>
            <span className="font-medium">{statistics?.passes?.accuracy ?? 'N/A'}%</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

const PlayerDetail: React.FC = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const dispatch = useAppDispatch();
  const { selectedPlayer, loading } = useAppSelector((state) => state.players);
  const { toast } = useToast();

  const playerStats = selectedPlayer?.statistics || null;

  const careerData = [
    {
      team: 'Santos',
      period: '2023 - Actualidad',
      description: 'Jugador clave para Santos en la liga brasileña.'
    },
    {
      team: 'Paris Saint-Germain',
      period: '2017 - 2023',
      description: 'Convirtió múltiples goles y ganó títulos en Francia.'
    },
    {
      team: 'Barcelona',
      period: '2013 - 2017',
      description: 'Parte del tridente histórico MSN con Messi y Suárez.'
    },
    {
      team: 'Santos',
      period: '2009 - 2013',
      description: 'Se dio a conocer como joven promesa del fútbol brasileño.'
    }
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
                <PlayerProfile player={selectedPlayer} statistics={playerStats} />

                <div className="my-8">
                  <AdSection position="middle" />
                </div>

                <Tabs defaultValue="stats" className="mt-8">
                  <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
                    <TabsTrigger value="stats">Estadísticas</TabsTrigger>
                    <TabsTrigger value="career">Trayectoria</TabsTrigger>
                    <TabsTrigger value="media">Multimedia</TabsTrigger>
                  </TabsList>

                  <TabsContent value="stats" className="mt-4">
                    <PerformanceStats statistics={playerStats} />
                  </TabsContent>

                  <TabsContent value="career">
                    <CareerTimeline career={careerData} />
                  </TabsContent>

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
