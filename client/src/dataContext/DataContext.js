import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

function DataProvider({ children }) {
  const [data, setData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch('http://127.0.0.1:5555/check_session', {
          method: 'GET',
          credentials: 'include' // Important to send cookies with the request
        });

        if (response.ok) {
          console.log("Session is active");
          setIsAuthenticated(true);
        } else {
          console.log("Session is not active");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    }

    checkSession();
  }, []);

  return (
    <DataContext.Provider value={{ data, setData, isAuthenticated, setIsAuthenticated }}>
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}

export { DataProvider, useData };
