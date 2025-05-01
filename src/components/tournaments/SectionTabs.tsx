
import React from 'react';
import { cn } from '@/lib/utils';
import { TournamentSection } from './types';
import { 
  Newspaper,
  Calendar, 
  BarChart, 
  Trophy, 
  Users,
  List
} from 'lucide-react';

interface SectionTabsProps {
  selectedSection: TournamentSection;
  onSectionChange: (section: TournamentSection) => void;
}

const SectionTabs: React.FC<SectionTabsProps> = ({ 
  selectedSection,
  onSectionChange
}) => {
  // Define all available sections
  const sections = [
    { id: 'noticias', name: 'Noticias', icon: Newspaper },
    { id: 'calendario', name: 'Calendario', icon: Calendar },
    { id: 'posiciones', name: 'Posiciones', icon: BarChart },
    { id: 'goleadores', name: 'Goleadores', icon: Trophy },
    { id: 'equipos', name: 'Equipos', icon: Users },
    // { id: 'comparativa', name: 'Comparativa', icon: List }
    
  ];

  return (
    <div className="flex border-b border-gray-200 dark:border-gray-800 overflow-x-auto bg-white dark:bg-gray-900">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section?.id as TournamentSection)}
          className={cn(
            "flex items-center justify-center py-3 px-4 text-sm font-medium whitespace-nowrap transition-colors relative border-b-2",
            selectedSection === section.id
              ? "text-blue-800 dark:text-blue-400 border-blue-800 dark:border-blue-400"
              : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-100"
          )}
        >
          <section.icon className="h-4 w-4 mr-2" />
          {section.name}
        </button>
      ))}
    </div>
  );
};

export default SectionTabs;
