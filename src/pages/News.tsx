
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Advertisement from '@/components/ads/Advertisement';
import { PageTransition } from '@/utils/animations';
import { news } from '@/data';
import LazyImage from '@/components/ui/LazyImage';
import { motion } from 'framer-motion';

const News: React.FC = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-20">
          {/* Header */}
          <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-900 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-4">
                  Noticias
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
                  Mantente al día con la última información del fútbol ecuatoriano e internacional.
                </p>
              </div>
            </div>
          </section>

          {/* Banner Ad */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Advertisement size="banner" />
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {news.map((article, index) => (
                    <motion.div 
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 group"
                    >
                      <Link to={`/noticias/${article.id}`}>
                        <div className="relative">
                          <LazyImage 
                            src={article.image} 
                            alt={article.title} 
                            aspectRatio="16/9" 
                            className="w-full h-auto transition-transform duration-500 ease-in-out group-hover:scale-105"
                          />
                          <div className="absolute top-0 right-0 m-3">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary text-white">
                              {article.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2 font-display group-hover:text-primary transition-colors duration-300">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                            {article.summary}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(article.date).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {article.author}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Sidebar - 1/4 width on desktop */}
              <div className="lg:col-span-1">
                <div className="space-y-6 sticky top-24">
                  <Advertisement size="sidebar" />
                  
                  {/* We could add another ad further down the sidebar */}
                  <div className="mt-8">
                    <Advertisement size="sidebar" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default News;
