import { Container, Paper } from '@mui/material';
import { FC, ReactNode } from 'react';
import AccountMenu from './account-menu';

interface AccountLayoutProps {
    children: Readonly<ReactNode>;
}

const AccountLayout: FC<AccountLayoutProps> = ({ children }) => {
    return (
        <>
            <div
                className="relative h-48 font-semibold bg-no-repeat bg-cover"
                style={{ backgroundImage: 'url(/images/backgrounds/footer-bg.jpg)' }}
            >
                <h1 className="absolute text-2xl -translate-x-1/2 bottom-8 left-1/2">Tài khoản</h1>
            </div>
            <Container className="py-20">
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                        <Paper className="p-4">
                            <AccountMenu />
                        </Paper>
                    </div>
                    <div className="col-span-3">{children}</div>
                </div>
            </Container>
        </>
    );
};

export default AccountLayout;
