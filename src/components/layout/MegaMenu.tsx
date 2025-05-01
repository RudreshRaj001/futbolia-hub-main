import React, { useState } from 'react';
import NavItem from './NavItem';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { mainNavigation } from '@/data/navigationData';
import { TournamentsState } from '@/store/slices/tournamentsSlice';

const MegaMenu: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const tournamentsState = useAppSelector((state: RootState) => state.tournaments) as TournamentsState;
  const navigationItems = Array.isArray(tournamentsState?.navigationItems) 
    ? tournamentsState.navigationItems 
    : mainNavigation;


    const leagueToMenuItem = (leagues: any[]): any => ({
      name: "Tournaments",
      path: "/torneos/242",
      submenu: leagues.map((league) => ({
        name: league.name,
        path: `/torneos/${league.id}`, // Customize if you have slug or route mapping
      })),
    });

    const updatedNavigation: any[] = [
      ...mainNavigation,
      leagueToMenuItem(tournamentsState.tournaments), // Add your leagues submenu
    ];




  return (
    <nav className="flex items-center w-full" style={{ zIndex: 35 }}>
      <div className="flex items-center flex-wrap gap-x-1 justify-start w-full">
        {!isMobile && updatedNavigation.map((item) => (
          <NavItem 
            key={item.path}
            item={item}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />
        ))}
      </div>
    </nav>
  );
};

export default MegaMenu;
