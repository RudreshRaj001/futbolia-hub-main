import React, { useState, useEffect } from 'react';
import TeamHeader from '../team/TeamHeader';
import TeamDetailTabs from '../team/TeamDetailTabs';
import TeamCarousel from '../team/TeamCarousel';
import { teamStats } from '../mockPlayersData';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPlayersByTeam } from '@/store/slices/playersSlice';

interface TeamDetailSectionProps {
  team: any; // Team object from data
  tournamentName: string;
  onBack: () => void;
  isOpen: boolean;
}

const TeamDetailSection: React.FC<TeamDetailSectionProps> = ({
  team,
  tournamentName,
  onBack,
  isOpen
}) => {
  const dispatch = useAppDispatch();
  const { players } = useAppSelector((state) => state.players);
  const [activeTab, setActiveTab] = useState('planteles');

  
  
  useEffect(() => {
    if (team?.id) {
      dispatch(fetchPlayersByTeam(team.id));
    }
  }, [team?.id, dispatch]);
  
  if (!team) return null;
  
  // Get team stats
  const stats = teamStats[team.id] || null;

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Team Header with back button */}
      <TeamHeader 
        teamName={team.name} 
        teamLogo={team.logo} 
        tournamentName={tournamentName} 
        onBack={onBack} 
      />
      
      {/* Team Logos Carousel */}
      <TeamCarousel 
        selectedTeamId={team.id}
        onTeamClick={(teamId) => window.location.href = `/equipos/${teamId}`}
      />
      
      {/* Tabs for different sections */}
      <TeamDetailTabs 
        team={team} 
        players={players}
        stats={stats}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default TeamDetailSection;
