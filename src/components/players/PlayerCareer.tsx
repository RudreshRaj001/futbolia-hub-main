import React from "react";

interface CareerItem {
  team: string;
  period: string;
  description: string;
}

interface CareerTimelineProps {
  career: CareerItem[];
}

const CareerTimeline: React.FC<CareerTimelineProps> = ({ career }) => {
  return (
    <div className="mt-4 space-y-4">
      <h3 className="text-lg font-semibold">Trayectoria</h3>
      <div className="relative border-l-2 border-gray-200 dark:border-gray-800 pl-6 ml-4 space-y-6">
        {career.map((item, index) => (
          <div key={index} className="relative">
            <div className="absolute w-4 h-4 bg-primary rounded-full -left-[25px] top-1"></div>
            <div className="mb-1 text-lg font-semibold">{item.team}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {item.period}
            </div>
            <div className="mt-1">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerTimeline;
