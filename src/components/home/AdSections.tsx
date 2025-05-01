
import React from 'react';
import Advertisement from '@/components/ads/Advertisement';

interface AdSectionProps {
  position: 'top' | 'middle' | 'bottom';
  className?: string;
}

const AdSection: React.FC<AdSectionProps> = ({ position, className }) => {
  const classes = {
    top: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
    middle: "py-8",
    bottom: "py-6"
  };

  return (
    <section className={classes[position] + (className ? ` ${className}` : '')}>
      <Advertisement size="banner" />
    </section>
  );
};

export { AdSection };
