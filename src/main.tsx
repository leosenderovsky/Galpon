import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BRAND } from './brand.config';

const root = document.documentElement;

for (const [name, value] of Object.entries(BRAND.theme)) {
  const cssName = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  root.style.setProperty(`--brand-${cssName}`, value);
}

root.style.setProperty('--brand-font-headline', BRAND.typography.headlineFamily);
root.style.setProperty('--brand-font-body', BRAND.typography.bodyFamily);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
