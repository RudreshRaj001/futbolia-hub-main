
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TeamStanding {
  position: number;
  name: string;
  logo: string;
  played: number;
  points: number;
  goalDiff: number;
}

const standings: TeamStanding[] = [
  {
    position: 1,
    name: "Barcelona SC",
    logo: "/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png",
    played: 5,
    points: 12,
    goalDiff: 2
  },
  {
    position: 2,
    name: "Liga de Quito",
    logo: "/lovable-uploads/f98ce377-afbb-4ccf-95ba-aefeafdc0448.png",
    played: 5,
    points: 10,
    goalDiff: 3
  },
  {
    position: 3,
    name: "Universidad Católica",
    logo: "/lovable-uploads/9380800f-fac9-48f8-b561-8a527fa162f6.png",
    played: 5,
    points: 9,
    goalDiff: 7
  },
  {
    position: 4,
    name: "Independiente del Valle",
    logo: "/lovable-uploads/dd32855b-5fb2-489b-b817-706758675c13.png",
    played: 5,
    points: 9,
    goalDiff: 2
  },
  {
    position: 5,
    name: "Emelec",
    logo: "/lovable-uploads/e2f19ce6-8133-436e-aa51-86597e66cff6.png",
    played: 5,
    points: 8,
    goalDiff: 1
  }
];

const InternationalStandings: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-md overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="bg-gray-900 text-white p-4">
        <h2 className="text-lg font-bold">Standings</h2>
      </div>
      
      <div className="p-4">
        <Tabs defaultValue="serie-b" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="serie-b" className="text-xs">LigaPro Series B 2025</TabsTrigger>
            <TabsTrigger value="serie-a" className="text-xs">LigaPro Serie A 2025</TabsTrigger>
            <TabsTrigger value="qualifiers" className="text-xs">2026 Qualifiers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="serie-b">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="py-2 text-left pl-2">#</th>
                    <th className="py-2 text-left">Equipment</th>
                    <th className="py-2 text-center">PJ</th>
                    <th className="py-2 text-center">Pts.</th>
                    <th className="py-2 text-center">GD</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((team) => (
                    <tr key={team.position} className="border-t border-gray-100 dark:border-gray-700">
                      <td className="py-2 pl-2">{team.position}</td>
                      <td className="py-2">
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 flex-shrink-0">
                            <img 
                              src={team.logo} 
                              alt={team.name} 
                              className="w-5 h-5 object-contain rounded-full"
                            />
                          </span>
                          <span className="truncate max-w-[100px] sm:max-w-[120px]">{team.name}</span>
                        </div>
                      </td>
                      <td className="py-2 text-center">{team.played}</td>
                      <td className="py-2 text-center">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                          team.position <= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'
                        }`}>
                          {team.points}
                        </span>
                      </td>
                      <td className="py-2 text-center">{team.goalDiff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="serie-a">
            <div className="min-h-[200px] flex items-center justify-center text-gray-500">
              No standings available for Serie A
            </div>
          </TabsContent>
          
          <TabsContent value="qualifiers">
            <div className="min-h-[200px] flex items-center justify-center text-gray-500">
              No standings available for Qualifiers
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InternationalStandings;
