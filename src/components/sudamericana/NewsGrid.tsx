import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LazyImage from "@/components/ui/LazyImage";
import { Feed } from "@/types/api"; // make sure this path matches your project structure

interface NewsGridProps {
  articles: Feed[];
}

const NewsGrid: React.FC<NewsGridProps> = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="p-6 text-center bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
        <p className="text-gray-500">No articles available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articles.slice(0, 6).map((article, index) => (
        <motion.div
          key={article._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
        >
          <Link to={`/noticias/slug/${article.slug || article._id}`}>
            <div className="relative">
              <LazyImage
                src={article.imageUrls?.[0] || "/placeholder.jpg"}
                alt={article.title}
                aspectRatio="16/9"
                className="w-full h-auto"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold font-display mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                  {article.summary}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(article.pubDate).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                  })}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default NewsGrid;
