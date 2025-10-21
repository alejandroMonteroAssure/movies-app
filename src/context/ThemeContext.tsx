import React, { createContext, useState, useContext } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', toggleTheme: () => { } });

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const colorScheme = useColorScheme();
    const [theme, setTheme] = useState<Theme>(colorScheme === 'dark' ? 'dark' : 'light');
    const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('use theme must be used within ThemeProvider');
    return context;
};