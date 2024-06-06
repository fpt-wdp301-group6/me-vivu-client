'use client';

import React, { ElementRef, FC, useRef } from 'react';
import MovieImage from './movie-image';
import { IconButton, Tooltip } from '@mui/material';
import { FaRegCirclePlay } from 'react-icons/fa6';
import Movie from '@/types/movie';
import TrailerModal from './trailer-modal';

interface MovieDetailCardProps {
    data: Movie;
}

const MovieDetailCard: FC<MovieDetailCardProps> = ({ data }) => {
    const trailerRef = useRef<ElementRef<typeof TrailerModal>>(null);

    return (
        <div className="col-span-2">
            <div className="relative">
                <div className="w-96 overflow-hidden rounded-3xl">
                    <MovieImage
                        src={`_bestv2/${data?.poster_path}`}
                        alt="image_alt"
                        width={300}
                        height={450}
                        className="w-full aspect-poster bg-cover"
                    />
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
            <TrailerModal movie={data} ref={trailerRef} />
        </div>
    );
};

export default MovieDetailCard;
