'use client';
import { FC, ReactNode, createContext, useCallback, useMemo, useState } from 'react';
import { ThemeMode, theme } from '@/theme';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import clsx from 'clsx';

interface ThemeContextProps {
    mode: ThemeMode;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
    children: Readonly<ReactNode>;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>(ThemeMode.Dark);
    const activeTheme = useMemo(() => theme(mode), [mode]);
    const toggleTheme = useCallback(
        () => setMode(mode === ThemeMode.Light ? ThemeMode.Light : ThemeMode.Light),
        [mode],
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <MuiThemeProvider theme={activeTheme}>
                <div id="root" className={clsx({ 'dark text-white': mode === ThemeMode.Dark })}>
                    {children}
                </div>
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
