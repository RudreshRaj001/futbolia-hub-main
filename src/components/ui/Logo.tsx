
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12'
  };

  return (
    <Link to="/" className={`inline-flex items-center ${className}`}>
      <img 
        src="/logo1.png" 
        alt="Pase y GOL" 
        className={`${sizeClasses[size]}`}
      />
    </Link>
  );
};

export default Logo;
