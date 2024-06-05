import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: "selector",
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-default': 'linear-gradient(to right, var(--primary) 0%, var(--primary-sub) 100%)',
            },
            colors: {
                primary: 'var(--primary)',
                secondary: 'var(--secondary)',
                success: 'var(--success)',
                info: 'var(--info)',
                warning: 'var(--warning)',
                error: 'var(--error)',
                dark: 'var(--dark)',
            },
            backgroundColor: {
                primary: 'var(--primary)',
                secondary: 'var(--secondary)',
                success: 'var(--success)',
                info: 'var(--info)',
                warning: 'var(--warning)',
                error: 'var(--error)',
                dark: 'var(--dark)',
            },
            width: {
                192: '768px',
            },
            aspectRatio: {
                poster: '2 / 3',
            },
        },
    },
    plugins: [],
};
export default config;
