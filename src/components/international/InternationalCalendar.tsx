
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Play } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const InternationalCalendar: React.FC = () => {
  const [activeDate, setActiveDate] = useState("date1");

  return (
    <div className="bg-white dark:bg-gray-900 rounded-md overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="bg-gray-900 text-white p-4">
        <h2 className="text-lg font-bold">Calendar</h2>
      </div>
      
      <div className="p-4">
        <Tabs defaultValue="serie-b" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="serie-b" className="text-xs">LigaPro Series B 2025</TabsTrigger>
            <TabsTrigger value="serie-a" className="text-xs">LigaPro Serie A 2025</TabsTrigger>
            <TabsTrigger value="qualifiers" className="text-xs">2026 Qualifiers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="serie-b" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Previous date</div>
              <button className="p-1 rounded-md bg-gray-100 hover:bg-gray-200">
                <CalendarIcon className="w-4 h-4" />
              </button>
            </div>
            
            <div className="bg-gray-100 rounded-md p-4 min-h-[100px] flex items-center justify-center text-center text-gray-500">
              No matches scheduled
            </div>
            
            <div className="bg-gray-900 text-white p-3 rounded-t-md">
              <h3 className="font-medium">Date 2</h3>
            </div>
            
            <div className="bg-gray-800 text-white p-4 rounded-md flex items-center">
              <div className="w-12 h-12 bg-gray-700 rounded-full mr-3 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png" 
                  alt="Podcast" 
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium">las Eliminatorias: El inicio de la era Beccace</p>
                <p className="text-xs text-gray-400">futbolecuador.com</p>
              </div>
              <button className="text-xs bg-gray-700 rounded-full px-3 py-1">
                Save on Spotify
              </button>
            </div>
            
            <div className="flex items-center">
              <div className="text-xs text-gray-500 mr-2">1:05:10</div>
              <div className="flex-grow h-1 bg-gray-200 rounded-full">
                <div className="h-1 bg-gray-500 rounded-full w-3/4"></div>
              </div>
              <button className="ml-2 bg-white shadow rounded-full w-8 h-8 flex items-center justify-center">
                <Play className="h-4 w-4" />
              </button>
            </div>
          </TabsContent>
          
          <TabsContent value="serie-a">
            <div className="min-h-[200px] flex items-center justify-center text-gray-500">
              No matches scheduled for Serie A
            </div>
          </TabsContent>
          
          <TabsContent value="qualifiers">
            <div className="min-h-[200px] flex items-center justify-center text-gray-500">
              No matches scheduled for Qualifiers
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InternationalCalendar;
