import React from "react";
import { motion } from "framer-motion";
import LazyImage from "@/components/ui/LazyImage";
import { Feed } from "@/types/api"; // assuming Feed type is exported from this path

interface FeaturedNewsProps {
  article: Feed;
}

const FeaturedNews: React.FC<FeaturedNewsProps> = ({ article }) => {
  if (!article) {
    return (
      <div className="rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6">
        <p className="text-gray-500">No featured article available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative">
          <LazyImage
            src={article.imageUrls?.[0] || "/placeholder.jpg"}
            alt={article.title}
            aspectRatio="1/1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 flex flex-col">
          <h3 className="text-xl md:text-2xl font-bold font-display mb-3 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {article.summary}
          </p>
          <div className="mt-auto text-sm text-gray-500 dark:text-gray-400">
            {new Date(article.pubDate).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedNews;
