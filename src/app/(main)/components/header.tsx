'use client';
import { useAuth } from '@/hooks';
import { Avatar, Button, Container, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, MouseEvent, useLayoutEffect, useState } from 'react';
import { TiThMenu } from 'react-icons/ti';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { user, logout } = useAuth();

    useLayoutEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY >= 40);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await logout();
        handleClose();
    };

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
                    {user ? (
                        <IconButton size="small" onClick={handleClick}>
                            <Avatar src={user.avatar} alt={user.name} sx={{ width: 36, height: 36 }} />
                        </IconButton>
                    ) : (
                        <Button component={Link} href="/dang-nhap">
                            Đăng nhập
                        </Button>
                    )}
                </div>
                <div className="md:hidden">
                    <IconButton>
                        <TiThMenu />
                    </IconButton>
                </div>
                {user && (
                    <Menu
                        id="user-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        anchorOrigin={{
                            horizontal: 'right',
                            vertical: 'bottom',
                        }}
                        transformOrigin={{
                            horizontal: 'right',
                            vertical: 'top',
                        }}
                    >
                        <div className="px-4 py-2">
                            <h6 className="text-sm font-semibold">{user.name}</h6>
                            <span className="text-xs">{user.email}</span>
                        </div>
                        <Divider />
                        <MenuItem onClick={handleClose} component={Link} href="/tai-khoan/chung">
                            Tài khoản
                        </MenuItem>
                        <MenuItem onClick={handleClose} component={Link} href="/tai-khoan/lich-su">
                            Lịch sử
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                    </Menu>
                )}
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
