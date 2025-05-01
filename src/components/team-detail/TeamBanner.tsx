
import React from 'react';
import LazyImage from '@/components/ui/LazyImage';

interface TeamBannerProps {
  team: any;
  teamBanner: string;
}

const TeamBanner: React.FC<TeamBannerProps> = ({ team, teamBanner }) => {
  return (
    <div className="relative w-full h-48 md:h-64 lg:h-80 overflow-hidden">
      <img 
        src={teamBanner}
        alt={`${team.name} Banner`}
        className="w-full h-full object-cover" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 flex items-end">
        <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-full p-2 flex items-center justify-center mr-4 shadow-lg">
          <LazyImage
            src={team.logo}
            alt={team.name}
            className="w-12 h-12 md:w-20 md:h-20 object-contain"
          />
        </div>
        <div className="text-white">
          <h1 className="text-2xl md:text-4xl font-bold font-display">{team.name}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="px-2 py-1 bg-primary-dark/30 rounded-full text-xs md:text-sm">
              {team.city}
            </div>
            <div className="px-2 py-1 bg-primary-dark/30 rounded-full text-xs md:text-sm">
              Fundado en {team.founded}
            </div>
            <div className="px-2 py-1 bg-primary-dark/30 rounded-full text-xs md:text-sm">
              Estadio: {team.stadium}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamBanner;
