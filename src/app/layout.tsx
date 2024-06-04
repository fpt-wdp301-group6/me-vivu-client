import React from 'react';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import ThemeProvider from '@/contexts/theme-provider';
import AuthProvider from '@/contexts/auth-provider';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './globals.scss';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        template: '%s | meVivu',
        default: 'meVivu',
        absolute: 'Vi vu đặt vé online | meVivu',
    },
    description: 'Vi vu đặt vé online',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={montserrat.className}>
                <ThemeProvider>
                    <AuthProvider>{children}</AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
