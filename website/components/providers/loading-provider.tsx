'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';

// Define the context type
interface LoadingContextType {
  isLoading: boolean;
  activeOperations: Set<string>;
  startLoading: (key: string) => void;
  finishLoading: (key: string) => void;
}

// Create the context
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Provider component props
interface LoadingProviderProps {
  children: ReactNode;
}

// LoadingProvider component
export function LoadingProvider({ children }: LoadingProviderProps) {
  // Track active operations using a Set
  const [activeOperations, setActiveOperations] = useState<Set<string>>(new Set());

  // Compute loading state based on active operations
  const isLoading = activeOperations.size > 0;

  // Start loading operation
  const startLoading = useCallback((key: string) => {
    setActiveOperations(prev => {
      const newSet = new Set(prev);
      newSet.add(key);
      return newSet;
    });
  }, []);

  // Finish loading operation
  const finishLoading = useCallback((key: string) => {
    setActiveOperations(prev => {
      const newSet = new Set(prev);
      newSet.delete(key);
      return newSet;
    });
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    isLoading,
    activeOperations,
    startLoading,
    finishLoading,
  }), [isLoading, activeOperations, startLoading, finishLoading]);

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
}

// Custom hook to use loading context
export function useLoading() {
  const context = useContext(LoadingContext);
  
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  
  return context;
}
