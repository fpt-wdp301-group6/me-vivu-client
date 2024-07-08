import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import { paymentData, PaymentStatus } from './constants';
import Redirect from './redirect';
import { Paper } from '@mui/material';

export const metadata: Metadata = {
    title: 'Thanh toán',
    description: 'Hiển thị kết quá thanh toán',
};

interface PaymentProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const Payment: FC<PaymentProps> = ({ searchParams }) => {
    const { id, status, orderCode } = searchParams;
    if (!(id && status && orderCode)) {
        notFound();
    }

    const paymentStatus = status as PaymentStatus;
    const data = paymentData[paymentStatus];

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <Paper className="flex flex-col items-center gap-6 p-12 max-w-[842px]">
                {data.icon}
                <h1 className="text-3xl font-bold">{data.title}</h1>
                <p className="text-lg">{data.description}</p>
                <Redirect />
            </Paper>
        </div>
    );
};

export default Payment;
