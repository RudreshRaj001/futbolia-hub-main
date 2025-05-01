
import React from 'react';

const NationalTeamHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-600 to-red-600 text-white p-6 rounded-md shadow-md">
      <h1 className="text-3xl font-bold">National Team</h1>
      <p className="mt-2 text-yellow-100">Latest news, matches and updates about Ecuador's national football team</p>
    </div>
  );
};

export default NationalTeamHeader;
