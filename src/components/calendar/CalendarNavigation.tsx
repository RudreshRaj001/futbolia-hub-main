
import React from 'react';

interface CalendarNavigationProps {
  onPrevDate: () => void;
  onNextDate: () => void;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({ onPrevDate, onNextDate }) => {
  return (
    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
      <button 
        onClick={onPrevDate}
        className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
      >
        Previous 
      </button>
      <button 
        onClick={onNextDate}
        className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
      >
        Next 
      </button>
    </div>
  );
};

export default CalendarNavigation;
