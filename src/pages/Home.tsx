import React, { useEffect, Suspense, lazy } from "react";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
import ImageSlider from "@/components/home/ImageSlider";
import WelcomeSection from "@/components/home/WelcomeSection";
import { PageTransition } from "@/utils/animations";
import { AdSection } from "@/components/home/AdSections";
import MatchCards from "@/components/home/MatchCards";
import TeamIconSlider from "@/components/teams/TeamIconSlider";
import { fetchTournaments } from "@/store/slices/tournamentsSlice";
import { fetchTeams } from "@/store/slices/teamSlice";
import { useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

// Lazy-loaded components
const FeaturedNews = lazy(() => import("@/components/home/FeaturedNews"));
const CalendarStandingsSection = lazy(() => import("@/components/home/CalendarStandingsSection"));
const TeamsScorersSection = lazy(() => import("@/components/home/TeamsScorersSection"));

const currentYear = new Date().getFullYear();

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { teams } = useSelector((state: RootState) => state.teams);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchTournaments());

    if (!teams.length) {
      dispatch(fetchTeams({ league: 242, season: currentYear }));
    }
  }, [dispatch, teams]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}
        <TeamIconSlider />
        <main className="flex-grow">
          <section>
            <ImageSlider />
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <MatchCards />
          </div>

          <AdSection position="top" />
          <WelcomeSection />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Suspense fallback={<div>Loading sections…</div>}>
              <FeaturedNews />
              <AdSection position="middle" />
              <CalendarStandingsSection />
              <TeamsScorersSection teams={teams} />
            </Suspense>
            <AdSection position="bottom" />
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </PageTransition>
  );
};

export default Home;
