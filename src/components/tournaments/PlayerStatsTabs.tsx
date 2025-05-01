import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { PlayerDetails } from "./mockTopScorersData";
import GoalsTab from "./tabs/goals/GoalsTab";
import PlayGoalsTab from "./tabs/play/PlayGoalsTab";
import HeadGoalsTab from "./tabs/head/HeadGoalsTab";
import FreeKickGoalsTab from "./tabs/freekick/FreeKickGoalsTab";
import PenaltyGoalsTab from "./tabs/penalty/PenaltyGoalsTab";
import EffectivenessTab from "./tabs/effectiveness/EffectivenessTab";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PlayerStatsTabsProps {
  player: PlayerDetails;
}

const PlayerStatsTabs: React.FC<PlayerStatsTabsProps> = ({ player }) => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("goals");

  return (
    <Tabs defaultValue="goals" className="w-full" onValueChange={setActiveTab}>
      <ScrollArea className="w-full pb-2">
        <TabsList
          className={`grid ${
            isMobile ? "grid-cols-3" : "grid-cols-6"
          } w-full min-w-max bg-gray-100 dark:bg-gray-800`}
        >
          <TabsTrigger
            value="goals"
            className="font-bold text-xs md:text-sm text-gray-700 dark:text-gray-200 
              data-[state=active]:text-white dark:data-[state=active]:text-white 
              data-[state=active]:bg-gray-800 dark:data-[state=active]:bg-gray-700"
          >
            GOLES
          </TabsTrigger>
          <TabsTrigger
            value="play"
            className="font-bold text-xs md:text-sm text-gray-700 dark:text-gray-200 
              data-[state=active]:text-white dark:data-[state=active]:text-white 
              data-[state=active]:bg-gray-800 dark:data-[state=active]:bg-gray-700"
          >
            DE JUGADA
          </TabsTrigger>
          <TabsTrigger
            value="head"
            className="font-bold text-xs md:text-sm text-gray-700 dark:text-gray-200 
              data-[state=active]:text-white dark:data-[state=active]:text-white 
              data-[state=active]:bg-gray-800 dark:data-[state=active]:bg-gray-700"
          >
            DE CABEZA
          </TabsTrigger>
          <TabsTrigger
            value="freekick"
            className="font-bold text-xs md:text-sm text-gray-700 dark:text-gray-200 
              data-[state=active]:text-white dark:data-[state=active]:text-white 
              data-[state=active]:bg-gray-800 dark:data-[state=active]:bg-gray-700"
          >
            TIRO LIBRE
          </TabsTrigger>
          <TabsTrigger
            value="penalty"
            className="font-bold text-xs md:text-sm text-gray-700 dark:text-gray-200 
              data-[state=active]:text-white dark:data-[state=active]:text-white 
              data-[state=active]:bg-gray-800 dark:data-[state=active]:bg-gray-700"
          >
            PENAL
          </TabsTrigger>
          <TabsTrigger
            value="effectiveness"
            className="font-bold text-xs md:text-sm text-gray-700 dark:text-gray-200 
              data-[state=active]:text-white dark:data-[state=active]:text-white 
              data-[state=active]:bg-gray-800 dark:data-[state=active]:bg-gray-700"
          >
            EFECTIVIDAD
          </TabsTrigger>
        </TabsList>
      </ScrollArea>

      <div className="mt-2 overflow-x-hidden">
        <TabsContent
          value="goals"
          className={activeTab === "goals" ? "block" : "hidden"}
        >
          <GoalsTab player={player} />
        </TabsContent>

        <TabsContent
          value="play"
          className={activeTab === "play" ? "block" : "hidden"}
        >
          <PlayGoalsTab player={player} />
        </TabsContent>

        <TabsContent
          value="head"
          className={activeTab === "head" ? "block" : "hidden"}
        >
          <HeadGoalsTab player={player} />
        </TabsContent>

        <TabsContent
          value="freekick"
          className={activeTab === "freekick" ? "block" : "hidden"}
        >
          <FreeKickGoalsTab player={player} />
        </TabsContent>

        <TabsContent
          value="penalty"
          className={activeTab === "penalty" ? "block" : "hidden"}
        >
          <PenaltyGoalsTab player={player} />
        </TabsContent>

        <TabsContent
          value="effectiveness"
          className={activeTab === "effectiveness" ? "block" : "hidden"}
        >
          <EffectivenessTab player={player} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default PlayerStatsTabs;
