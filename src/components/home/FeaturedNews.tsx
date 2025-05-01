import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import LazyImage from "@/components/ui/LazyImage";
import { motion } from "framer-motion";
import { RootState, AppDispatch } from "@/store";
import { fetchTopTrendingNews } from "@/store/slices/newsSlice";

const trendingKeywords = [
  "Libertadores",
  "Barcelona SC",
  "La Tri",
  "LigaPro",
  "Selección",
  "Ecuador",
];

const FeaturedNews: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { news, status } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    dispatch(fetchTopTrendingNews({ keywords: trendingKeywords, limit: 5 }));
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="py-8 text-center">Cargando noticias destacadas...</div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="py-8 text-center">
        No se encontraron noticias destacadas.
      </div>
    );
  }

  const featuredArticle = news[0];
  const otherArticles = news.slice(1, 5);

  return (
    <section className="w-full py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold">Noticias Destacadas</h2>
        <Link
          to="/noticias"
          className="flex items-center text-sm text-primary hover:underline"
        >
          Ver todas
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Main featured article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3 group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
        >
          <Link to={`/noticias/slug/${featuredArticle.slug}`}>
            <div className="relative">
              <LazyImage
                src={
                  featuredArticle.imageUrls?.[0] ||
                  "https://via.placeholder.com/800x500?text=Noticia"
                }
                alt={featuredArticle.title}
                aspectRatio="16/9"
                className="w-full h-auto transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary text-white mb-3">
                  {featuredArticle.category?.[0] || "Noticia"}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white font-display">
                  {featuredArticle.title}
                </h3>
                <p className="mt-2 text-white/80 line-clamp-2">
                  {featuredArticle.summary}
                </p>
                <div className="mt-3 flex items-center">
                  <span className="text-xs text-white/70">
                    {new Date(featuredArticle.updatedAt).toLocaleDateString(
                      "es-ES",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Other articles */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {otherArticles.map((article, index) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 group"
            >
              <Link to={`/noticias/slug/${article.slug}`}>
                <div className="relative">
                  <LazyImage
                    src={
                      article.imageUrls?.[0] ||
                      "https://via.placeholder.com/600x400?text=Noticia"
                    }
                    alt={article.title}
                    aspectRatio="16/9"
                    className="w-full h-auto transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-primary text-white mb-2">
                      {article.category?.[0] || "Noticia"}
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-white font-display">
                      {article.title}
                    </h3>
                    <div className="mt-2 flex items-center">
                      <span className="text-xs text-white/70">
                        {new Date(article.updatedAt).toLocaleDateString(
                          "es-ES",
                          {
                            day: "numeric",
                            month: "long",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;
