// TwitterNews.tsx
import React from 'react';

interface Tweet {
  id: string;
  content: string;
  userName: string;
  handle: string;
  date: string;
  imageUrl?: string;
}

const mockTweets: Tweet[] = [
  {
    id: '1',
    content:
      '#NocheCentenario #ZappingSports 😱⚽️\npic.twitter.com/RrTMgPd4Cx',
    userName: 'Zapping Ecuador',
    handle: 'zapping_ecu',
    date: 'May 1, 2025',
    imageUrl: 'https://via.placeholder.com/400x200?text=Zapping+Ecuador',
  },
  {
    id: '2',
    content:
      '¡Segundo Castillo y Guillermo Almada listos para el duelo del Centenario en Guayaquil! #PachucaParaElMundo 😍 #BSCPAC\npic.twitter.com/voCYJRWKTW',
    userName: 'Club Pachuca',
    handle: 'Tuzos',
    date: 'May 1, 2025',
    imageUrl: 'https://via.placeholder.com/400x200?text=Club+Pachuca',
  },
];

export const TwitterNews: React.FC = () => {
  return (
    <div className="max-w-md mx-auto space-y-4">
      {mockTweets.map((tweet) => (
        <div
          key={tweet.id}
          className="border rounded-lg p-4 bg-white shadow-sm"
        >
          <p className="whitespace-pre-wrap mb-3">{tweet.content}</p>

          {tweet.imageUrl && (
            <img
              src={tweet.imageUrl}
              alt="Tweet media"
              className="w-full h-auto rounded mb-3"
            />
          )}

          <div className="flex items-center text-sm text-gray-600 space-x-2">
            <span className="font-semibold">{tweet.userName}</span>
            <span>@{tweet.handle}</span>
            <span>·</span>
            <span>{tweet.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
