import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchNews } from "@/store/slices/newsSlice";
import NewsList from "@/components/abroad/NewsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LatestSignings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { news, status, error } = useSelector((state: RootState) => state.news);

  const [tab, setTab] = useState("all");

  useEffect(() => {
    let searchQuery = "";

    if (tab === "all") {
      searchQuery = "Serie A,Serie B,International"; // Multiple search terms
    } else {
      searchQuery = tab; // Single tab name
    }

    dispatch(fetchNews({ search: searchQuery }));
  }, [dispatch, tab]);

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
    <div className="bg-white dark:bg-gray-700 p-6 shadow-sm">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Latest Signings
          </h2>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Serie A">Serie A</TabsTrigger>
            <TabsTrigger value="Serie B">Serie B</TabsTrigger>
            <TabsTrigger value="International">International</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <NewsList news={news.slice(1, 10)} />
        </TabsContent>

        <TabsContent value="Serie A" className="mt-0">
          <NewsList news={news.slice(0, 10)} />
        </TabsContent>

        <TabsContent value="Serie B" className="mt-0">
          <NewsList news={news.slice(0, 10)} />
        </TabsContent>

        <TabsContent value="International" className="mt-0">
          <NewsList news={news.slice(0, 10)} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LatestSignings;
