'use client';
import { FC } from 'react';
import Theater from '@/types/theater';
import Image from 'next/image';
import Link from 'next/link';
import DateChooser from './date-chooser';
import { Button, Divider } from '@mui/material';
import useSWR from 'swr';
import { fetcher } from '@/configs/api';
import MovieImage from '../movie-image';
import ShowtimesByMovie from '@/types/showtimes-by-movie';
import { formats } from '@/utils';

interface ShowtimeListProps {
    date: Date;
    onDateChange: (date: Date) => void;
    theater?: Theater;
}

const ShowtimeList: FC<ShowtimeListProps> = ({ theater, date, onDateChange }) => {
    const { data, error } = useSWR(`/showtimes/${theater?._id}/list?date=${date.toDateString()}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

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
            {data &&
                (data?.data as ShowtimesByMovie[]).map((item) => <ShowtimeByMovie data={item} key={item.movie.id} />)}
        </div>
    );
};

interface ShowtimeByMovieProps {
    data: ShowtimesByMovie;
}

const ShowtimeByMovie: FC<ShowtimeByMovieProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            <div className="col-span-1">
                <MovieImage
                    src={`_bestv2${data.movie.poster_path}`}
                    alt={data.movie.title}
                    width={300}
                    height={450}
                    className="rounded-3xl shadow-md"
                />
            </div>
            <div className="col-span-3 p-3">
                <h5 className="font-semibold">{data.movie.title}</h5>
                <div className="flex flex-wrap gap-4 mt-6">
                    {data.showtimes.map((showtime) => (
                        <Button variant="outlined" color="secondary" key={showtime._id}>
                            {`${formats.time(showtime.startAt)} - ${formats.time(showtime.endAt)}`}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShowtimeList;
