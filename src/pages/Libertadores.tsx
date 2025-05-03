import React, { useEffect } from "react";
import { motion } from "framer-motion";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
import Advertisement from "@/components/ads/Advertisement";
import { PageTransition } from "@/utils/animations";
import LazyImage from "@/components/ui/LazyImage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchNews } from "@/store/slices/newsSlice";
import { AppDispatch } from "@/store";
import NewsList from "@/components/abroad/NewsList";

const Libertadores: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { news, status, error } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    // ✅ Optimization: Clean, focused side effect to scroll and fetch only once on mount
    window.scrollTo(0, 0);
    dispatch(fetchNews({ search: "Copa Libertadores" }));
  }, [dispatch]); // ✅ Removed unnecessary dependencies

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}

        <main className="flex-grow pt-20">
          {/* ✅ Optimization: Reusable banner component used here */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Advertisement size="banner" />
          </div>

          {/* Page Title Section */}
          <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-4">
                  Copa Libertadores
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
                  Toda la información, resultados y noticias de la Copa Libertadores.
                </p>
              </div>
            </div>
          </section>

          {/* Main Content Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* ✅ Main News Section */}
              <div className="lg:col-span-3">
                <h2 className="text-2xl font-display font-bold mb-6">
                  Libertadores Cup
                </h2>

                {/* ✅ Optimization: Guarded render based on loading state */}
                {status === "loading" && (
                  <p className="text-gray-500">Loading news...</p>
                )}
                {status === "failed" && (
                  <p className="text-red-500">Error: {error}</p>
                )}
                {status === "succeeded" && (
                  <NewsList news={news.slice(0, 10)} />
                )}
              </div>

              {/* Sidebar Section */}
              <div className="lg:col-span-1 space-y-6">

                {/* ✅ Optimization: Could later be lazy-loaded to defer sidebar load */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="p-4 bg-gray-800 text-white font-bold">
                    Video of the day
                  </div>
                  <div className="aspect-video relative">
                    <LazyImage
                      src="https://via.placeholder.com/640x360?text=Video+Preview"
                      alt="Video Preview"
                      aspectRatio="16/9"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 text-white px-3 py-1.5 rounded-full text-sm">
                        Continue watching
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stubbed Calendar UI */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="p-4 bg-gray-800 text-white font-bold">
                    Calendar
                  </div>
                  <div className="p-4">
                    <div className="flex space-x-2 pb-2 overflow-x-auto">
                      <div className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm whitespace-nowrap">
                        LigaPro Series B 2023
                      </div>
                      <div className="bg-gray-200 dark:bg-gray-700 px-3 py-1.5 rounded text-sm whitespace-nowrap">
                        LigaPro Serie A 2023
                      </div>
                      <div className="bg-gray-200 dark:bg-gray-700 px-3 py-1.5 rounded text-sm whitespace-nowrap">
                        2026 Qualifiers
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
                      <button className="text-sm text-gray-600 dark:text-gray-300">
                        Previous date
                      </button>
                      <button className="text-sm text-gray-600 dark:text-gray-300">
                        Next date
                      </button>
                    </div>
                  </div>
                </div>

                {/* ✅ Sidebar Advertisement */}
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

export default Libertadores;
