
import React from 'react';
import { format } from "date-fns";
import { es } from "date-fns/locale";
import MatchItem from '@/components/calendar/MatchItem';
import { Match } from '@/components/calendar/types';

interface MatchListProps {
  matches: Match[];
  selectedDate: Date | undefined;
}

const MatchList: React.FC<MatchListProps> = ({ matches, selectedDate }) => {
  return (
    <div className="space-y-3 mt-4">
      <h3 className="font-semibold text-sm">
        {selectedDate ? format(selectedDate, "EEEE, d 'de' MMMM", { locale: es }) : 'Today'}
      </h3>
      
      {matches.length > 0 ? (
        matches.map(match => (
          <MatchItem key={match.id} match={match} />
        ))
      ) : (
        <div className="text-center py-4 text-gray-500 text-sm">
          No matches scheduled for this date
        </div>
      )}
    </div>
  );
};

export default MatchList;
