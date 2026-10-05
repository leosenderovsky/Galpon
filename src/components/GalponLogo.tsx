import React, { useState } from 'react';
import { BRAND } from '../brand.config';
import { getImageDimensions } from '../products';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const GalponLogo: React.FC<LogoProps> = ({
  className = 'h-10',
  variant = 'dark',
}) => {
  const [useDefaultSource, setUseDefaultSource] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const source = variant === 'light' && BRAND.logo.srcLight && !useDefaultSource
    ? BRAND.logo.srcLight
    : BRAND.logo.src;
  const useLightFilter = variant === 'light' && (!BRAND.logo.srcLight || useDefaultSource);
  const dimensions = getImageDimensions(source);

  if (imageFailed) {
    return (
      <span
        className={`${className} flex items-center font-headline font-bold uppercase ${
          variant === 'light' ? 'text-white' : 'text-brand-primary'
        }`}
      >
        {BRAND.name}
      </span>
    );
  }

  return (
    <img
      src={source}
      alt={BRAND.logo.alt}
      width={dimensions?.width}
      height={dimensions?.height}
      loading="eager"
      fetchPriority="high"
      decoding="async"
      className={`${className} w-auto object-contain ${useLightFilter ? 'brightness-0 invert' : ''}`}
      onError={() => {
        if (source !== BRAND.logo.src) {
          setUseDefaultSource(true);
          return;
        }
        setImageFailed(true);
      }}
    />
  );
};
