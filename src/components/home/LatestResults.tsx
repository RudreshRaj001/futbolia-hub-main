
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { matches } from '@/data/matches';
import { cn } from '@/lib/utils';

const LatestResults: React.FC = () => {
  const completedMatches = matches.filter(match => match.status === 'completed');
  const upcomingMatches = matches.filter(match => match.status === 'scheduled');
  
  const [activeTab, setActiveTab] = useState<'results' | 'upcoming'>('results');
  
  return (
    <section className="w-full py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold">Partidos</h2>
        
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1">
          <button 
            onClick={() => setActiveTab('results')}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ease-in-out",
              activeTab === 'results' 
                ? "bg-white dark:bg-gray-900 shadow-sm" 
                : "hover:bg-white/50 dark:hover:bg-gray-700/50"
            )}
          >
            Resultados
          </button>
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ease-in-out",
              activeTab === 'upcoming' 
                ? "bg-white dark:bg-gray-900 shadow-sm" 
                : "hover:bg-white/50 dark:hover:bg-gray-700/50"
            )}
          >
            Próximos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="wait">
          {activeTab === 'results' ? (
            <>
              {completedMatches.map((match, index) => (
                <motion.div
                  key={`result-${match.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {match.competition}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {match.matchday}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex-1 text-right">
                      <p className="font-medium truncate">{match.homeTeam}</p>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-3">
                      <span className={cn(
                        "font-bold text-lg",
                        Number(match.homeScore) > Number(match.awayScore) ? "text-green-600 dark:text-green-400" : ""
                      )}>{match.homeScore}</span>
                      <span className="text-gray-400">-</span>
                      <span className={cn(
                        "font-bold text-lg",
                        Number(match.awayScore) > Number(match.homeScore) ? "text-green-600 dark:text-green-400" : ""
                      )}>{match.awayScore}</span>
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-medium truncate">{match.awayTeam}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
                    {new Date(match.date).toLocaleDateString('es-ES', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </motion.div>
              ))}
            </>
          ) : (
            <>
              {upcomingMatches.map((match, index) => (
                <motion.div
                  key={`upcoming-${match.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {match.competition}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {match.matchday}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1 text-right">
                      <p className="font-medium truncate">{match.homeTeam}</p>
                    </div>
                    
                    <div className="mx-3 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <span className="text-xs font-medium">VS</span>
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-medium truncate">{match.awayTeam}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-center">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {new Date(match.date).toLocaleDateString('es-ES', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LatestResults;
