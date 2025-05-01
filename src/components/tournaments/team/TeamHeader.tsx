
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TeamHeaderProps {
  teamName: string;
  teamLogo: string;
  tournamentName: string;
  onBack: () => void;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ 
  teamName, 
  teamLogo, 
  tournamentName, 
  onBack 
}) => {
  return (
    <>
      <div className="bg-gray-900 text-white p-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="text-white hover:text-white/80 p-0 h-auto"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5 mr-1" /> Volver
          </Button>
          <div className="text-right text-sm opacity-80">
            {tournamentName}
          </div>
        </div>
      </div>

      <div className="py-6 border-b flex flex-col items-center text-center">
        <div className="w-20 h-20 flex items-center justify-center mb-2">
          <img 
            src={teamLogo} 
            alt={teamName} 
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <h2 className="text-xl font-bold">{teamName}</h2>
      </div>
    </>
  );
};

export default TeamHeader;
