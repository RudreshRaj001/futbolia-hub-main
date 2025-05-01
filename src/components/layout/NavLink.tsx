
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  path: string;
  name: string;
  hasSubmenu?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ 
  path, 
  name, 
  hasSubmenu = false,
  onClick
}) => {
  const location = useLocation();
  
  return (
    <Link 
      to={path}
      onClick={onClick}
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-md text-[#FEE6B9] hover:text-[#FCC050] transition-colors whitespace-nowrap",
        location.pathname === path || location.pathname.startsWith(path + '/') ? 'bg-primary-dark' : ''
      )}
    >
      <span className="truncate">{name}</span>
      {hasSubmenu && <ChevronDown className="ml-1 h-4 w-4 flex-shrink-0" />}
    </Link>
  );
};

export default NavLink;
