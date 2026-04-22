import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/lib/theme';
import { FontSizeProvider } from '@/lib/font-size';
import { registerServiceWorker } from '@/lib/pwa';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <FontSizeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FontSizeProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);

registerServiceWorker();
