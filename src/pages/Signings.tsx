import React, { useEffect, Suspense, lazy } from "react";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
import { PageTransition } from "@/utils/animations";
import { AdSection } from "@/components/home/AdSections";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchNews } from "@/store/slices/newsSlice";

// ✅ Lazy-loaded components
const NewsList = lazy(() => import("@/components/abroad/NewsList"));
const LatestSignings = lazy(() => import("@/components/signings/LatestSignings"));
const TeamTransfers = lazy(() => import("@/components/signings/TeamTransfers"));
const VideoSection = lazy(() => import("@/components/signings/VideoSection"));

const Signings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { news, status, error } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    // ✅ Single mount effect for fetch and scroll
    window.scrollTo(0, 0);
    dispatch(fetchNews({ search: "Fichajes" }));
  }, [dispatch]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}

        <main className="flex-grow pt-20">
          {/* Top Banner Advertisement */}
          <AdSection position="top" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">

                {/* Page Title */}
                <div className="bg-primary text-white p-6">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    LigaPro 2025 Signings
                  </h1>
                </div>

                {/* Introduction */}
                <div className="bg-white p-6 shadow-sm">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                    Learn about the additions and departures of the LigaPro Serie A for 2025.
                  </h2>
                </div>

                {/* Featured Signing */}
                <div className="relative">
                  <Suspense fallback={<div className="text-gray-500">Loading featured signing...</div>}>
                    {status === "succeeded" && <NewsList news={news.slice(0, 1)} />}
                    {status === "loading" && <p className="text-gray-500">Loading news...</p>}
                    {status === "failed" && <p className="text-red-500">Error: {error}</p>}
                  </Suspense>
                </div>

                {/* Team Transfers */}
                <Suspense fallback={<div className="text-gray-500">Loading team transfers...</div>}>
                  <TeamTransfers />
                </Suspense>

                {/* Latest Signings */}
                <Suspense fallback={<div className="text-gray-500">Loading signings...</div>}>
                  <LatestSignings />
                </Suspense>

                {/* Middle Ad */}
                <AdSection position="middle" />
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Ad */}
                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="bg-white rounded-md overflow-hidden">
                    <img
                      src="https://via.placeholder.com/300x250"
                      alt="Advertisement"
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Video Section */}
                <Suspense fallback={<div className="text-gray-500">Loading video...</div>}>
                  <VideoSection />
                </Suspense>

                {/* Ad */}
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

        {/* <Footer /> */}
      </div>
    </PageTransition>
  );
};

export default Signings;
