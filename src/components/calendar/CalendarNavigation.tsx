import React from 'react';

interface CalendarNavigationProps {
  onPrevDate: () => void;
  onNextDate: () => void;
  currentPage?: number;
  totalPages?: number;
  isPaged?: boolean;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({ 
  onPrevDate, 
  onNextDate,
  currentPage = 1,
  totalPages = 1,
  isPaged = false
}) => {
  return (
    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
      <button 
        onClick={onPrevDate}
        className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
      >
        {isPaged ? 'Previous Page' : 'Previous Day'}
      </button>
      
      {isPaged && (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
      )}
      
      <button 
        onClick={onNextDate}
        className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
      >
        {isPaged ? 'Next Page' : 'Next Day'}
      </button>
    </div>
  );
};

export default CalendarNavigation;
