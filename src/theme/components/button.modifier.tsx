import { Components, Theme } from '@mui/material/styles';

export const MuiButton: Components<Theme>['MuiButton'] = {
    defaultProps: {
        color: 'primary',
        variant: 'contained',
        disableElevation: true,
    },
    styleOverrides: {
        root: {
            fontWeight: 600,
            textTransform: 'unset',
            borderRadius: 999999,
        },
    },
    variants: [
        {
            props: { size: 'small' },
            style: {
                height: 30,
                fontSize: '0.75rem',
                paddingInline: 16,
                paddingBlock: 4,
            },
        },
        {
            props: { size: 'medium' },
            style: {
                height: 36,
                fontSize: '0.875rem',
                paddingInline: 20,
                paddingBlock: 6,
            },
        },
        {
            props: { size: 'large' },
            style: {
                height: 48,
                fontSize: '1rem',
                fontWeight: 700,
                paddingInline: 24,
                paddingBlock: 8,
            },
        },
        {
            props: { variant: 'contained', color: 'primary' },
            style: ({ theme }) => {
                const {
                    primary: { light, main },
                } = theme.palette;

                return {
                    transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',

                    '&:hover': {
                        boxShadow: `${main}3d 0px 12px 16px 0px;`,
                    },
                };
            },
        },
        {
            props: { variant: 'contained', color: 'secondary' },
            style: ({ theme }) => {
                const {
                    secondary: { light },
                } = theme.palette;

                return {
                    '&:hover': {
                        backgroundColor: light,
                    },
                };
            },
        },
    ],
};
