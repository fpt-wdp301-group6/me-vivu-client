'use client';
import { Button, Container, IconButton } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useLayoutEffect, useState } from 'react';
import { TiThMenu } from 'react-icons/ti';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useLayoutEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY >= 40);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={clsx('fixed top-0 left-0 right-0 z-50 bg-opacity-80', { 'backdrop-blur-[6px]': isScrolled })}
        >
            <Container
                className={clsx('flex items-center justify-between h-16 transition-all', { 'md:h-20': !isScrolled })}
            >
                <Link href="/" className="text-3xl font-bold">
                    me<span className="text-primary">Vivu</span>
                </Link>
                <div className="flex items-center gap-6 max-md:hidden">
                    <NavLink href="/">Trang chủ</NavLink>
                    <NavLink href="/lich-chieu">Lịch chiếu</NavLink>
                    <NavLink href="/phim-chieu">Phim chiếu</NavLink>
                    <Button component={Link} href="/dang-nhap">
                        Đăng nhập
                    </Button>
                </div>
                <div className="md:hidden">
                    <IconButton>
                        <TiThMenu />
                    </IconButton>
                </div>
            </Container>
        </header>
    );
};

interface NavLinkProps {
    href: string;
    children: string;
    className?: string;
}

const NavLink: FC<NavLinkProps> = ({ href, children, className }) => {
    const pathname = usePathname();

    return (
        <Link
            href={href}
            className={clsx(
                className,
                'relative font-semibold hover:after:w-full hover:after:left-0',
                'after:absolute after:-bottom-2 after:rounded-full after:h-0.5 after:bg-primary after:transition-all duration-500',
                pathname === href ? 'after:w-full after:left-0' : 'after:w-0 after:left-1/2',
            )}
        >
            {children}
        </Link>
    );
};

export default Header;
