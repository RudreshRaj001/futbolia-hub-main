import React, { useEffect } from 'react';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
import Advertisement from '@/components/ads/Advertisement';
import { PageTransition } from '@/utils/animations';
import FixtureCalendar from '@/components/calendar/FixtureCalendar';
import { useAppSelector } from '@/store/hooks';

// Props interface for flexible reuse across different league calendar pages
interface CalendarPageProps {
  title: string;
  defaultCompetition: string;
  competitions?: string[];
}

// Functional component with default prop values
const CalendarPage: React.FC<CalendarPageProps> = ({ 
  title, 
  defaultCompetition,
  competitions = ["Liga Pro", "Serie B", "Libertadores", "Sudamericana"]
}) => {
  const { leagueName } = useAppSelector(s => s.leagueInfo);

  useEffect(() => {
    // Automatically scroll to top when league changes (or page mounts)
    window.scrollTo(0, 0);
  }, [leagueName]);

  // Dynamically override title and defaultCompetition if league name is available
  const resolvedTitle = leagueName || title;
  const resolvedCompetition = leagueName || defaultCompetition;

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        {/* Top Navigation */}
        {/* <Navbar /> */}
        
        <main className="flex-grow pt-20">
          {/* Page Heading */}
          <div className="w-full bg-primary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <h1 className="text-2xl font-bold font-display">{resolvedTitle} - Calendar</h1>
            </div>
          </div>

          {/* Banner Ad Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Advertisement size="banner" />
          </div>

          {/* Main Grid Layout: Calendar + Sidebars */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              
              {/* Left Sidebar Ad (Sticky, only on desktop) */}
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <Advertisement size="sidebar" />
                </div>
              </div>

              {/* Main Content Area (Calendar) */}
              <div className="lg:col-span-3">
                <FixtureCalendar 
                  competitions={competitions}
                  defaultCompetition={resolvedCompetition}
                  className="w-full"
                />

                {/* Inline Ad visible only on mobile screens */}
                <div className="mt-6 lg:hidden">
                  <Advertisement size="inline" />
                </div>
              </div>

              {/* Right Sidebar Ad (Sticky) */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <div className="sticky top-24">
                    <Advertisement size="sidebar" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer Section */}
        {/* <Footer /> */}
      </div>
    </PageTransition>
  );
};

export default CalendarPage;
