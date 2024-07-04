import { FC } from 'react';
import { Button, Divider, IconButton, Modal } from '@mui/material';
import { motion } from 'framer-motion';
import { useBooking } from '@/hooks';
import { formats } from '@/utils';
import { IoMdClose } from 'react-icons/io';

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
    const { movie, theater, showtime, selectedSeats, foods } = useBooking();

    const total =
        selectedSeats.reduce((total) => (total += 60000), 0) +
        foods.reduce((total, food) => (total += food.price * (food.quantity || 0)), 0);

    return (
        <>
            {showtime && theater && movie && selectedSeats.length > 0 && (
                <Modal open={open} onClose={onClose}>
                    <div className="flex items-center justify-center w-screen h-screen p-8 pointer-events-none">
                        <motion.div
                            variants={variants}
                            initial="initial"
                            whileInView="animate"
                            className="w-full overflow-hidden text-white rounded-lg pointer-events-auto bg-dark max-w-[420px]"
                        >
                            <div className="flex flex-col gap-4 p-6 bg-stone-900">
                                <div className="flex justify-between gap-4 text-lg font-bold">
                                    {movie?.title}
                                    <IconButton size="small" onClick={onClose}>
                                        <IoMdClose />
                                    </IconButton>
                                </div>
                                <Divider className="border-dashed" />
                                <div className="grid items-center grid-cols-2 gap-y-5 gap-x-6">
                                    <div>
                                        <div className="text-xs text-gray-300">THỜI GIAN</div>
                                        <div className="font-bold">{`${formats.time(showtime.startAt)} ~ ${formats.time(
                                            showtime.endAt,
                                        )}`}</div>
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
                                <Button>Thanh toán</Button>
                                <p className="text-xs italic">
                                    Vui lòng xác nhận thông tin trước khi thực hiện thanh toán.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default TicketModal;
