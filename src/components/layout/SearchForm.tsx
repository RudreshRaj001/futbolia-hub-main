
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchFormProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
  variant?: 'navbar' | 'megamenu';
}

const SearchForm: React.FC<SearchFormProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  onSubmit,
  className = '',
  variant = 'megamenu'
}) => {
  return (
    <form onSubmit={onSubmit} className={`flex items-center space-x-2 ${className}`}>
      <Input
        type="search"
        placeholder="Search..."
        className={variant === 'navbar' 
          ? "w-full md:w-[300px] bg-white dark:bg-gray-800 text-primary dark:text-white placeholder:text-gray-500"
          : "w-32 md:w-auto h-8 bg-white/10 border-none text-white placeholder:text-white/60"
        }
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button 
        type="submit" 
        variant="secondary"
        size="sm"
        className="p-1"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default SearchForm;
