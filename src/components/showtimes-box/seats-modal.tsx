import { fetcher } from '@/configs/api';
import Seat from '@/types/seat';
import Showtime from '@/types/showtime';
import { Modal } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import useSWR from 'swr';

interface SeatsModalProps {
    open: boolean;
    showtime: Showtime;
    onClose: () => void;
}

const SeatsModal: FC<SeatsModalProps> = ({ open, showtime, onClose }) => {
    const [seats, setSeats] = useState<(Seat | undefined)[][]>([]);

    const { data } = useSWR(`/rooms/${showtime.room._id}/seats`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return (
        <Modal open={open} onClose={onClose}>
            <div>SeatsModal</div>
        </Modal>
    );
};

export default SeatsModal;
