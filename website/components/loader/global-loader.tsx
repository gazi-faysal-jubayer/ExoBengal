'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLoading } from '@/components/providers/loading-provider';
import Loader from './loader';

const GlobalLoader: React.FC = () => {
  const { isLoading } = useLoading();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isLoading) {
    return null;
  }

  const overlay = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      <Loader />
    </div>
  );

  return createPortal(overlay, document.body);
};

export default GlobalLoader;
