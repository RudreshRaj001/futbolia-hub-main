import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel';
import { RootState, AppDispatch } from '@/store';
import { fetchTeams } from '@/store/slices/teamSlice';
import LazyImage from '@/components/ui/LazyImage';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

interface TeamIconSliderProps {
  onTeamSelect?: (teamId: number) => void;
  selectedTeamId?: number | null;
}

const TeamIconSlider: React.FC<TeamIconSliderProps> = ({ onTeamSelect, selectedTeamId = null }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { teams, loading, error } = useSelector((state: RootState) => state.teams);
  const leagueIdFromStore = useSelector((state: RootState) => state.leagueInfo.leagueId);
  const leagueId = leagueIdFromStore || 242;

  console.log("check leauge id",leagueId)

  const [api, setApi] = useState<CarouselApi>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!teams.length ) {
      dispatch(fetchTeams({ league: leagueId, season: 2025 }));
    }
  }, [dispatch,leagueId]);

  const handleTeamClick = (teamId: number, event?: React.MouseEvent) => {
    event?.stopPropagation();
    navigate(`/equipos/${teamId}`);
  };

  if (loading) return <div>Loading teams...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-2 border-b border-gray-200 dark:border-gray-700 top-16 z-40 shadow-sm mt-0 pt-0">
      <div className="max-w-7xl mx-auto px-2 md:px-6 lg:px-8">
        <Carousel
          opts={{ align: 'start', loop: true }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent className="-ml-2 mr-2 flex gap-2">
            {teams?.map((team) => (
              <CarouselItem
                key={team.id}
                className="basis-1/3 sm:basis-1/4 md:basis-1/6 lg:basis-1/8 xl:basis-1/10 flex-shrink-0"
              >
                <div
                  onClick={(e) => handleTeamClick(team.id, e)}
                  className={`flex flex-col items-center group p-2 cursor-pointer ${
                    selectedTeamId === team.id
                      ? 'bg-blue-100 dark:bg-blue-900 rounded-lg'
                      : ''
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center bg-white dark:bg-gray-700 shadow-sm p-1 mb-1 group-hover:scale-110 transition-transform ${
                      selectedTeamId === team.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <LazyImage
                      src={team.logo}
                      alt={team.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span
                    className={`text-xs font-medium truncate w-full text-center transition-colors ${
                      selectedTeamId === team.id
                        ? 'text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 group-hover:text-primary'
                    }`}
                  >
                    {team.shortName || team.name}
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation buttons only visible on sm and above */}
          <CarouselPrevious className="left-0 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 border-none text-gray-800 dark:text-gray-200 -translate-y-1/2 shadow-md hidden sm:flex">
            <ChevronLeft className="h-4 w-4" />
          </CarouselPrevious>
          <CarouselNext className="right-0 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 border-none text-gray-800 dark:text-gray-200 -translate-y-1/2 shadow-md hidden sm:flex">
            <ChevronRight className="h-4 w-4" />
          </CarouselNext>
        </Carousel>
      </div>
    </div>
  );
};

export default TeamIconSlider;
