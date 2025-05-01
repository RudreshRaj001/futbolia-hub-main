import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchNews } from "@/store/slices/newsSlice";
import NewsList from "@/components/abroad/NewsList";

const QualifiersNews: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { news, status, error } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    dispatch(fetchNews({ search: "Qualifiers" }));
  }, [dispatch]);

  if (status === "loading") {
    return (
      <p className="text-center py-8 text-gray-600 dark:text-gray-300">
        Loading...
      </p>
    );
  }

  if (status === "failed") {
    return <p className="text-center text-red-500 py-8">{error}</p>;
  }

  if (!news || news.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-8">
        No articles available.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <NewsList news={news.slice(0, 10)} />
    </div>
  );
};

export default QualifiersNews;
