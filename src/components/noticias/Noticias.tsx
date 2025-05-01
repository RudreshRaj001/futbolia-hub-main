import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PageTransition } from "@/utils/animations";
import LazyImage from "@/components/ui/LazyImage";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchNews } from "@/store/slices/newsSlice";
import { TwitterNews } from "../TwitterNews";

const NewsDetail: React.FC = () => {
  const { newsSlug } = useParams<{ newsSlug: string }>();
  const dispatch = useAppDispatch();
  const { news, status, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNews({ slug: newsSlug }));
    }
  }, [dispatch, newsSlug, status]);

  const article = news.find((item) => item.slug === newsSlug);

  if (status === "loading") {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow pt-20 flex justify-center items-center">
            <div>Loading article...</div>
          </main>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  if (status === "failed" || !article) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow pt-20 flex justify-center items-center">
            <div>Error: {error || "Article not found"}</div>
          </main>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <h1 className="text-3xl font-bold font-display">{article.title}</h1>

            <div className="text-sm text-gray-600">
              <time dateTime={article.createdAt}>
                {new Date(article.createdAt).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>

            {article.imageUrls?.[0] && (
              <LazyImage
                src={article.imageUrls[0]}
                alt={article.title}
                className="w-full rounded-lg"
              />
            )}

            <section className="prose dark:prose-invert max-w-none">
              <p>{article.description}</p>
              <hr />
              <h2>Full Content</h2>
              <p>{article.content}</p>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {/* <div>
                <h3 className="font-semibold text-gray-700">League Info</h3>
                <p>
                  <strong>League Name:</strong> {article.leagueName || "N/A"}
                </p>
                <p>
                  <strong>League ID:</strong> {article.leagueId || "N/A"}
                </p>
              </div> */}

              <div>
                <h3 className="font-semibold text-gray-700">Keywords</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(article.seo?.keywords || []).map((kw, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Categories</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(article.category || []).map((cat, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <TwitterNews />
        </main>
        <Footer />
      </div>
    
    </PageTransition>
  );
};

export default NewsDetail;
