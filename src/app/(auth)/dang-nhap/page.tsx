import { Metadata } from 'next';
import { Button, Stack } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import LoginForm from './login-form';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Đăng nhập',
};

const Login = () => {
    return (
        <Stack gap={4} width="100%" maxWidth={400} padding={2}>
            <h2 className="text-3xl font-bold text-center">
                Đăng nhập
                <Link href="/" className="ml-2">
                    me<span className="text-primary">Vivu</span>
                </Link>
            </h2>
            <Button variant="outlined" color="secondary" size="large" sx={{ fontWeight: 700 }} startIcon={<FcGoogle />}>
                Đăng nhập với Google
            </Button>
            <span className="text-sm dark:text-gray-400 text-center">hoặc Đăng nhập với email</span>
            <LoginForm />
            <span className="text-sm dark:text-gray-400 text-center">
                Bạn chưa có tài khoản?
                <Link href="/dang-ky" className="ml-1 text-white underline">
                    Đăng ký
                </Link>
            </span>
        </Stack>
    );
};

export default Login;
