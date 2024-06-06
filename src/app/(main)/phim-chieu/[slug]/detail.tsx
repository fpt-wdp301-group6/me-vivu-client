'use client';

import { MovieCarousel, MovieImage } from '@/components';
import { fetcher } from '@/configs/tmdb';
import Actor from '@/types/actor';
import Genre from '@/types/genre';
import Movie from '@/types/movie';
import { constants } from '@/utils';
import { Container, IconButton, Tooltip } from '@mui/material';
import clsx from 'clsx';
import TrailerModal from '../../../../components/trailer-modal';
import { ElementRef, FC, useRef } from 'react';
import { FaRegCirclePlay } from 'react-icons/fa6';
import useSWR from 'swr';
import ActorCard from '@/components/actor-card';

interface DetailProps {
    id: number;
}

const Detail: FC<DetailProps> = ({ id }) => {
    const trailerRef = useRef<ElementRef<typeof TrailerModal>>(null);
    const { data, isLoading, error } = useSWR<Movie>(`/movie/${id}`, fetcher);
    const { data: actors, error: error2 } = useSWR<Actor>(`/movie/${id}/credits?language=vi-VN`, fetcher);
    const topFiveCasts = actors?.cast.sort((a, b) => b.popularity - a.popularity).slice(0, 5);

    // const topFiveActors = castPeople.filter((person)=>);
    const backdropStyles = 'top-0 left-0 right-0 bottom-0 -z-1 bg-gradient-to-t from-dark to-black/20';
    return (
        <>
            <div
                className="bg-cover"
                style={{
                    backgroundImage: `url(${constants.tmdbUrl}/original/${data?.backdrop_path})`,
                }}
            >
                <div className={clsx(backdropStyles)}>
                    <Container>
                        <div className="min-h-screen grid grid-cols-5 max-w-screen-lg mx-auto items-center gap-6">
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
                            <div className="col-span-3 flex flex-col gap-2">
                                <p className="font-bold text-3xl my-4">{data?.title}</p>
                                <ul className="flex gap-2 flex-wrap my-4">
                                    {data?.genres.map((genre: Genre) => (
                                        <li key={genre.id}>
                                            <button className="px-2 py-1 border rounded-2xl">
                                                <span className="text-sm font-medium">{genre.name}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <p className="my-4">{data?.overview}</p>
                                <p className="font-bold text-xl mt-4">Diễn Viên</p>
                                <div className="flex gap-3">
                                    {topFiveCasts?.map((cast) => (
                                        <ActorCard key={cast.id} cast={cast} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <TrailerModal movie={data} ref={trailerRef} />
                    </Container>
                </div>
            </div>
            <Container className="py-20">
                <MovieCarousel
                    url={`/movie/${id}/similar?language=vi-VN`}
                    heading="Có thể bạn sẽ thích"
                    id="upcoming"
                    className="mb-12"
                />
            </Container>
        </>
    );
};

export default Detail;
