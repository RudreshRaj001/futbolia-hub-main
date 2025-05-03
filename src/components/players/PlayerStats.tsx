import React from "react";
import { Card } from "@/components/ui/card";

interface StatisticsProps {
  statistics: any;
}

const PerformanceStats: React.FC<StatisticsProps> = ({ statistics }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-3">Partidos</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Titular</span>
            <span className="font-medium">{statistics?.games?.lineups}</span>
          </div>
          <div className="flex justify-between">
            <span>Suplente</span>
            <span className="font-medium">
              {statistics?.games?.appearences - statistics?.games?.lineups}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Minutos</span>
            <span className="font-medium">{statistics?.games?.minutes}</span>
          </div>
          <div className="flex justify-between">
            <span>Valoración</span>
            <span className="font-medium">
              {Number(statistics?.games?.rating)?.toFixed(1)}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-3">Ataque</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Goles</span>
            <span className="font-medium">{statistics?.goals?.total}</span>
          </div>
          <div className="flex justify-between">
            <span>Asistencias</span>
            <span className="font-medium">{statistics?.goals?.assists}</span>
          </div>
          <div className="flex justify-between">
            <span>Disparos</span>
            <span className="font-medium">{statistics?.shots?.total}</span>
          </div>
          <div className="flex justify-between">
            <span>A puerta</span>
            <span className="font-medium">{statistics?.shots?.on}</span>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-3">Pases</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Total</span>
            <span className="font-medium">{statistics?.passes?.total}</span>
          </div>
          <div className="flex justify-between">
            <span>Clave</span>
            <span className="font-medium">{statistics?.passes?.key}</span>
          </div>
          <div className="flex justify-between">
            <span>Precisión</span>
            <span className="font-medium">
              {statistics?.passes?.accuracy ?? "N/A"}%
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PerformanceStats;
