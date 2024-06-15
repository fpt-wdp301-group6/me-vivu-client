'use client';
import { FC } from 'react';
import Theater from '@/types/theater';
import Image from 'next/image';
import Link from 'next/link';
import DateChooser from './date-chooser';
import { Divider } from '@mui/material';

interface ShowtimeListProps {
    date: Date;
    onDateChange: (date: Date) => void;
    theater?: Theater;
}

const ShowtimeList: FC<ShowtimeListProps> = ({ theater, date, onDateChange }) => {
    return (
        <div>
            {theater && (
                <div className="flex items-center px-4 py-3 gap-3 bg-gray-800">
                    <Image
                        src={theater.cinema.logo}
                        alt={theater.name}
                        width={40}
                        height={40}
                        className="border rounded-lg aspect-auto"
                    />
                    <div>
                        <Link href="#" className="font-semibold transition-colors hover:text-primary">
                            Lịch chiếu phim {theater.name}
                        </Link>
                        <p className="text-xs text-gray-300">{theater.address.detail}</p>
                    </div>
                </div>
            )}
            <DateChooser value={date} onChange={onDateChange} />
            <Divider className="border-white" />
        </div>
    );
};

export default ShowtimeList;
