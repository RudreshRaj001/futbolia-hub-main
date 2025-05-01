// MatchStatistics.tsx
import React from 'react';

interface StatisticItem {
  type: string;
  value: number | string | null;
}

interface TeamStatistics {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  statistics: StatisticItem[];
}

interface ComparisonStatistic {
  type: string;
  home: number | string | null;
  away: number | string | null;
}

interface StatisticsProps {
  statistics: TeamStatistics[];
}

const MatchStatistics: React.FC<StatisticsProps> = ({ statistics }) => {
  // If statistics is empty or has fewer than two teams, display a fallback message.
  if (!statistics || statistics.length < 2) {
    return (
      <div className="text-center py-6 text-gray-500">
        No hay estadísticas disponibles para este partido
      </div>
    );
  }

  // Assume the first element is home, the second is away.
  const homeStats: StatisticItem[] = statistics[0].statistics;
  const awayStats: StatisticItem[] = statistics[1].statistics;

  // Combine statistics based on matching type.
  const combinedStats: ComparisonStatistic[] = homeStats.map((item: StatisticItem) => {
    const awayItem = awayStats.find((it: StatisticItem) => it.type === item.type);
    return {
      type: item.type,
      home: item.value,
      away: awayItem ? awayItem.value : null,
    };
  });

  return (
    <div className="space-y-6 mt-4">
      {combinedStats.map((stat, index) => {
        // Convert numeric strings (such as "32%") into numbers.
        // If the value is already a number, use it.
        const parseValue = (value: number | string | null): number => {
          if (typeof value === 'number') return value;
          if (typeof value === 'string') {
            // Remove any percent sign and trim whitespace.
            const num = parseFloat(value.replace('%', '').trim());
            return isNaN(num) ? 0 : num;
          }
          return 0;
        };

        const homeValue = parseValue(stat.home);
        const awayValue = parseValue(stat.away);
        const total = homeValue + awayValue;
        const homePercent = total ? (homeValue / total) * 100 : 0;
        const awayPercent = total ? (awayValue / total) * 100 : 0;

        return (
          <div key={index} className="flex items-center">
            <div className="w-[15%] text-right pr-2 font-medium">{stat.home}</div>
            <div className="w-[70%] px-2">
              <div className="relative h-6 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-primary rounded-l-full" 
                  style={{ width: `${homePercent}%` }}
                ></div>
                <div 
                  className="absolute right-0 top-0 h-full bg-secondary rounded-r-full" 
                  style={{ width: `${awayPercent}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                  {stat.type}
                </div>
              </div>
            </div>
            <div className="w-[15%] pl-2 font-medium">{stat.away}</div>
          </div>
        );
      })}
      {combinedStats.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No hay estadísticas disponibles para este partido
        </div>
      )}
    </div>
  );
};

export default MatchStatistics;
