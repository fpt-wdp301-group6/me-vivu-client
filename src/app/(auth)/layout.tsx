import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
    children: Readonly<ReactNode>;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen">
            <div className="w-1/3 max-md:hidden">
                <video className="h-full object-cover" src="/videos/animation.mp4" playsInline autoPlay loop muted />
            </div>
            <div className="flex-1 flex items-center justify-center dark:bg-dark">{children}</div>
        </div>
    );
};

export default AuthLayout;
