import React, { useEffect, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import LazyImage from "@/components/ui/LazyImage";
import Advertisement from "@/components/ads/Advertisement";
import { PageTransition } from "@/utils/animations";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchNews } from "@/store/slices/newsSlice";

// Optional: lazy-load the video sidebar to reduce main bundle size
const VideoOfTheDay = lazy(() => import('@/components/abroad/VideoOfTheDay'));

const SerieB: React.FC = () => {
  const dispatch = useAppDispatch();
  const { news, status, error } = useAppSelector((state) => state.news);

  // Fetch Serie B news on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchNews({ search: "Serie B" }));
  }, [dispatch]);

  // Loading fallback
  if (status === "loading") {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow pt-20 flex justify-center items-center">
            <div>Loading news...</div>
          </main>
        </div>
      </PageTransition>
    );
  }

  // Error fallback
  if (status === "failed") {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow pt-20 flex justify-center items-center">
            <div>Error: {error}</div>
          </main>
        </div>
      </PageTransition>
    );
  }

  // Prepare content
  const serieBNews = news.slice(0, 10);
  const mainNews = serieBNews[0];
  const secondaryNews = serieBNews.slice(1);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
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

          {/* Main Layout Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main News + List */}
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

                {/* List of Secondary Articles */}
                <div className="space-y-4">
                  {secondaryNews.map((article, index) => (
                    <motion.article
                      key={article._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
                      className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow"
                    >
                      <Link to={`/noticias/slug/${article.slug}`}>
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

              {/* Right Sidebar */}
              <div className="space-y-6">
                <Suspense fallback={<div>Loading video...</div>}>
                  <VideoOfTheDay />
                </Suspense>
                <Advertisement size="sidebar" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default SerieB;
