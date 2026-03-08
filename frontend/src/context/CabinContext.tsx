import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CABINS } from '../data/cabins';
import type { Cabin } from '../data/cabins';

interface CabinContextType {
  selectedCabin: Cabin | null;
  selectCabin: (cabin: Cabin) => void;
  clearCabin: () => void;
  isLoading: boolean;
}

const CabinContext = createContext<CabinContextType | undefined>(undefined);

const STORAGE_KEY = 'selectedCabin';

export function CabinProvider({ children }: { children: ReactNode }) {
  const [selectedCabin, setSelectedCabin] = useState<Cabin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedCabin();
  }, []);

  const loadSavedCabin = () => {
    try {
      const savedCabinId = localStorage.getItem(STORAGE_KEY);
      if (savedCabinId) {
        const cabin = CABINS.find(c => c.id === savedCabinId);
        if (cabin) {
          setSelectedCabin(cabin);
        }
      }
    } catch (error) {
      console.error('Error loading saved cabin:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectCabin = (cabin: Cabin) => {
    try {
      localStorage.setItem(STORAGE_KEY, cabin.id);
      setSelectedCabin(cabin);
    } catch (error) {
      console.error('Error saving cabin:', error);
    }
  };

  const clearCabin = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setSelectedCabin(null);
    } catch (error) {
      console.error('Error clearing cabin:', error);
    }
  };

  return (
    <CabinContext.Provider value={{ selectedCabin, selectCabin, clearCabin, isLoading }}>
      {children}
    </CabinContext.Provider>
  );
}

export function useCabin() {
  const context = useContext(CabinContext);
  if (context === undefined) {
    throw new Error('useCabin must be used within a CabinProvider');
  }
  return context;
}
