import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

function DataProvider({ children }) {
  const [data, setData] = useState(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  return useContext(DataContext);
}

export { DataProvider, useData };

