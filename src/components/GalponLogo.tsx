import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // 'dark' = navy logo on light bg; 'light' = white logo on dark bg
  showTagline?: boolean;
}

export const GalponLogo: React.FC<LogoProps> = ({
  className = 'h-10',
  variant = 'dark',
  showTagline = true,
}) => {
  const primaryColor = variant === 'light' ? '#ffffff' : '#152536';
  const accentColor = variant === 'light' ? '#ffdcbf' : '#7c5733';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Exact Vector Emblem from Uploaded Image:
          Gable roof over stylized t-shirt forming an industrial open warehouse barn doorway */}
      <svg
        viewBox="0 0 100 88"
        className="h-full w-auto shrink-0"
        fill="currentColor"
        style={{ color: primaryColor }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Slanted industrial gable roof bar */}
        <polygon points="12,18 50,0 88,18 84,24 50,7 16,24" />
        
        {/* Stylized t-shirt with arched barn/garage door cutout at bottom */}
        <path
          d="
            M 36,19 
            C 40,24 60,24 64,19 
            L 76,24 
            L 92,34 
            L 80,48 
            L 74,43 
            L 74,86 
            L 59,86 
            L 59,68 
            C 59,57 41,57 41,68 
            L 41,86 
            L 26,86 
            L 26,43 
            L 20,48 
            L 8,34 
            L 24,24 
            Z
          "
        />
      </svg>

      {/* Brand Name Typography matching the uploaded collegiate slab serif font */}
      <div className="flex flex-col justify-center">
        <span
          className="font-headline font-bold uppercase tracking-wider leading-none text-2xl sm:text-[28px]"
          style={{ color: primaryColor, letterSpacing: '0.06em' }}
        >
          GALPON
        </span>
        {showTagline && (
          <span
            className="font-body font-bold uppercase tracking-widest text-[9px] sm:text-[10px] leading-tight mt-0.5"
            style={{ color: accentColor }}
          >
            INDUMENTARIA Y TRABAJO
          </span>
        )}
      </div>
    </div>
  );
};
