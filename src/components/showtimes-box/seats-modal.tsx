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
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import clsx from 'clsx';

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
    const [seats, setSeats] = useState<(Seat | undefined)[][]>([[]]);
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
                const countY = newSeats.length - seat.y - 1;
                const countX = newSeats[0].length - seat.x - 1;

                for (let i = 0; countY < 0 && i < -countY; i++) {
                    const newRow = Array.from({ length: seats[0].length }).fill(undefined);
                    newSeats.push(newRow as undefined[]);
                }
                for (let i = 0; countX < 0 && i < -countX; i++) {
                    newSeats.forEach((row) => {
                        row.push(undefined);
                    });
                }

                newSeats[seat.y][seat.x] = seat;
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
                        <div className="flex-1 bg-white/25">
                            <SeatMap seats={seats} />
                        </div>
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

interface SeatMapProps {
    seats: (Seat | undefined)[][];
}

const SeatMap: FC<SeatMapProps> = ({ seats }) => {
    return (
        <TransformWrapper centerOnInit centerZoomedOut limitToBounds minScale={0.5} maxScale={2} smooth>
            <TransformComponent wrapperStyle={{ maxWidth: '100%', width: '100%', height: '100%' }}>
                <div className="flex flex-col gap-4 p-10">
                    <div className="text-center">
                        <div className="inline-block h-1 bg-white w-80"></div>
                        <div className="text-white">MÀN HÌNH</div>
                    </div>
                    <div
                        className="inline-grid flex-1 gap-2"
                        style={{
                            gridTemplate: `repeat(${seats.length}, minmax(36px, 36px)) / repeat(${seats[0].length}, minmax(36px, 36px))`,
                        }}
                    >
                        {seats.map((row, rowIndex) =>
                            row.map(
                                (seat, colIndex) =>
                                    seat && (
                                        <span
                                            key={`${rowIndex}${colIndex}`}
                                            style={{ gridColumn: colIndex + 1, gridRow: rowIndex + 1 }}
                                            className={clsx(
                                                'flex items-center justify-center flex-shrink-0 text-xs text-white h-9 cursor-pointer',
                                                {
                                                    'bg-teal-500': seat.type === SeatType.Normal,
                                                    'bg-blue-500': seat.type === SeatType.VIP,
                                                    'bg-pink-500': seat.type === SeatType.Couple,
                                                },
                                                seat.type === SeatType.Couple ? 'w-20 rounded-full' : 'w-9 rounded-lg',
                                            )}
                                        >
                                            {seat.name}
                                        </span>
                                    ),
                            ),
                        )}
                    </div>
                </div>
            </TransformComponent>
        </TransformWrapper>
    );
};

export default SeatsModal;
