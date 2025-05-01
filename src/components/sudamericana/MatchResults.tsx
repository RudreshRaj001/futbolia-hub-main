
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Match {
  id: number;
  competition: string;
  stage: string;
  homeTeam: string;
  homeScore: string;
  awayTeam: string;
  awayScore: string;
  homeLogo?: string;
  awayLogo?: string;
}

interface MatchResultsProps {
  matches: Match[];
}

const MatchResults: React.FC<MatchResultsProps> = ({ matches }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(matches.length / 2);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 mb-6 overflow-hidden">
      <div className="relative">
        {/* Carousel Navigation */}
        <button 
          onClick={goToPrevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-r-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        
        <button 
          onClick={goToNextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-l-lg"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
        
        {/* Match Results */}
        <div className="flex overflow-hidden">
          <div className="flex w-full transition-transform duration-300" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {matches.map((match) => (
              <div key={match.id} className="min-w-full md:min-w-[50%] p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {match.competition}
                </div>
                <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-center flex-1">
                    <div className="font-bold text-lg">{match.homeTeam}</div>
                  </div>
                  
                  <div className="flex items-center mx-4 text-xl font-bold">
                    <span className="bg-gray-200 dark:bg-gray-700 w-10 h-10 flex items-center justify-center rounded-full">
                      {match.homeScore}
                    </span>
                    <span className="mx-2">-</span>
                    <span className="bg-gray-200 dark:bg-gray-700 w-10 h-10 flex items-center justify-center rounded-full">
                      {match.awayScore}
                    </span>
                  </div>
                  
                  <div className="text-center flex-1">
                    <div className="font-bold text-lg">{match.awayTeam}</div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
                  {match.stage}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchResults;
