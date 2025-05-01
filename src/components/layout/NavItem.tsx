
import React from 'react';
import { MenuItem } from '@/data/navigationData';
import { 
  Popover,
  PopoverTrigger,
  PopoverContent 
} from '@/components/ui/popover';
import NavLink from './NavLink';
import SubmenuContent from './SubmenuContent';

interface NavItemProps {
  item: MenuItem;
  hoveredItem: string | null;
  setHoveredItem: (name: string | null) => void;
}

const NavItem: React.FC<NavItemProps> = ({ 
  item, 
  hoveredItem, 
  setHoveredItem 
}) => {


  return (
    <div 
      className="relative"
      onMouseEnter={() => setHoveredItem(item.name)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      {item.submenu ? (
        <Popover open={hoveredItem === item.name}>
          <PopoverTrigger asChild>
            <div>
              <NavLink 
                path={item.path} 
                name={item.name} 
                hasSubmenu={true} 
              />
            </div>
          </PopoverTrigger>
          <PopoverContent 
            className="p-0 w-48 shadow-lg border-none bg-white rounded-md z-[100]"
            side="bottom" 
            align="start" 
            sideOffset={5}
            avoidCollisions={true}
          >
            <SubmenuContent submenu={item.submenu} />
          </PopoverContent>
        </Popover>
      ) : (
        <NavLink path={item.path} name={item.name} />
      )}
    </div>
  );
};

export default NavItem;
