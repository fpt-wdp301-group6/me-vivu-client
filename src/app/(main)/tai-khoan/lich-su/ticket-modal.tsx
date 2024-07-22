'use client';
import { FC } from 'react';
import { Divider, IconButton, Modal } from '@mui/material';
import { motion } from 'framer-motion';
import Ticket from '@/types/ticket';
import { IoMdClose } from 'react-icons/io';
import SimpleBar from 'simplebar-react';
import Image from 'next/image';
import { MovieImage } from '@/components';
import { formats } from '@/utils';
import Link from 'next/link';

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
    ticket: Ticket;
}

const TicketModal: FC<TicketModalProps> = ({ open, onClose, ticket }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <div className="flex items-center justify-center w-screen h-screen p-8 pointer-events-none">
                <motion.div
                    variants={variants}
                    initial="initial"
                    whileInView="animate"
                    className="w-full h-full overflow-hidden text-white rounded-lg pointer-events-auto bg-dark max-w-[468px]"
                >
                    <div className="flex flex-col h-full">
                        <div className="relative py-3 font-bold text-center bg-primary">
                            <div className="absolute right-0 -translate-x-1/2 -translate-y-1/2 top-1/2">
                                <IconButton onClick={onClose}>
                                    <IoMdClose />
                                </IconButton>
                            </div>
                            Thông tin vé xem phim
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <SimpleBar className="h-full">
                                <div className="flex flex-col p-2">
                                    <div className="p-4 rounded-t-lg bg-red-950">
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={ticket.theater.cinema.logo}
                                                alt={ticket.theater.name}
                                                width={50}
                                                height={50}
                                                className="rounded-xl"
                                            />
                                            <div>
                                                <div className="text-sm">{ticket.theater.name}</div>
                                                <div className="font-semibold">{ticket.showtime.movie?.title}</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-5 gap-4 mt-4">
                                            <div className="col-span-2 row-span-2">
                                                <MovieImage
                                                    src={`_bestv2/${ticket.showtime.movie?.poster_path}`}
                                                    alt={ticket.showtime.movie?.title || ''}
                                                    width={300}
                                                    height={450}
                                                    className="w-full rounded-lg aspect-poster"
                                                />
                                            </div>
                                            <div className="col-span-3">
                                                <div className="text-gray-300">Mã đặt vé</div>
                                                <div className="text-lg font-semibold">WPQNH54</div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="text-gray-300">Thời gian</div>
                                                <div className="text-lg font-semibold">
                                                    {formats.time(ticket.showtime.startAt)} -{' '}
                                                    {formats.time(ticket.showtime.endAt)}
                                                </div>
                                                <div className="text-lg">{formats.date(ticket.showtime.startAt)}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative border-t-2 border-gray-400 border-dashed after:rounded-full after:size-5 after:bg-dark after:absolute after:top-0 after:right-0 after:translate-x-1/2 after:-translate-y-1/2 after:border-l-2 before:border-r-2 before:rounded-full before:size-5 before:bg-dark before:absolute before:top-0 before:left-0 before:-translate-x-1/2 before:-translate-y-1/2"></div>
                                    <div className="overflow-hidden border-b-2 border-gray-400 border-x-2 rounded-b-xl">
                                        <div className="flex flex-col gap-4 px-4 py-6">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <div className="text-sm text-gray-300">Phòng chiếu</div>
                                                    <div className="font-semibold">{ticket.showtime.room.name}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-300">Số ghế</div>
                                                    <div className="font-semibold">
                                                        {ticket.seats.map((seat) => seat.name).join(', ')}
                                                    </div>
                                                </div>
                                            </div>
                                            {ticket.foods.length > 0 && (
                                                <>
                                                    <Divider />
                                                    <div>
                                                        <div className="text-sm text-gray-300">Thức ăn kèm</div>
                                                        {ticket.foods.map((food) => (
                                                            <div key={food.item._id} className="mt-1 font-semibold">
                                                                {`${food.quantity} \u00D7 ${food.item.name}`}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                            <Divider />
                                            <div>
                                                <div className="text-sm text-gray-300">Rạp chiếu</div>
                                                <div className="font-semibold">{ticket.theater.name}</div>
                                                <p>{ticket.theater.address.detail}</p>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-gray-600">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm">Tổng tiền</span>
                                                    <span className="text-lg font-semibold">
                                                        {formats.price(ticket.total)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm">Mã giao dịch</span>
                                                    <Link href={'/'} className="text-blue-500 underline">
                                                        {ticket.code}
                                                    </Link>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm">Thời gian giao dịch</span>
                                                    <span>
                                                        {`${formats.time(ticket.updatedAt)} - ${formats.date(
                                                            ticket.updatedAt,
                                                        )}`}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 p-4 mt-4 border-2 rounded-xl border-primary">
                                        <div className="text-lg font-bold">Thông tin người nhận</div>
                                        <Divider />
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Họ và tên</span>
                                            <span className="font-semibold">{ticket.name}</span>
                                        </div>
                                        <Divider />
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Số điện thoại</span>
                                            <span className="font-semibold">{ticket.phone}</span>
                                        </div>
                                        <Divider />
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Email</span>
                                            <span className="font-semibold">{ticket.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </SimpleBar>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Modal>
    );
};

export default TicketModal;
