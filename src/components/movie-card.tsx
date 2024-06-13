'use client';
import { ElementRef, FC, useRef } from 'react';
import { CircularProgress, IconButton, Skeleton, Stack, Tooltip } from '@mui/material';
import MovieImage from './movie-image';
import Link from 'next/link';
import { formats } from '@/utils';
import { FaRegCirclePlay } from 'react-icons/fa6';
import TrailerModal from './trailer-modal';
import Movie from '@/types/movie';

interface MovieCardProps {
    data: Movie;
}

const MovieCard: FC<MovieCardProps> = ({ data }) => {
    const trailerRef = useRef<ElementRef<typeof TrailerModal>>(null);

    const colorVote = (value: number) => {
        if (value > 7) return 'success';
        if (value > 4) return 'warning';
        return 'error';
    };

    return (
        <Stack gap={1}>
            <div className="relative">
                <div className="overflow-hidden rounded-3xl">
                    <MovieImage
                        src={`_bestv2/${data.poster_path}`}
                        alt={data.title}
                        width={300}
                        height={450}
                        className="w-full aspect-poster hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="absolute left-0 bottom-0 translate-x-1/2 translate-y-1/2 bg-white p-1 rounded-full">
                    <CircularProgress
                        variant="determinate"
                        color={colorVote(data.vote_average || 0)}
                        value={(data.vote_average ?? 0) * 10}
                        className="block"
                    />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-dark text-sm font-semibold">
                        {data.vote_average?.toFixed(1)}
                    </span>
                </div>
                <Tooltip title="Xem trailer">
                    <IconButton
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        color="inherit"
                        onClick={() => trailerRef.current?.openModal()}
                    >
                        <FaRegCirclePlay size={40} />
                    </IconButton>
                </Tooltip>
            </div>
            <Link
                href={`/phim-chieu/${formats.slugify(data.title)}-${data.id}`}
                className="mt-5 font-semibold line-clamp-2 hover:text-primary transition-colors"
                title={data.title}
            >
                {data.title}
            </Link>
            <span className="text-sm text-gray-300">{formats.date(data.release_date)}</span>
            <TrailerModal movie={data} ref={trailerRef} />
        </Stack>
    );
};

export const MovieCardSkeleton = () => {
    return (
        <Stack gap={1}>
            <div className="aspect-poster">
                <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" />
            </div>
            <Skeleton animation="wave" variant="text" />
            <Skeleton animation="wave" variant="text" width="50%" />
        </Stack>
    );
};

export default MovieCard;
