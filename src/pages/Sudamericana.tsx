import React, { useEffect, Suspense, lazy } from "react";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
import Advertisement from "@/components/ads/Advertisement";
import { PageTransition } from "@/utils/animations";
import SudamericanaHeader from "@/components/sudamericana/SudamericanaHeader";
import MatchResults from "@/components/sudamericana/MatchResults";
import NewsList from "@/components/abroad/NewsList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchNews } from "@/store/slices/newsSlice";

// ✅ Optimization: Lazy-load sidebar to reduce initial JS bundle
const SidebarContent = lazy(() => import("@/components/sudamericana/SidebarContent"));

const Sudamericana: React.FC = () => {
  const dispatch = useAppDispatch();
  const { news, status, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    // ✅ Optimization: Ensure scroll-to-top and fetch only happen once
    window.scrollTo(0, 0);
    dispatch(fetchNews({ search: "Copa Sudamericana" }));
  }, [dispatch]); // Clean dependency array

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}

        <main className="flex-grow pt-20">
          {/* Banner Ad */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Advertisement size="banner" />
          </div>

          {/* Page Header */}
          <SudamericanaHeader />

          {/* Page Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* Main Content Area */}
              <div className="lg:col-span-3">
                {/* ✅ Optimization: Component-safe placeholder with empty array */}
                <MatchResults matches={[]} />

                <h2 className="text-2xl font-display font-bold mb-6">
                  Copa Sudamericana News
                </h2>

                {/* ✅ Optimization: Render logic scoped by status */}
                {status === "loading" && (
                  <p className="text-gray-500">Loading news...</p>
                )}
                {status === "failed" && (
                  <p className="text-red-500">Error: {error}</p>
                )}
                {status === "succeeded" && (
                  <NewsList news={news.slice(0, 10)} />
                )}
              </div>

              {/* ✅ Sidebar: Now lazily loaded with fallback */}
              <div className="lg:col-span-1">
                <Suspense fallback={<div>Loading sidebar...</div>}>
                  <SidebarContent />
                </Suspense>
              </div>
            </div>
          </div>
        </main>

        {/* <Footer /> */}
      </div>
    </PageTransition>
  );
};

export default Sudamericana;
