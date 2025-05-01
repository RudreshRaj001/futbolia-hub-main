
import React from 'react';
import { cn } from '@/lib/utils';
import { TournamentGroup } from './types';

interface GroupTabsProps {
  groups: { id: TournamentGroup; label: string }[];
  selectedGroup: TournamentGroup;
  onGroupChange: (group: TournamentGroup) => void;
}

const GroupTabs: React.FC<GroupTabsProps> = ({ 
  groups,
  selectedGroup, 
  onGroupChange 
}) => {
  return (
    <div className="flex flex-wrap bg-gray-100 dark:bg-gray-800 px-2 py-1">
      {groups.map((group) => (
        <button
          key={group.id}
          onClick={() => onGroupChange(group.id)}
          className={cn(
            "px-3 py-1 m-1 text-xs font-medium rounded",
            selectedGroup === group.id
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          )}
        >
          {group.label}
        </button>
      ))}
    </div>
  );
};

export default GroupTabs;
