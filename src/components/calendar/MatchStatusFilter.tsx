
import React from 'react';
import { Button } from "@/components/ui/button";
import { Clock, Play, CheckCircle } from "lucide-react";
import type { MatchStatusFilter as MatchStatusFilterType } from './types';

interface MatchStatusFilterProps {
  selectedStatus: MatchStatusFilterType;
  onStatusChange: (status: MatchStatusFilterType) => void;
}

const MatchStatusFilter: React.FC<MatchStatusFilterProps> = ({ 
  selectedStatus, 
  onStatusChange 
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button
        variant={selectedStatus === "ALL" ? "default" : "outline"}
        size="sm"
        onClick={() => onStatusChange("ALL")}
        className="flex items-center gap-1"
      >
        All
      </Button>
      <Button
        variant={selectedStatus === "UPCOMING" ? "default" : "outline"}
        size="sm"
        onClick={() => onStatusChange("UPCOMING")}
        className="flex items-center gap-1"
      >
        <Clock className="h-4 w-4" />
        Upcoming
      </Button>
      <Button
        variant={selectedStatus === "LIVE" ? "default" : "outline"}
        size="sm"
        onClick={() => onStatusChange("LIVE")}
        className="flex items-center gap-1"
      >
        <Play className="h-4 w-4 fill-current" />
        Live
      </Button>
      <Button
        variant={selectedStatus === "FINALIZADO" ? "default" : "outline"}
        size="sm" 
        onClick={() => onStatusChange("FINALIZADO")}
        className="flex items-center gap-1"
      >
        <CheckCircle className="h-4 w-4" />
        Completed
      </Button>
    </div>
  );
};

export default MatchStatusFilter;
