import { ReactNode } from 'react';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { IoCloseCircleSharp } from 'react-icons/io5';

interface PaymentData {
    title: string;
    description: string;
    icon: ReactNode;
}

const paymentPaid: PaymentData = {
    title: 'Thanh toán thành công',
    description: 'Cảm ơn bạn đã mua vé tại meVivu. Thông tin đặt vé đã được gửi về email của bạn.',
    icon: <BsFillPatchCheckFill className="text-success size-28" />,
};

const paymentCancelled: PaymentData = {
    title: 'Thanh toán bị hủy',
    description: 'Cảm ơn bạn đã có nhu cầu mua vé tại meVivu. Thông tin hủy vé đã được gửi về email của bạn.',
    icon: <IoCloseCircleSharp className="text-error size-28" />,
};

export enum PaymentStatus {
    Paid = 'PAID',
    Cancelled = 'CANCELLED',
}

export const paymentData = {
    [PaymentStatus.Paid]: paymentPaid,
    [PaymentStatus.Cancelled]: paymentCancelled,
};
