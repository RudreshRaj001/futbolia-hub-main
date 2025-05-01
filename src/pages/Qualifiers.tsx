
import React, { useEffect } from 'react';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
import { PageTransition } from '@/utils/animations';
import { AdSection } from '@/components/home/AdSections';
import QualifiersHeader from '@/components/qualifiers/QualifiersHeader';
import QualifiersNews from '@/components/qualifiers/QualifiersNews';
import QualifiersStandings from '@/components/qualifiers/QualifiersStandings';
import QualifiersSchedule from '@/components/qualifiers/QualifiersSchedule';
import QualifiersTopScorers from '@/components/qualifiers/QualifiersTopScorers';
import QualifiersVideoSection from '@/components/qualifiers/QualifiersVideoSection';
// import QualifiersCompareSection from '@/components/qualifiers/QualifiersCompareSection';
import QualifiersUpcomingMatches from '@/components/qualifiers/QualifiersUpcomingMatches';
import TeamCompare from '@/components/tournaments/team/TeamCompare';

const Qualifiers: React.FC = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}
        
        <main className="flex-grow  pt-20">
          {/* Top Banner Advertisement */}
          <AdSection position="top" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area (2/3 width on desktop) */}
              <div className="lg:col-span-2 space-y-8">
                {/* Qualifiers Upcoming Matches */}
                <QualifiersUpcomingMatches />
                
                {/* Qualifiers Header */}
                <QualifiersHeader />
                
                {/* Qualifiers News */}
                <QualifiersNews />
                
                {/* Qualifiers Standings */}
                <QualifiersStandings />
                
                {/* Qualifiers Schedule */}
                <QualifiersSchedule />
                
                {/* Qualifiers Top Scorers */}
                <QualifiersTopScorers />
                
                {/* Middle Ad Section */}
                <AdSection position="middle" />
              </div>
              
              {/* Sidebar Area (1/3 width on desktop) */}
              <div className="space-y-8">
                {/* Video of the day section */}
                <QualifiersVideoSection />
                
                {/* Compare equipment section */}
                {/* <QualifiersCompareSection type="equipment" /> */}
                <TeamCompare />
                
                {/* Compare players section */}
                {/* <QualifiersCompareSection type="players" /> */}
                
                {/* Advertisement */}
                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="bg-white rounded-md overflow-hidden">
                    <img 
                      src="https://via.placeholder.com/300x250" 
                      alt="Advertisement" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Banner Advertisement */}
          <AdSection position="bottom" />
        </main>
        
        {/* <Footer /> */}
      </div>
    </PageTransition>
  );
};

export default Qualifiers;
