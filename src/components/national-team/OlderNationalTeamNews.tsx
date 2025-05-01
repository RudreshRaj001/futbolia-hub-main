
import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '@/components/ui/LazyImage';

interface NewsItem {
  id: string;
  title: string;
  excerpt?: string;
  imageUrl: string;
  timestamp: string;
  category: string;
  url: string;
}

const olderNewsItems: NewsItem[] = [
  {
    id: '12',
    title: 'THE MACRO! Sebastián Beccacece praised the trip to Europe, confirme...',
    excerpt: '"We spoke with the coaches and players managers at a time we can\'t dedicate to them when they\'re part of the national team."',
    imageUrl: '/lovable-uploads/d0374e12-a60c-4ec3-a1a1-07ba006327a0.png',
    timestamp: '1 week ago',
    category: 'National Team',
    url: '#'
  },
  {
    id: '13',
    title: 'CHELSEA HAS YOU WELL INFORMED! Sebastián Beccacece celebrated...',
    excerpt: '"I\'m glad he\'s in a place where he can finally settle down. Change makes you leave the places you\'ve become comfortable in."',
    imageUrl: '/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png',
    timestamp: '1 week ago',
    category: 'National Team',
    url: 'https://www.futbolecuador.com/site/noticia/chelsea-lo-tiene-bien-informado-sebastian-beccacece-celebro-lo-que-vive-kendry-paez-actualmente/159349'
  },
  {
    id: '14',
    title: '¡CUATRO BAJAS CONFIRMADAS! Sebastián Beccacece enumeró a los...',
    excerpt: '"I ask the kids for that flexibility, to grow through adversity. We shouldn\'t embrace premature success."',
    imageUrl: '/lovable-uploads/fa5158dd-78b3-4503-8194-6d976bf65203.png',
    timestamp: '1 week ago',
    category: 'National Team',
    url: '#'
  }
];

const OlderNationalTeamNews: React.FC = () => {
  return (
    <div className="space-y-4">
      {olderNewsItems.map((item) => (
        <div key={item.id} className="bg-white rounded-md overflow-hidden shadow-sm flex">
          <div className="w-1/4">
            <LazyImage 
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
              aspectRatio="1/1"
            />
          </div>
          
          <div className="p-4 w-3/4">
            <Link to={item.url} className="hover:text-primary">
              <h2 className="font-bold text-lg">{item.title}</h2>
            </Link>
            
            {item.excerpt && <p className="text-gray-600 text-sm mt-1">{item.excerpt}</p>}
            
            <div className="flex items-center text-xs text-gray-500 mt-2">
              <span className="inline-flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {item.timestamp}
              </span>
              <span className="ml-3 bg-gray-900 text-white px-2 py-1 rounded-md text-xs">
                {item.category}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OlderNationalTeamNews;
