import React from 'react';
import { DEMO_BANNER } from '../demoBanner.config';

export const PrototypeBanner: React.FC = () => (
  <div className="fixed inset-x-0 top-0 z-50 h-10 bg-amber-400 text-gray-900 sm:h-9 lg:h-8">
    <div className="flex h-full w-full items-center justify-center px-1 text-center sm:px-4">
      <p className="w-full text-[10px] leading-3 sm:text-xs sm:leading-4 lg:whitespace-nowrap">
        Esta marca no existe. Este sitio es un prototipo de{' '}
        <a href={DEMO_BANNER.link} className="underline">
          {DEMO_BANNER.companyName}
        </a>
        . Si querés un sitio como este para tu negocio, visitanos acá.
      </p>
    </div>
  </div>
);