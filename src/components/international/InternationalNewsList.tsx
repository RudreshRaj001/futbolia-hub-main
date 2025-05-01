import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchNews } from "@/store/slices/newsSlice";
import NewsList from "../abroad/NewsList";

const InternationalNewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { news, status, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews({ search: "international" }));
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading international news...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!news || news.length === 0) {
    return <div>No international news found.</div>;
  }

  return <NewsList news={news} />;
};

export default InternationalNewsList;
