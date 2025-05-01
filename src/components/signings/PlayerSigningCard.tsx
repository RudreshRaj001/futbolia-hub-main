
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import LazyImage from '@/components/ui/LazyImage';
import { cn } from '@/lib/utils';

export interface PlayerSigningProps {
  id: string;
  name: string;
  fromTeam: string;
  toTeam: string;
  imageUrl: string;
  position: string;
  transferType: 'loan' | 'permanent' | 'free';
  transferFee?: string;
  isNew?: boolean;
}

const PlayerSigningCard: React.FC<{ player: PlayerSigningProps, className?: string }> = ({ 
  player, 
  className 
}) => {
  return (
    <Card className={cn("overflow-hidden hover:shadow-md transition-shadow", className)}>
      <div className="relative">
        <LazyImage 
          src={player.imageUrl} 
          alt={player.name}
          className="w-full h-48 object-cover"
        />
        {player.isNew && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            NEW
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-white font-bold text-lg">{player.name}</h3>
          <p className="text-white/80 text-sm">{player.position}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm">
            <span className="text-gray-500">From:</span> <span className="font-medium">{player.fromTeam}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">To:</span> <span className="font-medium">{player.toTeam}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className={cn(
            "text-xs px-2 py-1 rounded-full",
            player.transferType === 'permanent' ? "bg-green-100 text-green-800" :
            player.transferType === 'loan' ? "bg-blue-100 text-blue-800" :
            "bg-orange-100 text-orange-800"
          )}>
            {player.transferType === 'permanent' ? 'Permanent Transfer' :
             player.transferType === 'loan' ? 'Loan' : 'Free Transfer'}
          </div>
          {player.transferFee && (
            <div className="text-sm font-medium">{player.transferFee}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerSigningCard;
