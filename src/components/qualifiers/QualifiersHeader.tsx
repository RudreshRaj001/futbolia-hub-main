import React from 'react';

const QualifiersHeader: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-gray-900 text-white p-4 rounded-md">
      <h1 className="text-2xl font-bold">{currentYear} South American Qualifiers</h1>
    </div>
  );
};

export default QualifiersHeader;
