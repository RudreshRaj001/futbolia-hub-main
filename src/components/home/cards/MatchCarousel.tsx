
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import MatchCard, { MatchCardProps } from './MatchCard';

interface MatchCarouselProps {
  matches: MatchCardProps[];
}

const MatchCarousel: React.FC<MatchCarouselProps> = ({ matches }) => {
  if (!matches || matches.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
        No hay partidos disponibles
      </div>
    );
  }

  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="w-full"
    >
      <CarouselContent>
        {matches.map((match, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <MatchCard {...match} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-end mt-4 space-x-2">
        <CarouselPrevious className="static transform-none" />
        <CarouselNext className="static transform-none" />
      </div>
    </Carousel>
  );
};


export default MatchCarousel;
