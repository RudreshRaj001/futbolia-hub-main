
import React from 'react';
import NewsList from '@/components/abroad/NewsList';

interface TeamNewsProps {
  teamNews: any[];
}

const TeamNews: React.FC<TeamNewsProps> = ({ teamNews }) => {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold font-display">Últimas Noticias</h2>
        <a href="#" className="text-primary text-sm font-medium">Ver todas</a>
      </div>
      
      <NewsList news={teamNews.slice(0, 5)} />
    </section>
  );
};

export default TeamNews;
