'use client';

import { useLayoutEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Redirect = () => {
    const [count, setCount] = useState(10);
    const router = useRouter();

    useLayoutEffect(() => {
        const timer = setTimeout(() => {
            if (count > 0) {
                setCount(count - 1);
            } else {
                router.push('/');
            }
        }, 1_000);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    return (
        <div className="mt-8">
            <p>Bạn sẽ được chuyển tiếp về trang chủ sau {count} giây.</p>
            <div className="flex items-center justify-center gap-4 mt-6">
                <Button size="large" variant="outlined" color="secondary">
                    Lịch sử đặt vé
                </Button>
                <Button size="large" component={Link} href="/">
                    Trang chủ
                </Button>
            </div>
        </div>
    );
};

export default Redirect;
