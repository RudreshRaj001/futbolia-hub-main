
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface CalendarDate {
  id: string;
  name: string;
}

const calendarDates: CalendarDate[] = [
  { id: 'previous', name: 'Previous date' },
  { id: 'date2', name: 'Date 2' },
];

const categories = [
  { id: 'ligapro-b', name: 'LigaPro Series B 2025' },
  { id: 'ligapro-a', name: 'LigaPro Serie A 2025' },
  { id: 'qualifiers', name: '2026 Qualifiers' },
];

const NationalTeamCalendar: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('ligapro-b');
  const [activeDate, setActiveDate] = useState('date2');

  return (
    <div className="bg-white rounded-md overflow-hidden shadow-sm">
      <div className="bg-gray-900 text-white p-4">
        <h2 className="text-lg font-bold">Calendar</h2>
      </div>
      
      <div className="bg-gray-100 p-2 flex space-x-2 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            className={cn(
              "py-2 px-4 text-sm font-medium rounded-md whitespace-nowrap",
              activeCategory === category.id 
                ? "bg-primary text-white" 
                : "bg-white text-gray-700 hover:bg-gray-50"
            )}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          {calendarDates.map((date) => (
            <button
              key={date.id}
              className={cn(
                "py-2 px-4 text-sm",
                activeDate === date.id
                  ? "font-bold" 
                  : "text-gray-600 hover:text-gray-900"
              )}
              onClick={() => setActiveDate(date.id)}
            >
              {date.name}
              {activeDate === date.id && (
                <div className="w-full h-0.5 bg-primary mt-1"></div>
              )}
            </button>
          ))}
        </div>
        
        {activeDate === 'date2' && (
          <div className="bg-gray-100 rounded-md p-4">
            <div className="text-center text-gray-500 text-sm">
              No matches scheduled for this date
            </div>
          </div>
        )}
        
        {activeDate === 'previous' && (
          <div className="bg-gray-100 rounded-md p-4">
            <div className="text-center text-gray-500 text-sm">
              No previous match data available
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NationalTeamCalendar;
