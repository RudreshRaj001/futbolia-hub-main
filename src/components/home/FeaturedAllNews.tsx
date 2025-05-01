import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import LazyImage from "@/components/ui/LazyImage";
import { motion } from "framer-motion";
import { RootState, AppDispatch } from "@/store";
import { fetchTopTrendingNews } from "@/store/slices/newsSlice";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
import { PageTransition } from "@/utils/animations";

const trendingKeywords = [
  "Libertadores",
  "Barcelona SC",
  "La Tri",
  "LigaPro",
  "Selección",
  "Ecuador",
];

const FeaturedAllNews: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { news, status } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchTopTrendingNews({ keywords: trendingKeywords, limit: 20 }));
  }, [dispatch]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}

        <main className="flex-grow">
          {status === "loading" && (
            <div className="py-10 text-center text-lg">
              Cargando noticias destacadas...
            </div>
          )}

          {!news?.length && status !== "loading" && (
            <div className="py-10 text-center text-lg">
              No se encontraron noticias destacadas.
            </div>
          )}

          {news?.length > 0 && (
            <section className="w-full py-10 px-4">
              <div className="flex items-center justify-between mb-8 max-w-screen-xl mx-auto">
                <h2 className="text-3xl font-display font-bold">
                  Noticias Destacadas
                </h2>
              </div>

              <div
                className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-6 auto-rows-[200px]"
                style={{ gridAutoFlow: "dense" }}
              >
                {news.map((article, index) => {
                  const spanClass =
                    index % 5 === 0
                      ? "col-span-2 row-span-2"
                      : index % 3 === 0
                      ? "row-span-2"
                      : "row-span-1";

                  return (
                    <motion.div
                      key={article._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.03 * index }}
                      className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 group ${spanClass}`}
                    >
                      <Link to={`/noticias/slug/${article.slug}`}>
                        <div className="relative w-full h-full">
                          <img
                            src={
                              article.imageUrls?.[0] ||
                              "https://via.placeholder.com/600x400"
                            }
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-0 left-0 p-4">
                            <span className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-medium bg-primary text-white">
                              {article.category?.[0] || "Noticia"}
                            </span>
                            <h3 className="text-sm md:text-base font-bold text-white font-display line-clamp-2">
                              {article.title}
                            </h3>
                            <div className="mt-1 text-xs text-white/70">
                              {new Date(article.updatedAt).toLocaleDateString(
                                "es-ES",
                                {
                                  day: "numeric",
                                  month: "long",
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          )}
        </main>

        {/* <Footer /> */}
      </div>
    </PageTransition>
  );
};

export default FeaturedAllNews;
