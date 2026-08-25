import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-8 h-8", color = "currentColor" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M50 20 C50 20 70 40 70 60 C70 80 50 90 50 90 C50 90 30 80 30 60 C30 40 50 20 50 20 Z" />
      <path d="M50 90 C50 90 65 75 85 75" />
      <path d="M50 90 C50 90 35 75 15 75" />
      <path d="M50 40 L50 70" strokeLinecap="round"/>
      <circle cx="50" cy="15" r="3" fill={color} stroke="none"/>
    </svg>
  );
};

export default Logo;