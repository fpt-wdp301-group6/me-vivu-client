'use client';
import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DateChooser from './date-chooser';
import { Button, Divider } from '@mui/material';
import useSWR from 'swr';
import { fetcher } from '@/configs/api';
import MovieImage from '../movie-image';
import ShowtimesByMovie from '@/types/showtimes-by-movie';
import { formats } from '@/utils';
import SimpleBar from 'simplebar-react';
import SeatsModal from './seats-modal';
import Showtime from '@/types/showtime';
import { useBooking } from '@/hooks';

interface ShowtimeListProps {
    date: Date;
    onDateChange: (date: Date) => void;
}

const ShowtimeList: FC<ShowtimeListProps> = ({ date, onDateChange }) => {
    const { theater } = useBooking();
    const { data } = useSWR(`/showtimes/${theater?._id}/list?date=${date.toDateString()}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return (
        <div className="flex flex-col h-[550px]">
            {theater && (
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-800">
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
            <SimpleBar className="flex-grow h-full overflow-auto">
                {data &&
                    (data?.data as ShowtimesByMovie[]).map((item) => (
                        <ShowtimeByMovie data={item} key={item.movie.id} />
                    ))}
            </SimpleBar>
        </div>
    );
};

interface ShowtimeByMovieProps {
    data: ShowtimesByMovie;
}

const ShowtimeByMovie: FC<ShowtimeByMovieProps> = ({ data }) => {
    const [open, setOpen] = useState(false);
    const { showtime, setShowtime, setMovie, resetBooking } = useBooking();

    const handleOpen = (showtime: Showtime) => () => {
        setOpen(true);
        setShowtime(showtime);
        setMovie(data.movie);
    };

    const handleClose = () => {
        setOpen(false);
        resetBooking();
    };

    return (
        <div className="grid grid-cols-4 gap-4 p-4 border-b">
            <div className="col-span-1">
                <MovieImage
                    src={`_bestv2${data.movie.poster_path}`}
                    alt={data.movie.title}
                    width={300}
                    height={450}
                    className="shadow-md rounded-3xl"
                />
            </div>
            <div className="col-span-3 p-3">
                <Link
                    href={`/phim-chieu/${formats.slugify(data.movie.title)}-${data.movie.id}`}
                    className="font-semibold transition-colors hover:text-primary"
                >
                    {data.movie.title}
                </Link>
                <div className="flex flex-wrap gap-4 mt-6">
                    {data.showtimes.map((showtime) => (
                        <Button
                            variant="outlined"
                            color="secondary"
                            disabled={new Date(showtime.startAt) < new Date()}
                            key={showtime._id}
                            onClick={handleOpen(showtime)}
                        >
                            {`${formats.time(showtime.startAt)} - ${formats.time(showtime.endAt)}`}
                        </Button>
                    ))}
                    {showtime && (
                        <SeatsModal open={open} onClose={handleClose} showtime={showtime} movie={data.movie} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowtimeList;
