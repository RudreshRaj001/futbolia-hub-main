
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

const moreNewsItems: NewsItem[] = [
  {
    id: '7',
    title: 'THE CENTENARIANS! La Tri unveiled new uniforms to celebrate its 100th anniversary',
    imageUrl: '/lovable-uploads/fa5158dd-78b3-4503-8194-6d976bf65203.png',
    timestamp: '1 day ago',
    category: 'National Team',
    url: '#'
  },
  {
    id: '8',
    title: 'Cristian Ramírez is happy with the TRI, after reversing his decision not to be working on this La Tri match with SANGRE JOVEN',
    excerpt: '"People mature and change with experience. I\'ve had to learn along the way."',
    imageUrl: '/lovable-uploads/d0374e12-a60c-4ec3-a1a1-07ba006327a0.png',
    timestamp: '1 day ago',
    category: 'National Team',
    url: '#'
  },
  {
    id: '9',
    title: 'La Tri is now working with a full team after the arrival of the last eight legionaries',
    imageUrl: '/lovable-uploads/f97640bf-5b9b-4169-bf2a-ab1d2de70153.png',
    timestamp: 'hace 2 días',
    category: 'National Team',
    url: '#'
  },
  {
    id: '10',
    title: 'The National Team\'s Young Star Has Him as a "Duck" and Ignites Moises Caicedo\'s Fist at FC 25! (VIDEO)',
    imageUrl: '/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png',
    timestamp: '2 days ago',
    category: 'National Team',
    url: '#'
  },
  {
    id: '11',
    title: 'Beccacece talked about HEIGHT, stating that he wants to BREAK LIMITS and...',
    imageUrl: '/lovable-uploads/d0374e12-a60c-4ec3-a1a1-07ba006327a0.png',
    timestamp: '2 days ago',
    category: 'National Team',
    url: '#'
  }
];

const LatestNationalTeamNews: React.FC = () => {
  return (
    <div className="space-y-4">
      {moreNewsItems.map((item) => (
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

export default LatestNationalTeamNews;
