'use client';
import { FC, ReactNode, createContext, useCallback, useMemo, useState } from 'react';
import { ThemeMode, theme } from '@/theme';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import clsx from 'clsx';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

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
    const toggleTheme = useCallback(() => setMode(mode === ThemeMode.Light ? ThemeMode.Light : ThemeMode.Dark), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <MuiThemeProvider theme={activeTheme}>
                <ProgressBar height="4px" color="#ff0000" options={{ showSpinner: false }} shallowRouting />
                <div
                    id="root"
                    className={clsx(
                        { 'dark text-white': mode === ThemeMode.Dark },
                        'min-h-screen dark:bg-dark dark:text-white',
                    )}
                >
                    {children}
                </div>
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
