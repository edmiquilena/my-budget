
import { createContext, useContext, useState } from 'react';


const FiltersContext = createContext({});

export function FiltersProvider({
  children,
}) {
  const [filters, SetFilters] = useState({})

  return (
    <FiltersContext.Provider value={{filters, SetFilters}}>
      {children}
    </FiltersContext.Provider>
  );
}

export const useFilters = () => useContext(FiltersContext);
