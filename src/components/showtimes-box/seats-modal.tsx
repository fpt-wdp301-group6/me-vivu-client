import { fetcher } from '@/configs/api';
import Seat, { SeatType } from '@/types/seat';
import Showtime from '@/types/showtime';
import { Button, Chip, Divider, IconButton, Modal } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import { IoMdClose } from 'react-icons/io';
import Movie from '@/types/movie';
import { formats } from '@/utils';

const variants = {
    initial: {
        y: 500,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.75,
        },
    },
};

interface SeatsModalProps {
    open: boolean;
    showtime: Showtime;
    movie: Movie;
    onClose: () => void;
}

const SeatsModal: FC<SeatsModalProps> = ({ open, movie, showtime, onClose }) => {
    const [seats, setSeats] = useState<(Seat | unknown)[][]>([[]]);
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

    const { data } = useSWR(`/showtimes/${showtime._id}/seats`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    useEffect(() => {
        if (data) {
            const newSeats = [...seats];
            data.data.forEach((seat: Seat) => {
                const countY = newSeats.length - seat.y - 2;
                const countX = newSeats[0].length - seat.x - 2;

                for (let i = 0; countY < 0 && i < -countY; i++) {
                    const newRow = Array.from({ length: seats[0].length });
                    newSeats.push(newRow);
                }
                for (let i = 0; countX < 0 && i < -countX; i++) {
                    newSeats.forEach((row) => {
                        row.push(undefined);
                    });
                }

                newSeats[seat.y][seat.x] = seat;
                if (seat.type === SeatType.Couple) {
                    newSeats[seat.y][seat.x + 1] = {};
                }
            });
            setSeats(newSeats);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <Modal open={open} onClose={onClose}>
            <div className="flex justify-center w-screen h-screen p-4 pointer-events-none">
                <motion.div
                    variants={variants}
                    initial="initial"
                    whileInView="animate"
                    className="w-full overflow-hidden text-white rounded-lg pointer-events-auto bg-dark max-w-[896px]"
                >
                    <div className="flex flex-col h-full">
                        <div className="relative py-3 font-bold text-center bg-primary">
                            <div className="absolute right-0 -translate-x-1/2 -translate-y-1/2 top-1/2">
                                <IconButton onClick={onClose}>
                                    <IoMdClose />
                                </IconButton>
                            </div>
                            Mua vé xem phim
                        </div>
                        <div className="flex-1 bg-white/25"></div>
                        <div className="p-4 bg-dark">
                            <div className="font-bold">{movie.title}</div>
                            <div className="text-sm">{`${formats.time(showtime.startAt)} ~ ${formats.time(
                                showtime.endAt,
                            )} · ${formats.dayWeek(showtime.startAt)} · Phòng chiếu ${showtime.room.name}`}</div>
                            <Divider className="my-4" />
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Chỗ ngồi</span>
                                {selectedSeats.length > 0 && (
                                    <Chip
                                        label={selectedSeats.map((seat) => seat.name).join(', ')}
                                        variant="outlined"
                                        onDelete={() => setSelectedSeats([])}
                                    />
                                )}
                            </div>
                            <Divider className="my-4" />
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm">Tạm tính</div>
                                    <div className="text-lg font-bold">
                                        {formats.price(selectedSeats.reduce((total) => (total += 60000), 0))}
                                    </div>
                                </div>
                                <Button size="large" disabled={selectedSeats.length === 0}>
                                    Mua vé
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Modal>
    );
};

export default SeatsModal;
