
import React from 'react';
import { TabsList as UITabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabsListProps {
  activeTab: string;
}

const TabsList: React.FC<TabsListProps> = ({ activeTab }) => {
  return (
    <div className="bg-gray-100 border-b sticky top-[106px] md:top-[112px] z-30">
      <UITabsList className="bg-transparent h-auto p-0 w-full justify-start overflow-x-auto">
        <TabsTrigger 
          value="resultados" 
          className="py-3 px-3 md:px-4 data-[state=active]:bg-white rounded-none data-[state=active]:shadow-none font-medium text-xs md:text-sm"
        >
          RESULTADOS
        </TabsTrigger>
        <TabsTrigger 
          value="posiciones" 
          className="py-3 px-3 md:px-4 data-[state=active]:bg-white rounded-none data-[state=active]:shadow-none font-medium text-xs md:text-sm"
        >
          POSICIONES
        </TabsTrigger>
        <TabsTrigger 
          value="goleadores" 
          className="py-3 px-3 md:px-4 data-[state=active]:bg-white rounded-none data-[state=active]:shadow-none font-medium text-xs md:text-sm"
        >
          GOLEADORES
        </TabsTrigger>
        <TabsTrigger 
          value="planteles" 
          className="py-3 px-3 md:px-4 data-[state=active]:bg-white rounded-none data-[state=active]:shadow-none font-medium text-xs md:text-sm"
        >
          PLANTELES
        </TabsTrigger>
        <TabsTrigger 
          value="equipos" 
          className="py-3 px-3 md:px-4 data-[state=active]:bg-white rounded-none data-[state=active]:shadow-none font-medium text-xs md:text-sm"
        >
          EQUIPOS
        </TabsTrigger>
        <TabsTrigger 
          value="jugadores" 
          className="py-3 px-3 md:px-4 data-[state=active]:bg-white rounded-none data-[state=active]:shadow-none font-medium text-xs md:text-sm"
        >
          JUGADORES
        </TabsTrigger>
        {/* <TabsTrigger 
          value="comparativa" 
          className="py-3 px-3 md:px-4 data-[state=active]:bg-white rounded-none data-[state=active]:shadow-none font-medium text-xs md:text-sm"
        >
          COMPARATIVA
        </TabsTrigger> */}
      </UITabsList>
    </div>
  );
};

export default TabsList;
