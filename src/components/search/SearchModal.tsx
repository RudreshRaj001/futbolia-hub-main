
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, User, Trophy, Newspaper, Clock } from 'lucide-react';
import { searchTeams } from '@/services/api';
import { news } from '@/data';
import LazyImage from '@/components/ui/LazyImage';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>({
    teams: [],
    news: [],
    players: [] // For now, we'll use mock data
  });
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ teams: [], news: [], players: [] });
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setIsSearching(true);
      
      try {
        // Search teams from API
        const teamsResult = await searchTeams(searchQuery);
        
        // Search news from mock data
        const newsResult = news.filter(
          article => 
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.summary.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5);
        
        // For now, using mock data for players
        const playersResult = [];
        
        setSearchResults({
          teams: teamsResult || [],
          news: newsResult || [],
          players: playersResult || []
        });
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleResultClick = (type: string, item: any) => {
    onClose();
    
    if (type === 'team') {
      navigate(`/equipos/${item.team.id}`);
    } else if (type === 'news') {
      navigate(`/noticias/${item.id}`);
    } else if (type === 'player') {
      navigate(`/jugadores/${item.id}`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-2xl lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Buscar en Pase y Gol</DialogTitle>
        </DialogHeader>
        
        <div className="relative">
          <Input
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar equipos, noticias, jugadores..."
            className="pr-10"
          />
          {searchQuery && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0"
              onClick={handleClearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {isSearching ? (
          <div className="py-4 text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Buscando...</p>
          </div>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto">
            {/* Teams Results */}
            {searchResults.teams.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <Trophy className="h-4 w-4" /> Equipos
                </h3>
                <div className="space-y-2">
                  {searchResults?.teams?.map((result: any) => (
                    <div 
                      key={result.team.id} 
                      className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                      onClick={() => handleResultClick('team', result)}
                    >
                      <div className="w-8 h-8 mr-3">
                        <LazyImage 
                          src={result.team.logo} 
                          alt={result.team.name} 
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{result.team.name}</p>
                        <p className="text-xs text-gray-500">{result.team.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* News Results */}
            {searchResults.news.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <Newspaper className="h-4 w-4" /> Noticias
                </h3>
                <div className="space-y-2">
                  {searchResults.news.map((result: any) => (
                    <div 
                      key={result.id} 
                      className="flex p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                      onClick={() => handleResultClick('news', result)}
                    >
                      <div className="w-16 h-12 mr-3 flex-shrink-0">
                        <LazyImage 
                          src={result.image} 
                          alt={result.title} 
                          className="rounded object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium line-clamp-1">{result.title}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(result.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Players Results */}
            {searchResults.players.length > 0 && (
              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <User className="h-4 w-4" /> Jugadores
                </h3>
                <div className="space-y-2">
                  {searchResults.players.map((result: any) => (
                    <div 
                      key={result.id} 
                      className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                      onClick={() => handleResultClick('player', result)}
                    >
                      <div className="w-8 h-8 mr-3">
                        <LazyImage 
                          src={result.photo} 
                          alt={result.name} 
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{result.name}</p>
                        <p className="text-xs text-gray-500">{result.team}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!isSearching && searchQuery && 
             !searchResults.teams.length && 
             !searchResults.news.length && 
             !searchResults.players.length && (
              <div className="py-8 text-center">
                <Search className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">No se encontraron resultados para "{searchQuery}"</p>
              </div>
            )}

            {!searchQuery && (
              <div className="py-8 text-center">
                <Search className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">Escribe algo para buscar</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
