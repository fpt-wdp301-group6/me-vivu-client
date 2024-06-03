import { createTheme } from '@mui/material';
import { darkModePalette, lightModePalette } from './palette';
import { typography } from './typography';
import { components } from './components';

export enum ThemeMode {
    Light = 'light',
    Dark = 'dark',
}

export const theme = (mode: ThemeMode) => {
    return createTheme({
        components,
        palette: { mode, ...(mode === ThemeMode.Light ? lightModePalette : darkModePalette) },
        typography,
    });
};
