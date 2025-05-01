
import React from 'react';
import { teams } from '@/data/teams';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useNavigate } from 'react-router-dom';

interface TeamCarouselProps {
  selectedTeamId?: number;
  onTeamClick?: (teamId: number) => void;
}

const TeamCarousel: React.FC<TeamCarouselProps> = ({ 
  selectedTeamId,
  onTeamClick 
}) => {

  
  const navigate = useNavigate();

  const handleTeamClick = (teamId: number) => {
    if (onTeamClick) {
      onTeamClick(teamId);
    } else {
      navigate(`/equipos/${teamId}`);
    }
  };

  return (
    <div className="py-4 bg-gray-100 dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="relative"
        >
          <CarouselContent className="-ml-2">
            {teams?.map((team) => (
              <CarouselItem key={team.id} className="pl-2 basis-1/4 md:basis-1/6 lg:basis-1/8">
                <div 
                  className={`h-16 w-16 mx-auto flex items-center justify-center cursor-pointer p-1 rounded-full transition-colors ${
                    selectedTeamId === team.id ? 'bg-primary/10 ring-2 ring-primary' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleTeamClick(team.id)}
                >
                  <img 
                    src={team.logo} 
                    alt={team.name} 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="text-center mt-1 text-xs">
                  <span className={`${selectedTeamId === team.id ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
                    {team.shortName || team.name}
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 sm:flex hidden" />
          <CarouselNext className="right-0 sm:flex hidden" />
        </Carousel>
      </div>
    </div>
  );
};

export default TeamCarousel;
