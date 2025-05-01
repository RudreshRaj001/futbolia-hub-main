
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Advertisement from '@/components/ads/Advertisement';
import { PageTransition } from '@/utils/animations';
import FixtureCalendar from '@/components/calendar/FixtureCalendar';
import { useAppSelector } from '@/store/hooks';

interface CalendarPageProps {
  title: string;
  defaultCompetition: string;
  competitions?: string[];
}

const CalendarPage: React.FC<CalendarPageProps> = ({ 
  title, 
  defaultCompetition,
  competitions = ["Liga Pro", "Serie B", "Libertadores", "Sudamericana"]
}) => {
    const { leagueName } = useAppSelector(s => s.leagueInfo);
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [leagueName]);

  title = leagueName || "Liga Pro";
  defaultCompetition = leagueName || "Liga Pro";


  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-20">
          {/* Page Header */}
          <div className="w-full bg-primary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <h1 className="text-2xl font-bold font-display">{title} - Calendar</h1>
            </div>
          </div>

          {/* Banner Ad */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Advertisement size="banner" />
          </div>

          {/* Calendar Content with Side Ads */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left Side Ad - Hidden on mobile */}
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <Advertisement size="sidebar" />
                </div>
              </div>

              {/* Main content area - 3/5 width on desktop */}
              <div className="lg:col-span-3">
                <FixtureCalendar 
                  competitions={competitions}
                  defaultCompetition={defaultCompetition}
                  className="w-full"
                />
                
               
                
                {/* Mobile Ad - Shown between content on mobile only */}
                <div className="mt-6 lg:hidden">
                  <Advertisement size="inline" />
                </div>
              </div>

              {/* Right Side Ad - 1/5 width on desktop */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  {/* Advertisement - Sidebar */}
                  <div className="sticky top-24">
                    <Advertisement size="sidebar" />
                  </div>
                  
                
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default CalendarPage;
