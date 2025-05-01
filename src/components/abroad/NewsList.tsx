import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import LazyImage from "@/components/ui/LazyImage";
import { AiArticle } from "@/types/api";
import { Link } from "react-router-dom";

interface NewsListProps {
  news: AiArticle[];
}

const NewsList: React.FC<NewsListProps> = ({ news }) => {
  if (!news || news.length === 0) return null;

  const mainArticle = news[0];
  const secondaryArticles = news.slice(1);

  return (
    <div className="space-y-6">
      {/* Featured Article */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow"
      >
        <Link to={`/noticias/slug/${mainArticle.slug}`}>
          <div className="w-full h-full">
            <LazyImage
              src={
                mainArticle.imageUrls?.[0] ||
                "https://via.placeholder.com/640x360?text=Image"
              }
              alt={mainArticle.title}
              className="w-full h-full object-fill transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl sm:text-2xl font-bold font-display mb-2 text-gray-900 dark:text-white">
              {mainArticle.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {mainArticle.description?.slice(0, 300)}...
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <time dateTime={mainArticle.updatedAt}>
                {new Date(mainArticle.updatedAt).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                })}
              </time>
              <span className="ml-3 bg-gray-900 text-white px-2 py-1 rounded-md text-xs">
                {mainArticle.leagueName ||
                  mainArticle.category?.[0] ||
                  "General"}
              </span>
            </div>
          </div>
        </Link>
      </motion.article>

      {/* Secondary Articles */}
      <div className="space-y-4">
        {secondaryArticles.map((article, index) => (
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
                    src={
                      article.imageUrls?.[0] ||
                      "https://via.placeholder.com/300x200?text=Image"
                    }
                    alt={article.title}
                    aspectRatio="4/3"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="sm:w-2/3 p-4">
                  <h3 className="text-lg font-bold font-display mb-2 text-gray-900 dark:text-white">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                    {article.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <time dateTime={article.updatedAt}>
                      {new Date(article.updatedAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                      })}
                    </time>
                    <span className="ml-3 bg-gray-900 text-white px-2 py-1 rounded-md text-xs">
                      {article.leagueName || article.category?.[0] || "General"}
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

export default NewsList;
