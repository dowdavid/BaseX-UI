import { createContext, useContext } from 'react';

const ThemeContext = createContext(false);

export const ThemeProvider = ThemeContext.Provider;
export const useIsDark = () => useContext(ThemeContext);
