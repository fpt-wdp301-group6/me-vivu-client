'use client';

import { MovieImage } from '@/components';
import { fetcher } from '@/configs/tmdb';
import Genre from '@/types/genre';
import Movie from '@/types/movie';
import { constants } from '@/utils';
import { Container } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';
import useSWR from 'swr';

interface DetailProps {
    id: number;
}

const Detail: FC<DetailProps> = ({ id }) => {
    const { data, isLoading, error } = useSWR<Movie>(`/movie/${id}`, fetcher);
    const backdropStyles = 'absolute top-0 left-0 right-0 bottom-0 -z-1 bg-gradient-to-t from-dark to-black/20';
    return (
        <div
            style={{
                backgroundImage: `url(${constants.tmdbUrl}/original/${data?.backdrop_path})`,
            }}
            className={clsx(
                'h-screen flex justify-center items-center bg-center bg-cover bg-no-repeat',
                backdropStyles,
            )}
        >
            <Container>
                <div className="grid grid-cols-5 max-w-screen-md mx-auto items-center gap-6">
                    <div className="col-span-2">
                        <MovieImage
                            src={`_bestv2/${data?.poster_path}`}
                            alt="Thumbnail_Img"
                            width={300}
                            height={450}
                            className="aspect-poster w-full cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="col-span-3 flex flex-col gap-6">
                        <p className="font-bold text-3xl">{data?.title}</p>
                        <ul className="flex gap-2 flex-wrap">
                            {data?.genres.map((genre: Genre) => (
                                <li key={genre.id}>
                                    <button className="px-2 py-1 border rounded-2xl">
                                        <span className="text-sm">{genre.name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <p>{data?.overview}</p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Detail;
