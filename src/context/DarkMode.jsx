/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';

export const DarkContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setIsDark(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDark));
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(prevMode => !prevMode);
  };

  return (
    <DarkContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </DarkContext.Provider>
  );
}
