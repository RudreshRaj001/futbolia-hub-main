
import React from 'react';
import LazyImage from '@/components/ui/LazyImage';
import Advertisement from '@/components/ads/Advertisement';
import FixtureCalendar from '@/components/calendar/FixtureCalendar';

const SidebarContent: React.FC = () => {
  return (
    <div className="lg:col-span-1 space-y-6">
      {/* Video Section */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-4 bg-gray-800 text-white font-bold">
          Video of the day
        </div>
        <div className="aspect-video relative">
          <LazyImage 
            src="https://via.placeholder.com/640x360?text=Video+Preview" 
            alt="Video Preview" 
            aspectRatio="16/9"
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/50 text-white px-3 py-1.5 rounded-full text-sm">
              Continue watching
            </div>
          </div>
        </div>
      </div>
      
      {/* Calendar Section - Using the new reusable component */}
      <FixtureCalendar 
        competitions={["Liga Pro", "Serie B", "Libertadores", "Sudamericana"]} 
        defaultCompetition="Sudamericana" 
      />
      
      {/* Sidebar Ad */}
      <Advertisement size="sidebar" />
    </div>
  );
};

export default SidebarContent;
