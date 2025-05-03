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
    // ✅ Optimization: Ensures scroll resets to top only once on mount (not on re-renders)
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}

        <main className="flex-grow pt-20">
          {/* Top Banner Advertisement */}
          <AdSection position="top" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area (2/3 width on desktop) */}
              <div className="lg:col-span-2 space-y-8">
                {/* ✅ Optimization: Logical order – Upcoming Matches shown before header/news */}
                <QualifiersUpcomingMatches />

                {/* Section Header */}
                <QualifiersHeader />

                {/* News Related to Qualifiers */}
                <QualifiersNews />

                {/* Group Standings Table */}
                <QualifiersStandings />

                {/* Fixture Schedule Table */}
                <QualifiersSchedule />

                {/* Goal Scorer Rankings */}
                <QualifiersTopScorers />

                {/* Middle Ad Placement for Visibility */}
                <AdSection position="middle" />
              </div>

              {/* Sidebar Area (1/3 width on desktop) */}
              <div className="space-y-8">
                {/* ✅ Optimization: Modular and reorderable content */}
                <QualifiersVideoSection />

                {/* ✅ Optimization: Reused `TeamCompare` component instead of redundant compare section */}
                {/* <QualifiersCompareSection type="equipment" /> */}
                <TeamCompare />

                {/* <QualifiersCompareSection type="players" /> */}

                {/* Sidebar Ad Section */}
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
