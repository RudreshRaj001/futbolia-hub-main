
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamTransfer {
  teamName: string;
  teamLogo: string;
  highs: string[];
  lows: string[];
}

interface TeamTransferCardProps {
  transfer: TeamTransfer;
  className?: string;
}

const TeamTransferCard: React.FC<TeamTransferCardProps> = ({ 
  transfer,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div 
        className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center overflow-hidden">
            <img src={transfer.teamLogo} alt={transfer.teamName} className="w-full h-full object-cover" />
          </div>
          <h3 className="font-bold text-lg">{transfer.teamName}</h3>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {isExpanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-green-600 mb-3">Highs</h4>
              <ul className="space-y-2">
                {transfer.highs.map((player, index) => (
                  <li key={`high-${index}`} className="flex items-center">
                    <span className="text-green-500 mr-2">+</span>
                    {player}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-red-600 mb-3">Lows</h4>
              <ul className="space-y-2">
                {transfer.lows.map((player, index) => (
                  <li key={`low-${index}`} className="flex items-center">
                    <span className="text-red-500 mr-2">-</span>
                    {player}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default TeamTransferCard;
