import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LazyImage from "@/components/ui/LazyImage";
import { RootState, AppDispatch } from "@/store";
import { fetchNews } from "@/store/slices/newsSlice";
import { AiArticle } from "@/types/api";

interface TournamentNewsProps {
  tournamentId: string;
  trounamentName: string;
}

const TournamentNews: React.FC<TournamentNewsProps> = ({
  tournamentId,
  trounamentName,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { news, status } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    if (tournamentId) {
      dispatch(
        fetchNews({
          leagueId: tournamentId,
          leagueName: trounamentName,
          search: trounamentName,
          limit: 20,
        })
      );
    }
  }, [dispatch, tournamentId, trounamentName]);

  if (status === "loading") {
    return (
      <div className="p-8 text-center text-gray-500">Cargando noticias...</div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400 border rounded-lg bg-white dark:bg-gray-900 shadow">
        <h2 className="text-xl font-semibold mb-2">Sin noticias disponibles</h2>
        <p>No se encontraron artículos para este torneo.</p>
      </div>
    );
  }

  return (
    // Outer container: centers horizontally with mx-auto, controlling overall width with max-w-screen-xl
    <div className="mx-auto max-w-screen-xl px-4 py-4">
      {/* A responsive grid with consistent gap between items */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {news.map((article: AiArticle, index: number) => (
          <motion.article
            key={article._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
            className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow"
          >
            <Link to={`/noticias/slug/${article.slug}`}>
              <div className="flex flex-col h-full">
                <LazyImage
                  src={
                    article.imageUrls?.[0] ||
                    "https://via.placeholder.com/600x400?text=Noticia"
                  }
                  alt={article.title}
                  // Force a consistent 16/9 aspect ratio for all images
                  aspectRatio="16/9"
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                />

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold font-display mb-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm line-clamp-2">
                    {article.summary || article.description}
                  </p>

                  <div className="mt-auto text-gray-500 text-sm">
                    <time dateTime={article.createdAt}>
                      {new Date(article.createdAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                      })}
                    </time>
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

export default TournamentNews;
