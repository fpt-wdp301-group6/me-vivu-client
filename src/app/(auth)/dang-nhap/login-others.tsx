'use client';
import { Button } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { AuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/configs/firebase';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';

const LoginOthers = () => {
    const { loginByOthers } = useAuth();
    const router = useRouter();

    const signInWithOthers = async (provider: AuthProvider) => {
        try {
            const res = await signInWithPopup(auth, provider);
            loginByOthers(res).then(() => router.push('/'));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Button
            onClick={() => signInWithOthers(googleProvider)}
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ fontWeight: 700 }}
            startIcon={<FcGoogle />}
        >
            Đăng nhập với Google
        </Button>
    );
};

export default LoginOthers;
