import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import LazyLoadedMainWithLoadingAnimation from './LazyLoadedMainWithLoadingAnimation';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <LazyLoadedMainWithLoadingAnimation />
  </StrictMode>
);
