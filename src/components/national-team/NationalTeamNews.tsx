import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import LazyImage from "@/components/ui/LazyImage";
import { RootState, AppDispatch } from "@/store";
import { fetchNews } from "@/store/slices/newsSlice";
import { motion } from "framer-motion";

const NationalTeamNews: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { news, status, error } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchNews({ search: "National Team", limit: 10 }));
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="text-center py-6 text-gray-600 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  if (status === "failed") {
    return <div className="text-red-500 text-center py-6">Error: {error}</div>;
  }

  if (!news || news.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">No articles found.</div>
    );
  }

  const featuredNews = news[0];
  const secondaryNews = news.slice(1);

  return (
    <div className="space-y-6">
      {/* Featured Article */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow"
      >
        <Link to={`/noticias/slug/${featuredNews.slug}`}>
          <div className="relative">
            <LazyImage
              src={
                featuredNews.imageUrls?.[0] ||
                "https://via.placeholder.com/640x360?text=Image"
              }
              alt={featuredNews.title}
              aspectRatio="16/9"
              className="w-full transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl sm:text-2xl font-bold font-display mb-2 text-gray-900 dark:text-white">
              {featuredNews.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {featuredNews.summary}
            </p>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <time dateTime={featuredNews.updatedAt}>
                {new Date(featuredNews.updatedAt).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                })}
              </time>
              <span className="ml-3 bg-gray-900 text-white px-2 py-1 rounded-md text-xs">
                {featuredNews.category?.[0] || "News"}
              </span>
            </div>
          </div>
        </Link>
      </motion.article>

      {/* Secondary Articles */}
      <div className="space-y-4">
        {secondaryNews.map((item, index) => (
          <motion.article
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
            className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow"
          >
            <Link to={`/noticias/slug/${item.slug}`}>
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/3">
                  <LazyImage
                    src={
                      item.imageUrls?.[0] ||
                      "https://via.placeholder.com/300x200?text=Image"
                    }
                    alt={item.title}
                    aspectRatio="4/3"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="sm:w-2/3 p-4">
                  <h3 className="text-lg font-bold font-display mb-2 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                    {item.summary}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <time dateTime={item.updatedAt}>
                      {new Date(item.updatedAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                      })}
                    </time>
                    <span className="ml-3 bg-gray-900 text-white px-2 py-1 rounded-md text-xs">
                      {item.category?.[0] || "News"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default NationalTeamNews;
