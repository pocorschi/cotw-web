import React, { useState } from 'react';
import { Color } from '../types';

type StatsType = {
  [key: string]: {
    [key: string]: number;
  };
};

interface AppCtx {
  selectedPage?: string | null;
  selectedColor?: Color | null;
  setSelectedPage?: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedColor?: React.Dispatch<React.SetStateAction<Color | null>>;
  stats?: (StatsType & { total: number }) | null;
  setStats?: React.Dispatch<
    React.SetStateAction<
      | (StatsType & {
          total: number;
        })
      | null
    >
  >;
}

const AppContext = React.createContext<AppCtx>({});

const AppProvider: React.FC = ({ children }) => {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [stats, setStats] = useState<(StatsType & { total: number }) | null>(null);

  return (
    <AppContext.Provider
      value={{
        selectedPage,
        setSelectedPage,
        selectedColor,
        setSelectedColor,
        stats,
        setStats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
