'use client';
import { FC, useMemo } from 'react';
import { Button, Divider, IconButton, Modal, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { useBooking } from '@/hooks';
import { constants, formats } from '@/utils';
import { IoMdClose } from 'react-icons/io';
import api from '@/configs/api';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
    .object({
        name: yup.string().required('Vui lòng nhập họ tên').min(2, 'Vui lòng nhập ít nhất 2 kí tự'),
        email: yup.string().required('Vui lòng nhập email').matches(constants.emailRegex, 'Email không hợp lệ'),
        phone: yup
            .string()
            .required('Vui lòng nhập số điện thoại')
            .matches(constants.phoneRegex, 'Số điện thoại không hợp lệ'),
    })
    .required();

const variants = {
    initial: {
        y: 500,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
};

interface TicketModalProps {
    open: boolean;
    onClose: () => void;
}

const TicketModal: FC<TicketModalProps> = ({ open, onClose }) => {
    const { movie, theater, showtime, selectedSeats, foods, seatsTotal } = useBooking();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const total = useMemo(
        () => seatsTotal + foods.reduce((total, food) => (total += food.price * (food.quantity || 0)), 0),
        [seatsTotal, foods],
    );

    const onSubmit = (data: yup.InferType<typeof schema>) => {
        if (theater && showtime && selectedSeats.length > 0) {
            api.post('/tickets', {
                name: data.name,
                email: data.email,
                phone: data.phone,
                showtime: showtime._id,
                theater: theater._id,
                total: total,
                foods: foods.map((food) => ({ item: food._id, quantity: food.quantity })),
                seats: selectedSeats.map((seat) => seat._id),
            })
                .then((res: any) => {
                    const path = window.location.origin;
                    api.post(`/tickets/${res._id}/payment-link`, {
                        returnUrl: `${path}/`,
                        cancelUrl: `${path}/phim-chieu`,
                    }).then((res) => (window.location.href = res.data));
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <>
            {showtime && theater && movie && selectedSeats.length > 0 && (
                <Modal open={open} onClose={onClose}>
                    <div className="flex items-center justify-center w-screen h-screen p-8 pointer-events-none">
                        <motion.div
                            variants={variants}
                            initial="initial"
                            whileInView="animate"
                            className="w-full overflow-hidden text-white rounded-lg pointer-events-auto bg-dark max-w-[800px]"
                        >
                            <div className="grid grid-cols-2">
                                <div className="flex flex-col gap-4 p-6 bg-stone-900">
                                    <div className="gap-4 text-lg font-bold">{movie?.title}</div>
                                    <Divider className="border-dashed" />
                                    <div className="grid items-center grid-cols-2 gap-y-5 gap-x-6">
                                        <div>
                                            <div className="text-xs text-gray-300">THỜI GIAN</div>
                                            <div className="font-bold">{`${formats.time(
                                                showtime.startAt,
                                            )} ~ ${formats.time(showtime.endAt)}`}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-300">NGÀY CHIẾU</div>
                                            <div className="font-bold">{formats.date(showtime.startAt)}</div>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="text-xs text-gray-300">RẠP CHIẾU</div>
                                            <div className="font-bold">{theater.name}</div>
                                            <p className="text-xs">{theater.address.detail}</p>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-300">PHÒNG CHIẾU</div>
                                            <div className="font-bold">{showtime.room.name}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-300">GHẾ</div>
                                            <div className="font-bold">
                                                {selectedSeats.map((seat) => seat.name).join(', ')}
                                            </div>
                                        </div>
                                    </div>
                                    {foods.length > 0 && (
                                        <>
                                            <Divider className="border-dashed" />
                                            <div>
                                                <div className="text-xs text-gray-300">BẮP - NƯỚC</div>
                                                {foods.map((food) => (
                                                    <div
                                                        key={food._id}
                                                        className="flex items-center justify-between gap-6 font-bold"
                                                    >
                                                        <span>{`${food.quantity} \u00D7 ${food.name}`}</span>
                                                        <span>{formats.price(food.price * (food.quantity || 0))}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                    <Divider className="border-dashed" />
                                    <div className="flex items-center justify-between gap-6 font-bold">
                                        <span>Tổng cộng</span>
                                        <span>{formats.price(total)}</span>
                                    </div>
                                </div>
                                <form className="flex flex-col gap-4 p-6" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex justify-between text-lg text-semibold">
                                        Thông tin người đặt vé
                                        <IconButton size="small" onClick={onClose}>
                                            <IoMdClose />
                                        </IconButton>
                                    </div>
                                    <TextField
                                        label="Họ tên"
                                        {...register('name')}
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                    <TextField
                                        label="Email"
                                        type="email"
                                        {...register('email')}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                    <TextField
                                        label="Số điện thoại"
                                        type="tel"
                                        {...register('phone')}
                                        error={!!errors.phone}
                                        helperText={errors.phone?.message}
                                    />
                                    <Divider className="border-dashed" />
                                    <Button type="submit">Thanh toán</Button>
                                    <p className="text-xs italic">
                                        Vui lòng xác nhận thông tin trước khi thực hiện thanh toán.
                                    </p>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default TicketModal;
