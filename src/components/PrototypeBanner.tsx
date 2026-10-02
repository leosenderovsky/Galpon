import React from 'react';
import { DEMO_BANNER, getValidDemoBannerLink } from '../demoBanner.config';

export const PrototypeBanner: React.FC = () => {
  const companyName = DEMO_BANNER.companyName === '[EMPRESA]' ? '' : DEMO_BANNER.companyName;
  const link = companyName ? getValidDemoBannerLink(DEMO_BANNER.link) : null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-10 bg-amber-400 text-gray-900 sm:h-9 lg:h-8">
      <div className="flex h-full w-full items-center justify-center px-1 text-center sm:px-4">
        <p className="w-full text-[10px] leading-3 sm:text-[10px] sm:leading-4 sm:whitespace-nowrap lg:text-xs">
          {companyName ? (
            <>
              Esta marca no existe. Este sitio es un prototipo de{' '}
              {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer" className="underline">
                  {companyName}
                </a>
              ) : (
                <strong>{companyName}</strong>
              )}
              .{link && ' Si querés un sitio como este para tu negocio, visitanos acá.'}
            </>
          ) : (
            <>Esta marca no existe. Este sitio es un prototipo de demostración de sitios web para comercios.</>
          )}
        </p>
      </div>
    </div>
  );
};