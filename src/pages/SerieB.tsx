import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
import LazyImage from "@/components/ui/LazyImage";
import Advertisement from "@/components/ads/Advertisement";
import { PageTransition } from "@/utils/animations";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchNews } from "@/store/slices/newsSlice";

const SerieB: React.FC = () => {
  const dispatch = useAppDispatch();
  const { news, status, error } = useAppSelector((state) => state.news);

  // Use leagueId "72" for Serie B
  const leagueId = "72";

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchNews({ search: "Serie B" }));
  }, [dispatch, leagueId]);

  if (status === "loading") {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          {/* <Navbar /> */}
          <main className="flex-grow pt-20 flex justify-center items-center">
            <div>Loading news...</div>
          </main>
          {/* <Footer /> */}
        </div>
      </PageTransition>
    );
  }

  if (status === "failed") {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          {/* <Navbar /> */}
          <main className="flex-grow pt-20 flex justify-center items-center">
            <div>Error: {error}</div>
          </main>
          {/* <Footer /> */}
        </div>
      </PageTransition>
    );
  }

  // Get the first 3 news items for Serie B
  const serieBNews = news.slice(0, 10);
  const mainNews = serieBNews[0];
  const secondaryNews = serieBNews.slice(1);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}
        <main className="flex-grow pt-20">
          {/* Page Header */}
          <div className="w-full bg-primary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <h1 className="text-2xl font-bold font-display">Serie B</h1>
            </div>
          </div>

          {/* Banner Ad */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Advertisement size="banner" />
          </div>

          {/* Content Container */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main content area - 2/3 width on desktop */}
              <div className="lg:col-span-2">
                {mainNews && (
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6 bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow"
                  >
                    <Link to={`/noticias/slug/${mainNews.slug}`}>
                      <div className="relative">
                        <LazyImage
                          src={mainNews.imageUrls[0]}
                          alt={mainNews.title}
                          aspectRatio="16/9"
                          className="w-full transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="text-xl sm:text-2xl font-bold font-display mb-2">
                          {mainNews.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {mainNews.summary}
                        </p>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          <time dateTime={mainNews.updatedAt}>
                            {new Date(mainNews.updatedAt).toLocaleString()}
                          </time>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                )}

                {/* Secondary News Articles */}
                <div className="space-y-4">
                  {secondaryNews.map((article, index) => (
                    <motion.article
                      key={article._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
                      className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow"
                    >
                      <Link to={`/noticias/slug/${mainNews.slug}`}>
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-1/3">
                            <LazyImage
                              src={article.imageUrls[0]}
                              alt={article.title}
                              aspectRatio="4/3"
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                          <div className="sm:w-2/3 p-4">
                            <h3 className="text-lg font-bold font-display mb-2">
                              {article.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm line-clamp-2">
                              {article.summary}
                            </p>
                            <div className="flex items-center text-gray-500 text-sm">
                              <Clock className="h-4 w-4 mr-1" />
                              <time dateTime={article.updatedAt}>
                                {new Date(article.updatedAt).toLocaleString()}
                              </time>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </div>

              {/* Sidebar - 1/3 width on desktop */}
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
                      Resumen de la jornada en la Serie B ecuatoriana
                    </h3>
                  </div>
                </div>
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

export default SerieB;
