
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SubMenuItem } from '@/data/navigationData';

interface SubmenuContentProps {
  submenu: SubMenuItem[];
}

const SubmenuContent: React.FC<SubmenuContentProps> = ({ submenu }) => {
  const location = useLocation();
  
  return (
    <div className="text-gray-700 max-h-[calc(100vh-200px)] overflow-y-auto py-1">
      {submenu.map((subItem) => (
        <Link
          key={subItem.path}
          to={subItem.path}
          className={cn(
            "block px-4 py-2 text-sm hover:bg-gray-100 text-primary hover:text-[#FCC050]",
            location.pathname === subItem.path ? 'bg-gray-100 font-medium' : ''
          )}
        >
          {subItem.name}
        </Link>
      ))}
    </div>
  );
};

export default SubmenuContent;
