import { FC, ReactNode } from 'react';
import Header from './components/header';
import Footer from './components/footer';

interface MainLayoutProps {
    children: Readonly<ReactNode>;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
