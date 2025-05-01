import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import MobileMenuItem from './MobileMenuItem';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { mainNavigation } from '@/data/navigationData';
import { TournamentsState } from '@/store/slices/tournamentsSlice';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const tournamentsState = useAppSelector((state: RootState) => state.tournaments) as TournamentsState;
  const navigationItems = Array.isArray(tournamentsState?.navigationItems) 
    ? tournamentsState.navigationItems 
    : mainNavigation;

  const toggleItem = (itemName: string) => {
    if (expandedItems.includes(itemName)) {
      setExpandedItems(expandedItems.filter(item => item !== itemName));
    } else {
      setExpandedItems([...expandedItems, itemName]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to search page with query
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
      onClose();
    }
  };

  const leagueToMenuItem = (leagues: any[]): any => ({
    name: "Tournaments",
    path: "/torneos/71",
    submenu: leagues.map((league) => ({
      name: league.name,
      path: `/torneos/${league.id}`, // Customize if you have slug or route mapping
    })),
  });

  const updatedNavigation: any[] = [
    ...mainNavigation,
    leagueToMenuItem(tournamentsState.tournaments), // Add your leagues submenu
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-white dark:bg-gray-900 overflow-y-auto"
        >
          {/* Header */}
          <div className="p-4 bg-primary dark:bg-primary-dark flex justify-between items-center text-white">
            <h2 className="text-xl font-bold text-[#FEE6B9]">Menu</h2>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button onClick={onClose} className="p-2 text-[#FEE6B9] hover:text-[#FCC050]">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="p-4 border-b dark:border-gray-800">
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <Input
                type="search"
                placeholder="Buscar..."
                className="flex-1 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground p-2 rounded-md"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Navigation Items */}
          <div className="p-4">
            {updatedNavigation.map((item) => (
              <MobileMenuItem 
                key={item.path}
                item={item}
                isExpanded={expandedItems.includes(item.name)}
                onToggle={() => toggleItem(item.name)}
                onClose={onClose}
              />
            ))}
          </div>
          
          {/* Information Links */}
          <div className="p-4 mt-4 border-t dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Información
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/informacion/nosotros" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary" onClick={onClose}>
                Quiénes somos
              </Link>
              <Link to="/informacion/contacto" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary" onClick={onClose}>
                Contacto
              </Link>
              <Link to="/informacion/privacidad" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary" onClick={onClose}>
                Política de privacidad
              </Link>
              <Link to="/informacion/terminos" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary" onClick={onClose}>
                Términos de uso
              </Link>
              <Link to="/informacion/publicidad" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary" onClick={onClose}>
                Publicidad
              </Link>
              <Link to="/informacion" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary" onClick={onClose}>
                Información
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
