import React, { useEffect, Suspense, lazy } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchNews } from "@/store/slices/newsSlice";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
import Advertisement from "@/components/ads/Advertisement";
import { PageTransition } from "@/utils/animations";
import NewsList from "@/components/abroad/NewsList";

// Optional: Lazy load the video component
const VideoOfTheDay = lazy(() => import('@/components/abroad/VideoOfTheDay'));

const SerieA: React.FC = () => {
  const dispatch = useAppDispatch();
  const { news, status, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchNews({ leagueId: "71", page: 1, limit: 10, search: "Serie A" }));
  }, [dispatch]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}

        <main className="flex-grow pt-20">
          <div className="w-full bg-primary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <h1 className="text-2xl font-bold font-display">Serie A</h1>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Advertisement size="banner" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                {status === "succeeded" && <NewsList news={news.slice(0, 10)} />}
              </div>

              <div className="space-y-6">
                <Suspense fallback={<div>Loading video...</div>}>
                  <VideoOfTheDay />
                </Suspense>

                <Advertisement size="sidebar" />
              </div>
            </div>
          </div>
        </main>

        {/* <Footer /> */}
      </div>
    </PageTransition>
  );
};

export default SerieA;
