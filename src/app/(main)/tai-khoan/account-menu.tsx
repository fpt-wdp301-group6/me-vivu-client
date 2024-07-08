'use client';
import { ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import Link from 'next/link';
import { FaAddressCard } from 'react-icons/fa6';
import { MdKey } from 'react-icons/md';
import { BsTicketPerforatedFill } from 'react-icons/bs';
import { usePathname } from 'next/navigation';

const MENU = [
    {
        text: 'Chung',
        icon: <FaAddressCard />,
        href: '/tai-khoan/chung',
    },
    {
        text: 'Bảo mật',
        icon: <MdKey />,
        href: '/tai-khoan/bao-mat',
    },
    {
        text: 'Lịch sử đặt vé',
        icon: <BsTicketPerforatedFill />,
        href: '/tai-khoan/lich-su',
    },
];

const AccountMenu = () => {
    const pathname = usePathname();

    return (
        <MenuList>
            {MENU.map((item, index) => (
                <MenuItem key={index} component={Link} href={item.href} selected={item.href === pathname}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                </MenuItem>
            ))}
        </MenuList>
    );
};

export default AccountMenu;
