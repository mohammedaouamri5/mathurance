'use client';

import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { handlingGettingUser } from '../utils/functions';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminData = await handlingGettingUser();

        setUser(adminData || null);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
