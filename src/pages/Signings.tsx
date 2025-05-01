import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PageTransition } from "@/utils/animations";
import { AdSection } from "@/components/home/AdSections";
import { Separator } from "@/components/ui/separator";
import LazyImage from "@/components/ui/LazyImage";
import PlayerSigningCard from "@/components/signings/PlayerSigningCard";
import LatestSignings from "@/components/signings/LatestSignings";
import VideoSection from "@/components/signings/VideoSection";
import TeamTransfers from "@/components/signings/TeamTransfers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchNews } from "@/store/slices/newsSlice";
import NewsList from "@/components/abroad/NewsList";
const Signings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { news, status, error } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    dispatch(fetchNews({ search: "Fichajes" }));
  }, [dispatch]);
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow  pt-20">
          {/* Top Banner Advertisement */}
          <AdSection position="top" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area (2/3 width on desktop) */}
              <div className="lg:col-span-2 space-y-8">
                {/* Header Section */}
                <div className="bg-primary text-white p-6">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    LigaPro 2025 Signings
                  </h1>
                </div>

                {/* Introduction Text */}
                <div className="bg-white p-6 shadow-sm">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                    Learn about the additions and departures of the LigaPro
                    Serie A for 2025.
                  </h2>
                </div>

                {/* Featured Signing */}
                <div className="relative">
                  <NewsList news={news.slice(0, 1)} />
                </div>

                {/* Team Transfer Insights */}
                <TeamTransfers />

                {/* Latest Signings Grid */}
                <LatestSignings />

                {/* Middle Ad Section */}
                <AdSection position="middle" />
              </div>

              {/* Sidebar Area (1/3 width on desktop) */}
              <div className="space-y-8">
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

                {/* Video of the day section */}
                <VideoSection />

                {/* Another Advertisement */}
                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="bg-white rounded-md overflow-hidden">
                    <img
                      src="https://via.placeholder.com/300x600"
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

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Signings;
