
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MenuItem } from '@/data/navigationData';

interface MobileMenuItemProps {
  item: MenuItem;
  isExpanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ 
  item, 
  isExpanded, 
  onToggle,
  onClose 
}) => {
  const location = useLocation();
  
  return (
    <div className="mb-2">
      <div 
        className="flex items-center justify-between py-3 border-b"
        onClick={() => item.submenu && onToggle()}
      >
        <Link 
          to={item.path}
          className={cn(
            "text-gray-800 dark:text-[#FEE6B9] font-medium hover:text-[#FCC050] dark:hover:text-[#FCC050]",
            location.pathname === item.path ? 'text-primary dark:text-[#FCC050]' : ''
          )}
          onClick={(e) => {
            if (item.submenu) {
              e.preventDefault();
            } else {
              onClose();
            }
          }}
        >
          {item.name}
        </Link>
        {item.submenu && (
          <button className="p-1">
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-[#FEE6B9]" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500 dark:text-[#FEE6B9]" />
            )}
          </button>
        )}
      </div>

      {item.submenu && isExpanded && (
        <div className="ml-4 mt-2 space-y-2">
          {item.submenu.map((subItem) => (
            <Link
              key={subItem.path}
              to={subItem.path}
              className={cn(
                "block py-2 text-gray-600 dark:text-[#FEE6B9] hover:text-[#FCC050] dark:hover:text-[#FCC050]",
                location.pathname === subItem.path ? 'text-primary dark:text-[#FCC050] font-medium' : ''
              )}
              onClick={onClose}
            >
              {subItem.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileMenuItem;
