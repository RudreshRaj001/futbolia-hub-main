
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LazyImage from '@/components/ui/LazyImage';

interface TeamCardProps {
  id: number;
  name: string;
  logo: string;
  city: string;
  founded: number;
  index?: number;
}

const TeamCard: React.FC<TeamCardProps> = ({ id, name, logo, city, founded, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link 
        to={`/equipos/${id}`} 
        className="block h-full"
      >
        <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full border border-gray-100 dark:border-gray-800 group">
          <div className="p-6 flex flex-col items-center text-center h-full">
            <div className="w-20 h-20 mb-4 relative">
              <LazyImage 
                src={logo} 
                alt={`${name} logo`} 
                className="object-contain w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>
            
            <h3 className="text-lg font-bold mb-1 font-display">{name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{city}</p>
            <div className="mt-2 inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">
              Fundado en {founded}
            </div>
            
            <div className="mt-auto pt-4">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TeamCard;
