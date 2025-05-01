
import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '@/components/ui/LazyImage';

export interface NewsItemProps {
  id: string;
  title: string;
  summary?: string;
  image: string;
  timestamp: string;
  category: string;
  url: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ 
  id, 
  title, 
  summary, 
  image, 
  timestamp, 
  category, 
  url 
}) => {
  return (
    <div className="flex flex-col sm:flex-row bg-white dark:bg-gray-900 rounded-md shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800">
      <div className="w-full sm:w-40 md:w-56 flex-shrink-0">
        <Link to={url}>
          <LazyImage 
            src={image}
            alt={title}
            className="w-full h-48 sm:h-full object-cover"
          />
        </Link>
      </div>
      
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <Link to={url} className="hover:text-primary transition-colors duration-200">
            <h2 className="font-bold text-lg mb-2 line-clamp-2">{title}</h2>
          </Link>
          
          {summary && <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">{summary}</p>}
        </div>
        
        <div className="flex items-center text-xs text-gray-500 mt-2">
          <span className="inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {timestamp}
          </span>
          <span className="ml-2 bg-gray-900 text-white px-2 py-1 rounded text-xs">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
