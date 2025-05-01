
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CompetitionTabsProps {
  competitions: string[];
  defaultCompetition: string;
  onCompetitionChange: (competition: string) => void;
}

const CompetitionTabs: React.FC<CompetitionTabsProps> = ({
  competitions,
  defaultCompetition,
  onCompetitionChange
}) => {
  return (
    <Tabs 
      defaultValue={defaultCompetition} 
      onValueChange={onCompetitionChange} 
      className="w-full"
    >
      <TabsList className="w-full max-w-full overflow-x-auto flex bg-gray-100 dark:bg-gray-800 p-1 rounded-md mb-4">
        {competitions.map(competition => (
          <TabsTrigger 
            key={competition} 
            value={competition}
            className="flex-shrink-0 whitespace-nowrap"
          >
            {competition}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default CompetitionTabs;
