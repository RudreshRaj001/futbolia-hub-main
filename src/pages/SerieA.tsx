import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchNews } from "@/store/slices/newsSlice";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Advertisement from "@/components/ads/Advertisement";
import { PageTransition } from "@/utils/animations";
import LazyImage from "@/components/ui/LazyImage";
import NewsList from "@/components/abroad/NewsList";

const SerieA: React.FC = () => {
  const dispatch = useAppDispatch();
  const { news, status, error } = useAppSelector((state) => state.news);

  const leagueId = "71";

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchNews({ leagueId, page: 1, limit: 10, search: "Serie A" }));
    console.log("news", news.length);
  }, [dispatch, leagueId]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow pt-20">
          {/* Page Header */}
          <div className="w-full bg-primary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <h1 className="text-2xl font-bold font-display">Serie A</h1>
            </div>
          </div>

          {/* Banner Ad */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Advertisement size="banner" />
          </div>

          {/* Content Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content - 2/3 width */}
              <div className="lg:col-span-2">
                {status === "loading" && (
                  <div className="text-center text-gray-600 dark:text-gray-300 py-8">
                    Loading news...
                  </div>
                )}

                {status === "failed" && (
                  <div className="text-center text-red-500 py-8">
                    Error loading news: {error}
                  </div>
                )}

                {status === "succeeded" && (
                  <NewsList news={news.slice(0, 10)} />
                )}
              </div>

              {/* Sidebar - 1/3 width */}
              <div className="space-y-6">
                {/* Video of the day */}
                <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow">
                  <div className="bg-primary text-white p-3">
                    <h2 className="font-bold font-display">Video of the day</h2>
                  </div>
                  <div className="p-4">
                    <div className="relative pb-[56.25%] overflow-hidden rounded">
                      <LazyImage
                        src="https://via.placeholder.com/640x360?text=Video+Thumbnail"
                        alt="Video del día"
                        aspectRatio="16/9"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="white"
                              viewBox="0 0 24 24"
                              className="w-6 h-6"
                            >
                              <path d="M8 5.14v14l11-7-11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold mt-3">
                      Los goles de la fecha 10 del campeonato ecuatoriano
                    </h3>
                  </div>
                </div>

                {/* Sidebar Ad */}
                <Advertisement size="sidebar" />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default SerieA;
