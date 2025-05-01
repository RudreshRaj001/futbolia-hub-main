import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturedNews from "@/components/home/FeaturedNews";
import LatestResults from "@/components/home/LatestResults";
import ImageSlider from "@/components/home/ImageSlider";
import { PageTransition } from "@/utils/animations";
import WelcomeSection from "@/components/home/WelcomeSection";
import CalendarStandingsSection from "@/components/home/CalendarStandingsSection";
import TeamsScorersSection from "@/components/home/TeamsScorersSection";
import { AdSection } from "@/components/home/AdSections";
import MatchCards from "@/components/home/MatchCards";
import TeamIconSlider from "@/components/teams/TeamIconSlider";
import { fetchTournaments } from "@/store/slices/tournamentsSlice";
import { useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { fetchTeams } from "@/store/slices/teamSlice";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { teams } = useSelector((state: RootState) => state.teams);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchTournaments());
  }, [dispatch]);

  useEffect(() => {
    if (!teams.length) {
      dispatch(fetchTeams({ league: 242, season: currentYear }));
    }
  }, [dispatch, teams, currentYear]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
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
            <FeaturedNews />
            <AdSection position="middle" />
            <CalendarStandingsSection />
            <TeamsScorersSection teams={teams} />
            <AdSection position="bottom" />
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Home;
